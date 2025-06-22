import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile as firebaseUpdateProfile, sendPasswordResetEmail as firebaseSendPasswordResetEmail, sendEmailVerification as firebaseSendEmailVerification, GoogleAuthProvider, signInWithPopup, getIdTokenResult } from 'firebase/auth';

const AuthContext = createContext();

// Development mode mock users
const DEV_USERS = {
  student: {
    id: '1',
    email: 'student@dev.com',
    name: 'Dev Student',
    role: 'student',
    avatar: 'https://ui-avatars.com/api/?name=Dev+Student'
  },
  tutor: {
    id: '2',
    email: 'tutor@dev.com',
    name: 'Dev Tutor',
    role: 'tutor',
    avatar: 'https://ui-avatars.com/api/?name=Dev+Tutor'
  },
  admin: {
    id: '3',
    email: 'admin@dev.com',
    name: 'Dev Admin',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Dev+Admin'
  }
};

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDev = process.env.NODE_ENV === 'development';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // Force token refresh to get latest claims
          await user.getIdToken(true);
          const idTokenResult = await getIdTokenResult(user);
          const role = idTokenResult.claims.role || 'student'; // Default to student if no role

          const userData = { ...user, role };
          localStorage.setItem('userData', JSON.stringify(userData));
          setCurrentUser(userData);
        } else {
          setCurrentUser(null);
          localStorage.removeItem('userData');
        }
      } catch (error) {
        console.error("Error during authentication state change:", error);
        // If any error occurs, ensure user is logged out for safety
        setCurrentUser(null);
        localStorage.removeItem('userData');
      } finally {
        // This ensures loading is always turned off, even if errors occur.
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  async function login(email, password) {
    // This function's only job is to ask Firebase to sign in.
    // It should not manually set state. The `onAuthStateChanged` listener above
    // is the single source of truth and will handle setting the user correctly.
    try {
      setError(null);

      // Dev mode still needs to work, but it should also just set state once.
      if (isDev && email.includes('@dev.com')) {
        const role = email.split('@')[0];
        const devUser = DEV_USERS[role];
        if (!devUser) throw new Error("Invalid dev user");

        localStorage.setItem('userData', JSON.stringify(devUser));
        setCurrentUser(devUser);
        return devUser; // We return here for the form's loading state
      }

      // For real users, we just await the sign-in. The listener does the rest.
      await signInWithEmailAndPassword(auth, email, password);

    } catch (err) {
      console.error('AuthContext: Login error:', err);
      const errorMessage = err.message || 'An error occurred during login';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async function signup(userData) {
    try {
      setError(null);
      
      // In development, allow mock signup
      if (isDev && userData.email.includes('@dev.com')) {
        const role = userData.email.split('@')[0];
        const devUser = DEV_USERS[role];
        if (!devUser) return;

        localStorage.setItem('userData', JSON.stringify(devUser));
        setCurrentUser(devUser);
        return devUser;
      }

      // Create user in Firebase Auth
      const response = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const newUser = response.user;

      // Set custom claim via backend
      // NOTE: This now uses the configured api.js which points to the live backend
      await fetch(`${process.env.REACT_APP_API_URL}/setRole`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: newUser.uid, role: userData.role })
      });

      // Force token refresh to get latest claims
      await newUser.getIdToken(true);
      
      // Get the new role from the token
      const idTokenResult = await getIdTokenResult(newUser);
      const role = idTokenResult.claims.role;

      // Create user profile data
      const userProfile = {
        uid: newUser.uid,
        email: userData.email,
        fullName: `${userData.firstName} ${userData.lastName}`,
        role: role, // Use the role from the token
        createdAt: new Date().toISOString(),
        isEmailVerified: false,
        profileCompleted: false,
        ...(userData.role === 'student' && {
          studentProfile: {
            grade: userData.grade || 'Not specified',
            subjects: userData.subjects || [],
            learningGoals: userData.learningGoals || []
          }
        }),
        ...(userData.role === 'tutor' && {
          tutorProfile: {
            expertise: userData.expertise || 'General',
            experience: userData.experience || 'Not specified',
            education: userData.education || 'Not specified',
            subjects: userData.subjects || [],
            hourlyRate: 0,
            isVerified: false
          }
        })
      };

      // Update Firebase Auth profile
      await firebaseUpdateProfile(newUser, {
        displayName: userProfile.fullName
      });

      // Set current user with full profile data
      const fullUserData = { ...newUser, ...userProfile };
      setCurrentUser(fullUserData);
      localStorage.setItem('userData', JSON.stringify(fullUserData));
      return fullUserData;
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
      throw err;
    }
  }

  function logout() {
    // Clear auth data
    signOut(auth);
    setCurrentUser(null);
    localStorage.removeItem('userData');
  }

  async function updateProfile(profileData) {
    try {
      setError(null);
      
      // In development, allow mock profile update
      if (isDev) {
        const updatedUser = { ...currentUser, ...profileData };
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        return updatedUser;
      }

      if (!auth.currentUser) throw new Error('No authenticated user');

      // Update Firebase Auth profile
      await firebaseUpdateProfile(auth.currentUser, {
        displayName: profileData.fullName || profileData.displayName
      });

      // Update localStorage profile
      const updatedUser = { ...currentUser, ...profileData };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.message || 'An error occurred while updating profile');
      throw err;
    }
  }

  async function resetPassword(email) {
    try {
      setError(null);
      
      // In development, just return success
      if (isDev) return { message: 'Password reset email sent' };

      await firebaseSendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err.message || 'An error occurred while resetting password');
      throw err;
    }
  }

  async function verifyEmail() {
    try {
      setError(null);
      
      // In development, just return success
      if (isDev) return { message: 'Email verified successfully' };

      if (!auth.currentUser) throw new Error('No authenticated user');
      await firebaseSendEmailVerification(auth.currentUser);
      return;
      
    } catch (err) {
      setError(err.message || 'An error occurred while verifying email');
      throw err;
    }
  }

  function isAuthenticated() {
    return !!currentUser;
  }

  function hasRole(role) {
    return currentUser?.role === role;
  }

  async function signInWithGoogle() {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Create new user profile
      const userProfile = {
        uid: result.user.uid,
        email: result.user.email,
        fullName: result.user.displayName,
        role: 'student', // Default role for Google sign-in
        createdAt: new Date().toISOString(),
        isEmailVerified: result.user.emailVerified,
        profileCompleted: false
      };

      // Save user profile to localStorage
      localStorage.setItem('userData', JSON.stringify(userProfile));

      // Set current user
      const fullUserData = { ...result.user, ...userProfile };
      setCurrentUser(fullUserData);
      return fullUserData;
    } catch (err) {
      setError(err.message || 'An error occurred during Google sign-in');
      throw err;
    }
  }

  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    resetPassword,
    verifyEmail,
    isAuthenticated,
    hasRole,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}