import mongoose from 'mongoose';

const OTPSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

// Create index for automatic cleanup of expired OTPs
OTPSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP = mongoose.model('OTP', OTPSchema);

export default OTP; 