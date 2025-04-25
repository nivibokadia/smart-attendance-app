import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import MainLayout from '@/components/layouts/MainLayout';
import { teacherApi } from '@/services/api';
import { Attendance } from '@/types';
import FilterControls from '@/components/teacher/FilterControls';
import AttendanceTable from '@/components/teacher/AttendanceTable';
import SubjectAttendanceGrid from '@/components/teacher/SubjectAttendanceGrid';
import { exportToExcel } from '@/utils/excelExport';

const TeacherPage = () => {
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'table' | 'grid'>('table');

  const fetchAttendance = async (filters?: {
    date?: Date;
    subject?: string;
    division?: string;
    year?: string;
  }) => {
    try {
      setIsLoading(true);
      const params: any = {};
      
      if (filters?.date) {
        params.date = filters.date.toISOString().split('T')[0];
      }
      if (filters?.subject) params.subject = filters.subject;
      if (filters?.division) params.division = filters.division;
      if (filters?.year) params.year = filters.year;

      const data = await teacherApi.getAttendance(params);
      // Flatten the grouped data to get individual records
      const flattenedData = data.flatMap((group: any) => 
        group.students.map((student: any) => ({
          ...student,
          subject: group.subject,
          lectureTime: group.lectureTime
        }))
      );
      
      // Sort the data by roll number in ascending order
      const sortedData = flattenedData.sort((a, b) => {
        // Extract numeric part from roll numbers (handles cases like "I1-001")
        const getNumericPart = (rollNo: string) => {
          const match = rollNo.match(/\d+/);
          return match ? parseInt(match[0]) : 0;
        };
        
        const rollNoA = getNumericPart(a.rollNo);
        const rollNoB = getNumericPart(b.rollNo);
        
        // If numeric parts are equal, sort by the full roll number string
        if (rollNoA === rollNoB) {
          return a.rollNo.localeCompare(b.rollNo);
        }
        
        return rollNoA - rollNoB;
      });
      
      setAttendanceData(sortedData);
    } catch (error) {
      toast.error('Failed to fetch attendance data');
      console.error('Error fetching attendance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await teacherApi.getAttendanceStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchAttendance();
    fetchStats();
  }, []);

  const handleFilter = (filters: {
    date?: Date;
    subject?: string;
    division?: string;
    year?: string;
  }) => {
    fetchAttendance(filters);
  };

  const handleExport = (data: Attendance[]) => {
    if (data.length === 0) {
      toast.error('No data to export');
      return;
    }
    exportToExcel(data, 'attendance-report');
    toast.success('Attendance data exported successfully');
  };

  return (
    <MainLayout>
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-attendify-primary">
            Teacher Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            DJSCE IT
          </p>
        </div>

        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {stat.subject} - {stat.division}
                </h3>
                <div className="text-3xl font-bold text-attendify-primary">
                  {stat.totalAttendance}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Total Entries
                </p>
              </div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('table')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'table'
                  ? 'bg-attendify-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Attendance Table
            </button>
            <button
              onClick={() => setActiveTab('grid')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'grid'
                  ? 'bg-attendify-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Subject-wise View
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'table' ? (
            <>
              <FilterControls onFilter={handleFilter} />
              <AttendanceTable
                attendanceData={attendanceData}
                onExport={handleExport}
                isLoading={isLoading}
              />
            </>
          ) : (
            <SubjectAttendanceGrid />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default TeacherPage;
