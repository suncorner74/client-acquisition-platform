const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true
    },
    position: {
      type: String,
      default: 'Founder / CTO'
    },
    message: {
      type: String,
      required: [true, 'Testimonial message is required'],
      trim: true
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5
    },
    approved: {
      type: Boolean,
      default: true
    },
    featured: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Testimonial', TestimonialSchema);
