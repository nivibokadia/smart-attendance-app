import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import MainLayout from '@/components/layouts/MainLayout';
import { teacherApi } from '@/services/api';
import { Attendance } from '@/types';
import FilterControls from '@/components/teacher/FilterControls';
import AttendanceTable from '@/components/teacher/AttendanceTable';
import { exportToExcel } from '@/utils/excelExport';

const TeacherPage = () => {
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<any[]>([]);

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
      setAttendanceData(data);
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
        <h1 className="text-3xl font-bold mb-8 text-center text-attendify-primary">
          Teacher Dashboard
        </h1>

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
                  {stat.attendancePercentage.toFixed(1)}%
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {stat.presentCount} / {stat.totalAttendance} present
                </p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <FilterControls onFilter={handleFilter} />

          {/* Attendance Table */}
          <AttendanceTable
            attendanceData={attendanceData}
            onExport={handleExport}
            isLoading={isLoading}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default TeacherPage;
