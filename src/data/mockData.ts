import type { EventItem, UserRegistration, NotificationItem, UserProfile } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  studentId: '25119011132',
  email: '25119011132@stu.manit.ac.in',
  institution: 'NIT Bhopal',
  society: 'AMORPHUS — Materials Science Society',
  department: 'Materials Science & Metallurgical Engineering',
  batch: '2025 - 2029',
  bio: 'Student passionate about computational materials science, atomistic simulations, and AI-driven alloy design.'
};

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Material Modelling Workshop',
    category: 'Computation',
    description: 'Hands-on session on atomistic simulations, molecular dynamics, and computational tools for materials science.',
    date: 'Apr 12, 2026',
    time: '10:00 AM - 04:00 PM',
    venue: 'Seminar Hall',
    status: 'OPEN',
    isTechnical: true,
    speaker: 'Dr. A. Sharma (Head of Computational Materials, NIT Bhopal)',
    organizer: 'Amorphous Computational Division',
    eligibility: 'Open to all NIT Bhopal B.Tech & M.Tech students',
    learnings: [
      'Basics of Density Functional Theory (DFT) and VASP/Quantum Espresso',
      'Molecular Dynamics setup using LAMMPS',
      'Visualizing crystal structures with VESTA',
      'Python scripts for parsing simulation outputs'
    ],
    bannerType: 'computation'
  },
  {
    id: 'evt-2',
    title: 'From Lab to Market',
    category: 'Business',
    description: 'How to translate material innovations into real-world impact. Case studies, startup talks and industry insights.',
    date: 'Apr 18, 2026',
    time: '02:00 PM - 05:00 PM',
    venue: 'Lecture Hall 1',
    status: 'OPEN',
    isTechnical: false,
    speaker: 'Rajiv Malhotra (Founder, NanoMet Technologies)',
    organizer: 'Amorphous Innovation Cell',
    eligibility: 'Open to all students & researchers',
    learnings: [
      'Intellectual property (IP) and patent filing for material synthesis',
      'Scaling up chemical synthesis from benchtop to pilot plant',
      'Venture funding landscape for deeptech startups in India'
    ],
    bannerType: 'business'
  },
  {
    id: 'evt-3',
    title: 'Characterization Techniques 101',
    category: 'Analytical',
    description: 'Introduction to XRD, SEM, TEM and other key characterization methods for microstructural analysis.',
    date: 'Apr 22, 2026',
    time: '11:00 AM - 01:30 PM',
    venue: 'Lab Complex',
    status: 'OPEN',
    isTechnical: true,
    speaker: 'Prof. R. K. Verma (Central Instrument Facility)',
    organizer: 'Amorphous Characterization Wing',
    eligibility: 'Enrolled NIT Bhopal students',
    learnings: [
      'Bragg Law & X-ray diffraction peak indexing',
      'Sample preparation for Scanning Electron Microscopy (SEM)',
      'High-resolution TEM imaging basics',
      'Energy Dispersive X-ray Spectroscopy (EDS) microanalysis'
    ],
    bannerType: 'analytical'
  },
  {
    id: 'evt-4',
    title: 'Current Trends in Advanced Materials',
    category: 'Research',
    description: 'Guest lecture by leading researchers on the latest advances in 2D materials, quantum dots, and metamaterials.',
    date: 'Apr 26, 2026',
    time: '03:00 PM - 05:00 PM',
    venue: 'Seminar Hall',
    status: 'OPEN',
    isTechnical: true,
    speaker: 'Dr. Sunita Rao (Visiting Scientist, IISc)',
    organizer: 'Amorphous Research Forum',
    eligibility: 'Open to all',
    learnings: [
      'Graphene & MXenes synthesis techniques',
      'Applications of topological insulators',
      'Photonic crystal fibers and metamaterials'
    ],
    bannerType: 'research'
  },
  {
    id: 'evt-5',
    title: 'CAD & Simulation Workshop',
    category: 'Workshops',
    description: 'Learn the basics of CAD modelling and finite element analysis (FEA) for structural component design.',
    date: 'May 3, 2026',
    time: '09:30 AM - 01:00 PM',
    venue: 'Computer Lab',
    status: 'OPEN',
    isTechnical: true,
    speaker: 'Er. Vikram Patel (CAD Specialist)',
    organizer: 'Amorphous Design Group',
    eligibility: 'All engineering disciplines welcome',
    learnings: [
      '3D parametric solid modelling in CAD',
      'Meshing techniques and convergence analysis',
      'Stress-strain distribution and failure criteria'
    ],
    bannerType: 'workshops'
  },
  {
    id: 'evt-6',
    title: 'The Future of Sustainable Materials',
    category: 'Talks',
    description: 'A talk on green materials, bio-based polymers, circular economy, and eco-friendly manufacturing.',
    date: 'May 7, 2026',
    time: '04:00 PM - 06:00 PM',
    venue: 'Seminar Hall',
    status: 'OPEN',
    isTechnical: false,
    speaker: 'Dr. Meera Nambiar (Green Chemistry Expert)',
    organizer: 'Amorphous Sustainability Initiative',
    eligibility: 'Open to all',
    learnings: [
      'Biodegradable composite matrices',
      'Life cycle assessment (LCA) tools',
      'Recycling strategies for electronic waste'
    ],
    bannerType: 'talks'
  },
  {
    id: 'evt-7',
    title: 'Materials Characterization 101 (Intro)',
    category: 'Analytical',
    description: 'Practical demo on powder X-ray diffractometer sample preparation and phase identification.',
    date: 'Mar 28, 2026',
    time: '02:00 PM - 04:30 PM',
    venue: 'Seminar Hall',
    status: 'OPEN',
    isTechnical: true,
    speaker: 'Dr. K. N. Gupta',
    organizer: 'Amorphous Society',
    eligibility: 'NIT Bhopal Students',
    learnings: ['Diffraction pattern analysis', 'Phase identification software'],
    bannerType: 'technical'
  },
  {
    id: 'evt-8',
    title: 'Advanced Materials & Applications',
    category: 'Research',
    description: 'Exploring shape memory alloys, high-entropy alloys, and smart material actuation.',
    date: 'Apr 04, 2026',
    time: '10:00 AM - 01:00 PM',
    venue: 'Seminar Hall',
    status: 'OPEN',
    isTechnical: true,
    speaker: 'Prof. S. Dasgupta',
    organizer: 'Amorphous Research Wing',
    eligibility: 'All Students',
    learnings: ['Phase transformations in SMA', 'Multicomponent alloy systems'],
    bannerType: 'research'
  },
  {
    id: 'evt-9',
    title: 'Polymer & Composites',
    category: 'Workshops',
    description: 'Hands-on resin transfer molding and fiber-reinforced composite fabrication workshop.',
    date: 'Apr 12, 2026',
    time: '10:00 AM - 04:00 PM',
    venue: 'Seminar Hall',
    status: 'CLOSED',
    isTechnical: true,
    speaker: 'Dr. P. Roy',
    organizer: 'Amorphous Composites Club',
    eligibility: 'Materials Science Majors',
    learnings: ['Epoxy matrix formulation', 'Tensile test coupon preparation'],
    bannerType: 'workshops'
  }
];

export const INITIAL_USER_REGISTRATIONS: UserRegistration[] = [
  {
    id: 'reg-1',
    eventId: 'evt-101',
    eventTitle: 'Hackathon (Technical)',
    category: 'Competitions',
    registeredDate: 'Mar 10, 2026',
    eventDate: 'Mar 15, 2026',
    venue: 'Computer Center Main Hall',
    status: 'CONFIRMED'
  },
  {
    id: 'reg-2',
    eventId: 'evt-102',
    eventTitle: 'Workshop on Advanced Alloys',
    category: 'Workshops',
    registeredDate: 'Mar 25, 2026',
    eventDate: 'Apr 05, 2026',
    venue: 'Metallurgy Lab 4',
    status: 'PENDING'
  },
  {
    id: 'reg-3',
    eventId: 'evt-3',
    eventTitle: 'Characterization Techniques 101',
    category: 'Analytical',
    registeredDate: 'Mar 28, 2026',
    eventDate: 'Apr 22, 2026',
    venue: 'Lab Complex',
    status: 'CONFIRMED'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Registration confirmed',
    message: 'Your registration for Material Modelling Workshop is confirmed.',
    date: '10 mins ago',
    read: false,
    type: 'success'
  },
  {
    id: 'notif-2',
    title: 'New event announced',
    message: 'Characterization Techniques 101 is now open for registration.',
    date: '2 hours ago',
    read: false,
    type: 'info'
  },
  {
    id: 'notif-3',
    title: 'Upcoming event reminder',
    message: 'Your registered event Hackathon (Technical) starts in 3 days.',
    date: '1 day ago',
    read: true,
    type: 'alert'
  }
];
