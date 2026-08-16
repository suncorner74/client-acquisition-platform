import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Calendar, Clock, Video, CheckCircle2,
  ChevronRight, ExternalLink, Loader2, Sparkles,
  Shield, Zap, Users
} from 'lucide-react';

// ─── CONFIG — swap these with Suraj's real Cal.com / Calendly links ──────────
// To use Cal.com (recommended, free):
//   1. Go to https://cal.com — sign up free
//   2. Create a "15 Min Discovery Call" event type
//   3. Copy your link e.g. https://cal.com/surajkumar/15min
//   4. Update CAL_LINK below
//
// To use Calendly instead:
//   Replace the iframe src with: https://calendly.com/YOUR_USERNAME/15min
// ─────────────────────────────────────────────────────────────────────────────
const CAL_LINK = 'https://cal.com/surajkumar-sunvix/discovery';
const CAL_EMBED_URL = `${CAL_LINK}?embed=true&theme=dark&hideEventTypeDetails=false&layout=month_view`;

// ─── Perks shown alongside the calendar ──────────────────────────────────────
const PERKS = [
  {
    icon: Clock,
    label: '15 Minutes',
    desc: 'Quick, focused, no fluff — straight to your project scope.',
  },
  {
    icon: Video,
    label: 'Google Meet / Zoom',
    desc: 'Flexible video call — you pick the platform.',
  },
  {
    icon: Shield,
    label: 'No Sales Pressure',
    desc: 'Honest advice first. A quote only if it\'s a good fit.',
  },
  {
    icon: Zap,
    label: 'Senior Engineer Only',
    desc: 'You speak directly to Suraj — 8+ years of hands-on experience.',
  },
];

// ─── Social proof mini ticker ─────────────────────────────────────────────────
const SOCIAL_PROOF = [
  '"Booked on a Friday, code review by Monday." — Startup Founder',
  '"Suraj understood our architecture in the first call." — CTO, Fintech',
  '"Most productive 15 minutes I\'ve spent." — Product Manager',
];

const BookingModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [proofIndex, setProofIndex] = useState(0);
  const iframeRef = useRef(null);

  // Rotate social proof quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setProofIndex(i => (i + 1) % SOCIAL_PROOF.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Reset loading state when modal opens
  useEffect(() => {
    if (isOpen) setLoading(true);
  }, [isOpen]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="booking-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          key="booking-panel"
          initial={{ scale: 0.93, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 24, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-[#0d1117] border border-slate-700/60 rounded-3xl shadow-2xl overflow-hidden"
          style={{ maxHeight: '92vh' }}
        >
          {/* ── Close button ──────────────────────────────────────────────── */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/50 transition-all"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col lg:flex-row h-full overflow-hidden" style={{ maxHeight: '90vh' }}>

            {/* ── LEFT PANEL — Info & Perks ───────────────────────────────── */}
            <div className="lg:w-[340px] shrink-0 bg-gradient-to-b from-[#080c14] to-[#0a0f1a] border-b lg:border-b-0 lg:border-r border-slate-800 p-6 lg:p-8 flex flex-col gap-6 overflow-y-auto">

              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available Now
                </div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight leading-tight">
                  Book a Free 15-Min<br />
                  <span className="text-cyan-400">Discovery Call</span>
                </h2>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  Skip the back-and-forth. Pick a time that works, and Suraj will personally review your idea before the call.
                </p>
              </div>

              {/* Perk cards */}
              <div className="space-y-3">
                {PERKS.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/60">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{label}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof ticker */}
              <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/40 min-h-[70px]">
                <div className="flex items-center gap-1.5 mb-2">
                  <Users className="w-3.5 h-3.5 text-violet-400" />
                  <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">Client Feedback</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={proofIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                    className="text-xs text-slate-300 italic leading-relaxed"
                  >
                    {SOCIAL_PROOF[proofIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Fallback direct link */}
              <div className="mt-auto pt-2">
                <p className="text-xs text-slate-500 mb-2">Calendar not loading?</p>
                <a
                  href={CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  Open booking page directly <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* ── RIGHT PANEL — Embedded Calendar ────────────────────────── */}
            <div className="flex-1 relative overflow-hidden bg-[#080c14]">
              {/* Header bar inside panel */}
              <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Sunvix Discovery Call</div>
                  <div className="text-xs text-slate-400">Select a date & time that works for you</div>
                </div>
                <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Instant confirmation</span>
                </div>
              </div>

              {/* Loading overlay */}
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080c14] z-10 gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center">
                      <Calendar className="w-7 h-7 text-white" />
                    </div>
                    <Loader2 className="absolute -bottom-1 -right-1 w-5 h-5 text-cyan-400 animate-spin" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-white">Loading availability…</p>
                    <p className="text-xs text-slate-500 mt-1">Fetching Suraj's live calendar</p>
                  </div>
                  {/* Progress bar */}
                  <div className="w-48 h-1 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-violet-600 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3, ease: 'easeInOut' }}
                    />
                  </div>
                  {/* Fallback CTA after 4s */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4 }}
                    className="text-center mt-2"
                  >
                    <p className="text-xs text-slate-500 mb-2">Taking too long?</p>
                    <a
                      href={CAL_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold hover:bg-cyan-500/20 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Book via Cal.com directly
                    </a>
                  </motion.div>
                </div>
              )}

              {/* Cal.com / Calendly Embed iframe */}
              <iframe
                ref={iframeRef}
                src={CAL_EMBED_URL}
                frameBorder="0"
                title="Book a discovery call with Sunvix"
                onLoad={() => setLoading(false)}
                className="w-full"
                style={{ height: 'calc(90vh - 72px)', minHeight: '520px' }}
                allow="camera; microphone; fullscreen"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
