import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  sendEmailVerification as firebaseSendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  getIdTokenResult
} from 'firebase/auth';

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

// This component handles redirection and must be placed inside a Router.
export function AuthRedirector() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading || !currentUser) return;

    const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(location.pathname);

    if (isAuthPage) {
      switch (currentUser.role) {
        case 'student':
          navigate('/student');
          break;
        case 'tutor':
          navigate('/tutor');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/');
      }
    }
  }, [currentUser, loading, navigate, location.pathname]);

  return null; // This component does not render anything.
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
          await user.getIdToken(true);
          const idTokenResult = await getIdTokenResult(user);
        let role = idTokenResult.claims.role;

        if (!role) {
            const storedData = JSON.parse(localStorage.getItem('userData'));
            if (storedData && storedData.uid === user.uid && storedData.role) {
              role = storedData.role;
            }
          }

          const userData = { ...user, role: role || 'student' };
          setCurrentUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        } else {
          setCurrentUser(null);
          localStorage.removeItem('userData');
        }
      } catch (error) {
        console.error("Error during authentication state change:", error);
        setCurrentUser(null);
        localStorage.removeItem('userData');
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  async function login(email, password) {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const errorMessage = err.message || 'An error occurred during login';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async function signup(userData) {
    try {
      setError(null);
      const response = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      const newUser = response.user;

      fetch(`${process.env.REACT_APP_API_URL}/setRole`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: newUser.uid, role: userData.role })
      });

      const userProfile = {
        uid: newUser.uid,
        email: userData.email,
        fullName: `${userData.firstName} ${userData.lastName}`,
        role: userData.role,
        createdAt: new Date().toISOString(),
      };

      await firebaseUpdateProfile(newUser, {
        displayName: userProfile.fullName
      });

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
    signOut(auth);
    setCurrentUser(null);
    localStorage.removeItem('userData');
  }

  async function updateProfile(profileData) {
    try {
      setError(null);
      if (isDev) {
        const updatedUser = { ...currentUser, ...profileData };
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        return updatedUser;
      }
      if (!auth.currentUser) throw new Error('No authenticated user');
      await firebaseUpdateProfile(auth.currentUser, {
        displayName: profileData.fullName || profileData.displayName
      });
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
      const userProfile = {
        uid: result.user.uid,
        email: result.user.email,
        fullName: result.user.displayName,
        role: 'student', // Default role for Google sign-in
        createdAt: new Date().toISOString(),
        isEmailVerified: result.user.emailVerified,
        profileCompleted: false
      };
      localStorage.setItem('userData', JSON.stringify(userProfile));
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
      {children}
    </AuthContext.Provider>
  );
}