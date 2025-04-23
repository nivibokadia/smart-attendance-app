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
    console.log('Authenticated user:', req.user);
    
    const { subject, lectureTime, name, sapId, rollNo, division, year } = req.body;
    
    // Validate required fields
    const requiredFields = ['subject', 'lectureTime', 'name', 'sapId', 'rollNo', 'division', 'year'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        missingFields,
        received: req.body 
      });
    }

    // Check if the submitted name matches the authenticated user's name
    if (name !== req.user.name) {
      return res.status(403).json({
        message: 'You can only mark attendance for yourself. Please use your registered name.',
        submittedName: name,
        registeredName: req.user.name
      });
    }

    // Check if SAP ID matches
    if (sapId !== req.user.studentId) {
      return res.status(403).json({
        message: 'Invalid SAP ID. Please use your registered SAP ID.',
        submittedSapId: sapId,
        registeredSapId: req.user.studentId
      });
    }

    const date = new Date();
    // Get the weekday name
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday = weekdays[date.getDay()];

    const attendance = await Attendance.create({
      studentId: req.user._id,
      subject,
      lectureTime,
      date,
      weekday,
      status: 'present',
      name: req.user.name,
      sapId: req.user.studentId,
      rollNo,
      division,
      year
    });

    console.log('Created attendance:', attendance);
    res.status(201).json(attendance);
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(400).json({ 
      message: 'Error marking attendance',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : undefined
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