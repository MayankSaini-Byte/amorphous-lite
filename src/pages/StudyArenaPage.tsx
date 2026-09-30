import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  Trophy, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  PlayCircle, 
  Sparkles, 
  ExternalLink, 
  Download, 
  ArrowLeft, 
  Code, 
  Briefcase, 
  BarChart3, 
  Atom, 
  Plane,
  Upload
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { TrackKey } from '../types';
import { ContributeModal } from '../components/ContributeModal';

export const StudyArenaPage: React.FC = () => {
  const { 
    setActivePath, 
    tracks, 
    badges, 
    leaderboard, 
    contributions,
    activeArenaTab, 
    setActiveArenaTab, 
    selectedTrackKey, 
    setSelectedTrackKey,
    toggleVideoCompleted
  } = useApp();

  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isContributeOpen, setIsContributeOpen] = useState<boolean>(false);

  const currentTrack = tracks.find(t => t.key === selectedTrackKey) || tracks[0];
  const activeVideo = currentTrack.videos.find(v => v.id === activeVideoId) || currentTrack.videos[0];

  // Calculate lecture progress
  const completedVideosCount = currentTrack.videos.filter(v => v.completed).length;
  const progressPercent = Math.round((completedVideosCount / currentTrack.videos.length) * 100);

  const getTrackIcon = (key: TrackKey) => {
    switch (key) {
      case 'python': return Code;
      case 'ml': return Briefcase;
      case 'cv': return BarChart3;
      case 'materials': return Atom;
      case 'aero': return Plane;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 min-h-[calc(100vh-6rem)]">

      {/* TOP ARENA HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 p-6 rounded-3xl text-white shadow-xl border border-blue-800/60">
        <div className="space-y-1">
          <button
            onClick={() => setActivePath('/profile')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-white transition-colors mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Profile</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-600/30 border border-blue-400/30 text-cyan-300 shadow-inner">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                MOTIF STUDY ARENA
              </h1>
              <p className="text-xs text-blue-200 font-medium">
                NIT Bhopal Materials Science Society • Interactive Lectures, Certifications & Leaderboard
              </p>
            </div>
          </div>
        </div>

        {/* Global Contribution Button */}
        <button
          onClick={() => setIsContributeOpen(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 self-start md:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Contribute Open Project</span>
        </button>
      </div>

      {/* TWO COLUMN ARENA LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* ARENA SIDEBAR (3 MAIN SECTIONS) */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200/80 p-4 space-y-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase px-2">
              STUDY ARENA SECTIONS
            </h4>

            <nav className="space-y-1.5">
              {/* 1. Lectures */}
              <button
                onClick={() => setActiveArenaTab('lectures')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-xs transition-all ${
                  activeArenaTab === 'lectures'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>1. Lectures</span>
              </button>

              {/* 2. Achievements */}
              <button
                onClick={() => setActiveArenaTab('achievements')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs transition-all ${
                  activeArenaTab === 'achievements'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4" />
                  <span>2. Achievements</span>
                </div>
                <span className="px-2 py-0.5 text-[9px] rounded-full bg-amber-400 text-slate-900 font-extrabold">
                  {badges.filter(b => b.isUnlocked).length} Badges
                </span>
              </button>

              {/* 3. Leaderboard */}
              <button
                onClick={() => setActiveArenaTab('leaderboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-xs transition-all ${
                  activeArenaTab === 'leaderboard'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>3. Leaderboard</span>
              </button>
            </nav>
          </div>

          {/* COURSE TRACK SELECTOR INSIDE SIDEBAR WHEN IN LECTURES TAB */}
          {activeArenaTab === 'lectures' && (
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h5 className="text-[10px] font-extrabold tracking-widest text-slate-400 uppercase px-2">
                LECTURE TRACKS
              </h5>

              <div className="space-y-1">
                {tracks.map(t => {
                  const Icon = getTrackIcon(t.key);
                  const isSelected = selectedTrackKey === t.key;

                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTrackKey(t.key)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all ${
                        isSelected
                          ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200'
                          : 'text-slate-600 hover:bg-slate-50 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${t.isLocked ? 'text-slate-400' : 'text-blue-600'}`} />
                        <span className="truncate">{t.title}</span>
                      </div>

                      {t.isLocked ? (
                        <Lock className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                      ) : (
                        <Unlock className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* MAIN DISPLAY CONTENT */}
        <div className="lg:col-span-3 space-y-6">

          {/* TAB 1: LECTURES VIEW */}
          {activeArenaTab === 'lectures' && (
            <div className="space-y-6 animate-in fade-in duration-200">

              {/* COURSE TRACK SELECTOR BAR */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {tracks.map(t => {
                  const Icon = getTrackIcon(t.key);
                  const isSelected = selectedTrackKey === t.key;

                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTrackKey(t.key)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex-shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                          : t.isLocked
                          ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{t.title}</span>
                      {t.isLocked && <Lock className="w-3.5 h-3.5 text-rose-400 ml-1" />}
                    </button>
                  );
                })}
              </div>

              {/* LOCKED WARNING BANNER IF SELECTED TRACK IS LOCKED */}
              {currentTrack.isLocked ? (
                <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 text-center space-y-4 shadow-xs">
                  <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                    <Lock className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-rose-950">
                      {currentTrack.title} is Currently Locked!
                    </h3>
                    <p className="text-xs font-semibold text-rose-700 mt-1 max-w-md mx-auto">
                      Prerequisite Required: You must first complete 100% of the lectures in{' '}
                      <span className="font-bold underline">{currentTrack.prerequisiteTitle}</span> to unlock this module.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (currentTrack.prerequisiteKey) setSelectedTrackKey(currentTrack.prerequisiteKey);
                    }}
                    className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    Go to Prerequisite Module →
                  </button>
                </div>
              ) : (
                /* UNLOCKED LECTURE CONTENT */
                <div className="space-y-6">

                  {/* PROGRESS BAR SECTION (HOW MUCH OF THE LECTURE HAVE YOU DONE?) */}
                  <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600">
                          MODULE PROGRESS BAR
                        </span>
                        <h3 className="text-base font-extrabold text-[#102A5C]">
                          How much of the lecture have you done?
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-blue-600">{progressPercent}%</span>
                        <p className="text-[10px] font-bold text-slate-400">
                          {completedVideosCount} / {currentTrack.videos.length} Videos Done
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-500 font-medium pt-1">
                      {progressPercent === 100
                        ? '🎉 Congratulations! You have completed all videos in this module and unlocked dependent tracks & badge!'
                        : 'Check off completed videos in the list below to update your progress bar.'}
                    </p>
                  </div>

                  {/* VIDEO PLAYER & PLAYLIST EMBED */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left 2 Cols: Main YouTube Video Player */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-5 space-y-4 shadow-xs">
                      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 shadow-md">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=0`}
                          title={activeVideo.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-extrabold text-[#102A5C]">
                            {activeVideo.title}
                          </h4>
                          <p className="text-xs text-slate-400 font-medium">Duration: {activeVideo.duration}</p>
                        </div>

                        <button
                          onClick={() => toggleVideoCompleted(activeVideo.id)}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            activeVideo.completed
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{activeVideo.completed ? 'Completed ✓' : 'Mark Completed'}</span>
                        </button>
                      </div>

                      {/* Designated Embed Playlist Link Info */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 font-medium flex items-center justify-between">
                        <span>Configured YouTube Playlist Embed ID: <code className="text-blue-600 font-mono font-bold">{currentTrack.youtubeEmbedPlaylistId}</code></span>
                        <a
                          href={currentTrack.playlistUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline font-bold flex items-center gap-1"
                        >
                          <span>Open YouTube Playlist</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Right 1 Col: Playlist Video Selector */}
                    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 space-y-3 shadow-xs">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                        Course Video Playlist ({currentTrack.videos.length})
                      </h4>

                      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                        {currentTrack.videos.map(v => {
                          const isCurrent = v.id === activeVideo.id;
                          return (
                            <div
                              key={v.id}
                              onClick={() => setActiveVideoId(v.id)}
                              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                                isCurrent
                                  ? 'bg-blue-50 border-blue-300 shadow-2xs'
                                  : 'bg-slate-50/70 border-slate-100 hover:bg-slate-100'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 truncate pr-2">
                                <PlayCircle className={`w-4 h-4 flex-shrink-0 ${isCurrent ? 'text-blue-600' : 'text-slate-400'}`} />
                                <span className={`text-xs truncate ${isCurrent ? 'font-bold text-[#102A5C]' : 'font-medium text-slate-700'}`}>
                                  {v.title}
                                </span>
                              </div>

                              <input
                                type="checkbox"
                                checked={v.completed}
                                onChange={() => toggleVideoCompleted(v.id)}
                                onClick={(e) => e.stopPropagation()}
                                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* OPEN PROJECTS & CONTRIBUTIONS SECTION (Specially for Aeronautics / Open Track) */}
                  <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white space-y-4 shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-extrabold tracking-widest text-cyan-300 uppercase">
                          OPEN PROJECTS & RESEARCH HUB
                        </span>
                        <h3 className="text-xl font-extrabold text-white">
                          Aeronautics & Open Research Contributions
                        </h3>
                        <p className="text-xs text-blue-200 mt-1">
                          Share your research ideas, submit PDF papers, or contribute code openly to the society.
                        </p>
                      </div>

                      <button
                        onClick={() => setIsContributeOpen(true)}
                        className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all self-start sm:self-auto"
                      >
                        + Contribute Idea / PDF
                      </button>
                    </div>

                    {/* Contributions Feed */}
                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {contributions.map(item => (
                        <div key={item.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-xs space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                              {item.type}
                            </span>
                            <span className="text-[10px] text-slate-300">{item.submittedDate}</span>
                          </div>
                          <h4 className="font-bold text-white">{item.title}</h4>
                          <p className="text-[11px] text-slate-300 line-clamp-2">{item.description}</p>
                          <p className="text-[10px] font-semibold text-cyan-300 pt-1">By {item.studentName}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* TAB 2: ACHIEVEMENTS & CERTIFICATES VIEW */}
          {activeArenaTab === 'achievements' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-2 shadow-xs">
                <div className="inline-flex items-center gap-2 text-[10px] font-extrabold tracking-widest text-blue-600 uppercase">
                  <span className="w-3 h-0.5 bg-blue-600" />
                  <span>BADGES & CERTIFICATIONS</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#102A5C]">
                  Motif Badges & Verified Certificates
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Earn society badges and download official certificates by completing 100% of lecture modules.
                </p>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {badges.map(b => (
                  <div
                    key={b.id}
                    className={`rounded-3xl border p-6 space-y-4 transition-all flex flex-col justify-between ${
                      b.isUnlocked
                        ? 'bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/40 border-blue-200 shadow-md'
                        : 'bg-slate-50 border-slate-200 opacity-70'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-2xl border ${
                          b.isUnlocked ? 'bg-blue-600 text-white border-blue-500 shadow-md' : 'bg-slate-200 text-slate-500'
                        }`}>
                          <Award className="w-6 h-6" />
                        </div>

                        <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          b.isUnlocked ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {b.isUnlocked ? 'UNLOCKED BADGE' : 'LOCKED'}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-extrabold text-[#102A5C]">
                          {b.title}
                        </h3>
                        <p className="text-xs font-medium text-slate-500 mt-1">
                          {b.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-semibold">
                        {b.earnedDate ? `Earned on ${b.earnedDate}` : 'Complete 100% videos to unlock'}
                      </span>

                      {b.isUnlocked && (
                        <button
                          onClick={() => alert(`Downloading verified certificate: ${b.certificateUrl}`)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Certificate</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LEADERBOARD VIEW */}
          {activeArenaTab === 'leaderboard' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 space-y-2 shadow-xs">
                <div className="inline-flex items-center gap-2 text-[10px] font-extrabold tracking-widest text-blue-600 uppercase">
                  <span className="w-3 h-0.5 bg-blue-600" />
                  <span>SOCIETY PERFORMANCE RANKINGS</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#102A5C]">
                  Motif Society Leaderboard
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Rankings based on open project completion, lecture quizzes, and society intern performance.
                </p>
              </div>

              {/* Leaderboard Table */}
              <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase font-extrabold text-[10px] tracking-wider">
                        <th className="py-3.5 px-4">Rank</th>
                        <th className="py-3.5 px-4">Student</th>
                        <th className="py-3.5 px-4 text-center">Points</th>
                        <th className="py-3.5 px-4 text-center">Projects</th>
                        <th className="py-3.5 px-4 text-center">Quiz Score</th>
                        <th className="py-3.5 px-4">Intern Performance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                      {leaderboard.map(item => (
                        <tr
                          key={item.rank}
                          className={`hover:bg-blue-50/50 transition-colors ${
                            item.isCurrentUser ? 'bg-blue-50/80 font-bold border-l-4 border-blue-600' : ''
                          }`}
                        >
                          <td className="py-4 px-4 font-black text-sm">
                            {item.rank === 1 && '🥇 #1'}
                            {item.rank === 2 && '🥈 #2'}
                            {item.rank === 3 && '🥉 #3'}
                            {item.rank > 3 && `#${item.rank}`}
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                                {item.avatarLetter}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900">
                                  {item.name} {item.isCurrentUser && '(You)'}
                                </p>
                                <p className="text-[10px] text-slate-400 font-medium">{item.studentId}</p>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4 text-center font-black text-blue-600">
                            {item.points} pts
                          </td>

                          <td className="py-4 px-4 text-center">
                            {item.projectsCompleted} Projects
                          </td>

                          <td className="py-4 px-4 text-center text-emerald-600 font-bold">
                            {item.quizScorePercentage}%
                          </td>

                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-100">
                              {item.internPerformance}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* CONTRIBUTE POPUP MODAL */}
      <ContributeModal
        isOpen={isContributeOpen}
        onClose={() => setIsContributeOpen(false)}
      />
    </div>
  );
};
