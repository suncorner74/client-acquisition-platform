const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    },
    company: {
      type: String,
      trim: true,
      default: ''
    },
    projectType: {
      type: String,
      required: [true, 'Project type is required'],
      enum: [
        'Website',
        'Web Application',
        'E-commerce',
        'SaaS',
        'AI Application',
        'API Development',
        'React Development',
        'MERN Application',
        'Other'
      ],
      default: 'Web Application'
    },
    budget: {
      type: String,
      required: [true, 'Budget range is required'],
      enum: ['Under $500', '$500 - $1,000', '$1,000 - $2,500', '$2,500 - $5,000', '$5,000+'],
      default: '$1,000 - $2,500'
    },
    timeline: {
      type: String,
      required: [true, 'Timeline is required'],
      enum: ['ASAP', '1-2 weeks', '1 month', '1-3 months', 'Flexible'],
      default: '1-2 weeks'
    },
    message: {
      type: String,
      required: [true, 'Project description message is required'],
      trim: true
    },
    source: {
      type: String,
      default: 'Direct Website'
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'],
      default: 'New'
    },
    adminNotes: {
      type: String,
      default: ''
    },
    ipAddress: {
      type: String,
      default: ''
    },
    aiAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Lead', LeadSchema);
