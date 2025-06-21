const express = require('express');
const router = express.Router();
const SessionRequest = require('../models/SessionRequest');

// Create session request
router.post('/', async (req, res) => {
  try {
    const { tutorId, studentId, date, time, duration, subject } = req.body;
    
    const sessionRequest = new SessionRequest({
      tutorId,
      studentId,
      date: new Date(date),
      time,
      duration,
      subject
    });
    
    await sessionRequest.save();
    
    res.status(201).json(sessionRequest);
  } catch (error) {
    console.error('Error creating session request:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
