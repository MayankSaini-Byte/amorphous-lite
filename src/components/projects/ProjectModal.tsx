import React, { useEffect } from 'react';
import type { MotifOpenProject } from '../../types/MotifTypes';
import { StatusBadge } from './StatusBadge';
import { UI_COPY } from '../../constants/uiCopy';
import { X, Users, Calendar, Target, CheckCircle2, ExternalLink, Code2, ShieldAlert } from 'lucide-react';

interface ProjectModalProps {
  project: MotifOpenProject | null;
  isOpen: boolean;
  onClose: () => void;
  onContribute: (project: MotifOpenProject) => void;
  isSubmitted?: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onContribute,
  isSubmitted = false,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const contributors = Array.isArray(project.contributors) ? project.contributors : [];
  const contributorCount = contributors.length;
  const maxSpots = project.maxContributors || 0;
  const isFull = maxSpots > 0 && contributorCount >= maxSpots;
  const normStatus = (project.status || 'open').toLowerCase();
  const isClosed = normStatus === 'closed';
  const isComingSoon = normStatus === 'coming_soon' || normStatus === 'coming-soon';
  const canContribute = !isClosed && !isComingSoon && !isFull && !isSubmitted;

  const getButtonLabel = () => {
    if (isSubmitted) return UI_COPY.projects.alreadySubmitted;
    if (isClosed) return UI_COPY.projects.submissionsClosed;
    if (isComingSoon) return UI_COPY.projects.comingSoonButton;
    if (isFull) return UI_COPY.projects.submissionsFull;
    return UI_COPY.projects.contributeNow;
  };

  const formattedDeadline = project.deadline
    ? new Date(project.deadline).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  const techList = project.technologies || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-800/80 bg-slate-900/50">
          <div className="space-y-2 pr-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {project.domain || 'Open Project'}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                {project.difficulty}
              </span>
              <StatusBadge status={project.status} isFull={isFull} />
            </div>
            <h2 id="project-modal-title" className="text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Description */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
              {UI_COPY.projects.modalAbout}
            </h3>
            <p className="text-slate-300 leading-relaxed text-base">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Goals */}
          {project.goals && project.goals.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-400" />
                {UI_COPY.projects.modalGoals}
              </h3>
              <ul className="space-y-2">
                {project.goals.map((goal, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {project.requirements && project.requirements.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-indigo-400" />
                {UI_COPY.projects.modalRequirements}
              </h3>
              <ul className="space-y-2">
                {project.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {techList.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                {UI_COPY.projects.modalTechStack}
              </h3>
              <div className="flex flex-wrap gap-2">
                {techList.map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contributors & Deadline Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Contributors */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                {UI_COPY.projects.modalContributors} (
                {maxSpots > 0 ? `${contributorCount}/${maxSpots}` : contributorCount})
              </h3>
              {contributors.length > 0 ? (
                <div className="space-y-2.5">
                  {contributors.map((contrib, idx) => {
                    const initials = contrib.name
                      ? contrib.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .substring(0, 2)
                          .toUpperCase()
                      : '?';
                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 font-semibold flex items-center justify-center text-xs">
                          {contrib.avatarLetter || initials}
                        </div>
                        <div className="text-xs">
                          <p className="font-medium text-slate-200">{contrib.name}</p>
                          {contrib.role && <p className="text-slate-400">{contrib.role}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">{UI_COPY.projects.noContributors}</p>
              )}
            </div>

            {/* Deadline & Resources */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  {UI_COPY.projects.modalDeadline}
                </h3>
                <p className="text-sm text-slate-300">
                  {formattedDeadline
                    ? UI_COPY.projects.closesDate(formattedDeadline)
                    : UI_COPY.projects.closedDeadline}
                </p>
              </div>

              {project.resourceLinks && project.resourceLinks.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Resource Links
                  </h4>
                  <div className="space-y-1.5">
                    {project.resourceLinks.map((res, idx) => (
                      <a
                        key={idx}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 hover:underline"
                      >
                        <span>{res.label || res.url}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/80 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            {UI_COPY.projects.closeBtn}
          </button>
          <button
            disabled={!canContribute}
            onClick={() => {
              if (canContribute) {
                onClose();
                onContribute(project);
              }
            }}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md flex items-center gap-2 ${
              canContribute
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-indigo-600/20 active:scale-[0.98]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
            }`}
          >
            {getButtonLabel()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
