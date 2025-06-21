import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaEnvelope, FaBook, FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });

  // Mock data - replace with actual data from your backend
  const faqs = [
    {
      id: 1,
      question: 'How do I book a session with a tutor?',
      answer: 'To book a session, go to the Find Tutors page, select a tutor, and click on the "Book Session" button. Choose your preferred date, time, and session duration, then complete the payment process.'
    },
    {
      id: 2,
      question: 'What payment methods are accepted?',
      answer: 'We accept various payment methods including credit/debit cards, PayPal, and mobile money. You can add your preferred payment method in your wallet settings.'
    },
    {
      id: 3,
      question: 'How do I cancel or reschedule a session?',
      answer: 'You can cancel or reschedule a session up to 24 hours before the scheduled time. Go to your dashboard, find the session in your upcoming sessions, and click on the respective action button.'
    },
    {
      id: 4,
      question: 'What happens if I miss a session?',
      answer: 'If you miss a session without prior cancellation, you will be charged for the full session. We recommend canceling or rescheduling at least 24 hours in advance to avoid charges.'
    },
    {
      id: 5,
      question: 'How do I track my learning progress?',
      answer: 'You can track your learning progress in the Learning Tracker section of your dashboard. It shows your completed topics, upcoming goals, and overall progress in each subject.'
    }
  ];

  const helpResources = [
    {
      id: 1,
      title: 'Getting Started Guide',
      description: 'Learn how to make the most of your learning experience',
      icon: FaBook,
      link: '#'
    },
    {
      id: 2,
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides for using the platform',
      icon: FaBook,
      link: '#'
    },
    {
      id: 3,
      title: 'User Manual',
      description: 'Detailed documentation of all platform features',
      icon: FaBook,
      link: '#'
    }
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Submitting contact form:', contactForm);
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Search Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
                How can we help you?
              </h1>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for help..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <FaSearch className="absolute left-4 top-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left focus:outline-none"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </h3>
                    {expandedFaq === faq.id ? (
                      <FaChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <FaChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Help Resources */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Help Resources
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {helpResources.map((resource) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <resource.icon className="h-8 w-8 text-indigo-600" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {resource.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a
                      href={resource.link}
                      className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                    >
                      Learn more →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Contact Support
          </h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, subject: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="What's your question about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, message: e.target.value })
                    }
                    rows={4}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Please provide details about your issue..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Priority
                  </label>
                  <select
                    value={contactForm.priority}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, priority: e.target.value })
                    }
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupportPage; 