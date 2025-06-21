import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
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
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
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
          
          {/* Protected Student Routes */}
          <Route path="/student" element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentLayout />
            </ProtectedRoute>
          }>
            <Route index element={<StudentDashboard />} />
            {/* All other student routes as children */}
            <Route path="*" element={<StudentRoutes />} />
          </Route>
          
          {/* Protected Tutor Routes */}
          <Route path="/tutor" element={
            <ProtectedRoute allowedRoles={['tutor']}>
              <TutorLayout />
            </ProtectedRoute>
          }>
            <Route index element={<TutorDashboard />} />
            <Route path="*" element={<TutorRoutes />} />
          </Route>
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="*" element={<AdminRoutes />} />
          </Route>
          
          {/* Error Routes */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;