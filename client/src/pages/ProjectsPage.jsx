import React, { useState, useEffect } from 'react';
import { Search, Filter, Sparkles, Layers } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { projectsApi } from '../services/api';

const categories = ['All', 'React', 'MERN', 'Node.js', 'AI', 'SaaS', 'Business Websites'];

const ProjectsPage = ({ onOpenLeadModal }) => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects(activeCategory);
  }, [activeCategory]);

  const fetchProjects = async (category) => {
    setLoading(true);
    try {
      const res = await projectsApi.getProjects(category);
      if (res.success) {
        setProjects(res.data);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.technologies.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-panel text-cyan-400 text-xs font-semibold uppercase tracking-wider border border-cyan-500/30">
          <Layers className="w-4 h-4" />
          <span>Case Studies & Work Catalog</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Portfolio & Delivered Projects
        </h1>
        <p className="text-slate-300 text-base">
          Explore real-world enterprise applications, SaaS platforms, AI workflow engines, and full-stack MERN builds.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-slate-800">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 border border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tech or project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">Loading portfolio projects...</div>
      ) : filteredProjects.length === 0 ? (
        <div className="text-center py-20 rounded-3xl glass-card border border-slate-800 space-y-3">
          <p className="text-lg font-bold text-slate-300">No projects found in this category.</p>
          <p className="text-xs text-slate-500">Try selecting a different tab or resetting your search filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id || project.slug}
              project={project}
              onSelectProject={setSelectedProject}
            />
          ))}
        </div>
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

export default ProjectsPage;
