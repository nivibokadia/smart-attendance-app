import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { teacherApi } from '@/services/api';
import { toast } from 'sonner';

interface SubjectAttendance {
  subject: string;
  students: {
    rollNo: string;
    name: string;
    sapId: string;
    attendanceCount: number;
  }[];
}

const SubjectAttendanceGrid = () => {
  const [subjects, setSubjects] = useState<SubjectAttendance[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSubjectAttendance();
  }, []);

  const fetchSubjectAttendance = async () => {
    try {
      setIsLoading(true);
      const data = await teacherApi.getSubjectAttendance();
      setSubjects(data);
    } catch (error) {
      toast.error('Failed to fetch subject attendance data');
      console.error('Error fetching subject attendance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getNumericPart = (rollNo: string) => {
    const match = rollNo.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const sortedStudents = selectedSubject
    ? subjects
        .find((sub) => sub.subject === selectedSubject)
        ?.students.sort((a, b) => {
          const rollNoA = getNumericPart(a.rollNo);
          const rollNoB = getNumericPart(b.rollNo);
          if (rollNoA === rollNoB) {
            return a.rollNo.localeCompare(b.rollNo);
          }
          return rollNoA - rollNoB;
        }) || []
    : [];

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Subject-wise Attendance</h2>
      
      {/* Subjects Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {subjects.map((subject) => (
          <div
            key={subject.subject}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[120px] ${
              selectedSubject === subject.subject
                ? 'bg-green-500 text-white border-green-500 shadow-md'
                : 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200'
            }`}
            onClick={() => setSelectedSubject(subject.subject)}
          >
            <div className="text-center">
              <div className="font-medium text-lg">{subject.subject}</div>
              <div className="text-sm mt-1">
                {subject.students.length} Students
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Students Grid for Selected Subject */}
      {selectedSubject && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">
            Students for {selectedSubject}
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {sortedStudents.map((student) => (
              <div
                key={student.rollNo}
                className="p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-center">
                  <div className="font-medium">{student.rollNo}</div>
                  <div className="text-sm text-gray-600">{student.name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    SAP ID: {student.sapId}
                  </div>
                  <div className="text-sm mt-2">
                    <span className="font-medium">Attendance:</span>{' '}
                    <span className="text-attendify-primary">
                      {student.attendanceCount} times
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default SubjectAttendanceGrid; 