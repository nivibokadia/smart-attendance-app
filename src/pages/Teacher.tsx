
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Attendance } from '@/types';
import MainLayout from '@/components/layouts/MainLayout';
import FilterControls from '@/components/teacher/FilterControls';
import AttendanceTable from '@/components/teacher/AttendanceTable';
import { getFilteredAttendance, MOCK_ATTENDANCE } from '@/utils/mockData';
import { exportToExcel } from '@/utils/excelExport';

const TeacherPage = () => {
  const [filteredAttendance, setFilteredAttendance] = useState<Attendance[]>(MOCK_ATTENDANCE);

  const handleFilter = (filters: {
    date?: Date;
    subject?: string;
    division?: string;
    year?: string;
  }) => {
    const filtered = getFilteredAttendance(filters);
    setFilteredAttendance(filtered);
    
    if (filtered.length === 0) {
      toast.info("No records found matching your filters.");
    } else {
      toast.success(`Found ${filtered.length} attendance records.`);
    }
  };

  const handleExport = (data: Attendance[]) => {
    try {
      exportToExcel(data, `attendance-report-${new Date().toISOString().slice(0, 10)}`);
      toast.success("Attendance data exported to Excel successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export attendance data. Please try again.");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-attendify-secondary">
          Teacher Attendance Dashboard
        </h1>
        
        <FilterControls onFilter={handleFilter} />
        <AttendanceTable 
          attendanceData={filteredAttendance}
          onExport={handleExport}
        />
      </div>
    </MainLayout>
  );
};

export default TeacherPage;
