import React, { useState, useEffect } from 'react';
import type { MotifOpenProject, SubmissionType } from '../../types/MotifTypes';
import { UI_COPY } from '../../constants/uiCopy';
import { submitProject } from '../../services/projectService';
import { X, Upload, CheckCircle2, AlertCircle, Loader2, GitBranch, FileText, Lightbulb, ChevronDown } from 'lucide-react';

interface SubmissionFormModalProps {
  projects: MotifOpenProject[];
  initialProject: MotifOpenProject | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (projectId: string) => void;
}

export const SubmissionFormModal: React.FC<SubmissionFormModalProps> = ({
  projects,
  initialProject,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [submissionType, setSubmissionType] = useState<SubmissionType>('idea_proposal');

  // Common Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  // Idea Proposal Fields
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalContent, setProposalContent] = useState('');

  // Text File Fields
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  // GitHub Repo Fields
  const [githubUrl, setGithubUrl] = useState('');

  // State flags
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Available open projects for selection
  const availableProjects = projects.filter((p) => p.status === 'open' || !p.status);

  // Currently active project object
  const currentProject = projects.find((p) => p.id === selectedProjectId) || initialProject || availableProjects[0] || null;

  useEffect(() => {
    if (isOpen) {
      const targetProj = initialProject || availableProjects[0] || null;
      if (targetProj) {
        setSelectedProjectId(targetProj.id);
        const allowedTypes = targetProj.submissionTypes || ['idea_proposal'];
        if (allowedTypes.length > 0) {
          setSubmissionType(allowedTypes[0]);
        }
      }
      // Reset form state
      setFullName('');
      setEmail('');
      setNotes('');
      setProposalTitle('');
      setProposalContent('');
      setAttachedFile(null);
      setGithubUrl('');
      setErrors({});
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  }, [isOpen, initialProject]);

  useEffect(() => {
    if (currentProject) {
      const allowedTypes = currentProject.submissionTypes || ['idea_proposal'];
      if (!allowedTypes.includes(submissionType)) {
        setSubmissionType(allowedTypes[0] || 'idea_proposal');
      }
    }
  }, [selectedProjectId, currentProject]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) {
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
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    setSelectedProjectId(newId);
    setErrors({});
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setErrors((prev) => ({ ...prev, file: '' }));

    if (!file) return;

    const validExtensions = ['.txt', '.md'];
    const hasValidExt = validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

    if (!hasValidExt) {
      setErrors((prev) => ({ ...prev, file: UI_COPY.projects.fileTypeError }));
      return;
    }

    if (file.size > 1024 * 1024) {
      // 1 MB limit
      setErrors((prev) => ({ ...prev, file: UI_COPY.projects.fileSizeError }));
      return;
    }

    setAttachedFile(file);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!currentProject) {
      newErrors.project = UI_COPY.projects.selectProjectLabel;
    }

    if (!fullName.trim()) {
      newErrors.fullName = UI_COPY.projects.namePlaceholder;
    }

    if (!email.trim()) {
      newErrors.email = UI_COPY.projects.emailPlaceholder;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (submissionType === 'idea_proposal') {
      if (!proposalTitle.trim()) {
        newErrors.proposalTitle = UI_COPY.projects.ideaTitlePlaceholder;
      }
      if (proposalContent.trim().length < 100) {
        newErrors.proposalContent = UI_COPY.projects.ideaMinCharError;
      }
    } else if (submissionType === 'text_file') {
      if (!attachedFile) {
        newErrors.file = 'Please upload a project text file.';
      }
    } else if (submissionType === 'github_repo') {
      const githubRegex = /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/?$/;
      if (!githubUrl.trim()) {
        newErrors.githubUrl = UI_COPY.projects.githubRepoPlaceholder;
      } else if (!githubRegex.test(githubUrl.trim())) {
        newErrors.githubUrl = UI_COPY.projects.githubInvalidError;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !currentProject) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      await submitProject({
        projectId: currentProject.id,
        projectTitle: currentProject.title,
        submissionType,
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        whyContribute: notes.trim(),
        ideaTitle: submissionType === 'idea_proposal' ? proposalTitle.trim() : undefined,
        ideaDescription: submissionType === 'idea_proposal' ? proposalContent.trim() : undefined,
        githubUrl: submissionType === 'github_repo' ? githubUrl.trim() : undefined,
        fileName: attachedFile ? attachedFile.name : undefined,
        fileSize: attachedFile ? attachedFile.size : undefined,
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      onSuccess(currentProject.id);
    } catch (err: any) {
      setIsSubmitting(false);
      const msg = err?.message || 'An error occurred while submitting your proposal. Please try again.';
      setErrors({ form: msg });
    }
  };

  const allowedSubmissionTypes = currentProject?.submissionTypes || ['idea_proposal'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submission-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800/80 bg-slate-900/50">
          <div>
            <h2 id="submission-modal-title" className="text-xl font-bold text-white tracking-tight">
              {UI_COPY.projects.selectProjectLabel}
            </h2>
            <p className="text-xs text-slate-400 mt-1">Submit your contribution proposal for review</p>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors disabled:opacity-50"
            aria-label="Close form modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success State Screen */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-white">{UI_COPY.projects.successTitle}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {UI_COPY.projects.successMessage}
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              {UI_COPY.projects.closeBtn}
            </button>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* Top error message alert */}
            {errors.form && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errors.form}</span>
              </div>
            )}

            {/* Project Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                {UI_COPY.projects.selectProjectLabel} <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select
                  value={selectedProjectId}
                  onChange={handleProjectChange}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white appearance-none focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  {availableProjects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.domain || 'Open Project'})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>
              {errors.project && <p className="text-xs text-red-400 mt-1">{errors.project}</p>}
            </div>

            {/* Submission Type Selector */}
            {allowedSubmissionTypes.length > 0 && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  {UI_COPY.projects.selectTypeLabel} <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {allowedSubmissionTypes.includes('idea_proposal') && (
                    <button
                      type="button"
                      onClick={() => setSubmissionType('idea_proposal')}
                      className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                        submissionType === 'idea_proposal'
                          ? 'bg-indigo-600/15 border-indigo-500 text-white'
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <Lightbulb
                        className={`w-5 h-5 ${
                          submissionType === 'idea_proposal' ? 'text-indigo-400' : 'text-slate-500'
                        }`}
                      />
                      <div>
                        <p className="text-xs font-semibold">{UI_COPY.projects.typeIdea}</p>
                        <p className="text-[10px] text-slate-400">Written proposal</p>
                      </div>
                    </button>
                  )}

                  {allowedSubmissionTypes.includes('text_file') && (
                    <button
                      type="button"
                      onClick={() => setSubmissionType('text_file')}
                      className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                        submissionType === 'text_file'
                          ? 'bg-indigo-600/15 border-indigo-500 text-white'
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <FileText
                        className={`w-5 h-5 ${
                          submissionType === 'text_file' ? 'text-indigo-400' : 'text-slate-500'
                        }`}
                      />
                      <div>
                        <p className="text-xs font-semibold">{UI_COPY.projects.typeTextFile}</p>
                        <p className="text-[10px] text-slate-400">.txt or .md</p>
                      </div>
                    </button>
                  )}

                  {allowedSubmissionTypes.includes('github_repo') && (
                    <button
                      type="button"
                      onClick={() => setSubmissionType('github_repo')}
                      className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                        submissionType === 'github_repo'
                          ? 'bg-indigo-600/15 border-indigo-500 text-white'
                          : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <GitBranch
                        className={`w-5 h-5 ${
                          submissionType === 'github_repo' ? 'text-indigo-400' : 'text-slate-500'
                        }`}
                      />
                      <div>
                        <p className="text-xs font-semibold">{UI_COPY.projects.typeGithub}</p>
                        <p className="text-[10px] text-slate-400">Repository link</p>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Dynamic Type-Specific Inputs */}
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 space-y-4">
              {submissionType === 'idea_proposal' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {UI_COPY.projects.ideaTitleLabel} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={proposalTitle}
                      onChange={(e) => setProposalTitle(e.target.value)}
                      placeholder={UI_COPY.projects.ideaTitlePlaceholder}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                    {errors.proposalTitle && (
                      <p className="text-xs text-red-400 mt-1">{errors.proposalTitle}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-slate-300">
                        {UI_COPY.projects.ideaDetailLabel} <span className="text-red-400">*</span>
                      </label>
                      <span
                        className={`text-xs ${
                          proposalContent.trim().length >= 100
                            ? 'text-emerald-400'
                            : 'text-slate-500'
                        }`}
                      >
                        {proposalContent.trim().length} / 100 min characters
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      value={proposalContent}
                      onChange={(e) => setProposalContent(e.target.value)}
                      placeholder={UI_COPY.projects.ideaDetailPlaceholder}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
                    />
                    {errors.proposalContent && (
                      <p className="text-xs text-red-400 mt-1">{errors.proposalContent}</p>
                    )}
                  </div>
                </>
              )}

              {submissionType === 'text_file' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {UI_COPY.projects.fileUploadLabel} <span className="text-red-400">*</span>
                  </label>
                  {attachedFile ? (
                    <div className="flex items-center justify-between bg-slate-900 border border-indigo-500/40 p-3 rounded-xl">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <FileText className="w-5 h-5 text-indigo-400 shrink-0" />
                        <div className="truncate text-xs">
                          <p className="font-medium text-white truncate">{attachedFile.name}</p>
                          <p className="text-slate-400">
                            {(attachedFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAttachedFile(null)}
                        className="text-xs text-red-400 hover:text-red-300 font-medium px-2 py-1 rounded hover:bg-red-500/10 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-700 hover:border-indigo-500 bg-slate-900/60 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                      <Upload className="w-6 h-6 text-slate-400 group-hover:text-indigo-400 transition-colors mb-2" />
                      <p className="text-xs font-medium text-slate-300">
                        {UI_COPY.projects.fileUploadBtn} (.txt or .md)
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Maximum size: 1 MB</p>
                      <input
                        type="file"
                        accept=".txt,.md"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                  {errors.file && <p className="text-xs text-red-400 mt-1.5">{errors.file}</p>}
                </div>
              )}

              {submissionType === 'github_repo' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {UI_COPY.projects.githubRepoLabel} <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder={UI_COPY.projects.githubRepoPlaceholder}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                    <GitBranch className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  </div>
                  {errors.githubUrl && (
                    <p className="text-xs text-red-400 mt-1">{errors.githubUrl}</p>
                  )}
                </div>
              )}
            </div>

            {/* Contributor User Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {UI_COPY.projects.nameLabel} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={UI_COPY.projects.namePlaceholder}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
                {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {UI_COPY.projects.emailLabel} <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={UI_COPY.projects.emailPlaceholder}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Why do you want to contribute */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {UI_COPY.projects.whyContributeLabel}
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={UI_COPY.projects.whyContributePlaceholder}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="pt-2 flex justify-end gap-3 border-t border-slate-800/80">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors disabled:opacity-50"
              >
                {UI_COPY.projects.closeBtn}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{UI_COPY.projects.submittingBtn}</span>
                  </>
                ) : (
                  <span>{UI_COPY.projects.submitBtn}</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SubmissionFormModal;
