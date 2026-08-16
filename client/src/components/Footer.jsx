import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github, Linkedin, Mail, ArrowUpRight, ShieldCheck, Cpu, Calendar } from 'lucide-react';

const Footer = ({ onOpenLeadModal, onOpenBooking }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#06080d] pt-16 pb-12 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 glow-cyan opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 glow-violet opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Conversion CTA Card */}
        <div className="mb-16 p-8 sm:p-12 rounded-3xl glass-card border border-cyan-500/20 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-violet-950/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-cyan-500/20">
              <Cpu className="w-3.5 h-3.5" />
              <span>Turn Ideas Into Code</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Have a web app, SaaS, or AI project idea?
            </h3>
            <p className="mt-3 text-slate-400 text-base">
              Let's build a modern, high-performance, scalable web application tailored to your goals.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-300 border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-200 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              Book a Free Call
            </button>
            <button
              onClick={onOpenLeadModal}
              className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap flex items-center gap-2"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 p-0.5 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-[#080a0f] rounded-[10px] flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">SUNVIX</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sunvix is a modern web development & AI engineering agency led by Suraj Kumar (Lead Tech, 8+ yrs exp). We build scalable enterprise web applications with React, Node.js, and MongoDB.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com/in/suraj-gupta-30885212b"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:surajkumarmca1993@gmail.com"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
              <li><Link to="/projects" className="hover:text-cyan-400 transition-colors">Portfolio & Work</Link></li>
              <li><Link to="/estimator" className="hover:text-cyan-400 transition-colors">Cost Estimator</Link></li>
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About & Experience</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact / Lead Form</Link></li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Web App Development</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">React Frontend Engineering</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">Node.js API & Microservices</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">AI-Powered App Integration</Link></li>
              <li><Link to="/services" className="hover:text-cyan-400 transition-colors">SaaS MVP Development</Link></li>
            </ul>
          </div>

          {/* Admin Portal & Security */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Admin CRM</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Secure client portal and lead management portal for project tracking.
            </p>
            <div className="pt-2">
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Admin Login Portal</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Sunvix Technologies. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built with React 18, Node.js, MongoDB & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
