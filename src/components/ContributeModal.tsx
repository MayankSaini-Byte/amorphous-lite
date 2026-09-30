import React, { useState } from 'react';
import { X, Sparkles, FileText, Upload, Lightbulb, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { ContributionType } from '../types';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContributeModal: React.FC<ContributeModalProps> = ({ isOpen, onClose }) => {
  const { userProfile, addContribution } = useApp();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<ContributionType>('idea');
  const [description, setDescription] = useState('');
  const [fileOrUrl, setFileOrUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addContribution({
      studentId: userProfile.studentId,
      studentName: userProfile.email.split('@')[0],
      title,
      type,
      description,
      fileOrUrl: fileOrUrl || undefined
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTitle('');
      setDescription('');
      setFileOrUrl('');
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold tracking-tight">Open Contribution</h3>
              <p className="text-xs text-blue-200 font-medium">Submit ideas, PDFs, or research notes to Amorphous Open Projects</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-extrabold text-[#102A5C]">Contribution Submitted!</h4>
            <p className="text-xs text-slate-500">Your contribution is now published in the Aeronautics & Open Projects hub.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Contribution Type selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Contribution Type</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setType('idea')}
                  className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    type === 'idea'
                      ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Idea</span>
                </button>

                <button
                  type="button"
                  onClick={() => setType('pdf')}
                  className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    type === 'pdf'
                      ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Upload className="w-4 h-4 text-indigo-500" />
                  <span>PDF Document</span>
                </button>

                <button
                  type="button"
                  onClick={() => setType('text')}
                  className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    type === 'text'
                      ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span>Text / Code</span>
                </button>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Project / Contribution Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. High-Temperature Superalloy Simulation Model"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Description & Details</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a detailed explanation of your proposal or document..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Link / File input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">File Name / Repository Link (Optional)</label>
              <input
                type="text"
                value={fileOrUrl}
                onChange={(e) => setFileOrUrl(e.target.value)}
                placeholder="e.g. https://github.com/my-project or paper_draft.pdf"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-transform hover:scale-102 active:scale-98"
              >
                Submit Contribution →
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};
