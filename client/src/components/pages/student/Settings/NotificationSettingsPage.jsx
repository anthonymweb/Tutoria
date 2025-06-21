import React, { useState } from 'react';

const NotificationSettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    sessionReminders: true,
    newMessages: true,
    marketingUpdates: false
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Notification Settings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Email Notifications</h3>
              <p className="text-gray-600">Receive notifications via email</p>
            </div>
            <button
              onClick={() => handleToggle('emailNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                settings.emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Session Reminders</h3>
              <p className="text-gray-600">Get reminded about upcoming sessions</p>
            </div>
            <button
              onClick={() => handleToggle('sessionReminders')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                settings.sessionReminders ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.sessionReminders ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">New Messages</h3>
              <p className="text-gray-600">Get notified about new messages</p>
            </div>
            <button
              onClick={() => handleToggle('newMessages')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                settings.newMessages ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.newMessages ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Marketing Updates</h3>
              <p className="text-gray-600">Receive updates about new features and promotions</p>
            </div>
            <button
              onClick={() => handleToggle('marketingUpdates')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                settings.marketingUpdates ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.marketingUpdates ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettingsPage; 