import { Request, Response } from 'express';
import { IUser } from '../models/User';
import Attendance from '../models/Attendance';

interface AuthRequest extends Request {
  user: IUser;
}

// @desc    Mark attendance
// @route   POST /api/student/attendance
// @access  Private (Student)
export const markAttendance = async (req: AuthRequest, res: Response) => {
  try {
    console.log('Received attendance data:', req.body);
    const { subject, lectureTime, name } = req.body;
    
    if (!subject || !lectureTime) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        received: req.body 
      });
    }

    // Check if the submitted name matches the authenticated user's name
    if (name && name !== req.user.name) {
      return res.status(403).json({
        message: 'You can only mark attendance for yourself. Please use your registered name.',
        submittedName: name,
        registeredName: req.user.name
      });
    }

    const date = new Date();

    const attendance = await Attendance.create({
      studentId: req.user._id,
      subject,
      lectureTime,
      date,
      status: 'present',
      name: req.user.name, // Always use the authenticated user's name
      sapId: req.user.studentId,
      rollNo: req.body.rollNo,
      division: req.body.division,
      year: req.body.year
    });

    console.log('Created attendance:', attendance);
    res.status(201).json(attendance);
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(400).json({ 
      message: 'Error marking attendance',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// @desc    Get student's attendance
// @route   GET /api/student/attendance
// @access  Private (Student)
export const getAttendance = async (req: AuthRequest, res: Response) => {
  try {
    const attendance = await Attendance.find({ studentId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(attendance);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(400).json({ message: 'Error fetching attendance' });
  }
}; 