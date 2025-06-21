const mongoose = require('mongoose');

const tutorApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  approvedAt: { type: Date },
  rejectedAt: { type: Date },
  cv: { type: String },
  cvData: { type: String },
  // Add any other fields as needed
});

module.exports = mongoose.model('TutorApplication', tutorApplicationSchema); 