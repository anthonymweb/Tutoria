import api from './api';

export const adminService = {
  // Dashboard stats
  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Analytics
  getAnalytics: async () => {
    try {
      const response = await api.get('/admin/analytics');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Recent activity
  getRecentActivity: async () => {
    try {
      const response = await api.get('/admin/activity');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Users
  getUsers: async () => {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const response = await api.get(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/admin/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Tutors
  getPendingTutors: async () => {
    try {
      const response = await api.get('/admin/pending-tutors');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTutors: async () => {
    try {
      const response = await api.get('/admin/tutors');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTutorById: async (id) => {
    try {
      const response = await api.get(`/admin/tutors/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  approveTutor: async (id) => {
    try {
      const response = await api.post(`/admin/approve-tutor/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  rejectTutor: async (id) => {
    try {
      const response = await api.post(`/admin/reject-tutor/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Sessions
  getSessions: async () => {
    try {
      const response = await api.get('/admin/sessions');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getSessionById: async (id) => {
    try {
      const response = await api.get(`/admin/sessions/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateSession: async (id, sessionData) => {
    try {
      const response = await api.put(`/admin/sessions/${id}`, sessionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Payments
  getPayments: async () => {
    try {
      const response = await api.get('/admin/payments');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getPaymentById: async (id) => {
    try {
      const response = await api.get(`/admin/payments/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updatePayment: async (id, paymentData) => {
    try {
      const response = await api.put(`/admin/payments/${id}`, paymentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Courses
  getCourses: async () => {
    try {
      const response = await api.get('/admin/courses');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCourseById: async (id) => {
    try {
      const response = await api.get(`/admin/courses/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createCourse: async (courseData) => {
    try {
      const response = await api.post('/admin/courses', courseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCourse: async (id, courseData) => {
    try {
      const response = await api.put(`/admin/courses/${id}`, courseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteCourse: async (id) => {
    try {
      const response = await api.delete(`/admin/courses/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Students
  getStudents: async () => {
    try {
      const response = await api.get('/admin/students');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getStudentById: async (id) => {
    try {
      const response = await api.get(`/admin/students/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Document Verification
  getPendingDocuments: async () => {
    try {
      const response = await api.get('/admin/documents/pending');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDocumentById: async (id) => {
    try {
      const response = await api.get(`/admin/documents/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  verifyDocument: async (id, verificationData) => {
    try {
      const response = await api.post(`/admin/documents/${id}/verify`, verificationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  rejectDocument: async (id, rejectionData) => {
    try {
      const response = await api.post(`/admin/documents/${id}/reject`, rejectionData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
