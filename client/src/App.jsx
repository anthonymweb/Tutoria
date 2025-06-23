import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthRedirector, useAuth } from './context/AuthContext';
import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import AboutPage from './components/pages/AboutPage';
import NotFoundPage from './components/pages/NotFoundPage';
import UnauthorizedPage from './components/pages/UnauthorizedPage';
import PricingPage from './components/pages/PricingPage';
import RoleSelectionPage from './components/pages/RoleSelectionPage';
import BecomeTutorPage from './components/pages/tutor/BecomeTutorPage';
import TutorApplicationForm from './components/pages/tutor/TutorApplicationForm';
import ApplicationStatusPage from './components/pages/tutor/ApplicationStatusPage';
import StudentLandingPage from './components/pages/StudentLandingPage';
import TutorLandingPage from './components/pages/TutorLandingPage';
import StudentLayout from './components/layout/StudentLayout';
import TutorLayout from './components/layout/TutorLayout';
import AdminLayout from './components/layout/AdminLayout';
import StudentRoutes from './routes/studentRoutes';
import TutorRoutes from './routes/tutorRoutes';
import AdminRoutes from './routes/adminRoutes';
import StudentDashboard from './components/pages/student/Dashboard/StudentDashboard';
import TutorDashboard from './components/pages/tutor/Dashboard/TutorDashboard';
import AdminDashboard from './components/pages/admin/Dashboard/AdminDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If the role is not yet known, show a spinner (don't redirect)
  if (!currentUser.role) {
    return <div>Loading...</div>;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthRedirector />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        
        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/role-selection" element={<RoleSelectionPage />} />
        
        {/* Tutor Application Routes */}
        <Route path="/becometutor" element={<BecomeTutorPage />} />
        <Route path="/tutor/apply" element={<TutorApplicationForm />} />
        <Route path="/tutor/application-status" element={<ApplicationStatusPage />} />
        
        {/* Landing Pages */}
        <Route path="/student-landing" element={<StudentLandingPage />} />
        <Route path="/tutor-landing" element={<TutorLandingPage />} />
        
        {/* Protected Routes */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route path="*" element={<StudentRoutes />} />
        </Route>

        <Route
          path="/tutor/*"
          element={
            <ProtectedRoute allowedRoles={['tutor']}>
              <TutorLayout />
            </ProtectedRoute>
          }
        >
          <Route path="*" element={<TutorRoutes />} />
        </Route>
        
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="*" element={<AdminRoutes />} />
        </Route>
        
        {/* Error Routes */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
export default App;
