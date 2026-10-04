export interface MotifArena {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  contributeLabel: string;
}

export interface MotifPlaylist {
  url: string;
  platform: string;
}

export interface CustomLesson {
  id?: string;
  videoId: string;
  title: string;
  duration?: string;
  thumbnail?: string;
}

export interface MotifTrack {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'active' | 'available' | 'coming-soon';
  locked: boolean;
  prerequisiteTrackId?: string;
  color: string;
  playlistUrl: string;
  customLessons?: CustomLesson[];
}

export interface MotifAchievementRequired {
  type: string;
  trackId?: string;
  moduleId?: string;
}

export interface MotifAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  required: MotifAchievementRequired;
}

export interface MotifLeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  studentId: string;
  points: number;
  projectsCompleted: number;
  quizScorePercentage: number;
  internPerformance: string;
  avatarLetter: string;
  isCurrentUser: boolean;
}

export type ProjectStatus = 'open' | 'closed' | 'coming_soon';
export type SubmissionType = 'idea_proposal' | 'text_file' | 'github_repo';

export interface ProjectContributor {
  name: string;
  role: string;
  joinedAt?: string;
  avatarLetter?: string;
}

export interface MotifOpenProject {
  id: string;
  title: string;
  domain: string;
  difficulty: string;
  status: ProjectStatus | string;
  contributors?: ProjectContributor[] | number;
  maxContributors?: number;
  deadline?: string;
  submissionTypes?: SubmissionType[];
  technologies: string[];
  description: string;
  longDescription?: string;
  goals?: string[];
  requirements?: string[];
  resourceLinks?: Array<{ label: string; url: string }>;
  repositoryUrl?: string;
  contributeUrl?: string;
}

export interface MotifEvent {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  speaker: string;
  description: string;
  registrationUrl: string;
  status: string;
}

export interface MotifData {
  arena: MotifArena;
  playlist: MotifPlaylist;
  tracks: MotifTrack[];
  achievements: MotifAchievement[];
  leaderboard: MotifLeaderboardEntry[];
  openProjects: MotifOpenProject[];
  events: MotifEvent[];
}
