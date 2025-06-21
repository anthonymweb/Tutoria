import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaTrophy, FaBook, FaClock, FaCheckCircle, FaStar, FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddGoalModal from './AddGoalModal';
import './LearningTrackerPage.css';

const LearningTrackerPage = () => {
  const [selectedTab, setSelectedTab] = useState('progress');
  const [loading, setLoading] = useState(true);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [learningData, setLearningData] = useState({
    overallProgress: 0,
    subjects: [],
    goals: [],
    achievements: []
  });

  useEffect(() => {
    fetchLearningData();
  }, []);

  const fetchLearningData = async () => {
    try {
      setLoading(true);
      const [progressRes, goalsRes, achievementsRes] = await Promise.all([
        axios.get('/api/student/learning-progress'),
        axios.get('/api/student/learning-goals'),
        axios.get('/api/student/achievements')
      ]);

      setLearningData({
        overallProgress: progressRes.data.data.overallProgress,
        subjects: progressRes.data.data.subjects,
        goals: goalsRes.data.data,
        achievements: achievementsRes.data.data
      });
    } catch (error) {
      toast.error('Failed to load learning data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (goalData) => {
    try {
      await axios.post('/api/student/learning-goals', goalData);
      toast.success('Goal added successfully');
      setShowAddGoalModal(false);
      fetchLearningData();
    } catch (error) {
      toast.error('Failed to add goal');
    }
  };

  const handleUpdateGoal = async (goalId, updates) => {
    try {
      await axios.put(`/api/student/learning-goals/${goalId}`, updates);
      toast.success('Goal updated successfully');
      fetchLearningData();
    } catch (error) {
      toast.error('Failed to update goal');
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await axios.delete(`/api/student/learning-goals/${goalId}`);
      toast.success('Goal deleted successfully');
      fetchLearningData();
    } catch (error) {
      toast.error('Failed to delete goal');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Overall Progress Card */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Overall Learning Progress</h2>
                <div className="mt-2 flex items-center">
                  <div className="relative w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${learningData.overallProgress}%` }}
                      className="absolute top-0 left-0 h-full bg-indigo-600"
                    />
                  </div>
                  <span className="ml-4 text-lg font-medium text-indigo-600">
                    {learningData.overallProgress}%
                  </span>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Total Hours</p>
                  <p className="text-lg font-medium text-gray-900">
                    {learningData.subjects.reduce((sum, subject) => sum + subject.totalHours, 0)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Topics Completed</p>
                  <p className="text-lg font-medium text-gray-900">
                    {learningData.subjects.reduce((sum, subject) => sum + subject.completedTopics, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setSelectedTab('progress')}
                className={`${
                  selectedTab === 'progress'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <FaChartLine className="inline-block h-5 w-5 mr-2" />
                Progress
              </button>
              <button
                onClick={() => setSelectedTab('goals')}
                className={`${
                  selectedTab === 'goals'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <FaBook className="inline-block h-5 w-5 mr-2" />
                Goals
              </button>
              <button
                onClick={() => setSelectedTab('achievements')}
                className={`${
                  selectedTab === 'achievements'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <FaTrophy className="inline-block h-5 w-5 mr-2" />
                Achievements
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8">
          {selectedTab === 'progress' && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {learningData.subjects.map((subject) => (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white shadow rounded-lg overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900">{subject.name}</h3>
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Progress</span>
                        <span className="text-sm font-medium text-indigo-600">
                          {subject.progress}%
                        </span>
                      </div>
                      <div className="mt-2 relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${subject.progress}%` }}
                          className="absolute top-0 left-0 h-full bg-indigo-600"
                        />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Hours</span>
                        <span className="text-gray-900">{subject.totalHours}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Topics Completed</span>
                        <span className="text-gray-900">{subject.completedTopics}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Next Topic</span>
                        <span className="text-gray-900">{subject.nextTopic}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {selectedTab === 'goals' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowAddGoalModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaPlus className="mr-2" />
                  Add Goal
                </button>
              </div>
              {learningData.goals.map((goal) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white shadow rounded-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{goal.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Deadline: {new Date(goal.deadline).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            goal.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {goal.status === 'completed' ? 'Completed' : 'In Progress'}
                        </span>
                        <button
                          onClick={() => handleDeleteGoal(goal.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Progress</span>
                        <span className="text-sm font-medium text-indigo-600">
                          {goal.progress}%
                        </span>
                      </div>
                      <div className="mt-2 relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          className="absolute top-0 left-0 h-full bg-indigo-600"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {selectedTab === 'achievements' && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {learningData.achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white shadow rounded-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <achievement.icon className="h-8 w-8 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{achievement.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{achievement.description}</p>
                        <p className="mt-1 text-sm text-gray-400">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {showAddGoalModal && (
        <AddGoalModal
          onClose={() => setShowAddGoalModal(false)}
          onSubmit={handleAddGoal}
        />
      )}
    </div>
  );
};

export default LearningTrackerPage; 