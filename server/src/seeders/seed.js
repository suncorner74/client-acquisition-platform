const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const User = require('../models/User');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const FAQ = require('../models/FAQ');
const Lead = require('../models/Lead');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/client_acquisition_db');
    console.log('[Seed] Connected to MongoDB');
  } catch (error) {
    console.error('[Seed Error] Database connection failed:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  try {
    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Testimonial.deleteMany();
    await FAQ.deleteMany();
    await Lead.deleteMany();

    console.log('[Seed] Cleared existing database records.');

    // 1. Create Default Admin User
    const adminUser = await User.create({
      name: 'Suraj Kumar',
      email: 'admin@sunvix.com',
      password: 'AdminSecret123!',
      role: 'admin'
    });

    console.log('[Seed] Admin User created: admin@sunvix.com (Password: AdminSecret123!)');

    // 2. Seed Projects
    const projects = [
      {
        title: 'Universe Prism - Financial Framework',
        slug: 'universe-prism-financial-framework',
        description: 'Enterprise financial application framework built with Angular 15, AG Grid, SignalR, and .NET backend.',
        clientType: 'Global Financial Institution',
        category: 'MERN',
        technologies: ['Angular 15', 'TypeScript', 'AG Grid', 'SignalR', 'C# .NET', 'Octopus'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        liveUrl: 'https://demo-universe-prism.devagency.app',
        githubUrl: 'https://github.com/surajkumar/universe-prism',
        features: [
          'Real-time streaming financial grid with AG Grid',
          'Standardized modular component library for 50+ enterprise apps',
          'AI-assisted code generation & unit test automation',
          'High throughput WebSocket data sync via SignalR'
        ],
        challenges: 'Handling over 50,000 live stock price updates per second without UI thread freeze.',
        solution: 'Implemented RxJS web workers and virtual scroll buffers with AG Grid Enterprise optimization.',
        results: 'Boosted application render speed by 350% and saved 400+ developer hours across teams.',
        featured: true,
        order: 1
      },
      {
        title: 'AI PromptCraft - Enterprise LLM Studio',
        slug: 'ai-promptcraft-enterprise-llm-studio',
        description: 'Full-stack SaaS application enabling teams to prototype, test, and deploy AI RAG pipelines and OpenAI agents.',
        clientType: 'B2B SaaS Startup',
        category: 'AI',
        technologies: ['React 18', 'Node.js', 'Express', 'MongoDB', 'OpenAI API', 'Tailwind CSS', 'Framer Motion'],
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
        liveUrl: 'https://promptcraft-ai.devagency.app',
        githubUrl: 'https://github.com/surajkumar/ai-promptcraft',
        features: [
          'Visual workflow canvas for custom AI agent chains',
          'Vector database embedding integration for document search',
          'Usage & latency analytics dashboard with exportable reports',
          'Stripe subscription billing & JWT auth'
        ],
        challenges: 'Managing long-running LLM streaming responses and rate-limiting across concurrent users.',
        solution: 'Architected Node.js Server-Sent Events (SSE) stream buffer with Redis rate limiting.',
        results: 'Scaled to 12,000 active users with 99.9% uptime during launch phase.',
        featured: true,
        order: 2
      },
      {
        title: 'Ng Autofix & Ticket CRM',
        slug: 'ng-autofix-ticket-crm',
        description: 'Incident and ticket management solution for enterprise B2B support teams.',
        clientType: 'Telecom Client',
        category: 'React',
        technologies: ['React.js', 'Redux Toolkit', 'Node.js', 'MongoDB', 'Bootstrap 5', 'Kubernetes'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
        liveUrl: 'https://ng-autofix.devagency.app',
        githubUrl: 'https://github.com/surajkumar/ng-autofix',
        features: [
          'Automated SLA violation escalations',
          'Kanban board with smooth drag-and-drop ticket routing',
          'Real-time team chat and internal note threads',
          'Role-based access control (RBAC)'
        ],
        challenges: 'Complex state synchronization across multiple customer service agents viewing the same ticket.',
        solution: 'Implemented WebSocket broadcast channels and optimistic UI state updates.',
        results: 'Reduced average ticket resolution time by 42%.',
        featured: true,
        order: 3
      },
      {
        title: 'UniCredit Digital Banking Portal',
        slug: 'unicredit-digital-banking-portal',
        description: 'Customer credit card balance management and multi-lingual banking interface.',
        clientType: 'UniCredit Banking Group',
        category: 'Business Websites',
        technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'i18next', 'Node.js'],
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
        liveUrl: 'https://banking-demo.devagency.app',
        githubUrl: '',
        features: [
          'Strict PCI-DSS compliant UI security',
          'Multi-lingual internationalization (Italian, English, German)',
          'Accessible WCAG 2.1 AAA contrast and keyboard navigation'
        ],
        challenges: 'Strict compliance and zero-accessibility-violation requirement across all mobile browsers.',
        solution: 'Built custom semantic UI components with automated accessibility linting in CI/CD.',
        results: 'Passed third-party security & accessibility audit with 100% score.',
        featured: false,
        order: 4
      }
    ];

    await Project.insertMany(projects);
    console.log('[Seed] Projects inserted successfully.');

    // 3. Seed Testimonials (Sample Client Reviews)
    const testimonials = [
      {
        name: 'Marco Rossi',
        company: 'FinTech Solutions SpA',
        position: 'VP of Engineering',
        message: 'Suraj delivered our enterprise financial dashboard ahead of schedule. His mastery over full-stack web applications, performance optimization, and AI workflows transformed our platform.',
        rating: 5,
        approved: true,
        featured: true
      },
      {
        name: 'Elena Rostova',
        company: 'CloudVentures SaaS',
        position: 'Co-Founder & CEO',
        message: 'Working with Suraj was a game-changer. He turned our raw product concept into a scalable MERN MVP in under 4 weeks. His communication and code quality are unmatched.',
        rating: 5,
        approved: true,
        featured: true
      },
      {
        name: 'David Sterling',
        company: 'Apex Telecommunications',
        position: 'Director of Product',
        message: 'Suraj has a rare combination of deep technical skill and sharp business acumen. He understands conversion, user experience, and enterprise stability.',
        rating: 5,
        approved: true,
        featured: true
      }
    ];

    await Testimonial.insertMany(testimonials);
    console.log('[Seed] Testimonials inserted successfully.');

    // 4. Seed FAQs
    const faqs = [
      {
        question: 'How does your web development process work when I submit an idea?',
        answer: 'We start with a detailed Discovery phase to evaluate your concept, user goals, and technical requirements. Next, we outline clear milestones, build responsive UI prototypes, develop using modern full-stack standards (React, Node.js, MongoDB), rigorously test, and deploy to your cloud server.',
        category: 'Process',
        order: 1,
        active: true
      },
      {
        question: 'How much does a custom web application cost?',
        answer: 'Costs depend on scope, features, and timeline. Typical web apps start from $1,000 for MVPs and landing applications up to $5,000+ for complex enterprise SaaS platforms or AI integrations. Submit your idea to receive an accurate, no-obligation quote.',
        category: 'Pricing',
        order: 2,
        active: true
      },
      {
        question: 'How fast can you build and launch my project?',
        answer: 'Simple web applications and high-conversion landing sites take 1-2 weeks. Complete full-stack MERN MVPs or custom AI SaaS platforms take 3-4 weeks.',
        category: 'Timeline',
        order: 3,
        active: true
      },
      {
        question: 'Can you integrate Generative AI and LLMs into existing applications?',
        answer: 'Yes! We specialize in AI-powered web applications—integrating OpenAI GPT-4, Claude, custom RAG pipelines, chatbots, automated content generators, and smart workflow automations into modern web stacks.',
        category: 'AI Services',
        order: 4,
        active: true
      },
      {
        question: 'Do you provide post-launch maintenance and support?',
        answer: 'Absolutely. We offer dedicated post-launch support, monitoring, security updates, feature enhancements, and cloud infrastructure management.',
        category: 'Support',
        order: 5,
        active: true
      }
    ];

    await FAQ.insertMany(faqs);
    console.log('[Seed] FAQs inserted successfully.');

    // 5. Seed Sample Leads (for Admin CRM testing)
    const sampleLeads = [
      {
        name: 'Alex Johnson',
        email: 'alex.j@healthtechio.com',
        phone: '+1 415 892 1092',
        company: 'HealthTech Innovation',
        projectType: 'SaaS',
        budget: '$2,500 - $5,000',
        timeline: '1 month',
        message: 'We want to build an AI-assisted patient intake SaaS application with React, Node.js, and MongoDB. Need subscription billing and HIPAA-compliant data fields.',
        source: 'Google Search',
        status: 'New',
        adminNotes: 'High-value opportunity. Schedule discovery call asap.'
      },
      {
        name: 'Samantha Lee',
        email: 'sam@ecommercespot.co',
        phone: '+44 20 7946 0912',
        company: 'EComSpot',
        projectType: 'Web Application',
        budget: '$1,000 - $2,500',
        timeline: '1-2 weeks',
        message: 'Looking for a developer to build a custom product recommendation portal integrated with OpenAI API.',
        source: 'LinkedIn',
        status: 'Qualified',
        adminNotes: 'Requirement document received. Proposal being drafted.'
      }
    ];

    await Lead.insertMany(sampleLeads);
    console.log('[Seed] Sample Leads inserted into CRM.');

    console.log('\n✅ Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to populate database:', error.message);
    process.exit(1);
  }
};

seedData();
