import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Menu, X, Code2, Sparkles, ChevronRight } from 'lucide-react';

const Navbar = ({ onOpenLeadModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#080a0f] rounded-[10px] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl text-white tracking-tight flex items-center gap-1.5">
              SUNVIX <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            </span>
            <span className="text-[10px] font-semibold text-cyan-400 tracking-widest uppercase">
              Web & AI Development
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                isActive(item.path)
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Primary Call to Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenLeadModal}
            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all duration-300 active:scale-95 group"
          >
            <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
            <span>Start Your Project</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#080a0f]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-medium ${
                isActive(item.path)
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 to-violet-600 shadow-lg shadow-cyan-500/20"
            >
              <Rocket className="w-4 h-4" />
              <span>Start Your Project</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
