import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, AlertCircle, Lock, ShieldAlert } from 'lucide-react';
import { leadsApi } from '../services/api';

const projectTypeOptions = [
  'Web Application',
  'SaaS',
  'AI Application',
  'React Development',
  'MERN Application',
  'API Development',
  'E-commerce',
  'Website',
  'Other'
];

const budgetOptions = [
  'Under $500',
  '$500 - $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000+'
];

const timelineOptions = [
  'ASAP',
  '1-2 weeks',
  '1 month',
  '1-3 months',
  'Flexible'
];

const LeadIntakeModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'Web Application',
    budget: '$1,000 - $2,500',
    timeline: '1-2 weeks',
    message: '',
    source: 'Direct Website',
    website_url_hp: '' // Honeypot anti-spam field
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSelectOption = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Email, Project Idea description).');
      return;
    }

    setSubmitting(true);

    try {
      const response = await leadsApi.submitIdea(formData);
      if (response.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(response.message || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Server error. Please try again or email surajkumarmca1993@gmail.com directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: 'Web Application',
      budget: '$1,000 - $2,500',
      timeline: '1-2 weeks',
      message: '',
      source: 'Direct Website',
      website_url_hp: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-md transition-opacity">
      <div className="relative w-full max-w-2xl bg-[#0f1420] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden my-8 glass-panel">
        
        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-cyan-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Your Project</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Let's Build Something Great
            </h2>
            <p className="mt-1 text-slate-400 text-sm">
              Share your project idea, requirements, and budget target. I'll get back to you within 24 hours.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto text-cyan-400">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Project Idea Submitted!</h3>
                <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you! Your project enquiry has been received. An automated confirmation email has been sent to <span className="text-cyan-400 font-semibold">{formData.email}</span>. I'll review your specs and contact you shortly.
                </p>
              </div>

              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl text-left max-w-md mx-auto text-xs space-y-2 text-slate-400">
                <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Enquiry Summary Registered with Sunvix:</span>
                </div>
                <p>• <span className="text-slate-300">Project Type:</span> {formData.projectType}</p>
                <p>• <span className="text-slate-300">Budget Target:</span> {formData.budget}</p>
                <p>• <span className="text-slate-300">Target Timeline:</span> {formData.timeline}</p>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 font-bold text-sm text-slate-950 transition-colors shadow-lg shadow-cyan-500/20"
              >
                Close & Return to Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Invisible Honeypot Anti-Spam Field */}
              <input
                type="text"
                name="website_url_hp"
                value={formData.website_url_hp}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
                className="hidden"
              />

              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Johnson"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Phone Number <span className="text-slate-500">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Company / Organization <span className="text-slate-500">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Acme SaaS Inc."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Project Type Option Pills */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Project Type <span className="text-cyan-400">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypeOptions.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleSelectOption('projectType', type)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                        formData.projectType === type
                          ? 'bg-cyan-500 text-slate-950 border border-cyan-400 shadow-md shadow-cyan-500/20'
                          : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Option Pills */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Target Budget Range <span className="text-cyan-400">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => handleSelectOption('budget', b)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                        formData.budget === b
                          ? 'bg-violet-500 text-white border border-violet-400 shadow-md shadow-violet-500/20'
                          : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline Option Pills */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Expected Timeline <span className="text-cyan-400">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {timelineOptions.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleSelectOption('timeline', t)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                        formData.timeline === t
                          ? 'bg-emerald-500 text-slate-950 border border-emerald-400 shadow-md shadow-emerald-500/20'
                          : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Description Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Tell Me About Your Project Idea <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your vision, core features needed, target audience, or any existing reference links..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm resize-none"
                ></textarea>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-xl shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Submitting Project Idea...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Let's Build Something Great</span>
                    </>
                  )}
                </button>
                <p className="mt-3 text-center text-xs text-slate-500 flex items-center justify-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-cyan-500" />
                  <span>100% confidential. No spam or unsolicited emails.</span>
                </p>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadIntakeModal;
