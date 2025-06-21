// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiQcTuH6r6D8SBPi0nqhfdLJKez8O4x1E",
  authDomain: "tutoria-platform.firebaseapp.com",
  projectId: "tutoria-platform",
  storageBucket: "tutoria-platform.firebasestorage.app",
  messagingSenderId: "73522198985",
  appId: "1:73522198985:web:ad7c82a6fd73d89c361018",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);
const messaging = getMessaging(app);

export { auth, messaging };
export default app;
