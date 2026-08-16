const rateLimit = require('express-rate-limit');

const leadSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 project submissions per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many project submissions from this IP address. Please try again after 15 minutes.'
  }
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  leadSubmissionLimiter,
  apiLimiter
};
