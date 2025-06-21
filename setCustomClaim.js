const admin = require('firebase-admin');

// Load service account from environment variable or file
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString('utf8'))
  : require('./tutoria-platform-firebase-adminsdk-fbsvc-f90aa9e95a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const email = process.argv[2];
const role = process.argv[3];
if (!email || !role) {
  console.error('Usage: node setCustomClaim.js <email> <role>');
  process.exit(1);
}

async function setCustomClaim() {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { role });
    console.log(`Custom claim 'role: ${role}' set for user: ${email}`);
    process.exit(0);
  } catch (err) {
    console.error('Error setting custom claim:', err.message);
    process.exit(1);
  }
}

setCustomClaim(); 