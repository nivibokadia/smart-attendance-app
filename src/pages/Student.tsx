import React, { useState } from 'react';
import { toast } from 'sonner';
import { Student, LectureData } from '@/types';
import MainLayout from '@/components/layouts/MainLayout';
import TimeTableView from '@/components/student/TimeTableView';
import AttendanceForm from '@/components/student/AttendanceForm';
import { studentApi } from '@/services/api';

const StudentPage = () => {
  const [selectedLectures, setSelectedLectures] = useState<LectureData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectLecture = (lecture: LectureData) => {
    setSelectedLectures(prev => {
      const isAlreadySelected = prev.some(l => l.id === lecture.id);
      if (isAlreadySelected) {
        return prev.filter(l => l.id !== lecture.id);
      }
      return [...prev, lecture];
    });
  };

  const handleSubmitAttendance = async (data: Student & { subject: string; lectureTime: string }) => {
    try {
      setIsSubmitting(true);
      // Submit attendance for all selected lectures
      await Promise.all(selectedLectures.map(lecture => 
        studentApi.markAttendance({
          ...data,
          subject: lecture.subject,
          lectureTime: lecture.time,
        })
      ));
      
      toast.success("Attendance submitted successfully!");
      setSelectedLectures([]);
    } catch (error) {
      toast.error("Failed to submit attendance. Please try again.");
      console.error('Error submitting attendance:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock lectures data
  const mockLectures: LectureData[] = [
    // Monday
    {
      id: '1',
      subject: 'IPCV',
      professor: 'Dr. Sarah Parker',
      time: '9:00 AM - 10:00 AM',
      day: 'Monday',
      room: '301',
      division: 'I2',
      year: 'BE'
    },
    {
      id: '2',
      subject: 'FSD',
      professor: 'Prof. James Wilson',
      time: '10:00 AM - 11:00 AM',
      day: 'Monday',
      room: '302',
      division: 'I2',
      year: 'BE'
    },
    {
      id: '3',
      subject: 'BDA',
      professor: 'Dr. Michael Chen',
      time: '11:00 AM - 12:00 PM',
      day: 'Monday',
      room: '303',
      division: 'I2',
      year: 'BE'
    },
    // Tuesday
    {
      id: '4',
      subject: 'ML',
      professor: 'Dr. Emily Brooks',
      time: '9:00 AM - 10:00 AM',
      day: 'Tuesday',
      room: '304',
      division: 'I2',
      year: 'BE'
    },
    {
      id: '5',
      subject: 'SE',
      professor: 'Prof. Robert Taylor',
      time: '10:00 AM - 11:00 AM',
      day: 'Tuesday',
      room: '305',
      division: 'I2',
      year: 'BE'
    },
    {
      id: '6',
      subject: 'Honours',
      professor: 'Dr. Lisa Anderson',
      time: '2:00 PM - 3:00 PM',
      day: 'Tuesday',
      room: '306',
      division: 'I2',
      year: 'BE'
    },
    // Wednesday
    {
      id: '7',
      subject: 'BDA',
      professor: 'Dr. Michael Chen',
      time: '9:00 AM - 10:00 AM',
      day: 'Wednesday',
      room: '303',
      division: 'I2',
      year: 'BE'
    },
    {
      id: '8',
      subject: 'IPCV',
      professor: 'Dr. Sarah Parker',
      time: '11:00 AM - 12:00 PM',
      day: 'Wednesday',
      room: '301',
      division: 'I2',
      year: 'BE'
    },
    {
      id: '9',
      subject: 'Minors',
      professor: 'Prof. David Kumar',
      time: '2:00 PM - 3:00 PM',
      day: 'Wednesday',
      room: '307',
      division: 'I2',
      year: 'BE'
    },
    // Thursday
    {
      id: '10',
      subject: 'ML',
      professor: 'Dr. Emily Brooks',
      time: '10:00 AM - 11:00 AM',
      day: 'Thursday',
      room: '304',
      division: 'I2',
      year: 'BE'
    },
    {
      id: '11',
      subject: 'FSD',
      professor: 'Prof. James Wilson',
      time: '11:00 AM - 12:00 PM',
      day: 'Thursday',
      room: '302',
      division: 'I2',
      year: 'BE'
    },
    {
      id: '12',
      subject: 'Honours',
      professor: 'Dr. Lisa Anderson',
      time: '3:00 PM - 4:00 PM',
      day: 'Thursday',
      room: '306',
      division: 'I2',
      year: 'BE'
    },
    // Friday
    {
      id: '13',
      subject: 'SE',
      professor: 'Prof. Robert Taylor',
      time: '9:00 AM - 10:00 AM',
      day: 'Friday',
      room: '305',
      division: 'I2',
      year: 'BE'
    },
    {
      id: '14',
      subject: 'Minors',
      professor: 'Prof. David Kumar',
      time: '1:00 PM - 2:00 PM',
      day: 'Friday',
      room: '307',
      division: 'I2',
      year: 'BE'
    },
    {
      id: '15',
      subject: 'FSD',
      professor: 'Prof. James Wilson',
      time: '3:00 PM - 4:00 PM',
      day: 'Friday',
      room: '302',
      division: 'I2',
      year: 'BE'
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-[1400px] mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-attendify-primary">
          Student Attendance Portal
        </h1>
        
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
