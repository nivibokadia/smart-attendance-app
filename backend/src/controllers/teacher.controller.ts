import { Request, Response } from 'express';
import Attendance from '../models/Attendance';
import User from '../models/User';
import ExcelJS from 'exceljs';

// @desc    Get all attendance records
// @route   GET /api/teacher/attendance
// @access  Private (Teacher)
export const getAttendance = async (req: Request, res: Response) => {
  try {
    const { date, subject, division, year, lectureTime } = req.query;
    
    const query: any = {};
    
    if (date) {
      const startDate = new Date(date as string);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }
    
    if (subject) query.subject = subject;
    if (division) query.division = division;
    if (year) query.year = year;
    if (lectureTime) query.lectureTime = lectureTime;

    const attendance = await Attendance.find(query)
      .sort({ date: -1, lectureTime: 1, rollNo: 1 });

    // Group attendance by lecture time and subject
    const groupedAttendance = attendance.reduce((acc: any, record: any) => {
      const key = `${record.subject}-${record.lectureTime}`;
      if (!acc[key]) {
        acc[key] = {
          subject: record.subject,
          lectureTime: record.lectureTime,
          students: []
        };
      }
      acc[key].students.push({
        id: record._id,
        name: record.name,
        sapId: record.sapId,
        rollNo: record.rollNo,
        division: record.division,
        year: record.year,
        subject: record.subject,
        lectureTime: record.lectureTime,
        date: record.date,
        status: record.status
      });
      return acc;
    }, {});

    res.json(Object.values(groupedAttendance));
  } catch (error) {
    console.error('Error in getAttendance:', error);
    res.status(400).json({ message: 'Error fetching attendance records' });
  }
};

// @desc    Get attendance statistics
// @route   GET /api/teacher/attendance/stats
// @access  Private (Teacher)
export const getAttendanceStats = async (req: Request, res: Response) => {
  try {
    const stats = await Attendance.aggregate([
      {
        $group: {
          _id: {
            subject: '$subject',
            division: '$division'
          },
          totalAttendance: { $sum: 1 },
          presentCount: {
            $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          _id: 0,
          subject: '$_id.subject',
          division: '$_id.division',
          totalAttendance: 1,
          presentCount: 1,
          attendancePercentage: {
            $multiply: [
              { $divide: ['$presentCount', '$totalAttendance'] },
              100
            ]
          }
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching attendance statistics' });
  }
};

// @desc    Download attendance as Excel
// @route   GET /api/teacher/attendance/download
// @access  Private (Teacher)
export const downloadAttendance = async (req: Request, res: Response) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Attendance');

    // Add headers
    worksheet.columns = [
      { header: 'Student ID', key: 'studentId', width: 15 },
      { header: 'Student Name', key: 'studentName', width: 20 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Status', key: 'status', width: 10 },
      { header: 'Subject', key: 'subject', width: 15 }
    ];

    // Get all attendance records with populated student data
    const attendance = await Attendance.find()
      .populate('studentId', 'studentId name');

    // Add rows
    attendance.forEach(record => {
      const student = record.studentId as any; // Type assertion since we know the populated structure
      worksheet.addRow({
        studentId: student.studentId,
        studentName: student.name,
        date: record.date.toLocaleDateString(),
        status: record.status,
        subject: record.subject
      });
    });

    // Set response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=attendance.xlsx'
    );

    // Write to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(400).json({ message: 'Error generating attendance report' });
  }
};

// @desc    Get subject-wise attendance
// @route   GET /api/teacher/subject-attendance
// @access  Private (Teacher)
export const getSubjectAttendance = async (req: Request, res: Response) => {
  try {
    // Get all unique subjects
    const subjects = await Attendance.distinct('subject');

    // For each subject, get the attendance records
    const subjectAttendance = await Promise.all(
      subjects.map(async (subject) => {
        const attendance = await Attendance.find({ 
          subject,
          status: 'present' // Only count present attendance
        }).sort({ rollNo: 1 });

        // Group by student and count attendance
        const studentAttendance = attendance.reduce((acc: any, record) => {
          const key = `${record.rollNo}-${record.name}`;
          if (!acc[key]) {
            acc[key] = {
              rollNo: record.rollNo,
              name: record.name,
              sapId: record.sapId,
              attendanceCount: 0
            };
          }
          acc[key].attendanceCount++;
          return acc;
        }, {});

        return {
          subject,
          students: Object.values(studentAttendance)
        };
      })
    );

    res.json(subjectAttendance);
  } catch (error) {
    console.error('Error in getSubjectAttendance:', error);
    res.status(400).json({ message: 'Error fetching subject attendance' });
  }
}; 