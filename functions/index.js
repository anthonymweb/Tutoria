const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');
const { Resend } = require('resend');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin SDK
either = admin.initializeApp();

// Email clients
const resendClient = new Resend(process.env.RESEND_API_KEY);
const smtpTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.handleTutorApproval = functions.firestore
  .document('tutor_applications/{appId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    // Only trigger when status flips to 'approved'
    if (before.status === 'approved' || after.status !== 'approved') {
      return null;
    }

    const { email, name, phone } = after;
    // Generate random password
    const password = crypto.randomBytes(8).toString('hex');

    // Create Firebase Auth user
    const createParams = { email, password, displayName: name };
    if (phone) createParams.phoneNumber = phone;
    let userRecord;
    try {
      userRecord = await admin.auth().createUser(createParams);
    } catch (err) {
      if (err.code === 'auth/invalid-phone-number') {
        console.warn('Invalid phone number, retry without it');
        delete createParams.phoneNumber;
        userRecord = await admin.auth().createUser(createParams);
      } else if (err.code === 'auth/email-already-exists') {
        console.warn('User already exists, skipping create');
      } else {
        console.error('Error creating Auth user:', err);
        throw err;
      }
    }
    console.log('Auth user created:', userRecord.uid);

    // Prepare email content
    const htmlContent = `<p>Hello ${name},</p>
<p>Your tutor application has been approved. You can now log in with:</p>
<ul><li>Email: ${email}</li><li>Password: ${password}</li></ul>
<p>Please change your password upon first login.</p>
<p>Best,<br/>Tutoria Team</p>`;

    // Send email via Resend or SMTP
    if (process.env.RESEND_API_KEY) {
      try {
        const result = await resendClient.emails.send({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: 'Your Tutor Account is Approved',
          html: htmlContent,
        });
        console.log('Email sent via Resend:', result.id);
      } catch (e) {
        console.error('Resend send error:', e);
      }
    } else {
      try {
        const info = await smtpTransporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: email,
          subject: 'Your Tutor Account is Approved',
          html: htmlContent,
        });
        console.log('Email sent via SMTP:', info.messageId);
      } catch (e) {
        console.error('SMTP send error:', e);
      }
    }

    return null;
  });
