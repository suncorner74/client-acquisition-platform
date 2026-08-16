const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Short project description is required'],
      trim: true
    },
    clientType: {
      type: String,
      default: 'Enterprise / Startup Client'
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['React', 'MERN', 'Node.js', 'AI', 'SaaS', 'Business Websites'],
      default: 'MERN'
    },
    technologies: {
      type: [String],
      required: true,
      default: []
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'
    },
    liveUrl: {
      type: String,
      default: ''
    },
    githubUrl: {
      type: String,
      default: ''
    },
    features: {
      type: [String],
      default: []
    },
    challenges: {
      type: String,
      default: ''
    },
    solution: {
      type: String,
      default: ''
    },
    results: {
      type: String,
      default: ''
    },
    featured: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Project', ProjectSchema);
