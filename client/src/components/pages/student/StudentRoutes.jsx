import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentDashboard from './Dashboard/StudentDashboard';
import FindTutorsPage from './FindTutors/FindTutorsPage';
import StudentMessagesPage from './Messages/StudentMessagesPage';
import StudentProfilePage from './Profile/StudentProfilePage';
import StudentSessionsPage from './Sessions/StudentSessionsPage';
import StudentAnalyticsPage from './Analytics/StudentAnalyticsPage';
import StudentSupportPage from './Support/StudentSupportPage';
import StudentWalletPage from './Wallet/StudentWalletPage';
import StudentUpgradePage from './Upgrade/StudentUpgradePage';
import StudentPricingPage from './Pricing/StudentPricingPage';
import StudentFeedbackPage from './Feedback/StudentFeedbackPage';

const StudentRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<StudentDashboard />} />
    <Route path="find-tutor" element={<FindTutorsPage />} />
    <Route path="messages" element={<StudentMessagesPage />} />
    <Route path="profile" element={<StudentProfilePage />} />
    <Route path="sessions" element={<StudentSessionsPage />} />
    <Route path="analytics" element={<StudentAnalyticsPage />} />
    <Route path="support" element={<StudentSupportPage />} />
    <Route path="wallet" element={<StudentWalletPage />} />
    <Route path="feedback" element={<StudentFeedbackPage />} />
    <Route path="upgrade" element={<StudentUpgradePage />} />
    <Route path="pricing" element={<StudentPricingPage />} />
  </Routes>
);

export default StudentRoutes;
