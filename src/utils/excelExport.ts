
import { Attendance } from '@/types';
import * as XLSX from 'xlsx';

export function exportToExcel(attendanceData: Attendance[], fileName: string = 'attendance-report'): void {
  // Create a worksheet
  const worksheet = XLSX.utils.json_to_sheet(
    attendanceData.map(({ name, sapId, rollNo, division, year, subject, lectureTime, reason, date }) => ({
      'Roll No.': rollNo,
      'Name': name,
      'SAP ID': sapId,
      'Division': division,
      'Year': year,
      'Subject': subject,
      'Lecture Time': lectureTime,
      'Reason': reason,
      'Date': new Date(date).toLocaleDateString(),
    }))
  );

  // Format column widths
  const columnWidths = [
    { wch: 10 }, // Roll No.
    { wch: 25 }, // Name
    { wch: 15 }, // SAP ID
    { wch: 10 }, // Division
    { wch: 10 }, // Year
    { wch: 25 }, // Subject
    { wch: 20 }, // Lecture Time
    { wch: 30 }, // Reason
    { wch: 15 }, // Date
  ];
  worksheet['!cols'] = columnWidths;

  // Create a workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

  // Generate Excel file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}
