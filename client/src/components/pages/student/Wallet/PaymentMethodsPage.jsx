import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PaymentMethodsPage = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: '1', type: 'Credit Card', last4: '1234', expiry: '12/25', default: true },
    { id: '2', type: 'PayPal', email: 'john.doe@example.com', default: false },
  ]);
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [newMethod, setNewMethod] = useState({
    type: '', card_number: '', expiry_date: '', cvv: '', paypal_email: '',
  });

  const handleAddMethod = (e) => {
    e.preventDefault();
    // Add new payment method logic here
    setShowAddMethod(false);
    setNewMethod({});
  };

  const handleDeleteMethod = (id) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  const handleSetDefault = (id) => {
    setPaymentMethods(paymentMethods.map((method) =>
      method.id === id ? { ...method, default: true } : { ...method, default: false }
    ));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Methods</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {paymentMethods.length === 0 ? (
          <p>No payment methods added yet.</p>
        ) : (
          <ul className="space-y-4">
            {paymentMethods.map((method) => (
              <li key={method.id} className="flex items-center justify-between border-b pb-4 last:pb-0 last:border-b-0">
                <div>
                  <p className="font-semibold">{method.type}</p>
                  {method.type === 'Credit Card' ? (
                    <p className="text-sm text-gray-600">**** **** **** {method.last4} (Exp: {method.expiry})</p>
                  ) : (
                    <p className="text-sm text-gray-600">{method.email}</p>
                  )}
                  {method.default && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {!method.default && (
                    <button
                      onClick={() => handleSetDefault(method.id)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteMethod(method.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => setShowAddMethod(!showAddMethod)}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          {showAddMethod ? 'Cancel' : 'Add New Payment Method'}
        </button>

        {showAddMethod && (
          <form onSubmit={handleAddMethod} className="mt-4 space-y-4">
            <div>
              <label htmlFor="methodType" className="block text-sm font-medium text-gray-700">Method Type</label>
              <select
                id="methodType"
                name="methodType"
                value={newMethod.type}
                onChange={(e) => setNewMethod({ ...newMethod, type: e.target.value })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select type</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>
            {newMethod.type === 'Credit Card' && (
              <>
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    id="cardNumber"
                    value={newMethod.card_number}
                    onChange={(e) => setNewMethod({ ...newMethod, card_number: e.target.value })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="**** **** **** ****"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      id="expiryDate"
                      value={newMethod.expiry_date}
                      onChange={(e) => setNewMethod({ ...newMethod, expiry_date: e.target.value })}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      id="cvv"
                      value={newMethod.cvv}
                      onChange={(e) => setNewMethod({ ...newMethod, cvv: e.target.value })}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="123"
                    />
                  </div>
                </div>
              </>
            )}
            {newMethod.type === 'PayPal' && (
              <div>
                <label htmlFor="paypalEmail" className="block text-sm font-medium text-gray-700">PayPal Email</label>
                <input
                  type="email"
                  name="paypalEmail"
                  id="paypalEmail"
                  value={newMethod.paypal_email}
                  onChange={(e) => setNewMethod({ ...newMethod, paypal_email: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="email@example.com"
                />
              </div>
            )}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Method
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodsPage; 