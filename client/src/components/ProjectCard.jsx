import React from 'react';
import { ExternalLink, Github, ArrowRight, Layers, Award } from 'lucide-react';

const ProjectCard = ({ project, onSelectProject }) => {
  return (
    <div className="group rounded-3xl glass-card border border-slate-800/80 overflow-hidden flex flex-col h-full hover:border-cyan-500/40 transition-all duration-300">
      
      {/* Image Header with Badge Overlay */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1420] via-transparent to-black/30"></div>
        
        {/* Category Pill */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-cyan-400 text-xs font-semibold border border-cyan-500/30">
            {project.category}
          </span>
        </div>

        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full bg-violet-600/90 text-white text-xs font-bold flex items-center gap-1 shadow-lg shadow-violet-600/30">
              <Award className="w-3 h-3" />
              <span>Featured</span>
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {project.clientType || 'Enterprise Project'}
          </span>
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.technologies?.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 text-xs font-mono border border-slate-800"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 4 && (
            <span className="px-2 py-1 rounded-lg bg-slate-900 text-slate-400 text-xs font-mono border border-slate-800">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Button & Links */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <button
            onClick={() => onSelectProject(project)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group-hover:translate-x-1 duration-200"
          >
            <span>View Case Study</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="View Source Code"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                title="Open Live Preview"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectCard;
