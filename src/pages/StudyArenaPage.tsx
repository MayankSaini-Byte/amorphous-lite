import React, { useState, useEffect, useCallback } from 'react';
import { 
  BookOpen, Award, Trophy, Lock, CheckCircle2, HelpCircle,
  Sparkles, ArrowLeft, Upload, Calendar, 
  Clock, Code, Briefcase, BarChart3, Atom, Plane, Loader2,
  AlertCircle, Play, X, Check, Search, ListFilter, ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import motifDataRaw from '../data/data_motif.json';
import type { MotifData, MotifTrack } from '../types/MotifTypes';
import { ContributeModal } from '../components/ContributeModal';
import { usePlaylistData } from '../hooks/usePlaylistData';
import { getQuizForCheckpoint } from '../data/quizData';
import type { QuizQuestion, QuizResult } from '../data/quizData';
import { UI_COPY } from '../constants/uiCopy';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectModal } from '../components/projects/ProjectModal';
import { SubmissionFormModal } from '../components/projects/SubmissionFormModal';
import { getUserSubmittedProjectIds } from '../services/projectService';
import type { MotifOpenProject } from '../types/MotifTypes';

const motifData = motifDataRaw as MotifData;

// --- Full Screen Quiz Component ---
const MotifQuizOverlay: React.FC<{
  quiz: QuizQuestion;
  quizNumber: number;
  onComplete: (result: QuizResult) => void;
  onSkip: () => void;
}> = ({ quiz, quizNumber, onComplete, onSkip }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = selected === quiz.correctIndex;

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    setTimeout(() => {
      onComplete({
        questionId: quiz.id,
        selectedIndex: selected,
        isCorrect: selected === quiz.correctIndex,
        pointsEarned: selected === quiz.correctIndex ? quiz.points : 0,
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-2xl w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-[2rem] p-6 sm:p-10 text-white shadow-2xl shadow-indigo-900/50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 p-6 opacity-[0.06]">
          <HelpCircle className="w-56 h-56" />
        </div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-16 -mb-16"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-xs font-black uppercase tracking-widest text-indigo-100">
                MOTIF Quiz {String(quizNumber + 1).padStart(2, '0')}
              </span>
            </div>
            <button onClick={onSkip} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>

          {/* Question */}
          <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-8">
            {quiz.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {quiz.options.map((opt, i) => {
              let borderColor = 'border-white/15';
              let bgColor = 'bg-white/5 hover:bg-white/15';
              
              if (submitted) {
                if (i === quiz.correctIndex) {
                  borderColor = 'border-emerald-400';
                  bgColor = 'bg-emerald-500/30';
                } else if (i === selected && !isCorrect) {
                  borderColor = 'border-red-400';
                  bgColor = 'bg-red-500/30';
                }
              } else if (selected === i) {
                borderColor = 'border-white';
                bgColor = 'bg-white/20';
              }

              return (
                <button
                  key={i}
                  disabled={submitted}
                  onClick={() => setSelected(i)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between font-bold text-sm ${borderColor} ${bgColor}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center font-black text-xs">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </span>
                  {submitted && i === quiz.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Result explanation */}
          {submitted && (
            <div className={`mt-6 p-4 rounded-xl border ${
              isCorrect ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-100' : 'bg-red-500/20 border-red-400/40 text-red-100'
            }`}>
              <p className="font-extrabold text-sm flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    Correct! +{quiz.points} points awarded.
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4 text-red-300" />
                    Incorrect. Better luck on the next try!
                  </>
                )}
              </p>
              <p className="text-xs font-semibold text-white/70 mt-1">{quiz.explanation}</p>
            </div>
          )}

          {/* Actions */}
          {!submitted && (
            <div className="mt-8 flex justify-between items-center">
              <span className="text-indigo-200 font-bold text-sm">
                Answer correctly to earn +{quiz.points} points
              </span>
              <button 
                disabled={selected === null}
                onClick={handleSubmit}
                className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all ${
                  selected !== null
                    ? 'bg-white text-indigo-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95'
                    : 'bg-white/20 text-white/40 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// =================== MAIN COMPONENT ===================

export const StudyArenaPage: React.FC = () => {
  const {
    setActivePath,
    activeArenaTab,
    setActiveArenaTab,
    selectedTrackKey,
    setSelectedTrackKey,
    completedLessons,
    toggleLessonCompleted,
  } = useApp();

  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleLimit, setVisibleLimit] = useState(15);
  const [showAll, setShowAll] = useState(false);
  
  // Quiz state
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeQuizNumber, setActiveQuizNumber] = useState(0);
  const [quizScoreTotal, setQuizScoreTotal] = useState(0);

  // Open Projects state
  const [selectedProjectForDetails, setSelectedProjectForDetails] = useState<MotifOpenProject | null>(null);
  const [selectedProjectForSubmission, setSelectedProjectForSubmission] = useState<MotifOpenProject | null>(null);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [submittedProjectIds, setSubmittedProjectIds] = useState<string[]>([]);

  useEffect(() => {
    setSubmittedProjectIds(getUserSubmittedProjectIds());
  }, []);

  const handleSubmissionSuccess = (_projectId?: string) => {
    setSubmittedProjectIds(getUserSubmittedProjectIds());
  };

  // Tracks & Current Track selection
  const tracks = motifData.tracks;
  const currentTrack = tracks.find(t => t.id === selectedTrackKey) || tracks[0];
  const currentPlaylistUrl = currentTrack.playlistUrl || motifData.playlist.url;

  // Reset lesson index & search on track change
  useEffect(() => {
    setActiveLessonIndex(0);
    setSearchQuery('');
    setVisibleLimit(15);
    setShowAll(false);
  }, [selectedTrackKey]);

  // Playlist hook — DYNAMIC PER TRACK & SINGLE SOURCE OF TRUTH IN JSON
  const { lectures, playlistId, isLoading, error } = usePlaylistData(currentPlaylistUrl, currentTrack.customLessons);

  // Anti-cheat / keyboard controls
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) || 
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const totalLectures = lectures.length;
  const completedCount = lectures.filter(l => completedLessons.includes(l.id)).length;
  const progressPercent = totalLectures === 0 ? 0 : Math.round((completedCount / totalLectures) * 100);

  const isTrackLocked = (track: MotifTrack) => {
    return track.locked;
  };

  const currentTrackLocked = isTrackLocked(currentTrack);

  const getTrackIcon = (id: string) => {
    if (id.includes('python') || id.includes('data')) return Code;
    if (id.includes('ml') || id.includes('electronics')) return Briefcase;
    if (id.includes('cv') || id.includes('vision')) return BarChart3;
    if (id.includes('materials')) return Atom;
    if (id.includes('aero')) return Plane;
    return BookOpen;
  };

  const getBadgeIcon = (iconStr: string) => {
    if (iconStr === 'code') return Code;
    if (iconStr === 'briefcase') return Briefcase;
    return Award;
  };

  // Quiz helpers
  const getQuizIdForIndex = useCallback((quizIndex: number) => {
    return `${currentTrack.id}-quiz-${quizIndex}`;
  }, [currentTrack.id]);
  
  const isQuizPassed = useCallback((quizIndex: number) => {
    return completedLessons.includes(getQuizIdForIndex(quizIndex));
  }, [completedLessons, getQuizIdForIndex]);

  const isLectureLocked = useCallback((lectureIndex: number) => {
    for (let q = 0; q < lectureIndex; q++) {
      if ((q + 1) % 5 === 0) {
        const quizIdx = Math.floor(q / 5);
        if (!isQuizPassed(quizIdx)) return true;
      }
    }
    return false;
  }, [isQuizPassed]);

  const handleQuizComplete = (result: QuizResult) => {
    if (result.isCorrect) {
      setQuizScoreTotal(prev => prev + result.pointsEarned);
      const quizId = getQuizIdForIndex(activeQuizNumber);
      if (!completedLessons.includes(quizId)) {
        toggleLessonCompleted(quizId);
      }
    }
    setShowQuiz(false);
  };

  // Build interleaved lecture + quiz list for the sidebar
  const buildNavigationItems = useCallback(() => {
    const items: Array<
      | { type: 'lecture'; index: number; lecture: typeof lectures[0] }
      | { type: 'quiz'; quizNumber: number; afterIndex: number }
    > = [];

    const query = searchQuery.trim().toLowerCase();

    lectures.forEach((lecture, index) => {
      const matchesSearch = !query || 
        lecture.title.toLowerCase().includes(query) || 
        String(index + 1).includes(query);

      if (matchesSearch) {
        items.push({ type: 'lecture', index, lecture });
      }

      if ((index + 1) % 5 === 0 && !query) {
        items.push({ type: 'quiz', quizNumber: Math.floor(index / 5), afterIndex: index });
      }
    });

    return items;
  }, [lectures, searchQuery]);

  const navItems = buildNavigationItems();
  const displayedNavItems = searchQuery
    ? navItems
    : showAll
      ? navItems
      : navItems.slice(0, visibleLimit);

  const hasMore = !searchQuery && !showAll && visibleLimit < navItems.length;

  // Current playing video ID
  const currentVideoId = lectures[activeLessonIndex]?.videoId || null;

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 min-h-[calc(100vh-6rem)]">
      
      {/* MINIMAL TOP BAR - BACK ICON ONLY */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => setActivePath('/profile')}
          className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 hover:border-blue-200 shadow-xs transition-all flex items-center gap-2 font-bold text-xs group"
          title="Back to Profile"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600 transition-transform group-hover:-translate-x-1" />
          <span className="font-extrabold text-[#102A5C]">Back to Profile</span>
        </button>

        <button
          onClick={() => {
            setSelectedProjectForSubmission(null);
            setIsSubmissionModalOpen(true);
          }}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-2 active:scale-95"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>{UI_COPY.projects.contributeNow}</span>
        </button>
      </div>

      {/* ARENA LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* SIDEBAR */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200/60 p-5 space-y-6 shadow-sm flex flex-col justify-start relative z-10">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black tracking-widest text-slate-400 uppercase px-2">
              ARENA NAVIGATION
            </h4>
            <nav className="space-y-2">
              {[
                { id: 'lectures', label: '1. Course Tracks', icon: BookOpen },
                { id: 'achievements', label: '2. Achievements', icon: Award },
                { id: 'leaderboard', label: '3. Leaderboard', icon: Trophy },
                { id: 'projects', label: '4. Open Projects', icon: Upload },
                { id: 'events', label: '5. Upcoming Events', icon: Calendar }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveArenaTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                    activeArenaTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-[1.02]'
                      : 'text-slate-600 hover:bg-slate-100 hover:scale-[1.01]'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
          
          {activeArenaTab === 'lectures' && (
            <div className="pt-6 border-t border-slate-100 space-y-3 animate-in slide-in-from-left-4 duration-500">
              <h5 className="text-[10px] font-black tracking-widest text-slate-400 uppercase px-2">
                YOUR TRACKS
              </h5>
              <div className="space-y-1.5">
                {tracks.map(t => {
                  const Icon = getTrackIcon(t.id);
                  const isSelected = selectedTrackKey === t.id;
                  const locked = isTrackLocked(t);
                  
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTrackKey(t.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs transition-all duration-300 ${
                        isSelected
                          ? 'bg-blue-50/80 text-blue-800 font-extrabold border-2 border-blue-200 shadow-sm transform scale-[1.02]'
                          : 'text-slate-500 hover:bg-slate-50 font-bold border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                          <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                        </div>
                        <span className="truncate">{t.title}</span>
                      </div>
                      {locked ? (
                        <Lock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      ) : (
                        <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-emerald-500' : 'text-slate-300'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-3 space-y-6 relative">
          
          {/* LECTURES VIEW */}
          {activeArenaTab === 'lectures' && (
            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
              
              {currentTrackLocked ? (
                <div className="bg-white border-2 border-slate-100 rounded-3xl p-10 text-center space-y-5 shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-slate-50 border-4 border-slate-100 text-slate-300 flex items-center justify-center mx-auto shadow-inner">
                    <Lock className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">
                      {UI_COPY.studyArena.lockedTrackTitle(currentTrack.title)}
                    </h3>
                    <p className="text-sm font-semibold text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
                      {UI_COPY.studyArena.lockedTrackDescription}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* PROGRESS HEADER */}
                  <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all">
                    <div className="space-y-1 flex-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded-md inline-block mb-1">
                        TRACK: {currentTrack.title}
                      </span>
                      <h3 className="text-xl font-black text-slate-900">
                        {currentTrack.subtitle || "Track Progress"}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {currentTrack.description}
                      </p>
                    </div>
                    
                    <div className="w-full md:w-64 space-y-2">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-black text-slate-700">Completion</span>
                        <span className="text-2xl font-black text-blue-600">{progressPercent}%</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 text-right">
                        {completedCount} / {totalLectures} Lectures Done
                      </p>
                    </div>
                  </div>

                  {/* LOADING STATE */}
                  {isLoading && (
                    <div className="bg-white rounded-3xl border border-slate-200/60 p-16 shadow-sm flex flex-col items-center justify-center gap-4">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                      <p className="text-sm font-bold text-slate-500">{UI_COPY.studyArena.loadingCourseContent}</p>
                    </div>
                  )}

                  {/* ERROR STATE */}
                  {!isLoading && error && lectures.length === 0 && (
                    <div className="space-y-6">
                      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-amber-900">{UI_COPY.studyArena.playlistUnavailable}</p>
                          <p className="text-xs font-medium text-amber-700 mt-1">{UI_COPY.studyArena.embeddedPlayerNotice}</p>
                        </div>
                      </div>
                      {playlistId && (
                        <div className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden shadow-sm">
                          <div className="aspect-video w-full bg-slate-900 relative">
                            <iframe
                              className="w-full h-full absolute inset-0"
                              src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0`}
                              title="Course Playlist"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* MAIN PLAYER + SIDEBAR */}
                  {!isLoading && lectures.length > 0 && (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                      
                      {/* PLAYER SECTION */}
                      <div className="xl:col-span-2">
                        <div className="bg-white rounded-3xl border border-slate-200/60 overflow-hidden shadow-sm flex flex-col w-full">
                          <div className="aspect-video w-full bg-slate-900 relative">
                            {currentVideoId ? (
                              <iframe
                                key={`${selectedTrackKey}-${currentVideoId}`}
                                className="w-full h-full absolute inset-0"
                                src={`https://www.youtube.com/embed/${currentVideoId}?rel=0&list=${playlistId}`}
                                title={lectures[activeLessonIndex]?.title || 'Course Video'}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <iframe
                                className="w-full h-full absolute inset-0"
                                src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0`}
                                title="Course Playlist"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            )}
                          </div>
                          {/* Now Playing info */}
                          <div className="p-4 border-t border-slate-100">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1">
                              <Play className="w-3 h-3" /> Now Playing ({currentTrack.title})
                            </div>
                            <h4 className="text-sm font-black text-slate-800 leading-snug">
                              {lectures[activeLessonIndex]?.title || 'Select a lecture to play'}
                            </h4>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT SIDEBAR - DYNAMIC LECTURE LIST WITH SEARCH & SHOW ALL */}
                      <div className="xl:col-span-1">
                        <div className="bg-white rounded-3xl border border-slate-200/60 p-5 shadow-sm flex flex-col" style={{ height: 'calc(100%)' }}>
                          <div className="flex items-center justify-between mb-3 px-1">
                            <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                              Lectures
                            </h4>
                            <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-1 rounded-lg">
                              {totalLectures} videos
                            </span>
                          </div>

                          {/* Search Bar for 300+ Videos */}
                          <div className="relative mb-3">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Search lectures by title..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-9 pr-7 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                            />
                            {searchQuery && (
                              <button 
                                onClick={() => setSearchQuery('')}
                                className="absolute right-2.5 top-2 text-xs font-bold text-slate-400 hover:text-slate-600"
                              >
                                ×
                              </button>
                            )}
                          </div>

                          <div className="flex-1 overflow-y-auto pr-1 space-y-1.5" style={{ maxHeight: '500px' }}>
                            {displayedNavItems.length === 0 ? (
                              <div className="p-6 text-center text-xs font-bold text-slate-400">
                                {UI_COPY.studyArena.noLecturesFound(searchQuery)}
                              </div>
                            ) : (
                              displayedNavItems.map((item) => {
                                if (item.type === 'lecture') {
                                  const { lecture, index } = item;
                                  const isDone = completedLessons.includes(lecture.id);
                                  const locked = isLectureLocked(index);
                                  const isActive = activeLessonIndex === index;

                                  return (
                                    <button
                                      key={`lec-${index}`}
                                      disabled={locked}
                                      onClick={() => { if (!locked) setActiveLessonIndex(index); }}
                                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 border relative group ${
                                        locked
                                          ? 'bg-slate-50 border-slate-100 opacity-50 cursor-not-allowed'
                                          : isActive
                                            ? 'bg-blue-50 border-blue-300 shadow-md ring-1 ring-blue-400/30'
                                            : isDone
                                              ? 'bg-emerald-50/50 border-emerald-200/60 hover:border-emerald-300'
                                              : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-sm'
                                      }`}
                                    >
                                      {/* Mark complete button */}
                                      <button
                                        disabled={locked}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (!locked) toggleLessonCompleted(lecture.id);
                                        }}
                                        className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                                          locked
                                            ? 'bg-slate-200 text-slate-400'
                                            : isDone
                                              ? 'bg-emerald-500 text-white shadow-sm'
                                              : 'bg-slate-100 text-slate-300 hover:bg-emerald-100 hover:text-emerald-500'
                                        }`}
                                        title={isDone ? 'Completed' : 'Mark as complete'}
                                      >
                                        {locked ? <Lock className="w-2.5 h-2.5" /> : <CheckCircle2 className="w-3 h-3" />}
                                      </button>

                                      <div className="flex-1 min-w-0">
                                        <div className={`text-[11px] leading-snug truncate ${
                                          locked ? 'font-medium text-slate-400' :
                                          isActive ? 'font-black text-blue-900' :
                                          isDone ? 'font-bold text-emerald-800' :
                                          'font-bold text-slate-700'
                                        }`}>
                                          {/^(session|section|lecture|part|chapter|\d+[\.\-])/i.test(lecture.title.trim()) ? (
                                            lecture.title
                                          ) : (
                                            <>
                                              <span className="text-slate-400 font-mono mr-1.5">{String(index + 1).padStart(2, '0')}.</span>
                                              {lecture.title}
                                            </>
                                          )}
                                        </div>
                                        {lecture.duration && (
                                          <div className="text-[10px] font-semibold text-slate-400 mt-0.5 flex items-center gap-1">
                                            <Clock className="w-2.5 h-2.5" />
                                            {lecture.duration}
                                          </div>
                                        )}
                                      </div>

                                      {isActive && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse mt-2 flex-shrink-0"></div>
                                      )}
                                    </button>
                                  );
                                }

                                // QUIZ ITEM
                                if (item.type === 'quiz') {
                                  const { quizNumber, afterIndex } = item;
                                  const passed = isQuizPassed(quizNumber);
                                  const locked = isLectureLocked(afterIndex);

                                  return (
                                    <div
                                      key={`quiz-${quizNumber}`}
                                      className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                                        passed
                                          ? 'bg-emerald-500/10 border-emerald-300 text-emerald-900'
                                          : locked
                                            ? 'bg-slate-100 border-slate-200 opacity-60'
                                            : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md animate-pulse'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2.5">
                                        <div className={`p-1.5 rounded-lg ${
                                          passed ? 'bg-emerald-500 text-white' : locked ? 'bg-slate-200 text-slate-400' : 'bg-white/20 text-white'
                                        }`}>
                                          <HelpCircle className="w-4 h-4" />
                                        </div>
                                        <div>
                                          <span className="text-xs font-black block">
                                            Quiz Checkpoint #{quizNumber + 1}
                                          </span>
                                          <span className={`text-[10px] font-bold block ${
                                            passed ? 'text-emerald-700' : locked ? 'text-slate-400' : 'text-indigo-100'
                                          }`}>
                                            {passed ? 'Passed (+10 pts)' : locked ? 'Locked (Complete previous lectures)' : 'Required to unlock next lectures'}
                                          </span>
                                        </div>
                                      </div>

                                      {!locked && !passed && (
                                        <button
                                          onClick={() => {
                                            setActiveQuizNumber(quizNumber);
                                            setShowQuiz(true);
                                          }}
                                          className="px-3 py-1.5 bg-white text-indigo-700 hover:bg-indigo-50 font-black text-xs rounded-lg shadow-sm transition-all hover:scale-105 active:scale-95"
                                        >
                                          Start Quiz
                                        </button>
                                      )}

                                      {passed && (
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                      )}
                                    </div>
                                  );
                                }

                                return null;
                              })
                            )}
                          </div>

                          {/* View More / Show All Pagination Controls */}
                          {!searchQuery && navItems.length > 15 && (
                            <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2">
                              {hasMore && (
                                <button
                                  onClick={() => setVisibleLimit(prev => prev + 15)}
                                  className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2"
                                >
                                  <ChevronDown className="w-4 h-4 animate-bounce" />
                                  <span>{UI_COPY.studyArena.viewMoreLectures(Math.min(visibleLimit, navItems.length), navItems.length)}</span>
                                </button>
                              )}

                              <button
                                onClick={() => {
                                  setShowAll(!showAll);
                                  if (showAll) setVisibleLimit(15);
                                }}
                                className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                              >
                                <ListFilter className="w-3.5 h-3.5 text-slate-500" />
                                <span>{showAll ? UI_COPY.studyArena.collapseLectures : UI_COPY.studyArena.showAllLectures(navItems.length)}</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              )}

            </div>
          )}

          {/* ACHIEVEMENTS VIEW */}
          {activeArenaTab === 'achievements' && (
            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-1">Track Achievements & Badges</h3>
                <p className="text-xs font-semibold text-slate-500">Earn badges by completing tracks and passing checkpoints.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  {motifData.achievements.map(ach => {
                    const IconComp = getBadgeIcon(ach.icon);
                    const isUnlocked = completedCount > 0;

                    return (
                      <div
                        key={ach.id}
                        className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                          isUnlocked
                            ? 'bg-gradient-to-br from-blue-50/50 to-indigo-50/50 border-blue-200 shadow-sm'
                            : 'bg-slate-50 border-slate-200 opacity-60'
                        }`}
                      >
                        <div className={`p-3 rounded-xl ${isUnlocked ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-200 text-slate-400'}`}>
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-800">{ach.title}</h4>
                          <p className="text-xs font-medium text-slate-500 mt-1 leading-snug">{ach.description}</p>
                          <span className={`inline-block mt-3 text-[10px] font-black px-2 py-0.5 rounded-md ${
                            isUnlocked ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {isUnlocked ? 'Unlocked' : 'In Progress'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* LEADERBOARD VIEW */}
          {activeArenaTab === 'leaderboard' && (
            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Live Leaderboard</h3>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Real-time rankings based on completed lectures and quiz scores.</p>
                  </div>
                  <div className="px-3 py-1.5 bg-blue-50 rounded-xl text-blue-700 text-xs font-black flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-500" /> Your Bonus: +{quizScoreTotal} pts
                  </div>
                </div>

                <div className="space-y-3">
                  {motifData.leaderboard.map(user => {
                    const effectivePoints = user.isCurrentUser ? user.points + quizScoreTotal : user.points;

                    return (
                      <div
                        key={user.id}
                        className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                          user.isCurrentUser
                            ? 'bg-blue-50/80 border-blue-300 shadow-md ring-1 ring-blue-400/20'
                            : 'bg-white border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center ${
                            user.rank === 1 ? 'bg-amber-400 text-amber-950 shadow-md' :
                            user.rank === 2 ? 'bg-slate-300 text-slate-800' :
                            user.rank === 3 ? 'bg-amber-600 text-white' :
                            'bg-slate-100 text-slate-500'
                          }`}>
                            #{user.rank}
                          </div>

                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-sm">
                            {user.avatarLetter}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-sm text-slate-800">{user.name}</h4>
                              {user.isCurrentUser && (
                                <span className="text-[9px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase">You</span>
                              )}
                            </div>
                            <p className="text-[11px] font-semibold text-slate-400">{user.studentId} · {user.internPerformance}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-lg font-black text-blue-600 block">{effectivePoints} pts</span>
                          <span className="text-[10px] font-bold text-slate-400">{user.projectsCompleted} projects · {user.quizScorePercentage}% quiz</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* OPEN PROJECTS VIEW */}
          {activeArenaTab === 'projects' && (
            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
              <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800/80">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Open Source Projects</h3>
                    <p className="text-xs text-slate-400 mt-1">Contribute code and work on real-world projects with society members.</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProjectForSubmission(null);
                      setIsSubmissionModalOpen(true);
                    }}
                    className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 self-start md:self-auto active:scale-95"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{UI_COPY.projects.contributeNow}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {motifData.openProjects.map((proj) => (
                    <ProjectCard
                      key={proj.id}
                      project={proj}
                      isSubmitted={submittedProjectIds.includes(proj.id)}
                      onOpenDetails={(p) => setSelectedProjectForDetails(p)}
                      onOpenSubmission={(p) => {
                        setSelectedProjectForSubmission(p);
                        setIsSubmissionModalOpen(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EVENTS VIEW */}
          {activeArenaTab === 'events' && (
            <div className="space-y-6 animate-in slide-in-from-right-8 fade-in duration-500">
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 mb-1">Upcoming Events & Workshops</h3>
                <p className="text-xs font-semibold text-slate-500">Join society research talks, hackathons, and guest lectures.</p>

                <div className="space-y-4 mt-6">
                  {motifData.events.map(ev => (
                    <div key={ev.id} className="p-5 rounded-2xl border border-slate-200/80 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                            {ev.type}
                          </span>
                          <span className="text-xs font-bold text-slate-400">{ev.date} at {ev.time}</span>
                        </div>
                        <h4 className="font-extrabold text-base text-slate-800">{ev.title}</h4>
                        <p className="text-xs font-medium text-slate-500">{ev.description}</p>
                      </div>
                      <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-md transition-all hover:scale-105 active:scale-95 self-start md:self-auto">
                        Register Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* FULL SCREEN QUIZ MODAL */}
      {showQuiz && (
        <MotifQuizOverlay
          quiz={getQuizForCheckpoint(currentTrack.id, activeQuizNumber)}
          quizNumber={activeQuizNumber}
          onComplete={handleQuizComplete}
          onSkip={() => setShowQuiz(false)}
        />
      )}

      {/* PROJECT DETAILS MODAL */}
      <ProjectModal
        project={selectedProjectForDetails}
        isOpen={!!selectedProjectForDetails}
        onClose={() => setSelectedProjectForDetails(null)}
        isSubmitted={selectedProjectForDetails ? submittedProjectIds.includes(selectedProjectForDetails.id) : false}
        onContribute={(proj) => {
          setSelectedProjectForSubmission(proj);
          setIsSubmissionModalOpen(true);
        }}
      />

      {/* SUBMISSION FORM MODAL */}
      <SubmissionFormModal
        projects={motifData.openProjects}
        initialProject={selectedProjectForSubmission}
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        onSuccess={handleSubmissionSuccess}
      />

      {/* CONTRIBUTE MODAL */}
      <ContributeModal isOpen={isContributeOpen} onClose={() => setIsContributeOpen(false)} />
    </div>
  );
};
