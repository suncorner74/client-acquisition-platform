import React from 'react';
import {
  Layers,
  Code2,
  Server,
  Database,
  Cpu,
  Boxes,
  Zap,
  Globe,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const servicesList = [
  {
    id: 'web-app',
    title: 'Web Application Development',
    icon: Layers,
    type: 'Web Application',
    description: 'Build scalable, high-performance web applications tailored to your business logic with modern modular architecture.',
    features: [
      'Custom frontend & backend workflow integration',
      'Real-time data synchronization & state management',
      'Role-based access control (RBAC) & security',
      'Performance optimization for heavy traffic'
    ],
    tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'TypeScript']
  },
  {
    id: 'react-dev',
    title: 'React Development',
    icon: Code2,
    type: 'React Development',
    description: 'Modern, fluid, responsive user interfaces built using React 18, custom hooks, reusable design systems, and Tailwind CSS.',
    features: [
      'Component-driven architecture with clean code standards',
      'State management using Context API, Redux Toolkit, or Zustand',
      'Glassmorphic & dark theme SaaS designs',
      'SEO-optimized, fast-loading SPA builds'
    ],
    tech: ['React 18', 'Tailwind CSS', 'Framer Motion', 'Axios', 'TypeScript']
  },
  {
    id: 'nodejs-dev',
    title: 'Node.js Backend Development',
    icon: Server,
    type: 'API Development',
    description: 'Secure, scalable REST APIs, microservices, and backend engines powered by Node.js, Express, and database drivers.',
    features: [
      'High-throughput API endpoints with JSON schema validation',
      'JWT token authentication & session security',
      'Helmet headers, CORS, rate limiting, and XSS defense',
      'Database connection pooling & async execution'
    ],
    tech: ['Node.js', 'Express.js', 'JWT', 'Helmet', 'Express-Rate-Limit']
  },
  {
    id: 'mern-dev',
    title: 'MERN Stack Development',
    icon: Database,
    type: 'MERN Application',
    description: 'Complete full-stack solutions uniting MongoDB, Express, React, and Node.js for seamless data flow.',
    features: [
      'End-to-end full stack project execution',
      'Mongoose ORM schema design & indexing',
      'Unified deployment pipelines for client and server',
      'Automated email triggers (Nodemailer)'
    ],
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Nodemailer']
  },
  {
    id: 'ai-apps',
    title: 'AI-Powered Applications',
    icon: Cpu,
    type: 'AI Application',
    description: 'Integrate Generative AI, LLMs, OpenAI APIs, automated prompt workflows, and AI chatbots directly into web applications.',
    features: [
      'OpenAI GPT-4 & custom LLM API integrations',
      'Retrieval-Augmented Generation (RAG) pipelines',
      'AI prompt engineering & agent workflow automation',
      'Server-Sent Events (SSE) for real-time AI response streaming'
    ],
    tech: ['OpenAI API', 'LLMs', 'Generative AI', 'Vector DBs', 'Node.js']
  },
  {
    id: 'saas-dev',
    title: 'SaaS Development',
    icon: Boxes,
    type: 'SaaS',
    description: 'Transform your software idea into a subscription-ready MVP or production SaaS platform.',
    features: [
      'Stripe/Razorpay payment gateway integration',
      'Tiered pricing & subscription billing pipelines',
      'Multi-tenant database structures & admin dashboards',
      'User onboarding & automated email sequences'
    ],
    tech: ['React.js', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS']
  },
  {
    id: 'api-integration',
    title: 'API Development & Integration',
    icon: Zap,
    type: 'API Development',
    description: 'Connect third-party services, payment processors, auth providers, external databases, and webhooks.',
    features: [
      'Third-party REST & GraphQL API integrations',
      'Webhook receivers & background job processors',
      'OAuth2 authentication & API key management',
      'API rate limiting & error recovery logging'
    ],
    tech: ['Node.js', 'Express', 'Axios', 'Webhooks', 'REST APIs']
  },
  {
    id: 'website-dev',
    title: 'Website Development',
    icon: Globe,
    type: 'Website',
    description: 'High-converting business websites and landing pages built with clean code and conversion-focused UX.',
    features: [
      'Mobile-first responsive design for all screen sizes',
      'Lead generation forms with honeypot anti-spam defense',
      'SEO meta structure & fast page speed optimization',
      'Interactive animations & micro-interactions'
    ],
    tech: ['React.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'Framer Motion']
  }
];

const ServicesPage = ({ onOpenLeadModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-panel text-cyan-400 text-xs font-semibold uppercase tracking-wider border border-cyan-500/30">
          <Sparkles className="w-4 h-4" />
          <span>Specialized Full Stack Services</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Services Designed To Scale Your Product
        </h1>
        <p className="text-slate-300 text-base">
          From concept and UI design to backend microservices, MongoDB database modeling, and AI integrations.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {servicesList.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="p-8 rounded-3xl glass-card border border-slate-800/80 hover:border-cyan-500/40 flex flex-col justify-between space-y-6 group transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-slate-400 text-xs font-mono border border-slate-800">
                    {service.type}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Highlights</h4>
                  <ul className="space-y-2">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {service.tech.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 text-cyan-300 text-xs font-mono border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={onOpenLeadModal}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-md shadow-cyan-500/20 whitespace-nowrap flex items-center justify-center gap-1.5"
                >
                  <span>Start This Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Banner */}
      <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-violet-950/40 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Not sure which service fits your project idea?
        </h2>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Submit your project requirements and I will recommend the ideal tech stack, architecture, and timeline.
        </p>
        <button
          onClick={onOpenLeadModal}
          className="px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-xl shadow-cyan-500/25 transition-all duration-300"
        >
          Request Free Technical Consultation
        </button>
      </div>

    </div>
  );
};

export default ServicesPage;
