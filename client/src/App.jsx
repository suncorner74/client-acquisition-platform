import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight, Bot, Check, ChevronDown, Code2, Database, Globe2,
  Layers3, Mail, Menu, MessageSquare, Rocket, Server, ShieldCheck, Sparkles, X
} from 'lucide-react'
import api from './services/api'

const services = [
  { icon: Globe2, title: 'Web Application Development', text: 'Scalable, fast and conversion-focused applications for serious businesses.' },
  { icon: Code2, title: 'React Development', text: 'Modern responsive interfaces with reusable React and TypeScript architecture.' },
  { icon: Server, title: 'Node.js Backend', text: 'Secure REST APIs, integrations and backend systems built to scale.' },
  { icon: Layers3, title: 'MERN Stack Development', text: 'End-to-end MongoDB, Express, React and Node.js applications.' },
  { icon: Bot, title: 'AI-Powered Applications', text: 'LLM, RAG, chatbot and intelligent automation experiences.' },
  { icon: Rocket, title: 'SaaS Development', text: 'From MVP to production-ready SaaS products with clean architecture.' }
]

const projects = [
  { title: 'AI Operations Platform', category: 'AI', text: 'Intelligent workflow automation with a modern React dashboard.', tech: ['React', 'Node.js', 'LLM'] },
  { title: 'Financial Workflow Suite', category: 'MERN', text: 'High-performance enterprise workflows with secure APIs and analytics.', tech: ['React', 'Node.js', 'MongoDB'] },
  { title: 'Startup Launch Platform', category: 'SaaS', text: 'Conversion-focused SaaS foundation designed for rapid product iteration.', tech: ['TypeScript', 'React', 'Node.js'] }
]

const faqs = [
  ['How does your development process work?', 'We start with discovery and requirements, then design, develop, test, deploy and support the product.'],
  ['How much does a website cost?', 'Pricing depends on scope, complexity and integrations. Submit your requirements and I will respond with a tailored estimate.'],
  ['Can you build custom SaaS applications?', 'Yes. I can build the frontend, backend, database, authentication, APIs and deployment-ready architecture.'],
  ['Can you integrate AI into an existing application?', 'Yes. AI capabilities such as LLM workflows, RAG, chatbots and automation can be integrated into existing products.']
]

function App() {
  const [menu, setMenu] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const go = id => {
    setMenu(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#070812] text-white selection:bg-indigo-500/40">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#070812]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button onClick={() => go('home')} className="text-lg font-black tracking-tight">
            Suntech<span className="text-indigo-400">.</span>
          </button>
          <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
            {['home','services','projects','about','contact'].map(x =>
              <button key={x} onClick={() => go(x)} className="capitalize transition hover:text-white">{x}</button>
            )}
          </nav>
          <button onClick={() => setShowForm(true)} className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-950 md:block">
            Start a Project
          </button>
          <button className="md:hidden" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
        </div>
        {menu && <div className="border-t border-white/10 px-6 py-5 md:hidden">
          {['home','services','projects','about','contact'].map(x =>
            <button key={x} onClick={() => go(x)} className="block w-full py-3 text-left capitalize text-slate-300">{x}</button>
          )}
        </div>}
      </header>

      <main id="home">
        <section className="hero-grid relative overflow-hidden px-6 pb-24 pt-36">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-2 text-xs font-semibold text-indigo-200">
                <Sparkles size={14}/> AI Full Stack Development
              </div>
              <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="max-w-4xl text-5xl font-black leading-[1.02] tracking-[-.04em] sm:text-6xl lg:text-7xl">
                Turn ideas into <span className="gradient-text">high-performance</span> digital products.
              </motion.h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
                Senior Software Engineer building modern web applications with React, Node.js, TypeScript, MERN and Generative AI.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => setShowForm(true)} className="group rounded-full bg-white px-6 py-3.5 font-bold text-slate-950">
                  Start Your Project <ArrowRight className="ml-2 inline transition group-hover:translate-x-1" size={17}/>
                </button>
                <button onClick={() => go('projects')} className="rounded-full border border-white/15 px-6 py-3.5 font-bold text-white hover:bg-white/5">
                  View My Work
                </button>
              </div>
              <div className="mt-10 flex flex-wrap gap-2">
                {['React','Node.js','TypeScript','MongoDB','Generative AI','RAG'].map(x =>
                  <span key={x} className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1.5 text-xs text-slate-300">{x}</span>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 rounded-full bg-indigo-600/20 blur-3xl"/>
              <div className="relative rounded-[2rem] border border-white/10 bg-white/[.04] p-5 shadow-glow">
                <div className="rounded-[1.5rem] border border-white/10 bg-[#0d1020] p-7">
                  <div className="mb-10 flex items-center justify-between">
                    <span className="text-sm font-bold">Product Architecture</span><span className="h-2 w-2 rounded-full bg-emerald-400"/>
                  </div>
                  <div className="space-y-3">
                    {[
                      ['Frontend','React + TypeScript'],
                      ['Backend','Node.js + Express'],
                      ['Data','MongoDB + Mongoose'],
                      ['Intelligence','LLM + RAG + AI'],
                      ['Delivery','Docker + CI/CD']
                    ].map(([a,b],i) => <div key={a} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[.025] p-4">
                      <span className="text-sm text-slate-400">{a}</span><span className="text-sm font-semibold">{b}</span>
                    </div>)}
                  </div>
                  <div className="mt-6 flex items-center gap-3 rounded-xl bg-indigo-500/10 p-4 text-sm text-indigo-200">
                    <ShieldCheck size={18}/> Production-minded architecture
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[.02] px-6 py-7">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 sm:grid-cols-4">
            {[['8+','Years Experience'],['MERN','Full Stack'],['AI','Generative AI'],['24/7','Global Ready']].map(([n,l]) =>
              <div key={l}><div className="text-2xl font-black">{n}</div><div className="text-xs text-slate-500">{l}</div></div>
            )}
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-head"><span>What I build</span><h2>Engineering that moves your business forward.</h2><p>From focused business websites to AI-powered SaaS platforms, each solution is designed around your actual business goal.</p></div>
          <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({icon:Icon,title,text}) => <motion.div whileHover={{y:-5}} key={title} className="card">
              <div className="icon-box"><Icon size={21}/></div><h3>{title}</h3><p>{text}</p><button onClick={() => setShowForm(true)}>Discuss this service <ArrowRight size={15}/></button>
            </motion.div>)}
          </div>
        </section>

        <section id="projects" className="section bg-white/[.02]">
          <div className="section-head"><span>Selected work</span><h2>Built for real-world outcomes.</h2><p>Project content is designed to come from MongoDB in the production version, so the portfolio can be managed without changing frontend code.</p></div>
          <div className="mx-auto grid max-w-7xl gap-5 px-6 lg:grid-cols-3">
            {projects.map(p => <article key={p.title} className="project-card">
              <div className="project-art"><div className="text-xs text-indigo-300">{p.category}</div><div className="mt-10 text-2xl font-black">{p.title}</div></div>
              <div className="p-6"><h3>{p.title}</h3><p>{p.text}</p><div className="mt-5 flex flex-wrap gap-2">{p.tech.map(t=><span key={t} className="tag">{t}</span>)}</div></div>
            </article>)}
          </div>
        </section>

        <section id="about" className="section">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2">
            <div><div className="eyebrow">Why work with me</div><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Senior engineering with a product mindset.</h2><p className="mt-6 leading-8 text-slate-400">I combine full-stack engineering with Generative AI capabilities to turn requirements into maintainable, scalable products. The focus is not just on writing code, but on creating software that is useful, reliable and ready to grow.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {['Clean architecture','Responsive UX','Secure APIs','AI integration','Scalable MongoDB','Production readiness'].map(x=><div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-5" key={x}><Check size={18} className="text-emerald-400"/><span>{x}</span></div>)}
            </div>
          </div>
        </section>

        <section className="section bg-white/[.02]">
          <div className="section-head"><span>How it works</span><h2>A clear path from idea to launch.</h2></div>
          <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
            {['Discovery','Requirement Analysis','UI/UX + Development','Testing + Deployment'].map((x,i)=><div className="card" key={x}><div className="mb-5 text-sm font-black text-indigo-400">0{i+1}</div><h3>{x}</h3><p>Collaborative, transparent and focused on shipping useful software.</p></div>)}
          </div>
        </section>

        <section className="section">
          <div className="section-head"><span>FAQ</span><h2>Questions before we start?</h2></div>
          <div className="mx-auto max-w-3xl px-6">
            {faqs.map(([q,a],i)=><div key={q} className="border-b border-white/10">
              <button className="flex w-full items-center justify-between py-6 text-left font-bold" onClick={()=>setOpenFaq(openFaq===i?null:i)}>{q}<ChevronDown className={openFaq===i?'rotate-180':''}/></button>
              {openFaq===i && <p className="pb-6 leading-7 text-slate-400">{a}</p>}
            </div>)}
          </div>
        </section>

        <section id="contact" className="section px-6">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-indigo-400/20 bg-gradient-to-br from-indigo-500/15 to-white/[.03] p-8 text-center sm:p-14">
            <Mail className="mx-auto text-indigo-300" size={30}/>
            <h2 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">Have an idea worth building?</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-400">Tell me what you're trying to build. I'll review the requirements and get back to you.</p>
            <button onClick={()=>setShowForm(true)} className="mt-8 rounded-full bg-white px-7 py-3.5 font-bold text-slate-950">Let's Build Something Great</button>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Suntech. AI Full Stack Development.
      </footer>

      {showForm && <LeadModal close={()=>setShowForm(false)}/>}
    </div>
  )
}

function LeadModal({close}) {
  const [form,setForm] = useState({name:'',email:'',phone:'',company:'',projectType:'Web Application',budget:'$1,000 - $2,500',timeline:'1 month',message:'',source:''})
  const [state,setState] = useState('idle')
  const update=e=>setForm({...form,[e.target.name]:e.target.value})
  const submit=async e=>{
    e.preventDefault(); setState('loading')
    try { await api.post('/leads',form); setState('success') }
    catch(err){ setState(err.response?.data?.message || 'Unable to submit right now. Please try again.') }
  }
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
    <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0b0d19] p-6 sm:p-8">
      <div className="mb-7 flex items-center justify-between"><div><div className="eyebrow">Start a project</div><h2 className="mt-1 text-2xl font-black">Let's build something great.</h2></div><button onClick={close}><X/></button></div>
      {state==='success' ? <div className="py-16 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-400/10 text-emerald-400"><Check/></div><h3 className="mt-5 text-2xl font-bold">Enquiry received</h3><p className="mt-3 text-slate-400">Thank you! Your project enquiry has been received. I'll get back to you shortly.</p><button onClick={close} className="mt-7 rounded-full bg-white px-6 py-3 font-bold text-slate-950">Close</button></div>
      : <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        {[
          ['name','Full Name','text',true],['email','Email','email',true],['phone','Phone Number','tel',false],['company','Company Name','text',false]
        ].map(([n,l,t,r])=><label key={n}>{l}<input required={r} name={n} value={form[n]} onChange={update}/></label>)}
        <label>Project Type<select name="projectType" value={form.projectType} onChange={update}>{['Website','Web Application','E-commerce','SaaS','AI Application','API Development','React Development','MERN Application','Other'].map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Budget<select name="budget" value={form.budget} onChange={update}>{['Under $500','$500 - $1,000','$1,000 - $2,500','$2,500 - $5,000','$5,000+'].map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Timeline<select name="timeline" value={form.timeline} onChange={update}>{['ASAP','1-2 weeks','1 month','1-3 months','Flexible'].map(x=><option key={x}>{x}</option>)}</select></label>
        <label>How did you hear about me?<input name="source" value={form.source} onChange={update} placeholder="LinkedIn, Google, referral..." /></label>
        <label className="sm:col-span-2">Project Details<textarea required name="message" value={form.message} onChange={update} placeholder="Tell me what you want to build..." /></label>
        <button disabled={state==='loading'} className="sm:col-span-2 rounded-2xl bg-white py-3.5 font-bold text-slate-950 disabled:opacity-50">{state==='loading'?'Sending...':'Send Project Enquiry'} <ArrowRight className="ml-2 inline" size={16}/></button>
        {state!=='idle' && state!=='loading' && <p className="sm:col-span-2 text-sm text-rose-300">{state}</p>}
      </form>}
    </div>
  </div>
}

export default App
