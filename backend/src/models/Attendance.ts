import mongoose, { Document, Schema } from 'mongoose';

export interface IAttendance extends Document {
  studentId: mongoose.Types.ObjectId;
  name: string;
  sapId: string;
  rollNo: string;
  division: string;
  year: string;
  subject: string;
  lectureTime: string;
  date: Date;
  weekday: string;
  status: 'present' | 'absent';
}

const attendanceSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  sapId: {
    type: String,
    required: true
  },
  rollNo: {
    type: String,
    required: true
  },
  division: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  lectureTime: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  weekday: {
    type: String,
    required: true,
    enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    default: 'present'
  }
}, {
  timestamps: true
});

// Create compound index for studentId and date to prevent duplicate entries
attendanceSchema.index({ studentId: 1, date: 1, subject: 1 }, { unique: true });

export default mongoose.model<IAttendance>('Attendance', attendanceSchema); 