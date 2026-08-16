import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Sparkles, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
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

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'Web Application',
    budget: '$1,000 - $2,500',
    timeline: '1-2 weeks',
    message: '',
    source: 'Contact Page Direct',
    website_url_hp: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
        setErrorMsg(response.message || 'Failed to submit enquiry.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Server error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-panel text-cyan-400 text-xs font-semibold uppercase tracking-wider border border-cyan-500/30">
          <Sparkles className="w-4 h-4" />
          <span>Get In Touch</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let's Build Something Great Together
        </h1>
        <p className="text-slate-300 text-base">
          Have an app concept, SaaS idea, or enterprise request? Fill out the project details below to receive a personalized scope & quote.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white">Contact Information</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email Address</p>
                  <a href="mailto:surajkumarmca1993@gmail.com" className="text-slate-200 font-semibold hover:text-cyan-400">
                    surajkumarmca1993@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Phone / WhatsApp</p>
                  <p className="text-slate-200 font-semibold">+91 8349431128</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="text-slate-200 font-semibold">Pune, Maharashtra, India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-3 text-xs text-slate-400">
            <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>What Happens Next?</span>
            </h4>
            <p>1. Project requirement evaluation within 12 hours.</p>
            <p>2. Direct response email with milestone timeline & estimate.</p>
            <p>3. 1-on-1 discovery call to finalize technical scope.</p>
          </div>
        </div>

        {/* Right Column: Project Lead Form */}
        <div className="lg:col-span-8 p-8 rounded-3xl glass-card border border-cyan-500/30 shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-6">
              <CheckCircle2 className="w-16 h-16 text-cyan-400 mx-auto animate-bounce" />
              <h3 className="text-2xl font-bold text-white">Project Idea Received!</h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Thank you, <span className="text-cyan-400 font-bold">{formData.name}</span>. Your enquiry has been registered and an automated confirmation email was sent to your inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Alex Johnson"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Company / Organization</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme SaaS Inc."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Project Type *</label>
                <div className="flex flex-wrap gap-2">
                  {projectTypeOptions.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleSelectOption('projectType', type)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                        formData.projectType === type
                          ? 'bg-cyan-500 text-slate-950 border border-cyan-400'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Target Budget *</label>
                <div className="flex flex-wrap gap-2">
                  {budgetOptions.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => handleSelectOption('budget', b)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                        formData.budget === b
                          ? 'bg-violet-500 text-white border border-violet-400'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Timeline *</label>
                <div className="flex flex-wrap gap-2">
                  {timelineOptions.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleSelectOption('timeline', t)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                        formData.timeline === t
                          ? 'bg-emerald-500 text-slate-950 border border-emerald-400'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Project Idea & Requirements *</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your vision, core features, or technical goals..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                <span>Submit Project Idea</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};

export default ContactPage;
