import React from 'react';
import { motion } from 'framer-motion';

const DashboardStat = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color} text-white`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardStat; 