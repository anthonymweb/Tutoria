const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String },
  photoURL: { type: String },
  role: { type: String, enum: ['student', 'tutor', 'admin'], required: true },
  createdAt: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  phone: { type: String },
  hourlyRate: { type: String },
  updatedAt: { type: Date },
});

module.exports = mongoose.model('User', userSchema); 