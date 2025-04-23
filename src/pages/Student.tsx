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

  // Mock lectures data
  const mockLectures: LectureData[] = [
    // Monday
    {
      _id: '1',
      subject: 'IPCV',
      professor: 'Dr. Sarah Parker',
      time: '9:00 AM - 10:00 AM',
      date: '2025-04-25',
      room: '301',
      division: 'I1',
      year: 'BE'
    },
    {
      _id: '2',
      subject: 'FSD',
      professor: 'Prof. James Wilson',
      time: '10:00 AM - 11:00 AM',
      date: '2025-04-25',
      room: '302',
      division: 'I2',
      year: 'BE'
    },
    {
      _id: '3',
      subject: 'BDA',
      professor: 'Dr. Michael Chen',
      time: '11:00 AM - 12:00 PM',
      date: '2025-04-25',
      room: '303',
      division: 'I3',
      year: 'BE'
    },
    // Tuesday
    {
      _id: '4',
      subject: 'ML',
      professor: 'Dr. Emily Brooks',
      time: '9:00 AM - 10:00 AM',
      date: '2025-04-26',
      room: '304',
      division: 'I1',
      year: 'BE'
    },
    {
      _id: '5',
      subject: 'SE',
      professor: 'Prof. Robert Taylor',
      time: '10:00 AM - 11:00 AM',
      date: '2025-04-26',
      room: '305',
      division: 'I1',
      year: 'BE'
    },
    {
      _id: '6',
      subject: 'Honours',
      professor: 'Dr. Lisa Anderson',
      time: '2:00 PM - 3:00 PM',
      date: '2025-04-26',
      room: '306',
      division: 'I1',
      year: 'BE'
    },
    // Wednesday
    {
      _id: '7',
      subject: 'BDA',
      professor: 'Dr. Michael Chen',
      time: '9:00 AM - 10:00 AM',
      date: '2025-04-27',
      room: '303',
      division: 'I1',
      year: 'BE'
    },
    {
      _id: '8',
      subject: 'IPCV',
      professor: 'Dr. Sarah Parker',
      time: '11:00 AM - 12:00 PM',
      date: '2025-04-27',
      room: '301',
      division: 'I2',
      year: 'BE'
    },
    {
      _id: '9',
      subject: 'Minors',
      professor: 'Prof. David Kumar',
      time: '2:00 PM - 3:00 PM',
      date: '2025-04-27',
      room: '307',
      division: 'I3',
      year: 'BE'
    },
    // Thursday
    {
      _id: '10',
      subject: 'ML',
      professor: 'Dr. Emily Brooks',
      time: '10:00 AM - 11:00 AM',
      date: '2025-04-28',
      room: '304',
      division: 'I1',
      year: 'BE'
    },
    {
      _id: '11',
      subject: 'FSD',
      professor: 'Prof. James Wilson',
      time: '11:00 AM - 12:00 PM',
      date: '2025-04-28',
      room: '302',
      division: 'I2',
      year: 'BE'
    },
    {
      _id: '12',
      subject: 'Honours',
      professor: 'Dr. Lisa Anderson',
      time: '3:00 PM - 4:00 PM',
      date: '2025-04-28',
      room: '306',
      division: 'I3',
      year: 'BE'
    },
    // Friday
    {
      _id: '13',
      subject: 'SE',
      professor: 'Prof. Robert Taylor',
      time: '9:00 AM - 10:00 AM',
      date: '2025-04-29',
      room: '305',
      division: 'I1',
      year: 'BE'
    },
    {
      _id: '14',
      subject: 'Minors',
      professor: 'Prof. David Kumar',
      time: '1:00 PM - 2:00 PM',
      date: '2025-04-29',
      room: '307',
      division: 'I2',
      year: 'BE'
    },
    {
      _id: '15',
      subject: 'FSD',
      professor: 'Prof. James Wilson',
      time: '3:00 PM - 4:00 PM',
      date: '2025-04-29',
      room: '302',
      division: 'I3',
      year: 'BE'
    },
    // Saturday
    {
      _id: '16',
      subject: 'IPCV',
      professor: 'Dr. Sarah Parker',
      time: '9:00 AM - 10:00 AM',
      date: '2025-04-30',
      room: '301',
      division: 'I1',
      year: 'BE'
    },
    {
      _id: '17',
      subject: 'ML',
      professor: 'Dr. Emily Brooks',
      time: '11:00 AM - 12:00 PM',
      date: '2025-04-30',
      room: '304',
      division: 'I2',
      year: 'BE'
    },
    // Sunday
    {
      _id: '18',
      subject: 'BDA',
      professor: 'Dr. Michael Chen',
      time: '2:00 PM - 3:00 PM',
      date: '2025-05-01',
      room: '303',
      division: 'I1',
      year: 'BE'
    }
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

          <TimeTableView 
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
