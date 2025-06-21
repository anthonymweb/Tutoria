import React, { useState } from 'react';

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    siteTitle: 'Tutoring Platform',
    adminEmail: 'admin@example.com',
    notificationsEnabled: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // In a real application, you would save these settings to a backend
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label htmlFor="siteTitle" className="block text-sm font-medium text-gray-700">Site Title</label>
            <input
              type="text"
              name="siteTitle"
              id="siteTitle"
              value={settings.siteTitle}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700">Admin Contact Email</label>
            <input
              type="email"
              name="adminEmail"
              id="adminEmail"
              value={settings.adminEmail}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center">
            <input
              id="notificationsEnabled"
              name="notificationsEnabled"
              type="checkbox"
              checked={settings.notificationsEnabled}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="notificationsEnabled" className="ml-2 block text-sm font-medium text-gray-900">
              Enable Email Notifications
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettingsPage; 