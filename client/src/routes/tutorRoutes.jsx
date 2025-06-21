import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Dashboard
import TutorDashboard from '../components/pages/tutor/Dashboard/TutorDashboard';


// Session Management
import TutorSessionsPage from '../components/pages/tutor/Sessions/TutorSessionsPage';
import TutorSessionRoom from '../components/pages/tutor/Sessions/TutorSessionRoom';
import SessionRequestsPage from '../components/pages/tutor/Sessions/SessionRequestsPage';
import ActiveSession from '../components/pages/tutor/Sessions/ActiveSession';
import SessionHistoryPage from '../components/pages/tutor/Sessions/SessionHistoryPage';

// Student Management
import TutorStudentsPage from '../components/pages/tutor/Students/TutorStudentsPage';
import StudentProfilePage from '../components/pages/tutor/Students/StudentProfilePage';

// Calendar & Availability
import AvailabilityPage from '../components/pages/tutor/Calendar/AvailabilityPage';

// Financial Management
import TutorEarningsPage from '../components/pages/tutor/Finance/TutorEarningsPage';
import WithdrawFundsPage from '../components/pages/tutor/Finance/WithdrawFundsPage';
import TutorWalletPage from '../components/pages/tutor/Finance/TutorWalletPage';
import PayoutSettingsPage from '../components/pages/tutor/Finance/PayoutSettingsPage';

// Reviews & Feedback
import TutorFeedbackPage from '../components/pages/tutor/Reviews/TutorFeedbackPage';

// Communication
import TutorMessagesPage from '../components/pages/tutor/Messages/TutorMessagesPage';

// Profile & Settings
import TutorProfilePage from '../components/pages/tutor/Profile/TutorProfilePage';
import TutorSupportPage from '../components/pages/tutor/Support/TutorSupportPage';
import TutorUpgradePage from '../components/pages/tutor/Upgrade/TutorUpgradePage';
import TutorAnalyticsPage from '../components/pages/tutor/Analytics/TutorAnalyticsPage';

// Subject Management
import ManageSubjectsPage from '../components/pages/tutor/Subjects/ManageSubjectsPage';

const TutorRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route index element={<TutorDashboard />} />
      <Route path="dashboard" element={<TutorDashboard />} />

      {/* Session Management */}
      <Route path="sessions">
        <Route index element={<TutorSessionsPage />} />
        <Route path="requests" element={<SessionRequestsPage />} />
        <Route path="history" element={<SessionHistoryPage />} />
        <Route path=":sessionId" element={<TutorSessionRoom />} />
        <Route path="active/:sessionId" element={<ActiveSession />} />
      </Route>

      {/* Student Management */}
      <Route path="students">
        <Route index element={<TutorStudentsPage />} />
        <Route path=":studentId" element={<StudentProfilePage />} />
      </Route>

      {/* Calendar & Availability */}
      <Route path="calendar" element={<AvailabilityPage />} />

      {/* Financial Management */}
      <Route path="earnings">
        <Route index element={<TutorEarningsPage />} />
        <Route path="withdraw" element={<WithdrawFundsPage />} />
      </Route>
      <Route path="wallet">
        <Route index element={<TutorWalletPage />} />
        <Route path="payout-settings" element={<PayoutSettingsPage />} />
      </Route>

      {/* Reviews & Feedback */}
      <Route path="reviews" element={<TutorFeedbackPage />} />

      {/* Communication */}
      <Route path="messages" element={<TutorMessagesPage />} />

      {/* Profile & Settings */}
      <Route path="profile" element={<TutorProfilePage />} />
      <Route path="support" element={<TutorSupportPage />} />
      <Route path="upgrade" element={<TutorUpgradePage />} />
      <Route path="analytics" element={<TutorAnalyticsPage />} />
      <Route path="subjects" element={<ManageSubjectsPage />} />

      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/tutor" replace />} />
    </Routes>
  );
};

export default TutorRoutes; 