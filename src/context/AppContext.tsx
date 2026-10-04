import React, { createContext, useContext, useState } from 'react';
import type { 
  EventItem, 
  UserRegistration, 
  NotificationItem, 
  UserProfile, 
  CategoryType,
  CourseTrack,
  BadgeItem,
  LeaderboardEntry,
  ContributionItem
} from '../types';
import { MOCK_EVENTS, INITIAL_USER_REGISTRATIONS, INITIAL_NOTIFICATIONS, INITIAL_USER_PROFILE } from '../data/mockData';
import { INITIAL_COURSE_TRACKS, INITIAL_BADGES, INITIAL_LEADERBOARD, INITIAL_CONTRIBUTIONS } from '../data/arenaMockData';


interface AppContextType {
  activePath: string;
  setActivePath: (path: string) => void;
  events: EventItem[];
  registrations: UserRegistration[];
  notifications: NotificationItem[];
  userProfile: UserProfile;
  activeCategory: CategoryType;
  setActiveCategory: (cat: CategoryType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'Upcoming' | 'Newest' | 'A-Z';
  setSortBy: (sort: 'Upcoming' | 'Newest' | 'A-Z') => void;
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  registerEvent: (eventId: string) => void;
  cancelRegistration: (registrationId: string) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Study Arena (Motif) State & Actions
  tracks: CourseTrack[];
  badges: BadgeItem[];
  leaderboard: LeaderboardEntry[];
  contributions: ContributionItem[];
  activeArenaTab: 'lectures' | 'achievements' | 'leaderboard' | 'projects' | 'events';
  setActiveArenaTab: (tab: 'lectures' | 'achievements' | 'leaderboard' | 'projects' | 'events') => void;
  selectedTrackKey: string;
  setSelectedTrackKey: (key: string) => void;
  isMotifWarping: boolean;
  openMotifArena: () => void;
  completedLessons: string[];
  toggleLessonCompleted: (lessonId: string) => void;
  addContribution: (item: Omit<ContributionItem, 'id' | 'submittedDate' | 'status'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePath, setActivePath] = useState<string>('/dashboard');
  const [events] = useState<EventItem[]>(MOCK_EVENTS);
  const [registrations, setRegistrations] = useState<UserRegistration[]>(INITIAL_USER_REGISTRATIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'Upcoming' | 'Newest' | 'A-Z'>('Upcoming');
  
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [tracks] = useState<CourseTrack[]>(INITIAL_COURSE_TRACKS);
  const [badges] = useState<BadgeItem[]>(INITIAL_BADGES);
  const [leaderboard] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);
  const [contributions, setContributions] = useState<ContributionItem[]>(INITIAL_CONTRIBUTIONS);
  const [activeArenaTab, setActiveArenaTab] = useState<'lectures' | 'achievements' | 'leaderboard' | 'projects' | 'events'>('lectures');
  const [selectedTrackKey, setSelectedTrackKey] = useState<string>('data-science');
  const [isMotifWarping, setIsMotifWarping] = useState<boolean>(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const registerEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    const exists = registrations.some(r => r.eventId === eventId || r.eventTitle === event.title);
    if (exists) return;

    const newReg: UserRegistration = {
      id: `reg-${Date.now()}`,
      eventId: event.id,
      eventTitle: event.title,
      category: event.category,
      registeredDate: 'Today',
      eventDate: event.date,
      venue: event.venue,
      status: 'CONFIRMED'
    };

    setRegistrations(prev => [newReg, ...prev]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Registration confirmed',
      message: `Your registration for "${event.title}" is confirmed.`,
      date: 'Just now',
      read: false,
      type: 'success'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const cancelRegistration = (registrationId: string) => {
    setRegistrations(prev => prev.filter(r => r.id !== registrationId));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const updateUserProfile = (updated: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updated }));
  };

  // Trigger Motif Portal Warp Animation to enter Study Arena
  const openMotifArena = () => {
    setIsMotifWarping(true);
    setTimeout(() => {
      setActivePath('/study-arena');
      setIsMotifWarping(false);
    }, 900);
  };

  // Toggle video completed status & calculate track progress + unlock prerequisites
  const toggleLessonCompleted = (lessonId: string) => {
    setCompletedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const addContribution = (item: Omit<ContributionItem, 'id' | 'submittedDate' | 'status'>) => {
    const newContrib: ContributionItem = {
      ...item,
      id: `contrib-${Date.now()}`,
      submittedDate: 'Just now',
      status: 'APPROVED'
    };
    setContributions(prev => [newContrib, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-contrib-${Date.now()}`,
      title: 'Contribution Received!',
      message: `Your ${item.type.toUpperCase()} contribution "${item.title}" has been published to the Open Projects hub.`,
      date: 'Just now',
      read: false,
      type: 'success'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        activePath,
        setActivePath,
        events,
        registrations,
        notifications,
        userProfile,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        selectedEventId,
        setSelectedEventId,
        searchModalOpen,
        setSearchModalOpen,
        theme,
        toggleTheme,
        registerEvent,
        cancelRegistration,
        markNotificationAsRead,
        clearAllNotifications,
        updateUserProfile,

        // Study Arena
        tracks,
        badges,
        leaderboard,
        contributions,
        activeArenaTab,
        setActiveArenaTab,
        selectedTrackKey,
        setSelectedTrackKey,
        isMotifWarping,
        openMotifArena,
        completedLessons,
        toggleLessonCompleted,
        addContribution
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
