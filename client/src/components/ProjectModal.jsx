import React from 'react';
import { X, ExternalLink, Github, CheckCircle, Zap, ShieldCheck, Trophy, Layers } from 'lucide-react';

const ProjectModal = ({ project, onClose, onOpenLeadModal }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-md transition-opacity">
      <div className="relative w-full max-w-3xl bg-[#0f1420] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden my-8 glass-panel">
        
        {/* Header Hero Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1420] via-[#0f1420]/70 to-black/30"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-semibold border border-cyan-500/30">
              {project.category} • {project.clientType || 'Enterprise Client'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-8">
          
          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Overview</h4>
            <p className="text-slate-300 text-base leading-relaxed">{project.description}</p>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Technologies & Frameworks</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-cyan-300 text-xs font-mono border border-slate-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          {project.features?.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Key Features Implemented</h4>
              <ul className="space-y-2.5">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges & Solution Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.challenges && (
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Zap className="w-4 h-4" />
                  <span>The Challenge</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">{project.challenges}</p>
              </div>
            )}

            {project.solution && (
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>The Solution</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">{project.solution}</p>
              </div>
            )}
          </div>

          {/* Results Banner */}
          {project.results && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-violet-950/30 border border-cyan-500/30 flex items-start gap-3">
              <Trophy className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Business Impact & Results</h5>
                <p className="text-slate-200 text-sm mt-1">{project.results}</p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold flex items-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Source Code</span>
              </a>
            )}
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenLeadModal();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-md shadow-cyan-500/20 transition-colors"
          >
            Build a Similar Application
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProjectModal;
