import axios from 'axios';
import { Student, Attendance } from '@/types';

const baseURL = import.meta.env.PROD
  ? 'https://smart-attendance-app-backend.onrender.com/api'
  : 'http://localhost:3000/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
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

export const authApi = {
  login: async (email: string, password: string, role: string) => {
    try {
      const response = await api.post('/auth/login', { email, password, role });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.role);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    studentId?: string;
    rollNo?: string;
    department?: string;
    phoneNumber?: string;
  }) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.role);
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
};

export const studentApi = {
  markAttendance: async (data: Student & { subject: string; lectureTime: string }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Log the request data for debugging
      console.log('Sending attendance data:', {
        ...data,
        division: data.division,
        year: data.year,
        token: token.substring(0, 10) + '...' // Log partial token for security
      });

      const response = await api.post('/student/attendance', {
        ...data,
        division: data.division,
        year: data.year
      });
      return response.data;
    } catch (error: any) {
      // Enhanced error logging
      console.error('Error marking attendance:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
        requestData: {
          ...data,
          division: data.division,
          year: data.year
        }
      });
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

  getSubjectAttendance: async () => {
    try {
      const response = await api.get('/teacher/subject-attendance');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api; 