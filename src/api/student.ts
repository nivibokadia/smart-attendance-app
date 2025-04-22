import api from '@/config/api';

export const markAttendance = async (data: {
  studentId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent';
}) => {
  try {
    const response = await api.post('/student/attendance', data);
    return response.data;
  } catch (error: any) {
    console.error('Mark Attendance Error:', error);
    throw error;
  }
};

export const getAttendance = async (studentId: string) => {
  try {
    const response = await api.get(`/student/attendance/${studentId}`);
    return response.data;
  } catch (error: any) {
    console.error('Get Attendance Error:', error);
    throw error;
  }
}; 