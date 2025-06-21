import React from 'react';
import { useLocation } from 'react-router-dom';

const ProgressIndicator = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const steps = [
    { path: '/tutor/onboarding/personal-details', label: 'Personal Details' },
    { path: '/tutor/onboarding/expertise', label: 'Expertise' },
    { path: '/tutor/onboarding/verification', label: 'Verification' },
    { path: '/tutor/onboarding/session-preferences', label: 'Session Preferences' },
    { path: '/tutor/onboarding/payment', label: 'Payment' }
  ];

  const currentStepIndex = steps.findIndex(step => step.path === currentPath);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.path}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStepIndex
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`mt-2 text-sm ${
                  index <= currentStepIndex ? 'text-indigo-600' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-4 ${
                  index < currentStepIndex ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator; 