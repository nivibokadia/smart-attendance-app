
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Student, LectureData } from '@/types';
import MainLayout from '@/components/layouts/MainLayout';
import TimeTableView from '@/components/student/TimeTableView';
import AttendanceForm from '@/components/student/AttendanceForm';
import { MOCK_ATTENDANCE } from '@/utils/mockData';

const StudentPage = () => {
  const [selectedLecture, setSelectedLecture] = useState<LectureData | undefined>();

  const handleSelectLecture = (lecture: LectureData) => {
    setSelectedLecture(lecture);
    toast.info(`Selected lecture: ${lecture.subject}`);
  };

  const handleSubmitAttendance = (data: Student & { subject: string; lectureTime: string }) => {
    // In a real app, this would make an API call to submit the attendance
    console.log('Submitted attendance:', {
      ...data,
      date: new Date(),
    });
    
    // For demo purposes, we'll just show a success message
    toast.success("Attendance submitted successfully!");
    setSelectedLecture(undefined);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-attendify-primary">
          Student Attendance Portal
        </h1>
        
        <TimeTableView onSelectLecture={handleSelectLecture} />
        <AttendanceForm 
          selectedLecture={selectedLecture}
          onSubmit={handleSubmitAttendance}
        />
      </div>
    </MainLayout>
  );
};

export default StudentPage;
