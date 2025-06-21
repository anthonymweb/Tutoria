import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Dashboard
import StudentDashboard from '../components/pages/student/Dashboard/StudentDashboard';

// Tutor Search & Booking
import FindTutorPage from '../components/pages/student/Tutors/FindTutorPage';
import TutorProfilePage from '../components/pages/student/Tutors/TutorProfilePage';
import BookSessionPage from '../components/pages/student/Tutors/BookSessionPage';
import FavoriteTutorsPage from '../components/pages/student/Tutors/FavoriteTutorsPage';

// Session Management
import StudentSessionsPage from '../components/pages/student/Sessions/StudentSessionsPage';
import StudentSessionRoom from '../components/pages/student/Sessions/StudentSessionRoom';
import SessionHistoryPage from '../components/pages/student/Sessions/SessionHistoryPage';
import UpcomingSessionsPage from '../components/pages/student/Sessions/UpcomingSessionsPage';

// Communication
import StudentMessagesPage from '../components/pages/student/Messages/StudentMessagesPage';
import ChatRoom from '../components/pages/student/Messages/ChatRoom';

// Financial Management
import StudentWalletPage from '../components/pages/student/Wallet/StudentWalletPage';
import PaymentMethodsPage from '../components/pages/student/Wallet/PaymentMethodsPage';
import StudentPricingPage from '../components/pages/student/Pricing/StudentPricingPage';
import TransactionHistoryPage from '../components/pages/student/Wallet/TransactionHistoryPage';

// Profile & Settings
import StudentProfilePage from '../components/pages/student/Profile/StudentProfilePage';
import StudentSupportPage from '../components/pages/student/Support/StudentSupportPage';
import StudentUpgradePage from '../components/pages/student/Upgrade/StudentUpgradePage';
import StudentAnalyticsPage from '../components/pages/student/Analytics/StudentAnalyticsPage';
import StudentFeedbackPage from '../components/pages/student/Feedback/StudentFeedbackPage';
import NotificationSettingsPage from '../components/pages/student/Settings/NotificationSettingsPage';

const StudentRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route index element={<StudentDashboard />} />
      <Route path="dashboard" element={<StudentDashboard />} />

      {/* Tutor Search & Booking */}
      <Route path="find-tutor">
        <Route index element={<FindTutorPage />} />
        <Route path="favorites" element={<FavoriteTutorsPage />} />
        <Route path=":tutorId" element={<TutorProfilePage />} />
        <Route path=":tutorId/book" element={<BookSessionPage />} />
      </Route>

      {/* Session Management */}
      <Route path="sessions">
        <Route index element={<StudentSessionsPage />} />
        <Route path="upcoming" element={<UpcomingSessionsPage />} />
        <Route path="history" element={<SessionHistoryPage />} />
        <Route path=":sessionId" element={<StudentSessionRoom />} />
      </Route>

      {/* Communication */}
      <Route path="messages">
        <Route index element={<StudentMessagesPage />} />
        <Route path=":chatId" element={<ChatRoom />} />
      </Route>

      {/* Financial Management */}
      <Route path="wallet">
        <Route index element={<StudentWalletPage />} />
        <Route path="payment-methods" element={<PaymentMethodsPage />} />
        <Route path="transactions" element={<TransactionHistoryPage />} />
      </Route>
      <Route path="pricing" element={<StudentPricingPage />} />

      {/* Profile & Settings */}
      <Route path="profile" element={<StudentProfilePage />} />
      <Route path="support" element={<StudentSupportPage />} />
      <Route path="upgrade" element={<StudentUpgradePage />} />
      <Route path="analytics" element={<StudentAnalyticsPage />} />
      <Route path="feedback" element={<StudentFeedbackPage />} />
      <Route path="settings">
        <Route path="notifications" element={<NotificationSettingsPage />} />
      </Route>

      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/student" replace />} />
    </Routes>
  );
};

export default StudentRoutes; 