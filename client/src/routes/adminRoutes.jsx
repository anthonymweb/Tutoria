import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Dashboard
import AdminDashboard from '../components/pages/admin/Dashboard/AdminDashboard';
import PendingTutorApplications from '../components/pages/admin/Dashboard/PendingTutorApplications';

// User Management
import UsersPage from '../components/pages/admin/Users/UsersPage';
import AllUsersPage from '../components/pages/admin/Users/AllUsersPage';
import UserDetailsPage from '../components/pages/admin/Users/UserDetailsPage';

// Tutor Management
import AllTutorsPage from '../components/pages/admin/Tutors/AllTutorsPage';
import TutorDetailsPage from '../components/pages/admin/Tutors/TutorDetailsPage';
import TutorApprovalQueue from '../components/pages/admin/Tutors/TutorApprovalQueue';

// Student Management
import AllStudentsPage from '../components/pages/admin/Students/AllStudentsPage';
import StudentDetailsPage from '../components/pages/admin/Students/StudentDetailsPage';

// Session Management
import AllSessionsPage from '../components/pages/admin/Sessions/AllSessionsPage';
import SessionDetailsPage from '../components/pages/admin/Sessions/SessionDetailsPage';
import SessionOverviewPage from '../components/pages/admin/Sessions/SessionOverviewPage';

// Payment Management
import PayoutRequestsPage from '../components/pages/admin/Payments/PayoutRequestsPage';
import TransactionLogsPage from '../components/pages/admin/Payments/TransactionLogsPage';

// Analytics
import PlatformAnalyticsPage from '../components/pages/admin/Analytics/PlatformAnalyticsPage';
import RevenueAnalyticsPage from '../components/pages/admin/Analytics/RevenueAnalyticsPage';
import UserAnalyticsPage from '../components/pages/admin/Analytics/UserAnalyticsPage';
import SessionAnalyticsPage from '../components/pages/admin/Analytics/SessionAnalyticsPage';

// Dispute Management
import AllDisputesPage from '../components/pages/admin/Disputes/AllDisputesPage';
import DisputeDetailsPage from '../components/pages/admin/Disputes/DisputeDetailsPage';
import DisputeCenter from '../components/pages/admin/Disputes/DisputeCenter';

// Settings
import AdminSettingsPage from '../components/pages/admin/Settings/AdminSettingsPage';

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route index element={<AdminDashboard />} />
      <Route path="dashboard" element={<Navigate to="/admin" replace />} />
      <Route path="pending-applications" element={<PendingTutorApplications />} />

      {/* User Management */}
      <Route path="users">
        <Route index element={<UsersPage />} />
        <Route path="all" element={<AllUsersPage />} />
        <Route path=":userId" element={<UserDetailsPage />} />
      </Route>

      {/* Tutor Management */}
      <Route path="tutors">
        <Route index element={<AllTutorsPage />} />
        <Route path="all" element={<AllTutorsPage />} />
        <Route path=":tutorId" element={<TutorDetailsPage />} />
        <Route path="approval-queue" element={<TutorApprovalQueue />} />
      </Route>

      {/* Student Management */}
      <Route path="students">
        <Route index element={<AllStudentsPage />} />
        <Route path="all" element={<AllStudentsPage />} />
        <Route path=":studentId" element={<StudentDetailsPage />} />
      </Route>

      {/* Session Management */}
      <Route path="sessions">
        <Route index element={<AllSessionsPage />} />
        <Route path="all" element={<AllSessionsPage />} />
        <Route path=":sessionId" element={<SessionDetailsPage />} />
        <Route path="overview" element={<SessionOverviewPage />} />
      </Route>

      {/* Payment Management */}
      <Route path="payments">
        <Route path="payouts" element={<PayoutRequestsPage />} />
        <Route path="transactions" element={<TransactionLogsPage />} />
      </Route>

      {/* Analytics */}
      <Route path="analytics">
        <Route path="platform" element={<PlatformAnalyticsPage />} />
        <Route path="revenue" element={<RevenueAnalyticsPage />} />
        <Route path="users" element={<UserAnalyticsPage />} />
        <Route path="sessions" element={<SessionAnalyticsPage />} />
      </Route>

      {/* Dispute Management */}
      <Route path="disputes">
        <Route index element={<AllDisputesPage />} />
        <Route path=":disputeId" element={<DisputeDetailsPage />} />
        <Route path="center" element={<DisputeCenter />} />
      </Route>

      {/* Settings */}
      <Route path="settings" element={<AdminSettingsPage />} />

      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminRoutes; 