const FAQ = require('../models/FAQ');

const getFAQs = async (req, res, next) => {
  try {
    const faqs = await FAQ.find({ active: true }).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: faqs.length, data: faqs });
  } catch (error) {
    next(error);
  }
};

const createFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, message: 'FAQ created', data: faq });
  } catch (error) {
    next(error);
  }
};

const updateFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
};

const deleteFAQ = async (req, res, next) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFAQs, createFAQ, updateFAQ, deleteFAQ };
