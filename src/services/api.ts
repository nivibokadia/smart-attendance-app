import axios from 'axios';
import { Student, Attendance } from '@/types';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://smart-attendance-app-backend.onrender.com/api'
    : 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      window.location.href = '/';
    }
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
);

export const studentApi = {
  markAttendance: async (data: Student & { subject: string; lectureTime: string }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await api.post('/student/attendance', {
        ...data,
        division: 'I2', // Default division
        year: 'BE' // Default year
      });
      return response.data;
    } catch (error) {
      console.error('Error marking attendance:', error);
      throw error;
    }
  },

  getAttendance: async (studentId: string) => {
    try {
      const response = await api.get(`/student/attendance/${studentId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting attendance:', error);
      throw error;
    }
  }
};

export const teacherApi = {
  getAttendance: async (filters?: {
    date?: Date;
    subject?: string;
    division?: string;
    year?: string;
    lectureTime?: string;
  }) => {
    try {
      const response = await api.get('/teacher/attendance', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Get Teacher Attendance Error:', error);
      throw error;
    }
  },

  getAttendanceStats: async () => {
    try {
      const response = await api.get('/teacher/attendance/stats');
      return response.data;
    } catch (error) {
      console.error('Get Attendance Stats Error:', error);
      throw error;
    }
  },
};

export default api; 