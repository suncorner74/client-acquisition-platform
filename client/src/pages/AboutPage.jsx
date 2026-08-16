import React, { useState, useEffect } from 'react';
import {
  Code2,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import { statsApi } from '../services/api';

const careerHistory = [
  {
    period: 'Aug 2023 – Present',
    role: 'Lead Technology',
    company: 'Synechron',
    description: 'Developing scalable enterprise financial applications using Angular 15, React, TypeScript, AG Grid, SignalR, and .NET. Driving AI-assisted development workflows across the SDLC to accelerate code generation, refactoring, and quality control.'
  },
  {
    period: 'Jun 2021 – Aug 2023',
    role: 'Software Consultant',
    company: 'Virtua',
    description: 'Delivered enterprise frontend solutions (NgRx, RxJS, Angular Material, React) for incident management and ticket resolution. Managed CI/CD release pipelines with Git, Jenkins, and Kubernetes.'
  },
  {
    period: 'Mar 2018 – Jun 2021',
    role: 'Software Analyst',
    company: 'Accenture',
    description: 'Architected React.js and Angular web applications for global financial & banking leaders including Intesa Sanpaolo, BPER, UniCredit, and Trafigura. Focused on responsive UI design, internationalization, and unit testing.'
  }
];

const skillCategories = [
  {
    name: 'Frontend Engineering',
    items: ['React.js 18', 'Angular 2-18', 'TypeScript', 'RxJS & NgRx', 'AG Grid Enterprise', 'Tailwind CSS']
  },
  {
    name: 'Backend & Microservices',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Java', 'SignalR', 'Kafka']
  },
  {
    name: 'Databases & Cloud',
    items: ['MongoDB & Mongoose', 'SQL', 'Kubernetes', 'Jenkins & Git', 'Maven & Octopus']
  },
  {
    name: 'AI & Engineering Workflows',
    items: ['Generative AI', 'LLM Prompting', 'OpenAI APIs', 'AI Coding Workflows', 'Architecture Refactoring']
  }
];

const AboutPage = ({ onOpenLeadModal }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    statsApi.getSummary().then(res => {
      if (res.success) setStats(res.data.publicStats);
    }).catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* 1. HERO BIO SECTION */}
      <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider border border-cyan-500/20">
            <Terminal className="w-3.5 h-3.5" />
            <span>Developer Profile</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400">Suraj Kumar</span>
          </h1>

          <p className="text-slate-300 text-base leading-relaxed">
            I am an <strong>AI-Enhanced Full Stack Developer & Tech Lead with 8+ years of experience</strong> building scalable, high-performance enterprise web applications with JavaScript, TypeScript, React.js, Angular, Node.js, and MongoDB.
          </p>

          <p className="text-slate-400 text-sm leading-relaxed">
            Having served top financial, banking, and telecom clients, I specialize in combining robust system design with cutting-edge AI workflows to transform complex business concepts into clean, maintainable software products.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
            <div>
              <p className="text-2xl font-bold text-cyan-400">{stats?.yearsExperience || '8+'}</p>
              <p className="text-xs text-slate-400">Years Experience</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-violet-400">{stats?.projectsDelivered || '35+'}</p>
              <p className="text-xs text-slate-400">Projects Delivered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-400">{stats?.clientSatisfaction || '99%'}</p>
              <p className="text-xs text-slate-400">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-400">MCA</p>
              <p className="text-xs text-slate-400">NIT Raipur</p>
            </div>
          </div>
        </div>

        {/* Profile Details Card */}
        <div className="lg:col-span-4 p-6 rounded-2xl glass-card border border-cyan-500/20 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-violet-600 rounded-2xl p-1 mx-auto shadow-xl">
              <div className="w-full h-full bg-[#080a0f] rounded-[14px] flex items-center justify-center text-cyan-400 font-extrabold text-2xl">
                SK
              </div>
            </div>
            <h3 className="text-xl font-bold text-white">Suraj Kumar</h3>
            <p className="text-cyan-400 text-xs font-semibold">Lead Technology & AI Full Stack Dev</p>
            <p className="text-slate-400 text-xs">Pune, Maharashtra, India</p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Certification:</span>
              <span className="font-semibold text-emerald-400">Databricks Generative AI</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Education:</span>
              <span className="font-semibold text-white">MCA (NIT Raipur)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Core Stack:</span>
              <span className="font-semibold text-cyan-400">React • Node.js • MongoDB</span>
            </div>
          </div>

          <button
            onClick={onOpenLeadModal}
            className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-md shadow-cyan-500/20"
          >
            Start A Project With Me
          </button>
        </div>

      </div>

      {/* 2. CAREER TIMELINE */}
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">Professional Journey</span>
          <h2 className="text-3xl font-extrabold text-white">Career Experience Timeline</h2>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-8 before:w-0.5 before:bg-slate-800">
          {careerHistory.map((item, idx) => (
            <div key={idx} className="relative pl-16 group">
              <div className="absolute left-6 top-1.5 -translate-x-1/2 w-5 h-5 rounded-full bg-[#080a0f] border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors"></div>
              
              <div className="p-6 rounded-2xl glass-card border border-slate-800/80 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-1">
                  <span className="font-bold text-cyan-400">{item.company}</span>
                  <span className="font-mono text-slate-500">{item.period}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{item.role}</h3>
                <p className="text-slate-300 text-xs leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. TECHNICAL SKILL RADAR */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">Core Capabilities</span>
          <h2 className="text-3xl font-extrabold text-white">Technical Skills & Tooling</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>{cat.name}</span>
                <Code2 className="w-4 h-4 text-cyan-400" />
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-medium border border-slate-800">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutPage;
