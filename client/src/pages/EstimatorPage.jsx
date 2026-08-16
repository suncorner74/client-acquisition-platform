import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor, Smartphone, Cloud, Bot, Building2, Globe,
  ShieldCheck, CreditCard, MessageSquare, BarChart3, Languages, Layout,
  ChevronRight, ChevronLeft, Sparkles, Clock, DollarSign,
  CheckCircle2, Layers, Zap, RefreshCw
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const PLATFORMS = [
  { id: 'web',        label: 'Web Application',    icon: Monitor,   baseCost: 2000,  baseDays: 21,  desc: 'React / Next.js SPA or multi-page app' },
  { id: 'mobile',     label: 'Mobile App',          icon: Smartphone,baseCost: 4000,  baseDays: 40,  desc: 'React Native cross-platform iOS & Android' },
  { id: 'saas',       label: 'SaaS Platform',       icon: Cloud,     baseCost: 6000,  baseDays: 60,  desc: 'Multi-tenant subscription-based product' },
  { id: 'ai',         label: 'AI Integration',      icon: Bot,       baseCost: 5000,  baseDays: 45,  desc: 'OpenAI, LangChain, RAG pipeline & AI agents' },
  { id: 'enterprise', label: 'Enterprise Portal',   icon: Building2, baseCost: 10000, baseDays: 90,  desc: 'Large-scale, role-based ERP / portal system' },
  { id: 'website',    label: 'Marketing Website',   icon: Globe,     baseCost: 800,   baseDays: 10,  desc: 'Landing page, portfolio, or brochure site' },
];

const FEATURES = [
  { id: 'auth',       label: 'User Auth & Roles',    icon: ShieldCheck,   cost: 500,  days: 4,  desc: 'JWT login, signup, role-based access control' },
  { id: 'payments',   label: 'Stripe Payments',       icon: CreditCard,    cost: 800,  days: 5,  desc: 'Subscription billing, one-time payments, invoices' },
  { id: 'ai_chat',    label: 'AI Chatbot',            icon: MessageSquare, cost: 1200, days: 7,  desc: 'OpenAI-powered assistant trained on your data' },
  { id: 'crm',        label: 'Admin CRM Dashboard',   icon: BarChart3,     cost: 1000, days: 6,  desc: 'Lead & customer management with analytics' },
  { id: 'analytics',  label: 'Analytics & Reports',   icon: BarChart3,     cost: 600,  days: 4,  desc: 'Real-time charts, KPI dashboards, data export' },
  { id: 'i18n',       label: 'Multi-Language (i18n)', icon: Languages,     cost: 400,  days: 3,  desc: 'EN, DE, FR, IT, ES language support' },
  { id: 'cms',        label: 'Content Management',    icon: Layout,        cost: 700,  days: 5,  desc: 'Headless CMS – manage pages, blogs, media' },
  { id: 'api',        label: 'REST / GraphQL API',    icon: Zap,           cost: 900,  days: 6,  desc: 'Full backend API with docs & Postman collection' },
];

const SCALES = [
  { id: 'mvp',        label: 'MVP Launch',    multiplier: 1.0, desc: 'Core features only – ship fast, iterate later' },
  { id: 'standard',   label: 'Full Product',  multiplier: 1.4, desc: 'All planned features, polished and production-ready' },
  { id: 'enterprise', label: 'Enterprise',    multiplier: 2.0, desc: 'Custom architecture, SLAs, security audit, DevOps pipeline' },
];

const STEPS = ['Platform', 'Features', 'Scale', 'Estimate'];

// ─── STEP INDICATOR ──────────────────────────────────────────────────────────

const StepIndicator = ({ current }) => (
  <div className="flex items-center justify-center gap-2 mb-10">
    {STEPS.map((label, i) => (
      <React.Fragment key={label}>
        <div className="flex flex-col items-center gap-1">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
            ${i < current  ? 'bg-cyan-500 text-slate-950' :
              i === current ? 'bg-gradient-to-tr from-cyan-500 to-violet-600 text-white ring-4 ring-cyan-500/20 scale-110' :
                              'bg-slate-800 text-slate-500 border border-slate-700'}`}>
            {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
          </div>
          <span className={`text-[10px] font-semibold uppercase tracking-wider ${i === current ? 'text-cyan-400' : 'text-slate-500'}`}>
            {label}
          </span>
        </div>
        {i < STEPS.length - 1 && (
          <div className={`h-px w-10 sm:w-16 mb-5 transition-all duration-500 ${i < current ? 'bg-cyan-500' : 'bg-slate-700'}`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

// ─── STEP 1 — PLATFORM ───────────────────────────────────────────────────────

const StepPlatform = ({ selected, onSelect }) => (
  <div>
    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
      What are you building?
    </h2>
    <p className="text-slate-400 text-sm mb-8">Select the primary platform for your project.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {PLATFORMS.map((p) => {
        const Icon = p.icon;
        const active = selected?.id === p.id;
        return (
          <motion.button
            key={p.id}
            onClick={() => onSelect(p)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className={`relative text-left p-5 rounded-2xl border transition-all duration-200 group
              ${active
                ? 'bg-cyan-500/10 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-600 hover:bg-slate-800/50'}`}
          >
            {active && (
              <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3 text-slate-950" />
              </span>
            )}
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors
              ${active ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400 group-hover:text-white'}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className={`font-bold text-sm mb-1 ${active ? 'text-white' : 'text-slate-200'}`}>{p.label}</div>
            <div className="text-xs text-slate-500 leading-relaxed">{p.desc}</div>
            <div className={`mt-3 text-xs font-semibold ${active ? 'text-cyan-400' : 'text-slate-600'}`}>
              From ${p.baseCost.toLocaleString()}
            </div>
          </motion.button>
        );
      })}
    </div>
  </div>
);

// ─── STEP 2 — FEATURES ───────────────────────────────────────────────────────

const StepFeatures = ({ selected, onToggle }) => (
  <div>
    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
      Which features do you need?
    </h2>
    <p className="text-slate-400 text-sm mb-8">Select all that apply. Each adds cost & time to the estimate.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {FEATURES.map((f) => {
        const Icon = f.icon;
        const active = selected.some(s => s.id === f.id);
        return (
          <motion.button
            key={f.id}
            onClick={() => onToggle(f)}
            whileTap={{ scale: 0.97 }}
            className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-200
              ${active
                ? 'bg-violet-500/10 border-violet-500/50 shadow-md shadow-violet-500/10'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-600'}`}
          >
            <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5 transition-colors
              ${active ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-800 text-slate-500'}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className={`font-semibold text-sm ${active ? 'text-white' : 'text-slate-300'}`}>{f.label}</span>
                {active && <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />}
              </div>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{f.desc}</p>
              <div className={`mt-2 flex gap-3 text-xs font-semibold ${active ? 'text-violet-300' : 'text-slate-600'}`}>
                <span>+${f.cost.toLocaleString()}</span>
                <span>+{f.days} days</span>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  </div>
);

// ─── STEP 3 — SCALE ──────────────────────────────────────────────────────────

const StepScale = ({ selected, onSelect }) => (
  <div>
    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
      What's your delivery scope?
    </h2>
    <p className="text-slate-400 text-sm mb-8">This affects overall quality, speed, and architecture complexity.</p>
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      {SCALES.map((s) => {
        const active = selected?.id === s.id;
        return (
          <motion.button
            key={s.id}
            onClick={() => onSelect(s)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-5 p-5 rounded-2xl border text-left transition-all duration-200
              ${active
                ? 'bg-emerald-500/10 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-600'}`}
          >
            <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors text-lg font-extrabold
              ${active ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
              {s.id === 'mvp' ? '🚀' : s.id === 'standard' ? '⚡' : '🏢'}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className={`font-bold text-base ${active ? 'text-white' : 'text-slate-200'}`}>{s.label}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${active ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-600 bg-slate-800'}`}>
                  ×{s.multiplier}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">{s.desc}</p>
            </div>
            {active && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          </motion.button>
        );
      })}
    </div>
  </div>
);

// ─── STEP 4 — ESTIMATE ───────────────────────────────────────────────────────

const StepEstimate = ({ platform, features, scale, onLockIn }) => {
  const { minCost, maxCost, minDays, maxDays } = useMemo(() => {
    const featureCost = features.reduce((sum, f) => sum + f.cost, 0);
    const featureDays = features.reduce((sum, f) => sum + f.days, 0);
    const rawCost = (platform.baseCost + featureCost) * scale.multiplier;
    const rawDays = (platform.baseDays + featureDays) * scale.multiplier;
    return {
      minCost: Math.round(rawCost * 0.9 / 100) * 100,
      maxCost: Math.round(rawCost * 1.15 / 100) * 100,
      minDays: Math.round(rawDays * 0.9),
      maxDays: Math.round(rawDays * 1.1),
    };
  }, [platform, features, scale]);

  const minWeeks = Math.round(minDays / 7);
  const maxWeeks = Math.round(maxDays / 7);

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6"
      >
        <Sparkles className="w-3.5 h-3.5" />
        Your Instant Estimate is Ready
      </motion.div>

      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
        Project Cost & Timeline
      </h2>
      <p className="text-slate-400 text-sm mb-10">Based on your selections — finalised after a quick discovery call.</p>

      {/* Main estimate cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto mb-10">
        {/* Cost card */}
        <motion.div
          initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30"
        >
          <div className="flex items-center gap-2 mb-3 text-cyan-400">
            <DollarSign className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Estimated Budget</span>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            ${minCost.toLocaleString()} – ${maxCost.toLocaleString()}
          </div>
          <div className="mt-1 text-xs text-slate-500">USD · all-inclusive development</div>
        </motion.div>

        {/* Timeline card */}
        <motion.div
          initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-violet-500/10 to-violet-500/5 border border-violet-500/30"
        >
          <div className="flex items-center gap-2 mb-3 text-violet-400">
            <Clock className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Timeline</span>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            {minWeeks}–{maxWeeks} Weeks
          </div>
          <div className="mt-1 text-xs text-slate-500">~{minDays}–{maxDays} business days</div>
        </motion.div>
      </div>

      {/* Summary breakdown */}
      <motion.div
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
        className="max-w-xl mx-auto mb-10 p-5 bg-slate-900/80 border border-slate-800 rounded-2xl text-left space-y-3"
      >
        <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm mb-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          Estimate Breakdown
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Platform:</span>
          <span className="text-white font-medium">{platform.label}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Delivery Scope:</span>
          <span className="text-white font-medium">{scale.label}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-400">Selected Features:</span>
          <span className="text-white font-medium">
            {features.length === 0 ? 'None (base only)' : features.map(f => f.label).join(', ')}
          </span>
        </div>
        <div className="border-t border-slate-700 pt-3 flex justify-between text-sm font-bold">
          <span className="text-slate-300">Total Range:</span>
          <span className="text-cyan-400">${minCost.toLocaleString()} – ${maxCost.toLocaleString()}</span>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <button
          onClick={onLockIn}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-xl shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-5 h-5" />
          Lock In This Estimate & Submit Idea
        </button>
      </motion.div>
      <p className="mt-4 text-xs text-slate-500">No commitment. Free consultation within 24h.</p>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

const EstimatorPage = ({ onOpenLeadModal }) => {
  const [step, setStep] = useState(0);
  const [platform, setPlatform] = useState(null);
  const [features, setFeatures] = useState([]);
  const [scale, setScale] = useState(SCALES[0]);

  const toggleFeature = (f) => {
    setFeatures(prev =>
      prev.some(s => s.id === f.id) ? prev.filter(s => s.id !== f.id) : [...prev, f]
    );
  };

  const canNext = () => {
    if (step === 0) return !!platform;
    if (step === 1) return true; // features optional
    if (step === 2) return !!scale;
    return true;
  };

  const reset = () => {
    setPlatform(null);
    setFeatures([]);
    setScale(SCALES[0]);
    setStep(0);
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };
  const [dir, setDir] = useState(1);

  const goNext = () => { setDir(1); setStep(s => Math.min(s + 1, 3)); };
  const goPrev = () => { setDir(-1); setStep(s => Math.max(s - 1, 0)); };

  return (
    <div className="min-h-screen bg-[#080a0f] pt-24 pb-20 px-4">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-5">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          Free Instant Estimator
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          How much will your project cost?
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Answer 3 quick questions to get an instant personalised budget range and delivery timeline — no sign-up needed.
        </p>
      </div>

      {/* Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#0d1117] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Progress bar */}
          <div className="h-1 bg-slate-800 w-full">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-violet-600"
              animate={{ width: `${((step) / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="p-6 sm:p-10">
            <StepIndicator current={step} />

            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {step === 0 && <StepPlatform selected={platform} onSelect={setPlatform} />}
                {step === 1 && <StepFeatures selected={features} onToggle={toggleFeature} />}
                {step === 2 && <StepScale selected={scale} onSelect={setScale} />}
                {step === 3 && platform && (
                  <StepEstimate
                    platform={platform}
                    features={features}
                    scale={scale}
                    onLockIn={onOpenLeadModal}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {step < 3 && (
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-800">
                <button
                  onClick={goPrev}
                  disabled={step === 0}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>

                {/* Mini live estimate pill */}
                {platform && (
                  <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-700 text-xs text-slate-400">
                    <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-white font-semibold">
                      ~${Math.round(((platform.baseCost + features.reduce((s, f) => s + f.cost, 0)) * scale.multiplier) / 100) * 100 | 0} est.
                    </span>
                  </div>
                )}

                <button
                  onClick={goNext}
                  disabled={!canNext()}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-cyan-500/30 active:scale-95"
                >
                  {step === 2 ? 'See My Estimate' : 'Continue'} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Reset on final step */}
            {step === 3 && (
              <div className="flex justify-center mt-8 pt-6 border-t border-slate-800">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-4 h-4" /> Start Over
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatorPage;
