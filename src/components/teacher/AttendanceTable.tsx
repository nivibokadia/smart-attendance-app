
import React, { useState } from 'react';
import { Attendance } from '@/types';
import { Card } from '@/components/ui/card';
import { exportToExcel } from '@/utils/excelExport';

interface AttendanceTableProps {
  attendanceData: Attendance[];
  onExport: (data: Attendance[]) => void;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ attendanceData, onExport }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendanceData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(attendanceData.length / itemsPerPage);

  const handleExport = () => {
    onExport(attendanceData);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Card className="attendify-card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Attendance Records</h2>
        <button
          onClick={handleExport}
          className="attendify-button-secondary flex items-center"
          disabled={attendanceData.length === 0}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
            />
          </svg>
          Export to Excel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Roll No.</th>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">SAP ID</th>
              <th className="border px-4 py-2 text-left">Division</th>
              <th className="border px-4 py-2 text-left">Year</th>
              <th className="border px-4 py-2 text-left">Subject</th>
              <th className="border px-4 py-2 text-left">Lecture Time</th>
              <th className="border px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((record) => (
                <tr key={record.id} className="border-b hover:bg-gray-50">
                  <td className="border px-4 py-2">{record.rollNo}</td>
                  <td className="border px-4 py-2">{record.name}</td>
                  <td className="border px-4 py-2">{record.sapId}</td>
                  <td className="border px-4 py-2">{record.division}</td>
                  <td className="border px-4 py-2">{record.year}</td>
                  <td className="border px-4 py-2">{record.subject}</td>
                  <td className="border px-4 py-2">{record.lectureTime}</td>
                  <td className="border px-4 py-2">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="border px-4 py-8 text-center text-gray-500">
                  No attendance records found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === page ? 'bg-attendify-primary text-white' : ''
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AttendanceTable;
