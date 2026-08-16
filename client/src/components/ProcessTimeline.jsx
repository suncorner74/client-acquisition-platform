import React from 'react';
import { Search, FileCode2, Layout, Code2, ShieldCheck, Rocket, LifeBuoy } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Discovery & Vision',
    icon: Search,
    description: 'We explore your idea, business goals, target users, core features, and technical scope.'
  },
  {
    number: '02',
    title: 'Requirement Analysis',
    icon: FileCode2,
    description: 'Defining system architecture, database schema (MongoDB), REST APIs, and milestone deliverables.'
  },
  {
    number: '03',
    title: 'UI/UX Design',
    icon: Layout,
    description: 'Crafting modern, accessible, high-conversion responsive interfaces (Tailwind CSS).'
  },
  {
    number: '04',
    title: 'Full Stack Development',
    icon: Code2,
    description: 'Building high-performance React frontends and Node.js microservice backends.'
  },
  {
    number: '05',
    title: 'Testing & QA',
    icon: ShieldCheck,
    description: 'Automated unit tests, integration validation, security checks, and cross-device audits.'
  },
  {
    number: '06',
    title: 'Deployment & Launch',
    icon: Rocket,
    description: 'CI/CD pipeline setup, cloud server deployment (Docker/AWS/Vercel), and SSL configuration.'
  },
  {
    number: '07',
    title: 'Post-Launch Support',
    icon: LifeBuoy,
    description: 'Continuous performance monitoring, security updates, and scaling for growing traffic.'
  }
];

const ProcessTimeline = ({ onOpenLeadModal }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#080a0f] via-[#0b0e17] to-[#080a0f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider border border-cyan-500/20">
            <span>7-Step Execution Framework</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How We Turn Your Idea Into Production Code
          </h2>
          <p className="text-slate-400 text-base">
            A structured, transparent development lifecycle designed for speed, security, and enterprise software quality.
          </p>
        </div>

        {/* Timeline Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl glass-card p-6 border border-slate-800/80 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xl font-black text-slate-700 group-hover:text-cyan-500/40 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/50 flex items-center gap-1 text-[11px] font-semibold text-slate-500 group-hover:text-cyan-400 transition-colors">
                  <span>Phase {step.number}</span>
                </div>
              </div>
            );
          })}

          {/* Final CTA Step Card */}
          <div className="rounded-3xl p-6 bg-gradient-to-tr from-cyan-950/60 via-slate-900 to-violet-950/60 border border-cyan-500/40 flex flex-col justify-between text-center items-center shadow-xl">
            <div className="space-y-3 my-auto">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Ready to Start?</span>
              <h3 className="text-xl font-extrabold text-white">Have a Project Idea?</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Take the first step. Let's discuss your specifications and get your build roadmap ready.
              </p>
            </div>
            <button
              onClick={onOpenLeadModal}
              className="mt-4 w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-md shadow-cyan-500/20"
            >
              Start Phase 01 Now
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProcessTimeline;
