import express, { Request, Response } from 'express';
import { markAttendance, getAttendance } from '../controllers/student.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

// Protect all routes
router.use(protect as express.RequestHandler);
router.use(authorize('student') as express.RequestHandler);

router.post('/attendance', markAttendance as express.RequestHandler);
router.get('/attendance', getAttendance as express.RequestHandler);

export default router; 