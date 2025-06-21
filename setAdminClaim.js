const admin = require('firebase-admin');

// Load service account from environment variable or file
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf8'))
  : require('./tutoria-platform-firebase-adminsdk-fbsvc-f90aa9e95a.json'); // use the JSON file in project root

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const email = process.argv[2];
if (!email) {
  console.error('Usage: node setAdminClaim.js <email>');
  process.exit(1);
}

async function setAdminClaim() {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { role: 'admin' });
    console.log(`Admin claim set for user: ${email}`);
    process.exit(0);
  } catch (err) {
    console.error('Error setting admin claim:', err.message);
    process.exit(1);
  }
}

setAdminClaim(); 