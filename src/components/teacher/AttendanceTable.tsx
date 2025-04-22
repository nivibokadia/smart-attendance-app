import React, { useState } from 'react';
import { Attendance } from '@/types';
import { Card } from '@/components/ui/card';

interface AttendanceTableProps {
  attendanceData: Attendance[];
  onExport: (data: Attendance[]) => void;
  isLoading: boolean;
}

const AttendanceTable = ({ attendanceData, onExport, isLoading }: AttendanceTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attendanceData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(attendanceData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Attendance Records</h2>
        <button
          onClick={() => onExport(attendanceData)}
          className="bg-attendify-primary text-white px-4 py-2 rounded-md hover:bg-attendify-primary/90"
          disabled={attendanceData.length === 0}
        >
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
              <th className="border px-4 py-2 text-left">Day</th>
              <th className="border px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((record) => (
              <tr key={record.id} className="border-b hover:bg-gray-50">
                <td className="border px-4 py-2">{record.rollNo}</td>
                <td className="border px-4 py-2">{record.name}</td>
                <td className="border px-4 py-2">{record.sapId}</td>
                <td className="border px-4 py-2">{record.division}</td>
                <td className="border px-4 py-2">{record.year}</td>
                <td className="border px-4 py-2">{record.subject}</td>
                <td className="border px-4 py-2">{record.lectureTime}</td>
                <td className="border px-4 py-2">{record.weekday}</td>
                <td className="border px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    record.status === 'present' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
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
