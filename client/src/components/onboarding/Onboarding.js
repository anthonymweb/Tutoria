import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PersonalDetails from './PersonalDetails';
import Expertise from './Expertise';
import Verification from './Verification';
import SessionPreferences from './SessionPreferences';
import Payment from './Payment';
import ProgressIndicator from './ProgressIndicator';

const Onboarding = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Tutor Onboarding</h1>
            <p className="mt-2 text-sm text-gray-600">
              Complete your profile to start tutoring students
            </p>
          </div>

          <ProgressIndicator />

          <Routes>
            <Route path="/" element={<Navigate to="/tutor/onboarding/personal-details" replace />} />
            <Route path="/personal-details" element={<PersonalDetails />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/session-preferences" element={<SessionPreferences />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Onboarding; 