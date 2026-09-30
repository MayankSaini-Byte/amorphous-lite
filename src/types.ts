export type CategoryType = 
  | 'All'
  | 'Computation'
  | 'Business'
  | 'Analytical'
  | 'Research'
  | 'Workshops'
  | 'Talks'
  | 'Competitions'
  | 'Others';

export type EventStatus = 'OPEN' | 'CLOSED' | 'UPCOMING';

export type RegistrationStatus = 'CONFIRMED' | 'PENDING' | 'COMPLETED' | 'CANCELLED';

export interface EventItem {
  id: string;
  title: string;
  category: CategoryType;
  description: string;
  date: string;
  time?: string;
  venue: string;
  status: EventStatus;
  isTechnical?: boolean;
  speaker?: string;
  organizer?: string;
  eligibility?: string;
  learnings?: string[];
  bannerType: 'computation' | 'business' | 'analytical' | 'research' | 'workshops' | 'talks' | 'technical';
}

export interface UserRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  category: CategoryType;
  registeredDate: string;
  eventDate: string;
  venue: string;
  status: RegistrationStatus;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'success' | 'alert';
}

export interface UserProfile {
  studentId: string;
  email: string;
  institution: string;
  society: string;
  department: string;
  batch: string;
  bio: string;
}

// =========================================
// MOTIF STUDY ARENA TYPES
// =========================================

export type TrackKey = 
  | 'python'       // Data Science with Python
  | 'ml'           // Electronics with Machine Learning
  | 'cv'           // Management with Computer Vision
  | 'materials'    // Material Science
  | 'aero';        // Aeronautics with Open Projects

export interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
  duration: string;
  completed: boolean;
}

export interface CourseTrack {
  id: string;
  key: TrackKey;
  title: string;
  category: string;
  description: string;
  isLocked: boolean;
  prerequisiteKey?: TrackKey;
  prerequisiteTitle?: string;
  playlistUrl: string;
  youtubeEmbedPlaylistId: string;
  videos: VideoItem[];
}

export interface BadgeItem {
  id: string;
  title: string;
  trackKey: TrackKey;
  description: string;
  earnedDate?: string;
  isUnlocked: boolean;
  certificateUrl?: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  studentId: string;
  points: number;
  projectsCompleted: number;
  quizScorePercentage: number;
  internPerformance: string;
  avatarLetter: string;
  isCurrentUser?: boolean;
}

export type ContributionType = 'idea' | 'pdf' | 'text';

export interface ContributionItem {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  type: ContributionType;
  description: string;
  fileOrUrl?: string;
  submittedDate: string;
  status: 'PENDING' | 'APPROVED' | 'FEATURED';
}
