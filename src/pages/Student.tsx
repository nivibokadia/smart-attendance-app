
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Student, LectureData } from '@/types';
import MainLayout from '@/components/layouts/MainLayout';
import TimeTableView from '@/components/student/TimeTableView';
import AttendanceForm from '@/components/student/AttendanceForm';
import { MOCK_ATTENDANCE } from '@/utils/mockData';

const StudentPage = () => {
  const [selectedLectures, setSelectedLectures] = useState<LectureData[]>([]);

  const handleSelectLecture = (lecture: LectureData) => {
    setSelectedLectures(prev => {
      const isAlreadySelected = prev.some(l => l.id === lecture.id);
      if (isAlreadySelected) {
        return prev.filter(l => l.id !== lecture.id);
      }
      return [...prev, lecture];
    });
  };

  const handleSubmitAttendance = (data: Student & { subject: string; lectureTime: string }) => {
    // Submit attendance for all selected lectures
    selectedLectures.forEach(lecture => {
      console.log('Submitted attendance:', {
        ...data,
        subject: lecture.subject,
        lectureTime: lecture.time,
        date: new Date(),
      });
    });
    
    toast.success("Attendance submitted for all selected lectures!");
    setSelectedLectures([]);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-attendify-primary">
          Student Attendance Portal
        </h1>
        
        <AttendanceForm 
          selectedLectures={selectedLectures}
          onSubmit={handleSubmitAttendance}
        />

        <TimeTableView 
          selectedLectures={selectedLectures}
          onSelectLecture={handleSelectLecture} 
        />
      </div>
    </MainLayout>
  );
};

export default StudentPage;
