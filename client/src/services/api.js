import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

console.log('API URL:', API_URL); // Debug log

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url, 'with data:', config.data); // Debug log
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error); // Debug log
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.data); // Debug log
    return response;
  },
  async (error) => {
    console.error('Response error:', error.response || error); // Debug log
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (userData) => {
    try {
      console.log('Registering user with data:', userData); // Debug log
      const response = await api.post('/auth/register', userData);
      console.log('Registration response:', response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error('Registration error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      // Extract validation errors if they exist
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map(err => 
          `${err.field}: ${err.message}`
        ).join(', ');
        throw new Error(errorMessages);
      }
      // If there's a specific field error
      if (error.response?.data?.field) {
        throw new Error(`${error.response.data.field}: ${error.response.data.message}`);
      }
      // If there's a general error message
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      console.log('API Service: Logging in with credentials:', credentials);
      const response = await api.post('/auth/login', credentials);
      console.log('API Service: Login response:', response.data);
      
      if (!response.data || !response.data.token || !response.data.user) {
        throw new Error('Invalid response from server');
      }
      
      return response.data;
    } catch (error) {
      console.error('API Service: Login error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      // Extract validation errors if they exist
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map(err => err.msg).join(', ');
        throw new Error(errorMessages);
      }
      throw error;
    }
  },

  devLogin: async (credentials) => {
    try {
      const response = await api.post('/auth/dev-login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  verifyEmail: async (token) => {
    try {
      const response = await api.post('/auth/verify-email', { token });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  verifyPhone: async (code) => {
    try {
      const response = await api.post('/auth/verify-phone', { code });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

export default api; 