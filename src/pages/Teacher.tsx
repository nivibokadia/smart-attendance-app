import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import MainLayout from '@/components/layouts/MainLayout';
import { teacherApi } from '@/services/api';
import { Attendance } from '@/types';
import FilterControls from '@/components/teacher/FilterControls';
import AttendanceTable from '@/components/teacher/AttendanceTable';
import { exportToExcel } from '@/utils/excelExport';
import { Card } from '@/components/ui/card';

interface ReasonStat {
  reason: string;
  count: number;
  uniqueStudents: number;
}

const TeacherPage = () => {
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [reasonStats, setReasonStats] = useState<ReasonStat[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (filters?: {
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

      const [attendanceData, statsData] = await Promise.all([
        teacherApi.getAttendance(params),
        teacherApi.getReasonStats(params)
      ]);

      const flattenedData = attendanceData.flatMap((group: any) => 
        group.students.map((student: any) => ({
          ...student,
          subject: group.subject,
          lectureTime: group.lectureTime
        }))
      );
      
      setAttendanceData(flattenedData);
      setReasonStats(statsData);
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = (data: Attendance[]) => {
    if (data.length === 0) {
      toast.error('No data to export');
      return;
    }
    exportToExcel(data, 'attendance-report');
    toast.success('Attendance data exported successfully');
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-attendify-primary">
            Teacher Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            DJSCE IT
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <FilterControls onFilterChange={fetchData} />
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Attendance by Reason</h2>
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {reasonStats.map((stat) => (
                  <div key={stat.reason} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {stat.reason || 'No Reason'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {stat.uniqueStudents} unique student{stat.uniqueStudents !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-attendify-primary">
                        {stat.count}
                      </p>
                      <p className="text-sm text-gray-500">total entries</p>
                    </div>
                  </div>
                ))}
                {reasonStats.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No attendance records found</p>
                )}
              </div>
            )}
          </Card>
        </div>

        <AttendanceTable 
          attendanceData={attendanceData}
          onExport={handleExport}
          isLoading={isLoading}
        />
      </div>
    </MainLayout>
  );
};

export default TeacherPage;
