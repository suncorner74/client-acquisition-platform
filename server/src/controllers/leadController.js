const Lead = require('../models/Lead');
const { sendLeadNotificationEmails } = require('../services/emailService');
const { validateLeadPayload } = require('../validators/leadValidator');

// @desc    Submit a new client project idea / enquiry
// @route   POST /api/leads
// @access  Public (Rate limited)
const createLead = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      message,
      source,
      website_url_hp // Honeypot field - must be empty!
    } = req.body;

    // Honeypot Anti-Spam Check: If invisible honeypot field is filled, silently discard spammer
    if (website_url_hp) {
      console.warn(`[Anti-Spam Alert] Honeypot triggered by IP: ${req.ip}`);
      return res.status(200).json({
        success: true,
        message: "Thank you! Your project enquiry has been received. I'll get back to you shortly."
      });
    }

    // Input Validation Layer
    const validation = validateLeadPayload(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: validation.errors
      });
    }

    const newLead = await Lead.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      company: company ? company.trim() : '',
      projectType,
      budget,
      timeline,
      message: message.trim(),
      source: source || 'Direct Website',
      ipAddress: req.ip || req.headers['x-forwarded-for'] || ''
    });

    // Trigger Nodemailer background notification
    sendLeadNotificationEmails(newLead).catch(err => {
      console.error('[Email Notification Error]', err.message);
    });

    return res.status(201).json({
      success: true,
      message: "Thank you! Your project enquiry has been received. I'll get back to you shortly.",
      data: {
        id: newLead._id,
        name: newLead.name,
        email: newLead.email,
        createdAt: newLead.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all leads (Admin CRM view)
// @route   GET /api/leads
// @access  Private (Admin)
const getLeads = async (req, res, next) => {
  try {
    const { status, search, projectType, page = 1, limit = 50 } = req.query;

    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (projectType && projectType !== 'All') {
      query.projectType = projectType;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Lead.countDocuments(query);

    res.json({
      success: true,
      data: leads,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single lead detail
// @route   GET /api/leads/:id
// @access  Private (Admin)
const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead record not found' });
    }
    res.json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

// @desc    Update lead status / admin notes
// @route   PATCH /api/leads/:id
// @access  Private (Admin)
const updateLead = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead record not found' });
    }

    if (status) lead.status = status;
    if (adminNotes !== undefined) lead.adminNotes = adminNotes;

    await lead.save();

    res.json({
      success: true,
      message: 'Lead updated successfully',
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private (Admin)
const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead record not found' });
    }
    res.json({
      success: true,
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead
};
