const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/adminMiddleware');
const { createAdmin } = require('../controllers/adminController');

router.post('/admins', protect, requireAdmin, createAdmin);

module.exports = router;
