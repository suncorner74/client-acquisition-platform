import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Award,
  Users,
  Clock,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import ProcessTimeline from '../components/ProcessTimeline';
import { projectsApi, testimonialsApi, faqsApi, statsApi } from '../services/api';

const HomePage = ({ onOpenLeadModal }) => {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, testRes, faqRes, statRes] = await Promise.all([
          projectsApi.getProjects(),
          testimonialsApi.getTestimonials(),
          faqsApi.getFAQs(),
          statsApi.getSummary()
        ]);

        if (projRes.success) setProjects(projRes.data);
        if (testRes.success) setTestimonials(testRes.data);
        if (faqRes.success) setFaqs(faqRes.data);
        if (statRes.success) setStats(statRes.data.publicStats);
      } catch (error) {
        console.error('Failed to load home page dynamic data:', error);
      }
    };
    fetchData();
  }, []);

  const toggleFaq = (idx) => {
    setActiveFaqIndex(activeFaqIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] glow-cyan opacity-25 pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 glow-violet opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-4xl mx-auto space-y-8">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-cyan-400 text-xs font-semibold uppercase tracking-wider border border-cyan-500/30 shadow-lg">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Full Stack React + Node.js + AI Architecture</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              Turn Your Ideas Into <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400">
                High-Performance Digital Products
              </span>
            </h1>

            {/* Value Proposition Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              I build modern, scalable, and conversion-focused web applications using React, Node.js, MongoDB, and AI-assisted workflows. Ready to transform your vision into reality.
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={onOpenLeadModal}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                to="/projects"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-base text-slate-300 hover:text-white glass-card border border-slate-800 hover:border-slate-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>View Portfolio & Work</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>

            {/* Technology Stack Badges */}
            <div className="pt-8 border-t border-slate-800/80 max-w-3xl mx-auto">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                Core Technologies & Frameworks
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {['React.js', 'Node.js', 'TypeScript', 'MongoDB', 'MERN Stack', 'Generative AI', 'Express.js', 'Tailwind CSS'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium hover:border-cyan-500/40 hover:text-cyan-400 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Stats Bar Component */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="p-6 rounded-2xl glass-card border border-slate-800/80 text-center space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-cyan-400">{stats?.yearsExperience || '8+'}</p>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Years Experience</p>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-slate-800/80 text-center space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-violet-400">{stats?.projectsDelivered || '35+'}</p>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Projects Delivered</p>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-slate-800/80 text-center space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400">{stats?.clientSatisfaction || '99%'}</p>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Satisfaction Rate</p>
            </div>
            <div className="p-6 rounded-2xl glass-card border border-slate-800/80 text-center space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400">{stats?.avgDeliveryTime || '2-4 Wks'}</p>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Avg MVP Delivery</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SERVICES TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">What I Do</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">High-Impact Services</h2>
          </div>
          <Link
            to="/services"
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Explore All 8 Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl glass-card border border-slate-800 hover:border-cyan-500/40 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Full Stack Web Apps</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Complete custom web applications using MERN stack (MongoDB, Express, React, Node.js) with scalable architecture.
            </p>
            <button
              onClick={onOpenLeadModal}
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 pt-2"
            >
              <span>Build A Web App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-slate-800 hover:border-cyan-500/40 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">AI-Powered SaaS MVPs</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Integrating Generative AI, OpenAI APIs, vector databases, and LLM automation into modern SaaS platforms.
            </p>
            <button
              onClick={onOpenLeadModal}
              className="text-xs font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1 pt-2"
            >
              <span>Build An AI SaaS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-slate-800 hover:border-cyan-500/40 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Node.js API Architecture</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Secure, high-throughput REST APIs, JWT authentication, third-party gateway integrations, and microservices.
            </p>
            <button
              onClick={onOpenLeadModal}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 pt-2"
            >
              <span>Build An API System</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">Proof of Work</span>
          <h2 className="text-3xl font-extrabold text-white">Featured Portfolio Projects</h2>
          <p className="text-slate-400 text-sm">
            Real enterprise and SaaS projects built with React, Node.js, MongoDB, and modern engineering standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard
              key={project._id || project.slug}
              project={project}
              onSelectProject={setSelectedProject}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 font-semibold text-sm transition-colors"
          >
            <span>View Complete Portfolio Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 4. WHY WORK WITH ME */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider border border-cyan-500/20">
              <Award className="w-3.5 h-3.5" />
              <span>Enterprise Standards</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why Clients Choose Me For Enterprise & SaaS Builds
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Combining 8+ years of tech lead experience across top financial institutions and startups with modern AI-accelerated workflows to deliver production-ready code faster.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-slate-300 text-sm">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>No Generic Templates:</strong> Custom architectural design tailored specifically to your business requirements.</span>
              </div>
              <div className="flex items-start gap-3 text-slate-300 text-sm">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>AI-Accelerated Speed:</strong> Leveraging Generative AI for code generation, testing, and debugging to save weeks.</span>
              </div>
              <div className="flex items-start gap-3 text-slate-300 text-sm">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Clean Maintainable Code:</strong> Modular components, TypeScript standards, and complete documentation.</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenLeadModal}
                className="px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/20"
              >
                Discuss Your Requirements
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <Clock className="w-6 h-6 text-cyan-400" />
              <h4 className="font-bold text-white text-base">On-Time Delivery</h4>
              <p className="text-slate-400 text-xs">Clear milestone tracking and transparent progress updates.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <ShieldCheck className="w-6 h-6 text-violet-400" />
              <h4 className="font-bold text-white text-base">Production Security</h4>
              <p className="text-slate-400 text-xs">JWT auth, helmet headers, rate limiting, and CORS defense.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <Users className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-white text-base">Agile Delivery</h4>
              <p className="text-slate-400 text-xs">Iterative builds allowing you to test features as we progress.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <MessageSquare className="w-6 h-6 text-amber-400" />
              <h4 className="font-bold text-white text-base">Direct Communication</h4>
              <p className="text-slate-400 text-xs">Speak directly with the lead developer who builds your code.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEVELOPMENT PROCESS TIMELINE */}
      <ProcessTimeline onOpenLeadModal={onOpenLeadModal} />

      {/* 6. TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">Client Feedback</span>
            <h2 className="text-3xl font-extrabold text-white">What Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <div key={idx} className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4 flex flex-col justify-between">
                <p className="text-slate-300 text-sm italic leading-relaxed">
                  "{item.message}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-cyan-500/30"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.name}</h4>
                    <p className="text-slate-400 text-xs">{item.position}, {item.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. FAQ ACCORDION SECTION */}
      {faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">Answers & Clarity</span>
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl glass-card border border-slate-800/80 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-base text-white">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                      activeFaqIndex === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {activeFaqIndex === idx && (
                  <div className="px-6 pb-6 text-sm text-slate-300 border-t border-slate-800/50 pt-4 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Detail Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenLeadModal={onOpenLeadModal}
        />
      )}

    </div>
  );
};

export default HomePage;
