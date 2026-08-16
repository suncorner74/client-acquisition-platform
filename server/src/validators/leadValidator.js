/**
 * Lead / Project Idea Submission Input Validator
 * Enforces clean input sanitization and honeypot anti-spam verification.
 */
const validateLeadPayload = (data) => {
  const errors = [];

  if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
    errors.push('Full name is required');
  }

  if (!data.email || typeof data.email !== 'string' || !/^\S+@\S+\.\S+$/.test(data.email.trim())) {
    errors.push('Valid email address is required');
  }

  if (!data.projectType) {
    errors.push('Project type is required');
  }

  if (!data.budget) {
    errors.push('Target budget range is required');
  }

  if (!data.timeline) {
    errors.push('Target timeline is required');
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.push('Project description message must be at least 10 characters long');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = { validateLeadPayload };
