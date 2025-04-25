import express from 'express';
import { 
  getAttendance, 
  getAttendanceStats, 
  getSubjectAttendance 
} from '../controllers/teacher.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

// Protect all routes
router.use(protect);
router.use(authorize('teacher'));

router.get('/attendance', getAttendance);
router.get('/attendance/stats', getAttendanceStats);
router.get('/subject-attendance', getSubjectAttendance);

export default router; 