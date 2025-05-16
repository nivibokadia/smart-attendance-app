import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Student, LectureData } from '@/types';
import MainLayout from '@/components/layouts/MainLayout';
import TimeTableView from '@/components/student/TimeTableView';
import AttendanceForm from '@/components/student/AttendanceForm';
import { studentApi } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import FilterControls from '@/components/teacher/FilterControls';
import AttendanceTable from '@/components/teacher/AttendanceTable';
import { exportToExcel } from '@/utils/excelExport';
import StudentCalendarView from '@/components/student/StudentCalendarView';

const StudentPage = () => {
  const navigate = useNavigate();
  const [selectedLectures, setSelectedLectures] = useState<LectureData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    if (!token || userRole !== 'student') {
      navigate('/');
    }
  }, [navigate]);

  const handleSelectLecture = (lecture: LectureData) => {
    setSelectedLectures(prev => {
      const isAlreadySelected = prev.some(l => l._id === lecture._id);
      if (isAlreadySelected) {
        return prev.filter(l => l._id !== lecture._id);
      }
      return [...prev, lecture];
    });
  };

  const handleSubmitAttendance = async (data: Student & { subject: string; lectureTime: string }) => {
    if (selectedLectures.length === 0) {
      toast.error('Please select at least one lecture');
      return;
    }

    // Validate required fields
    if (!data.name || !data.sapId || !data.rollNo) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Get user data from localStorage
      const userName = localStorage.getItem('userName');
      const userSapId = localStorage.getItem('userSapId');
      const userRollNo = localStorage.getItem('userRollNo');
      
      // Log the data being sent
      console.log('Submitting attendance with data:', {
        ...data,
        userName,
        userSapId,
        userRollNo,
        selectedLectures
      });

      await Promise.all(selectedLectures.map(lecture => 
        studentApi.markAttendance({
        ...data,
        subject: lecture.subject,
        lectureTime: lecture.time,
          division: lecture.division,
          year: lecture.year,
          // Use stored user data if available
          name: userName || data.name,
          sapId: userSapId || data.sapId,
          rollNo: userRollNo || data.rollNo
        })
      ));
    
      toast.success("Attendance submitted successfully!");
      setSelectedLectures([]);
    } catch (error: any) {
      // Enhanced error logging
      console.error('Error submitting attendance:', {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
        requestData: {
          ...data,
          selectedLectures
        }
      });
      
      // Improved error handling
      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData.message) {
          if (errorData.message.includes('can only mark attendance for yourself')) {
            toast.error('You can only mark attendance using your registered name. Please use your correct name.');
          } else if (errorData.missingFields) {
            toast.error(`Missing required fields: ${errorData.missingFields.join(', ')}`);
          } else {
            toast.error(errorData.message);
          }
        } else if (errorData.error) {
          toast.error(errorData.error);
        }
      } else if (error.message) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("Failed to submit attendance. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock lectures data (updated, now includes Saturday)
  const mockLectures: LectureData[] = [
    // Monday
    { _id: '1', subject: 'ipcv', professor: 'Prof. A', time: '9:00 AM', day: 'Monday', room: '101', division: 'I1', year: 'BE', date: '' },
    { _id: '2', subject: 'bda', professor: 'Prof. B', time: '10:00 AM', day: 'Monday', room: '102', division: 'I1', year: 'BE', date: '' },
    { _id: '3', subject: 'ml', professor: 'Prof. C', time: '11:00 AM', day: 'Monday', room: '103', division: 'I1', year: 'BE', date: '' },
    { _id: '4', subject: 'fsd', professor: 'Prof. D', time: '12:00 PM', day: 'Monday', room: '104', division: 'I1', year: 'BE', date: '' },
    { _id: '5', subject: 'se', professor: 'Prof. E', time: '1:00 PM', day: 'Monday', room: '105', division: 'I1', year: 'BE', date: '' },
    { _id: '6', subject: 'is', professor: 'Prof. F', time: '2:00 PM', day: 'Monday', room: '106', division: 'I1', year: 'BE', date: '' },
    // Tuesday
    { _id: '7', subject: 'bda', professor: 'Prof. B', time: '9:00 AM', day: 'Tuesday', room: '102', division: 'I1', year: 'BE', date: '' },
    { _id: '8', subject: 'ml', professor: 'Prof. C', time: '10:00 AM', day: 'Tuesday', room: '103', division: 'I1', year: 'BE', date: '' },
    { _id: '9', subject: 'fsd', professor: 'Prof. D', time: '11:00 AM', day: 'Tuesday', room: '104', division: 'I1', year: 'BE', date: '' },
    { _id: '10', subject: 'se', professor: 'Prof. E', time: '12:00 PM', day: 'Tuesday', room: '105', division: 'I1', year: 'BE', date: '' },
    { _id: '11', subject: 'is', professor: 'Prof. F', time: '1:00 PM', day: 'Tuesday', room: '106', division: 'I1', year: 'BE', date: '' },
    { _id: '12', subject: 'ipcv', professor: 'Prof. A', time: '2:00 PM', day: 'Tuesday', room: '101', division: 'I1', year: 'BE', date: '' },
    // Wednesday
    { _id: '13', subject: 'ml', professor: 'Prof. C', time: '9:00 AM', day: 'Wednesday', room: '103', division: 'I1', year: 'BE', date: '' },
    { _id: '14', subject: 'fsd', professor: 'Prof. D', time: '10:00 AM', day: 'Wednesday', room: '104', division: 'I1', year: 'BE', date: '' },
    { _id: '15', subject: 'se', professor: 'Prof. E', time: '11:00 AM', day: 'Wednesday', room: '105', division: 'I1', year: 'BE', date: '' },
    { _id: '16', subject: 'is', professor: 'Prof. F', time: '12:00 PM', day: 'Wednesday', room: '106', division: 'I1', year: 'BE', date: '' },
    { _id: '17', subject: 'ipcv', professor: 'Prof. A', time: '1:00 PM', day: 'Wednesday', room: '101', division: 'I1', year: 'BE', date: '' },
    { _id: '18', subject: 'bda', professor: 'Prof. B', time: '2:00 PM', day: 'Wednesday', room: '102', division: 'I1', year: 'BE', date: '' },
    // Thursday
    { _id: '19', subject: 'fsd', professor: 'Prof. D', time: '9:00 AM', day: 'Thursday', room: '104', division: 'I1', year: 'BE', date: '' },
    { _id: '20', subject: 'se', professor: 'Prof. E', time: '10:00 AM', day: 'Thursday', room: '105', division: 'I1', year: 'BE', date: '' },
    { _id: '21', subject: 'is', professor: 'Prof. F', time: '11:00 AM', day: 'Thursday', room: '106', division: 'I1', year: 'BE', date: '' },
    { _id: '22', subject: 'ipcv', professor: 'Prof. A', time: '12:00 PM', day: 'Thursday', room: '101', division: 'I1', year: 'BE', date: '' },
    { _id: '23', subject: 'bda', professor: 'Prof. B', time: '1:00 PM', day: 'Thursday', room: '102', division: 'I1', year: 'BE', date: '' },
    { _id: '24', subject: 'ml', professor: 'Prof. C', time: '2:00 PM', day: 'Thursday', room: '103', division: 'I1', year: 'BE', date: '' },
    // Friday
    { _id: '25', subject: 'se', professor: 'Prof. E', time: '9:00 AM', day: 'Friday', room: '105', division: 'I1', year: 'BE', date: '' },
    { _id: '26', subject: 'is', professor: 'Prof. F', time: '10:00 AM', day: 'Friday', room: '106', division: 'I1', year: 'BE', date: '' },
    { _id: '27', subject: 'ipcv', professor: 'Prof. A', time: '11:00 AM', day: 'Friday', room: '101', division: 'I1', year: 'BE', date: '' },
    { _id: '28', subject: 'bda', professor: 'Prof. B', time: '12:00 PM', day: 'Friday', room: '102', division: 'I1', year: 'BE', date: '' },
    { _id: '29', subject: 'ml', professor: 'Prof. C', time: '1:00 PM', day: 'Friday', room: '103', division: 'I1', year: 'BE', date: '' },
    { _id: '30', subject: 'fsd', professor: 'Prof. D', time: '2:00 PM', day: 'Friday', room: '104', division: 'I1', year: 'BE', date: '' },
    // Saturday
    { _id: '31', subject: 'is', professor: 'Prof. F', time: '9:00 AM', day: 'Saturday', room: '106', division: 'I1', year: 'BE', date: '' },
    { _id: '32', subject: 'ipcv', professor: 'Prof. A', time: '10:00 AM', day: 'Saturday', room: '101', division: 'I1', year: 'BE', date: '' },
    { _id: '33', subject: 'bda', professor: 'Prof. B', time: '11:00 AM', day: 'Saturday', room: '102', division: 'I1', year: 'BE', date: '' },
    { _id: '34', subject: 'ml', professor: 'Prof. C', time: '12:00 PM', day: 'Saturday', room: '103', division: 'I1', year: 'BE', date: '' },
    { _id: '35', subject: 'fsd', professor: 'Prof. D', time: '1:00 PM', day: 'Saturday', room: '104', division: 'I1', year: 'BE', date: '' },
    { _id: '36', subject: 'se', professor: 'Prof. E', time: '2:00 PM', day: 'Saturday', room: '105', division: 'I1', year: 'BE', date: '' },
  ];

  return (
    <MainLayout>
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-attendify-primary">
          Student Attendance Portal
        </h1>
          <p className="text-sm text-gray-500 mt-1">
            DJSCE IT
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-4">
        <AttendanceForm 
          selectedLectures={selectedLectures}
          onSubmit={handleSubmitAttendance}
              isSubmitting={isSubmitting}
        />
          </div>

        <StudentCalendarView 
            lectures={mockLectures}
            selectedLectures={selectedLectures}
            onLectureSelect={handleSelectLecture} 
        />
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentPage;
