import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: '',
    accountNumber: '',
    accountName: '',
    provider: ''
  });

  const paymentProviders = [
    { value: 'mtn', label: 'MTN Mobile Money' },
    { value: 'airtel', label: 'Airtel Money' },
    { value: 'flexipay', label: 'FlexiPay' },
    { value: 'bank', label: 'Bank Transfer' }
  ];

  const handleChange = (e) => {
    setNewPaymentMethod({
      ...newPaymentMethod,
      [e.target.name]: e.target.value
    });
  };

  const addPaymentMethod = () => {
    if (!newPaymentMethod.type || !newPaymentMethod.accountNumber || !newPaymentMethod.accountName) {
      alert('Please fill all required fields');
      return;
    }

    setPaymentMethods([...paymentMethods, { ...newPaymentMethod, id: Date.now() }]);
    setNewPaymentMethod({
      type: '',
      accountNumber: '',
      accountName: '',
      provider: ''
    });
  };

  const removePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethods.length === 0) {
      alert('Please add at least one payment method');
      return;
    }

    // Store in localStorage
    const onboardingData = JSON.parse(localStorage.getItem('tutorOnboarding') || '{}');
    localStorage.setItem('tutorOnboarding', JSON.stringify({
      ...onboardingData,
      paymentMethods
    }));

    // Submit all onboarding data
    console.log('Submitting onboarding data:', onboardingData);
    alert('Registration successful! Your profile is being reviewed.');
    navigate('/tutor');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payment Setup</h1>
        <p className="mt-2 text-sm text-gray-600">
          Add your payment methods to receive earnings from tutoring sessions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Add Payment Method</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Provider
              </label>
              <select
                name="provider"
                value={newPaymentMethod.provider}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select provider</option>
                {paymentProviders.map(provider => (
                  <option key={provider.value} value={provider.value}>
                    {provider.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Account Number
              </label>
              <input
                type="text"
                name="accountNumber"
                value={newPaymentMethod.accountNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your account number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Account Name
              </label>
              <input
                type="text"
                name="accountName"
                value={newPaymentMethod.accountName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter your account name"
              />
            </div>

            <button
              type="button"
              onClick={addPaymentMethod}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Add Payment Method
            </button>
          </div>
        </div>

        {/* List of Added Payment Methods */}
        {paymentMethods.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Your Payment Methods</h3>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {paymentProviders.find(p => p.value === method.provider)?.label}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Account: {method.accountNumber}
                    </p>
                    <p className="text-sm text-gray-600">
                      Name: {method.accountName}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePaymentMethod(method.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/tutor/onboarding/session-preferences')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Complete Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default Payment; 