import React from 'react';

const TransactionHistoryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Transaction History</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <p className="text-gray-600">No transactions found.</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage; 