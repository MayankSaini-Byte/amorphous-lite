import type { CourseTrack, BadgeItem, LeaderboardEntry, ContributionItem } from '../types';

export const RECRUITMENT_ANNOUNCEMENTS = [
  {
    id: 'rec-1',
    status: 'OPEN' as const,
    title: 'Amorphous Core Team Recruitment 2026',
    department: 'Computational & ML Division',
    deadline: 'Oct 15, 2026',
    description: 'We are hiring core leads for Python, Atomistic Simulations, and AI Alloy research.',
    joinLinks: [
      { label: 'Join WhatsApp Group', url: 'https://chat.whatsapp.com/demo', type: 'whatsapp' },
      { label: 'Join Society Discord', url: 'https://discord.gg/demo', type: 'discord' },
      { label: 'Apply Core Member', url: '#apply', type: 'primary' }
    ]
  },
  {
    id: 'rec-2',
    status: 'OPEN' as const,
    title: 'Open Project Contributors Wanted',
    department: 'Aeronautics & Advanced Materials Cell',
    deadline: 'Oct 20, 2026',
    description: 'Submit your papers, CAD designs, or code ideas to earn society credits.',
    joinLinks: [
      { label: 'Contribute Now', url: '#contribute', type: 'primary' },
      { label: 'Join Telegram Channel', url: 'https://t.me/demo', type: 'telegram' }
    ]
  },
  {
    id: 'rec-3',
    status: 'CLOSED' as const,
    title: 'Fall Metallurgy Internship Drive',
    department: 'Characterization Wing',
    deadline: 'Ended Sep 28, 2026',
    description: 'Selections complete for XRD & SEM research interns. Next drive in Spring.',
    joinLinks: [
      { label: 'View Selected Interns', url: '#leaderboard', type: 'secondary' }
    ]
  }
];

export const INITIAL_COURSE_TRACKS: CourseTrack[] = [
  {
    id: 'track-python',
    key: 'python',
    title: 'Data Science with Python',
    category: 'Prerequisite Core',
    description: 'Master Data Analysis, NumPy, Pandas, and Matplotlib for material datasets.',
    isLocked: false,
    playlistUrl: 'https://www.youtube.com/playlist?list=PL-osiE80TeTskrapNbzXhwoFUiLCjGgUb',
    youtubeEmbedPlaylistId: 'PL-osiE80TeTskrapNbzXhwoFUiLCjGgUb',
    videos: [
      { id: 'v-py-1', title: '1. Python Data Analysis for Materials Setup', youtubeId: '_uQrJ0TkZlc', duration: '18:45', completed: true },
      { id: 'v-py-2', title: '2. NumPy Arrays & Crystal Lattice Arrays', youtubeId: 'QUT1VHiLg5w', duration: '24:10', completed: true },
      { id: 'v-py-3', title: '3. Pandas DataFrames for XRD & Stress-Strain Curves', youtubeId: 'vmEHCJofslg', duration: '32:15', completed: true },
      { id: 'v-py-4', title: '4. Matplotlib & Seaborn Material Property Plots', youtubeId: 'UO98lQq3Q9s', duration: '28:30', completed: true },
    ]
  },
  {
    id: 'track-ml',
    key: 'ml',
    title: 'Electronics with Machine Learning',
    category: 'Material Science Sub-track',
    description: 'Supervised & Unsupervised ML algorithms for predicting alloy phase stability.',
    isLocked: false, // Unlocked because Python is 100% completed
    prerequisiteKey: 'python',
    prerequisiteTitle: 'Data Science with Python',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLqTz8QbfHwfD9wT6nJpZJcZJjQ',
    youtubeEmbedPlaylistId: 'PLqTz8QbfHwfD9wT6nJpZJcZJjQ',
    videos: [
      { id: 'v-ml-1', title: '1. ML in Metallurgy & Semiconductor Physics', youtubeId: '7eh4d6sabA0', duration: '22:15', completed: true },
      { id: 'v-ml-2', title: '2. Linear & Ridge Regression for Thermal Conductivity', youtubeId: 'nk2CQITm_eo', duration: '30:40', completed: false },
      { id: 'v-ml-3', title: '3. Decision Trees for Microstructure Classification', youtubeId: 'RmajweUFKvM', duration: '35:20', completed: false },
    ]
  },
  {
    id: 'track-cv',
    key: 'cv',
    title: 'Management with Computer Vision',
    category: 'Material Science Sub-track',
    description: 'Convolutional Neural Networks (CNNs) for grain boundary segmentation & defect detection.',
    isLocked: true, // Locked until ML track is 100% completed
    prerequisiteKey: 'ml',
    prerequisiteTitle: 'Electronics with Machine Learning',
    playlistUrl: 'https://www.youtube.com/playlist?list=PLgNJO2hghbmiXg5d4X8D0GzQ60-hD',
    youtubeEmbedPlaylistId: 'PLgNJO2hghbmiXg5d4X8D0GzQ60-hD',
    videos: [
      { id: 'v-cv-1', title: '1. Microstructural Image Processing with OpenCV', youtubeId: 'oXlwWbU8l2o', duration: '25:00', completed: false },
      { id: 'v-cv-2', title: '2. CNNs for Automated SEM Defect Detection', youtubeId: 'py5LqJ5c8', duration: '40:10', completed: false },
    ]
  },
  {
    id: 'track-materials',
    key: 'materials',
    title: 'Material Science Core',
    category: 'Fundamental Track',
    description: 'Thermodynamics, Kinetics, Diffraction, and Phase Transformations.',
    isLocked: false,
    playlistUrl: 'https://www.youtube.com/playlist?list=PLbRMhDVUMngfdE97N4P6U4QWz1',
    youtubeEmbedPlaylistId: 'PLbRMhDVUMngfdE97N4P6U4QWz1',
    videos: [
      { id: 'v-mat-1', title: '1. Phase Diagrams & Lever Rule Calculation', youtubeId: '2b3xG_cR16s', duration: '29:50', completed: true },
      { id: 'v-mat-2', title: '2. Crystal Systems & Miller Indices', youtubeId: '6b6t_tT8', duration: '33:15', completed: false },
    ]
  },
  {
    id: 'track-aero',
    key: 'aero',
    title: 'Aeronautics with Open Projects',
    category: 'Specialization Track',
    description: 'High-temperature superalloys, composite airframes, and space structural materials.',
    isLocked: false,
    playlistUrl: 'https://www.youtube.com/playlist?list=PLc6N0k_g1',
    youtubeEmbedPlaylistId: 'PLc6N0k_g1',
    videos: [
      { id: 'v-aero-1', title: '1. Superalloys for Jet Turbine Blades', youtubeId: 'a1b2c3d4e5f', duration: '27:10', completed: true },
      { id: 'v-aero-2', title: '2. Carbon Fiber Reinforced Composites in Aerospace', youtubeId: 'f5e4d3c2b1a', duration: '31:40', completed: false },
    ]
  }
];

export const INITIAL_BADGES: BadgeItem[] = [
  {
    id: 'badge-1',
    title: 'Python Data Science Master',
    trackKey: 'python',
    description: 'Completed Data Science with Python for Material Modeling.',
    earnedDate: 'Sep 24, 2026',
    isUnlocked: true,
    certificateUrl: 'AMORPHUS_CERT_PYTHON_25119011132.pdf'
  },
  {
    id: 'badge-2',
    title: 'Machine Learning Innovator',
    trackKey: 'ml',
    description: 'Trained supervised ML models for alloy phase stability.',
    earnedDate: undefined,
    isUnlocked: false
  },
  {
    id: 'badge-3',
    title: 'Computer Vision Visionary',
    trackKey: 'cv',
    description: 'Automated SEM microstructure defect detection via CNNs.',
    earnedDate: undefined,
    isUnlocked: false
  },
  {
    id: 'badge-4',
    title: 'Material Science Fundamentals',
    trackKey: 'materials',
    description: 'Mastered crystallography & phase equilibrium thermodynamics.',
    earnedDate: 'Sep 10, 2026',
    isUnlocked: true,
    certificateUrl: 'AMORPHUS_CERT_MATSCI_25119011132.pdf'
  },
  {
    id: 'badge-5',
    title: 'Aerospace Composite Pioneer',
    trackKey: 'aero',
    description: 'Contributed open project research for high-temp aero materials.',
    earnedDate: undefined,
    isUnlocked: false
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Saransh Saini', studentId: '25119011002', points: 2850, projectsCompleted: 8, quizScorePercentage: 98, internPerformance: 'Outstanding (S Grade)', avatarLetter: 'S' },
  { rank: 2, name: 'Sneha Sarkar', studentId: '25119011045', points: 2640, projectsCompleted: 7, quizScorePercentage: 95, internPerformance: 'Excellent (A+ Grade)', avatarLetter: 'S' },
  { rank: 3, name: 'Student 25119011132 (You)', studentId: '25119011132', points: 2420, projectsCompleted: 6, quizScorePercentage: 92, internPerformance: 'High Performer (A Grade)', avatarLetter: 'A', isCurrentUser: true },
  { rank: 4, name: 'Ananya Verma', studentId: '25119011088', points: 2150, projectsCompleted: 5, quizScorePercentage: 89, internPerformance: 'Proficient (B+ Grade)', avatarLetter: 'A' },
  { rank: 5, name: 'Rohan Mehta', studentId: '25119011110', points: 1980, projectsCompleted: 4, quizScorePercentage: 86, internPerformance: 'Active Contributor', avatarLetter: 'R' },
  { rank: 6, name: 'Priya Nair', studentId: '25119011034', points: 1760, projectsCompleted: 4, quizScorePercentage: 84, internPerformance: 'Active Contributor', avatarLetter: 'P' },
];

export const INITIAL_CONTRIBUTIONS: ContributionItem[] = [
  {
    id: 'contrib-1',
    studentId: '25119011132',
    studentName: '25119011132',
    title: 'High-Entropy Alloy Phase Predictor using PyTorch',
    type: 'idea',
    description: 'Proposal for training graph neural networks on crystal structure lattice parameters.',
    fileOrUrl: 'https://github.com/amorphus-nitb/hea-predictor-demo',
    submittedDate: 'Sep 27, 2026',
    status: 'FEATURED'
  },
  {
    id: 'contrib-2',
    studentId: '25119011045',
    studentName: 'Sneha Sarkar',
    title: 'TEM Sample Preparation Protocol PDF',
    type: 'pdf',
    description: 'Comprehensive step-by-step guide for electropolishing metallic foil samples.',
    fileOrUrl: 'tem_preparation_protocol_v2.pdf',
    submittedDate: 'Sep 20, 2026',
    status: 'APPROVED'
  }
];
