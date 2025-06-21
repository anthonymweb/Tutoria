import React, { useState } from 'react';
import { FaTicketAlt, FaExclamationTriangle, FaMoneyBillWave, FaUserShield, FaQuestionCircle, FaPaperPlane } from 'react-icons/fa';

const StudentSupportPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');

  // Mock data - replace with actual data from your backend
  const supportCategories = [
    {
      id: 'general',
      name: 'General Support',
      icon: FaQuestionCircle,
      description: 'General questions and assistance'
    },
    {
      id: 'technical',
      name: 'Technical Issues',
      icon: FaExclamationTriangle,
      description: 'Platform or session-related problems'
    },
    {
      id: 'payment',
      name: 'Payment Issues',
      icon: FaMoneyBillWave,
      description: 'Payment or refund problems'
    },
    {
      id: 'safety',
      name: 'Safety Concerns',
      icon: FaUserShield,
      description: 'Tutor misconduct or safety issues'
    }
  ];

  const recentTickets = [
    {
      id: 1,
      category: 'payment',
      title: 'Refund Request',
      status: 'open',
      createdAt: '2024-03-15',
      lastUpdated: '2024-03-16',
      priority: 'high'
    },
    {
      id: 2,
      category: 'technical',
      title: 'Video Call Quality Issues',
      status: 'resolved',
      createdAt: '2024-03-10',
      lastUpdated: '2024-03-12',
      priority: 'medium'
    }
  ];

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    // Implement ticket submission logic
    console.log('Submitting ticket:', {
      category: selectedCategory,
      title: ticketTitle,
      description: ticketDescription
    });
    setTicketTitle('');
    setTicketDescription('');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Support Center
            </h2>
          </div>
        </div>

        {/* Support Categories */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">How can we help you?</h3>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {supportCategories.map((category) => (
              <div
                key={category.id}
                className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer ${
                  selectedCategory === category.id ? 'ring-2 ring-indigo-500' : ''
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <category.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-900 truncate">
                          {category.name}
                        </dt>
                        <dd>
                          <div className="text-sm text-gray-500">
                            {category.description}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Ticket Form */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Create New Support Ticket</h3>
              <form onSubmit={handleSubmitTicket} className="mt-6 space-y-6">
                <div>
                  <label htmlFor="ticket-title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    id="ticket-title"
                    value={ticketTitle}
                    onChange={(e) => setTicketTitle(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <label htmlFor="ticket-description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="ticket-description"
                    rows={4}
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Please provide detailed information about your issue"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FaPaperPlane className="mr-2 h-4 w-4" />
                    Submit Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">Recent Tickets</h3>
          <div className="mt-4 flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ticket
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Updated
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentTickets.map((ticket) => (
                        <tr key={ticket.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {ticket.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              Created on {ticket.createdAt}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {supportCategories.find(c => c.id === ticket.category)?.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                              {ticket.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {ticket.lastUpdated}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSupportPage; 