const express = require('express');
const router = express.Router();
const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead
} = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');
const { leadSubmissionLimiter } = require('../middleware/rateLimiter');

// Public project idea submission endpoint
router.post('/', leadSubmissionLimiter, createLead);

// Admin CRM endpoints
router.get('/', protect, getLeads);
router.get('/:id', protect, getLeadById);
router.patch('/:id', protect, updateLead);
router.delete('/:id', protect, deleteLead);

module.exports = router;
