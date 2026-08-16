import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  Plus,
  Trash2,
  Edit,
  Eye,
  LogOut,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Save,
  X,
  PlusCircle,
  FolderPlus,
  Zap,
  Copy,
  Check,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import { leadsApi, projectsApi, statsApi, authApi } from '../services/api';

const statusOptions = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'];
const projectCategories = ['React', 'MERN', 'Node.js', 'AI', 'SaaS', 'Business Websites'];

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('crm'); // 'crm' or 'projects'
  const [leads, setLeads] = useState([]);
  const [projects, setProjects] = useState([]);
  const [crmStats, setCrmStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // AI Qualification state
  const [aiLoading, setAiLoading] = useState(false);
  const [copiedProposal, setCopiedProposal] = useState(false);
  const [proposalTab, setProposalTab] = useState('insights'); // 'insights' | 'proposal'

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [selectedLead, setSelectedLead] = useState(null);
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    clientType: 'Enterprise Client',
    category: 'MERN',
    technologies: 'React.js, Node.js, MongoDB',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    liveUrl: '',
    githubUrl: '',
    features: 'Real-time sync\nModular components',
    challenges: 'High traffic handling',
    solution: 'Optimized index and caching',
    results: 'Boosted performance by 300%',
    featured: true
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [leadsRes, projectsRes, statsRes] = await Promise.all([
        leadsApi.getLeads(),
        projectsApi.getProjects(),
        statsApi.getSummary()
      ]);

      if (leadsRes.success) setLeads(leadsRes.data);
      if (projectsRes.success) setProjects(projectsRes.data);
      if (statsRes.success) setCrmStats(statsRes.data.adminCrmStats);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
      if (err.response?.status === 401) {
        authApi.logout();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authApi.logout();
    navigate('/admin/login');
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const res = await leadsApi.updateLeadStatus(leadId, newStatus);
      if (res.success) {
        setLeads(leads.map(l => l._id === leadId ? res.data : l));
      }
    } catch (err) {
      console.error('Failed to update lead status:', err);
    }
  };

  const handleOpenLeadModal = (lead) => {
    setSelectedLead(lead);
    setAdminNotesInput(lead.adminNotes || '');
    setProposalTab('insights');
  };

  const handleQualifyWithAI = async (leadId) => {
    setAiLoading(true);
    try {
      const res = await leadsApi.qualifyLeadWithAI(leadId);
      if (res.success) {
        setLeads(leads.map(l => l._id === leadId ? res.data : l));
        setSelectedLead(res.data);
      }
    } catch (err) {
      console.error('Failed to qualify lead with AI:', err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleCopyProposal = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedProposal(true);
    setTimeout(() => setCopiedProposal(false), 2000);
  };

  const handleSaveAdminNotes = async () => {
    if (!selectedLead) return;
    try {
      const res = await leadsApi.updateLeadStatus(selectedLead._id, selectedLead.status, adminNotesInput);
      if (res.success) {
        setLeads(leads.map(l => l._id === selectedLead._id ? res.data : l));
        setSelectedLead(res.data);
      }
    } catch (err) {
      console.error('Failed to save notes:', err);
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Are you sure you want to delete this lead record?')) return;
    try {
      const res = await leadsApi.deleteLead(leadId);
      if (res.success) {
        setLeads(leads.filter(l => l._id !== leadId));
        if (selectedLead?._id === leadId) setSelectedLead(null);
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  // Project CRUD Actions
  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingProject) {
        res = await projectsApi.updateProject(editingProject._id, projectForm);
      } else {
        res = await projectsApi.createProject(projectForm);
      }

      if (res.success) {
        fetchDashboardData();
        setShowProjectModal(false);
        setEditingProject(null);
      }
    } catch (err) {
      console.error('Failed to save project:', err);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project from portfolio catalog?')) return;
    try {
      const res = await projectsApi.deleteProject(id);
      if (res.success) {
        setProjects(projects.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || (
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.projectType.toLowerCase().includes(q) ||
      lead.company.toLowerCase().includes(q)
    );
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admin Control Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Lead CRM & Portfolio Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('crm')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'crm' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Lead CRM
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'projects' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Projects Manager
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors"
            title="Logout Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-1">
          <p className="text-slate-400 text-xs font-semibold uppercase">Total Leads</p>
          <p className="text-2xl font-extrabold text-white">{crmStats?.totalLeads || leads.length}</p>
        </div>
        <div className="p-5 rounded-2xl glass-card border border-cyan-500/30 space-y-1">
          <p className="text-cyan-400 text-xs font-semibold uppercase">New Leads</p>
          <p className="text-2xl font-extrabold text-cyan-400">{crmStats?.newLeads || leads.filter(l => l.status === 'New').length}</p>
        </div>
        <div className="p-5 rounded-2xl glass-card border border-violet-500/30 space-y-1">
          <p className="text-violet-400 text-xs font-semibold uppercase">Qualified</p>
          <p className="text-2xl font-extrabold text-violet-400">{crmStats?.qualifiedLeads || leads.filter(l => l.status === 'Qualified').length}</p>
        </div>
        <div className="p-5 rounded-2xl glass-card border border-emerald-500/30 space-y-1">
          <p className="text-emerald-400 text-xs font-semibold uppercase">Won Projects</p>
          <p className="text-2xl font-extrabold text-emerald-400">{crmStats?.wonLeads || leads.filter(l => l.status === 'Won').length}</p>
        </div>
        <div className="p-5 rounded-2xl glass-card border border-amber-500/30 space-y-1">
          <p className="text-amber-400 text-xs font-semibold uppercase">Conversion Rate</p>
          <p className="text-2xl font-extrabold text-amber-400">{crmStats?.conversionRate || '0%'}</p>
        </div>
      </div>

      {/* TAB 1: LEAD CRM MANAGEMENT */}
      {activeTab === 'crm' && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search leads by name, email, company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-400 font-semibold whitespace-nowrap">Filter Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              >
                <option value="All">All Statuses</option>
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* CRM Leads Table */}
          <div className="rounded-3xl glass-card border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-4">Client Name</th>
                    <th className="p-4">Project Type</th>
                    <th className="p-4">Target Budget</th>
                    <th className="p-4">Timeline</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-xs text-slate-300">
                  {loading ? (
                    <tr><td colSpan="7" className="p-8 text-center text-slate-500">Loading leads database...</td></tr>
                  ) : filteredLeads.length === 0 ? (
                    <tr><td colSpan="7" className="p-8 text-center text-slate-500">No client project leads match the criteria.</td></tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead._id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white">{lead.name}</div>
                          <div className="text-[11px] text-slate-400">{lead.email}</div>
                          {lead.company && <div className="text-[10px] text-cyan-400">{lead.company}</div>}
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 font-mono border border-slate-800">
                            {lead.projectType}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-emerald-400">{lead.budget}</td>
                        <td className="p-4 text-slate-400">{lead.timeline}</td>
                        <td className="p-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                              lead.status === 'New' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' :
                              lead.status === 'Qualified' ? 'bg-violet-500/10 text-violet-400 border-violet-500/30' :
                              lead.status === 'Won' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                              lead.status === 'Lost' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                              'bg-slate-900 text-slate-300 border-slate-800'
                            }`}
                          >
                            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                        <td className="p-4 text-slate-500">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleOpenLeadModal(lead)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800"
                            title="View Idea Details & Admin Notes"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead._id)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-red-400 border border-slate-800"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PORTFOLIO PROJECTS MANAGER */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Portfolio Catalog ({projects.length})</h2>
            <button
              onClick={() => {
                setEditingProject(null);
                setShowProjectModal(true);
              }}
              className="px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300 flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p._id} className="p-6 rounded-3xl glass-card border border-slate-800 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-cyan-400 font-mono">{p.category}</span>
                    <div className="space-x-1">
                      <button
                        onClick={() => handleDeleteProject(p._id)}
                        className="p-1.5 rounded-lg bg-slate-900 text-red-400 hover:bg-slate-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-lg">{p.title}</h3>
                  <p className="text-slate-400 text-xs line-clamp-2">{p.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-1">
                  {p.technologies?.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] text-slate-400 border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LEAD DETAIL & NOTES DRAWER MODAL WITH AI QUALIFIER */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0f1420] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-6 glass-panel my-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/20">
                    {selectedLead.projectType}
                  </span>
                  {selectedLead.aiAnalysis && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Score: {selectedLead.aiAnalysis.leadScore}/100
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mt-2">{selectedLead.name}</h3>
                <p className="text-xs text-slate-400">{selectedLead.email} • {selectedLead.phone || 'No Phone'} • {selectedLead.company || 'No Company'}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Meta Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">Target Budget:</span>
                <span className="font-bold text-emerald-400 text-sm">{selectedLead.budget}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">Target Timeline:</span>
                <span className="font-bold text-white text-sm">{selectedLead.timeline}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-slate-500 block">Status:</span>
                <span className="font-bold text-cyan-400 text-sm">{selectedLead.status}</span>
              </div>
            </div>

            {/* AI QUALIFICATION & PROPOSAL GENERATOR SECTION */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">AI Lead Qualifier & Proposal Engine</h4>
                    <p className="text-[11px] text-slate-400">Automated quality scoring, tech stack fit, and instant project proposal generator</p>
                  </div>
                </div>

                <button
                  onClick={() => handleQualifyWithAI(selectedLead._id)}
                  disabled={aiLoading}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                >
                  <Zap className={`w-4 h-4 ${aiLoading ? 'animate-spin' : ''}`} />
                  <span>{aiLoading ? 'Analyzing Intent...' : selectedLead.aiAnalysis ? 'Re-Run AI Analysis' : 'Run AI Qualifier'}</span>
                </button>
              </div>

              {/* Render AI Analysis Results if Present */}
              {selectedLead.aiAnalysis && (
                <div className="space-y-4 pt-3 border-t border-slate-800">
                  
                  {/* Proposal Tabs */}
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs">
                    <button
                      onClick={() => setProposalTab('insights')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                        proposalTab === 'insights' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      AI Insights & Risk Scoring
                    </button>
                    <button
                      onClick={() => setProposalTab('proposal')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                        proposalTab === 'proposal' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Generated Proposal Document
                    </button>
                  </div>

                  {/* TAB 1: INSIGHTS & SCORE */}
                  {proposalTab === 'insights' && (
                    <div className="space-y-4 text-xs">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                          <span className="text-slate-500 block">Quality Tier</span>
                          <span className="font-bold text-emerald-400 text-xs">{selectedLead.aiAnalysis.qualityTier}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                          <span className="text-slate-500 block">Estimated Hours</span>
                          <span className="font-bold text-white text-xs">{selectedLead.aiAnalysis.estimatedScope?.hours}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                          <span className="text-slate-500 block">Estimated Duration</span>
                          <span className="font-bold text-cyan-400 text-xs">{selectedLead.aiAnalysis.estimatedScope?.duration}</span>
                        </div>
                      </div>

                      {/* Tech Stack Pills */}
                      <div>
                        <span className="text-slate-400 font-semibold block mb-1.5 uppercase text-[10px]">Recommended Architecture Stack</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedLead.aiAnalysis.techStack?.map((tech, idx) => (
                            <span key={idx} className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 font-mono text-[11px] border border-cyan-500/20">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Risks & Discovery Questions */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/20 space-y-1">
                          <div className="flex items-center gap-1 text-red-400 font-bold">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Risk & Scope Analysis</span>
                          </div>
                          <ul className="list-disc list-inside text-slate-300 space-y-1 text-[11px]">
                            {selectedLead.aiAnalysis.riskAnalysis?.map((risk, idx) => (
                              <li key={idx}>{risk}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 rounded-xl bg-violet-500/5 border border-violet-500/20 space-y-1">
                          <div className="flex items-center gap-1 text-violet-400 font-bold">
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>Discovery Call Questions</span>
                          </div>
                          <ul className="list-disc list-inside text-slate-300 space-y-1 text-[11px]">
                            {selectedLead.aiAnalysis.discoveryQuestions?.map((q, idx) => (
                              <li key={idx}>{q}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 2: INSTANT GENERATED PROPOSAL */}
                  {proposalTab === 'proposal' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-semibold">Client Proposal & Technical Quote Document</span>
                        <button
                          onClick={() => handleCopyProposal(selectedLead.aiAnalysis.generatedProposal)}
                          className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                        >
                          {copiedProposal ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedProposal ? 'Copied to Clipboard!' : 'Copy Proposal Text'}</span>
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 font-mono text-[11px] text-slate-300 max-h-64 overflow-y-auto border border-slate-800 whitespace-pre-wrap leading-relaxed">
                        {selectedLead.aiAnalysis.generatedProposal}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Project Message */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Submitted Description Message</h4>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-slate-200 text-xs leading-relaxed whitespace-pre-wrap">
                {selectedLead.message}
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Internal Admin Notes</h4>
              <textarea
                rows="3"
                value={adminNotesInput}
                onChange={(e) => setAdminNotesInput(e.target.value)}
                placeholder="Log call notes, proposal status, pricing quotes..."
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              ></textarea>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => handleDeleteLead(selectedLead._id)}
                className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold hover:bg-red-500/20"
              >
                Delete Lead
              </button>

              <button
                onClick={handleSaveAdminNotes}
                className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs shadow-md"
              >
                Save Notes & Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#0f1420] border border-cyan-500/30 rounded-3xl p-6 space-y-4 glass-panel my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xl font-bold text-white">Add Project To MongoDB</h3>
              <button onClick={() => setShowProjectModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Project Title</label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  >
                    {projectCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Client Type</label>
                  <input
                    type="text"
                    value={projectForm.clientType}
                    onChange={(e) => setProjectForm({ ...projectForm, clientType: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows="2"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Technologies (Comma separated)</label>
                <input
                  type="text"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold"
                >
                  Save Project to DB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboardPage;
