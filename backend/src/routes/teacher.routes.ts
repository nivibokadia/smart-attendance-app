import express from 'express';
import { getAttendance, getAttendanceStats } from '../controllers/teacher.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

// Protect all routes
router.use(protect);
router.use(authorize('teacher'));

router.get('/attendance', getAttendance);
router.get('/attendance/stats', getAttendanceStats);

export default router; 