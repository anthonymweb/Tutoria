// A minimal Node/Express server to accept form submissions and pipe them to MongoDB
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
console.log('Resend API Key present:', !!process.env.RESEND_API_KEY);
console.log('Email FROM address:', process.env.EMAIL_FROM);

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('DB_NAME:', process.env.DB_NAME);

const app = express();
// Account & Resend email setup
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { Resend } = require('resend');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const smtpTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
const resendClient = new Resend(process.env.RESEND_API_KEY);
const User = require('./server/models/User');
const TutorApplication = require('./server/models/TutorApplication');
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Middleware to verify Firebase ID token
async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const idToken = authHeader.split(' ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.user = decoded;
    return next();
  } catch (err) {
    console.error('Token verification error:', err.stack);
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

// Create user record in Mongo after Firebase signup
app.post('/api/users', verifyToken, async (req, res) => {
  try {
    console.log('Received user creation request:', req.body);
    
    const { role } = req.body;
    const auth = admin.auth();
    const firebaseUser = await auth.getUser(req.user.uid);

    console.log('Firebase user:', firebaseUser);

    const userData = {
      firebaseUid: req.user.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || '',
      photoURL: firebaseUser.photoURL || '',
      role: role,
      createdAt: new Date()
    };

    console.log('User data:', userData);

    if (role === 'tutor') {
      console.log('Creating tutor profile with data:', userData);
    }

    const result = await User.create(userData);
    console.log('Insert result:', result);
    
    res.status(201).json({ 
      message: 'User created successfully', 
      userId: result._id 
    });
  } catch (err) {
    console.error('Full error creating user:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    res.status(500).json({ 
      error: 'Internal server error', 
      details: err.message
    });
  }
});

// Connect to MongoDB with Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongoose connected'))
  .catch(err => console.error('Mongoose connection error:', err));

// Endpoint to handle tutor applications
// Endpoint to handle tutor applications (submission)
app.post('/api/applications', async (req, res) => {
  console.log('Received POST /api/applications, body:', req.body);
  try {
    // Removed req.user destructuring for anonymous submissions
    const application = { ...req.body, status: 'pending', createdAt: new Date() };
    const result = await TutorApplication.create(application);
    console.log('Inserted application, result:', result);
    return res.json({ insertedId: result._id });
  } catch (err) {
    console.error('Full error inserting application:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    return res.status(500).json({ error: err.message });
  }
});

app.get('/api/applications/pending', async (req, res) => {
  console.log('Fetching pending applications');
  try {
    const pending = await TutorApplication.find({ status: 'pending' })
      .select('-cvData -cv')
      .exec();
    res.json(pending);
  } catch (err) {
    console.error('Full error fetching pending applications:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/applications/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TutorApplication.updateOne({ _id: id }, { $set: { status: 'approved', approvedAt: new Date() } });
    if (result.modifiedCount === 1) {
      const application = await TutorApplication.findById(id);
      const password = crypto.randomBytes(8).toString('hex');
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create user in Firebase Auth
      const createParams = {
        email: application.email,
        password: password,
        displayName: application.name,
        ...(application.phone ? { phoneNumber: application.phone } : {}),
      };
      let firebaseUser;
      try {
        firebaseUser = await admin.auth().createUser(createParams);
      } catch (err) {
        if (err.code === 'auth/invalid-phone-number') {
          console.warn('Invalid phone number, retrying without phone:', application.phone);
          delete createParams.phoneNumber;
          firebaseUser = await admin.auth().createUser(createParams);
        } else if (err.code === 'auth/email-already-exists') {
          console.warn('Firebase user exists, skipping creation for:', application.email);
        } else {
          throw err;
        }
      }
      console.log('Created Firebase user:', firebaseUser.uid);
        // Mark user as verified in Mongo
        await User.updateOne(
          { firebaseUid: firebaseUser.uid },
          { $set: { verified: true, role: 'tutor', updatedAt: new Date() } },
          { upsert: true }
        );
        console.log('User marked verified in Mongo:', firebaseUser.uid);
      // Prepare approval email content
      const htmlContent = `<p>Hello ${application.name},</p><p>Your tutor application has been approved. You can now log in with:</p><ul><li>Email: ${application.email}</li><li>Password: ${password}</li></ul><p>Please change your password upon first login.</p><p>Best,<br/>Tutoria Team</p>`;
      if (process.env.RESEND_API_KEY) {
        try {
          const sendResult = await resendClient.emails.send({
            from: process.env.EMAIL_FROM,
            to: application.email,
            subject: 'Your Tutor Account is Approved',
            html: htmlContent
          });
          console.log('Resend send result:', sendResult);
        } catch (err) {
          console.error('Resend send error:', err.stack);
        }
      } else if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          const sendResult = await smtpTransporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: application.email,
            subject: 'Your Tutor Account is Approved',
            html: htmlContent
          });
          console.log('SMTP send result:', sendResult);
        } catch (err) {
          console.error('SMTP send error:', err.stack);
        }
      } else {
        console.warn('No email service configured');
      }
      return res.json({ ok: true });
    }
    return res.status(404).json({ error: 'Application not found' });
  } catch (err) {
    console.error('Full error approving application:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    res.status(500).json({ error: err.message });
  }
});

// Reject tutor application and send rejection email
app.patch('/api/applications/:id/reject', async (req, res) => {
  console.log('Rejecting application and sending email');
  try {
    const { id } = req.params;
    const result = await TutorApplication.updateOne({ _id: id }, { $set: { status: 'rejected', rejectedAt: new Date() } });
    if (result.modifiedCount === 1) {
      const application = await TutorApplication.findById(id);
      try {
      console.log('Sending rejection email to', application.email);
      await resendClient.emails.send({
        from: process.env.EMAIL_FROM,
        to: application.email,
        subject: 'Your Tutor Application Status',
        html: `<p>Hello ${application.name},</p><p>We're sorry to inform you that your tutor application has been rejected.</p><p>If you have any questions, feel free to contact support.</p><p>Best,<br/>Tutoria Team</p>`
      });
    } catch (err) {
      console.error('Error sending rejection email:', err.stack);
    }
    return res.json({ ok: true });
    }
    return res.status(404).json({ error: 'Application not found' });
  } catch (err) {
    console.error('Full error rejecting application:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    return res.status(500).json({ error: err.message });
  }
});

// Document viewing endpoint (resume, certifications, idProof)
app.get('/api/applications/:id/documents/:docType/:index?', async (req, res) => {
  try {
    const { id, docType, index } = req.params;
    const application = await TutorApplication.findById(id);
    if (!application) return res.status(404).json({ error: 'Application not found' });
    let data, filename;
    if (docType === 'resume') {
      data = application.cvData;
      filename = application.cvName;
    } else if (docType === 'certifications') {
      const idx = parseInt(index, 10);
      data = application.certificationsData && application.certificationsData[idx];
      filename = application.certifications && application.certifications[idx];
    } else if (docType === 'idProof') {
      data = application.idProofData;
      filename = application.idProofName;
    } else {
      return res.status(400).json({ error: 'Invalid document type' });
    }
    if (!data) return res.status(404).json({ error: 'Document not found' });
    const matches = data.match(/^data:(.+);base64,(.+)$/);
    if (!matches) return res.status(500).json({ error: 'Invalid data format' });
    const mime = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    res.set('Content-Type', mime);
    res.set('Content-Disposition', `inline; filename="${filename}"`);
    res.send(buffer);
  } catch (err) {
    console.error('Full error fetching document:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    res.status(500).json({ error: err.message });
  }
});

// Admin stats endpoint
app.get('/api/admin/stats', verifyToken, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const pendingApprovals = await TutorApplication.countDocuments({ status: 'pending' });
    res.json({ totalUsers, activeSessions: 0, monthlyRevenue: 0, pendingApprovals });
  } catch (err) {
    console.error('Full error fetching admin stats:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    res.status(500).json({ error: err.message });
  }
});

// Admin analytics endpoint
app.get('/api/admin/analytics', verifyToken, async (req, res) => {
  try {
    const analyticsData = {
      revenue: { monthly: 12500, weekly: 3200, daily: 450 },
      userGrowth: { newUsers: 42, activeUsers: 312 }
    };
    res.json(analyticsData);
  } catch (err) {
    console.error('Analytics error:', err.stack);
    res.status(500).json({ error: 'Failed to get analytics data' });
  }
});

// Admin: Users
app.get('/api/admin/users', verifyToken, async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (err) {
    console.error('Full error fetching users:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/admin/users/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec();
    res.json(user);
  } catch (err) {
    console.error('Full error fetching user:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    res.status(500).json({ error: err.message });
  }
});

// Admin: Sessions
app.get('/api/admin/sessions', verifyToken, async (req, res) => {
  try {
    const sessions = await Session.find().exec();
    res.json(sessions);
  } catch (err) {
    console.error('Full error fetching sessions:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/admin/sessions/:id', verifyToken, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).exec();
    res.json(session);
  } catch (err) {
    console.error('Full error fetching session:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    res.status(500).json({ error: err.message });
  }
});

// Admin: Payments
app.get('/api/admin/payments', verifyToken, async (req, res) => {
  try {
    const payments = await Payment.find().exec();
    res.json(payments);
  } catch (err) {
    console.error('Full error fetching payments:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    res.status(500).json({ error: err.message });
  }
});
app.get('/api/admin/payments/:id', verifyToken, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).exec();
    res.json(payment);
  } catch (err) {
    console.error('Full error fetching payment:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/admin/payments/:id', verifyToken, async (req, res) => {
  try {
    await Payment.findByIdAndUpdate(req.params.id, req.body).exec();
    res.json({ ok: true });
  } catch (err) {
    console.error('Full error updating payment:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    res.status(500).json({ error: err.message });
  }
});

// Public: List approved tutors for student FindTutorsPage
app.get('/api/tutors', async (req, res) => {
  try {
    const { subject, rating, mode } = req.query;
    const query = { role: 'tutor', status: 'approved' };
    if (subject) query.subject = new RegExp(subject, 'i');
    if (mode) query.mode = mode;
    if (rating) query.rating = { $gte: Number(rating) };
    const tutors = await User.find(query).exec();
    const result = tutors.map(tutor => {
      const priceNum = parseFloat((tutor.hourlyRate || '').replace(/[^0-9.]/g, '')) || 0;
      return {
        id: tutor._id.toString(),
        name: tutor.displayName,
        image: 'https://via.placeholder.com/150',
        rating: 0,
        reviews: 0,
        bio: tutor.qualifications,
        subjects: (tutor.subject || '').split(',').map(s => s.trim()).filter(Boolean),
        mode: tutor.mode || 'online',
        price: priceNum
      };
    });
    res.json({ tutors: result });
  } catch (err) {
    console.error('Full error fetching tutors:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    res.status(500).json({ error: 'Failed to fetch tutors' });
  }
});

// Create admin user (protected route)
app.post('/api/admin/users', verifyToken, async (req, res) => {
  // Check if current user is admin
  const currentUser = await Admin.findOne({ firebaseUid: req.user.uid }).exec();
  if (!currentUser) return res.status(403).json({ error: 'Forbidden' });

  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({ email, password });
    
    // Add custom claim
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'admin' });
    
    // Store in admins collection
    await Admin.create({
      firebaseUid: userRecord.uid,
      email,
      createdAt: new Date()
    });
    
    res.status(201).json({ message: 'Admin user created' });
  } catch (err) {
    console.error('Full error creating admin user:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    res.status(500).json({ error: err.message });
  }
});

// TEMPORARY: Create first admin (remove after use)
app.post('/api/create-first-admin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Create Firebase user
    const userRecord = await admin.auth().createUser({ email, password });
    
    // Set admin claim
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'admin' });
    
    // Store in admins collection
    await Admin.create({
      firebaseUid: userRecord.uid,
      email,
      createdAt: new Date()
    });
    
    res.status(201).json({ message: 'First admin created successfully' });
  } catch (err) {
    console.error('Full error creating first admin:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    res.status(500).json({ error: err.message });
  }
});

// Tutor dashboard data
app.get('/api/tutor/dashboard', verifyToken, async (req, res) => {
  try {
    const tutor = await User.findOne({ firebaseUid: req.user.uid, role: 'tutor' }).exec();
    if (!tutor) return res.status(404).json({ error: 'Tutor not found' });

    const sessions = await Session.find({ 
      tutorId: tutor._id,
      status: 'upcoming'
    }).sort({ date: 1 }).limit(5).exec();

    const messages = await Message.find({
      receiverId: tutor._id,
      read: false
    }).sort({ timestamp: -1 }).limit(5).exec();

    res.json({
      tutor,
      upcomingSessions: sessions,
      unreadMessages: messages
    });
  } catch (err) {
    console.error('Full error fetching tutor dashboard data:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      keyPattern: err.keyPattern,
      keyValue: err.keyValue
    });
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register sessionRequests route
const sessionRequestsRouter = require('./server/routes/sessionRequests');
app.use('/api/session-requests', sessionRequestsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
