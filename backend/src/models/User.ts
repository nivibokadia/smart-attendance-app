import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher';
  studentId?: string;
  rollNo?: string;
  department?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['student', 'teacher'],
    required: true,
  },
  studentId: {
    type: String,
    required: function(this: IUser) { return this.role === 'student'; },
    unique: function(this: IUser) { return this.role === 'student'; },
  },
  rollNo: {
    type: String,
    required: function(this: IUser) { return this.role === 'student'; },
    unique: function(this: IUser) { return this.role === 'student'; },
  },
  department: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema); 