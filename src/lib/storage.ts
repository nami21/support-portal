// Local storage service for managing application data
import { User, FAQ, Announcement, SystemUpdate, Ticket, ChatMessage, OtherDocument, TrainingMaterial } from '../types';

// Storage keys
const STORAGE_KEYS = {
  USERS: 'support_hub_users',
  FAQS: 'support_hub_faqs',
  ANNOUNCEMENTS: 'support_hub_announcements',
  SYSTEM_UPDATES: 'support_hub_system_updates',
  TICKETS: 'support_hub_tickets',
  CHAT_MESSAGES: 'support_hub_chat_messages',
  OTHER_DOCUMENTS: 'support_hub_other_documents',
  TRAINING_MATERIALS: 'support_hub_training_materials',
  INITIALIZED: 'support_hub_initialized'
};

// Helper functions
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const getFromStorage = <T>(key: string, defaultValue: T[] = []): T[] => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key ${key}:`, error);
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage key ${key}:`, error);
  }
};

// Demo data
const demoUsers: Omit<User, 'id'>[] = [
  {
    email: 'admin@company.com',
    name: 'Admin User',
    role: 'admin',
    division: 'IT',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    email: 'cto@company.com',
    name: 'CTO Admin',
    role: 'admin',
    division: 'IT',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    email: 'support@company.com',
    name: 'Support Agent',
    role: 'support',
    division: 'Support',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    email: 'user@company.com',
    name: 'Regular User',
    role: 'user',
    division: 'Sales',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    email: 'unassigned@company.com',
    name: 'Unassigned User',
    role: 'unassigned',
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

const demoFaqs: Omit<FAQ, 'id'>[] = [
  {
    title: 'How do I reset my password?',
    content: 'To reset your password, go to the login page and click "Forgot Password". Enter your email address and follow the instructions sent to your email.',
    category: 'it-systems',
    tags: ['password', 'login', 'reset'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'What are the company holidays?',
    content: 'Company holidays include New Year\'s Day, Memorial Day, Independence Day, Labor Day, Thanksgiving, and Christmas Day. Additional floating holidays may be available.',
    category: 'policies',
    tags: ['holidays', 'time-off', 'benefits'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'How do I connect to the office WiFi?',
    content: 'Connect to the "CompanyWiFi" network using the password provided by IT. If you need the password, contact the IT support team.',
    category: 'network',
    tags: ['wifi', 'network', 'connection'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const demoAnnouncements: Omit<Announcement, 'id'>[] = [
  {
    title: 'Office Closure Notice',
    description: 'The office will be closed on Friday, December 22nd for the holiday weekend. Regular operations will resume on Monday, December 26th.',
    type: 'alert',
    targetAudience: 'All Employees',
    validityDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    title: 'New Employee Benefits Program',
    description: 'We are excited to announce enhancements to our employee benefits program, including improved health coverage and additional wellness benefits.',
    type: 'memo',
    targetAudience: 'All Employees',
    validityDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

const demoSystemUpdates: Omit<SystemUpdate, 'id'>[] = [
  {
    title: 'Email System Maintenance',
    description: 'Scheduled maintenance on the email system will occur this weekend. Brief interruptions may be experienced.',
    type: 'maintenance',
    classification: 'internal',
    severity: 'medium',
    status: 'scheduled',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2',
    createdAt: new Date().toISOString()
  }
];

const demoOtherDocuments: Omit<OtherDocument, 'id'>[] = [
  {
    documentName: 'Employee Handbook',
    description: 'Complete guide to company policies, procedures, and benefits',
    fileUrl: 'https://drive.google.com/file/d/example-handbook/view',
    createdAt: new Date().toISOString(),
    createdBy: 'HR Department'
  },
  {
    documentName: 'IT Security Policy',
    description: 'Guidelines for maintaining information security and data protection',
    fileUrl: 'https://drive.google.com/file/d/example-security-policy/view',
    createdAt: new Date().toISOString(),
    createdBy: 'IT Department'
  }
];

const demoTrainingMaterials: Omit<TrainingMaterial, 'id'>[] = [
  {
    type: 'awareness-campaign',
    title: 'Information Security Awareness',
    imageUrl: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
    createdBy: 'IT Security Team',
    isActive: true
  },
  {
    type: 'awareness-campaign',
    title: 'Phishing Email Recognition',
    imageUrl: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
    createdBy: 'IT Security Team',
    isActive: true
  },
  {
    type: 'awareness-campaign',
    title: 'Workplace Safety',
    imageUrl: 'https://images.pexels.com/photos/416322/pexels-photo-416322.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
    createdBy: 'Safety Team',
    isActive: true
  },
  {
    type: 'awareness-campaign',
    title: 'Data Privacy Protection',
    imageUrl: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
    createdBy: 'Legal Team',
    isActive: true
  },
  {
    type: 'awareness-campaign',
    title: 'Remote Work Security',
    imageUrl: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: new Date().toISOString(),
    createdBy: 'IT Security Team',
    isActive: true
  },
  {
    type: 'training-video',
    category: 'Security',
    level: 'Beginner',
    videoTitle: 'Password Security Best Practices',
    videoDescription: 'Learn how to create and manage secure passwords effectively',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    createdAt: new Date().toISOString(),
    createdBy: 'IT Training Team',
    isActive: true
  },
  {
    type: 'training-video',
    category: 'Professional Development',
    level: 'Intermediate',
    videoTitle: 'Effective Communication Skills',
    videoDescription: 'Improve your communication skills for better workplace collaboration',
    videoUrl: 'https://www.youtube.com/watch?v=example123',
    thumbnailUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date().toISOString(),
    createdBy: 'HR Training Team',
    isActive: true
  },
  {
    type: 'training-video',
    category: 'Security',
    level: 'Advanced',
    videoTitle: 'Advanced Threat Detection',
    videoDescription: 'Learn to identify and respond to sophisticated cyber threats',
    videoUrl: 'https://www.youtube.com/watch?v=advanced123',
    thumbnailUrl: 'https://img.youtube.com/vi/advanced123/maxresdefault.jpg',
    createdAt: new Date().toISOString(),
    createdBy: 'Security Team',
    isActive: true
  },
  {
    type: 'training-video',
    category: 'Technology',
    level: 'Beginner',
    videoTitle: 'Microsoft Office Basics',
    videoDescription: 'Master the fundamentals of Word, Excel, and PowerPoint',
    videoUrl: 'https://www.youtube.com/watch?v=office123',
    thumbnailUrl: 'https://img.youtube.com/vi/office123/maxresdefault.jpg',
    createdAt: new Date().toISOString(),
    createdBy: 'IT Training Team',
    isActive: true
  },
  {
    type: 'training-video',
    category: 'HR & Compliance',
    level: 'Intermediate',
    videoTitle: 'Workplace Harassment Prevention',
    videoDescription: 'Understanding and preventing workplace harassment',
    videoUrl: 'https://www.youtube.com/watch?v=hr123',
    thumbnailUrl: 'https://img.youtube.com/vi/hr123/maxresdefault.jpg',
    createdAt: new Date().toISOString(),
    createdBy: 'HR Team',
    isActive: true
  },
  {
    type: 'training-video',
    category: 'Finance',
    level: 'Beginner',
    videoTitle: 'Expense Reporting Guidelines',
    videoDescription: 'How to properly submit and manage expense reports',
    videoUrl: 'https://www.youtube.com/watch?v=finance123',
    thumbnailUrl: 'https://img.youtube.com/vi/finance123/maxresdefault.jpg',
    createdAt: new Date().toISOString(),
    createdBy: 'Finance Team',
    isActive: true
  },
  {
    type: 'training-video',
    category: 'Professional Development',
    level: 'Advanced',
    videoTitle: 'Leadership and Management Skills',
    videoDescription: 'Develop essential leadership qualities and management techniques',
    videoUrl: 'https://www.youtube.com/watch?v=leadership123',
    thumbnailUrl: 'https://img.youtube.com/vi/leadership123/maxresdefault.jpg',
    createdAt: new Date().toISOString(),
    createdBy: 'Leadership Team',
    isActive: true
  },
  {
    type: 'training-video',
    category: 'Technology',
    level: 'Intermediate',
    videoTitle: 'Cloud Computing Fundamentals',
    videoDescription: 'Understanding cloud services and their business applications',
    videoUrl: 'https://www.youtube.com/watch?v=cloud123',
    thumbnailUrl: 'https://img.youtube.com/vi/cloud123/maxresdefault.jpg',
    createdAt: new Date().toISOString(),
    createdBy: 'IT Team',
    isActive: true
  },
  {
    type: 'training-video',
    category: 'Security',
    level: 'Intermediate',
    videoTitle: 'Social Engineering Awareness',
    videoDescription: 'Recognize and defend against social engineering attacks',
    videoUrl: 'https://www.youtube.com/watch?v=social123',
    thumbnailUrl: 'https://img.youtube.com/vi/social123/maxresdefault.jpg',
    createdAt: new Date().toISOString(),
    createdBy: 'Security Team',
    isActive: true
  }
];

// Authentication service
export const authService = {
  login: (email: string, password: string): User | null => {
    if (password !== 'demo_password') return null;
    
    const users = getFromStorage<User>(STORAGE_KEYS.USERS);
    const user = users.find(u => u.email === email && u.isActive);
    
    if (user) {
      localStorage.setItem('auth_token', 'demo_token');
      localStorage.setItem('current_user', JSON.stringify(user));
      return user;
    }
    
    return null;
  },

  logout: (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
  },

  getCurrentUser: (): User | null => {
    try {
      const userData = localStorage.getItem('current_user');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  },

  getAuthToken: (): string | null => {
    return localStorage.getItem('auth_token');
  }
};

// Data service
export const dataService = {
  // Users
  getUsers: (): User[] => getFromStorage<User>(STORAGE_KEYS.USERS),
  
  addUser: (userData: Omit<User, 'id' | 'createdAt'>): User => {
    const users = getFromStorage<User>(STORAGE_KEYS.USERS);
    const newUser: User = {
      ...userData,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    saveToStorage(STORAGE_KEYS.USERS, users);
    return newUser;
  },

  updateUser: (id: string, userData: Partial<User>): User | null => {
    const users = getFromStorage<User>(STORAGE_KEYS.USERS);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;

    users[index] = { ...users[index], ...userData };
    saveToStorage(STORAGE_KEYS.USERS, users);
    return users[index];
  },

  deleteUser: (id: string): boolean => {
    const users = getFromStorage<User>(STORAGE_KEYS.USERS);
    const filteredUsers = users.filter(u => u.id !== id);
    if (filteredUsers.length === users.length) return false;

    saveToStorage(STORAGE_KEYS.USERS, filteredUsers);
    return true;
  },

  // FAQs
  getFaqs: (): FAQ[] => getFromStorage<FAQ>(STORAGE_KEYS.FAQS),
  
  addFaq: (faqData: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>): FAQ => {
    const faqs = getFromStorage<FAQ>(STORAGE_KEYS.FAQS);
    const newFaq: FAQ = {
      ...faqData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    faqs.push(newFaq);
    saveToStorage(STORAGE_KEYS.FAQS, faqs);
    return newFaq;
  },

  updateFaq: (id: string, faqData: Partial<FAQ>): FAQ | null => {
    const faqs = getFromStorage<FAQ>(STORAGE_KEYS.FAQS);
    const index = faqs.findIndex(f => f.id === id);
    if (index === -1) return null;

    faqs[index] = { 
      ...faqs[index], 
      ...faqData, 
      updatedAt: new Date().toISOString() 
    };
    saveToStorage(STORAGE_KEYS.FAQS, faqs);
    return faqs[index];
  },

  deleteFaq: (id: string): boolean => {
    const faqs = getFromStorage<FAQ>(STORAGE_KEYS.FAQS);
    const filteredFaqs = faqs.filter(f => f.id !== id);
    if (filteredFaqs.length === faqs.length) return false;

    saveToStorage(STORAGE_KEYS.FAQS, filteredFaqs);
    return true;
  },

  // Announcements
  getAnnouncements: (): Announcement[] => getFromStorage<Announcement>(STORAGE_KEYS.ANNOUNCEMENTS),
  
  addAnnouncement: (announcementData: Omit<Announcement, 'id' | 'createdAt'>): Announcement => {
    const announcements = getFromStorage<Announcement>(STORAGE_KEYS.ANNOUNCEMENTS);
    const newAnnouncement: Announcement = {
      ...announcementData,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    announcements.push(newAnnouncement);
    saveToStorage(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
    return newAnnouncement;
  },

  updateAnnouncement: (id: string, announcementData: Partial<Announcement>): Announcement | null => {
    const announcements = getFromStorage<Announcement>(STORAGE_KEYS.ANNOUNCEMENTS);
    const index = announcements.findIndex(a => a.id === id);
    if (index === -1) return null;

    announcements[index] = { ...announcements[index], ...announcementData };
    saveToStorage(STORAGE_KEYS.ANNOUNCEMENTS, announcements);
    return announcements[index];
  },

  deleteAnnouncement: (id: string): boolean => {
    const announcements = getFromStorage<Announcement>(STORAGE_KEYS.ANNOUNCEMENTS);
    const filteredAnnouncements = announcements.filter(a => a.id !== id);
    if (filteredAnnouncements.length === announcements.length) return false;

    saveToStorage(STORAGE_KEYS.ANNOUNCEMENTS, filteredAnnouncements);
    return true;
  },

  // System Updates
  getSystemUpdates: (): SystemUpdate[] => getFromStorage<SystemUpdate>(STORAGE_KEYS.SYSTEM_UPDATES),
  
  addSystemUpdate: (updateData: Omit<SystemUpdate, 'id' | 'createdAt'>): SystemUpdate => {
    const updates = getFromStorage<SystemUpdate>(STORAGE_KEYS.SYSTEM_UPDATES);
    const newUpdate: SystemUpdate = {
      ...updateData,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    updates.push(newUpdate);
    saveToStorage(STORAGE_KEYS.SYSTEM_UPDATES, updates);
    return newUpdate;
  },

  updateSystemUpdate: (id: string, updateData: Partial<SystemUpdate>): SystemUpdate | null => {
    const updates = getFromStorage<SystemUpdate>(STORAGE_KEYS.SYSTEM_UPDATES);
    const index = updates.findIndex(u => u.id === id);
    if (index === -1) return null;

    updates[index] = { ...updates[index], ...updateData };
    saveToStorage(STORAGE_KEYS.SYSTEM_UPDATES, updates);
    return updates[index];
  },

  deleteSystemUpdate: (id: string): boolean => {
    const updates = getFromStorage<SystemUpdate>(STORAGE_KEYS.SYSTEM_UPDATES);
    const filteredUpdates = updates.filter(u => u.id !== id);
    if (filteredUpdates.length === updates.length) return false;

    saveToStorage(STORAGE_KEYS.SYSTEM_UPDATES, filteredUpdates);
    return true;
  },

  // Tickets
  getTickets: (): Ticket[] => getFromStorage<Ticket>(STORAGE_KEYS.TICKETS),
  
  addTicket: (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Ticket => {
    const tickets = getFromStorage<Ticket>(STORAGE_KEYS.TICKETS);
    const newTicket: Ticket = {
      ...ticketData,
      id: generateId(),
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tickets.push(newTicket);
    saveToStorage(STORAGE_KEYS.TICKETS, tickets);
    return newTicket;
  },

  // Other Documents
  getOtherDocuments: (): OtherDocument[] => getFromStorage<OtherDocument>(STORAGE_KEYS.OTHER_DOCUMENTS),
  
  addOtherDocument: (documentData: Omit<OtherDocument, 'id' | 'createdAt'>): OtherDocument => {
    const documents = getFromStorage<OtherDocument>(STORAGE_KEYS.OTHER_DOCUMENTS);
    const newDocument: OtherDocument = {
      ...documentData,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    documents.push(newDocument);
    saveToStorage(STORAGE_KEYS.OTHER_DOCUMENTS, documents);
    return newDocument;
  },

  updateOtherDocument: (id: string, documentData: Partial<OtherDocument>): OtherDocument | null => {
    const documents = getFromStorage<OtherDocument>(STORAGE_KEYS.OTHER_DOCUMENTS);
    const index = documents.findIndex(d => d.id === id);
    if (index === -1) return null;

    documents[index] = { ...documents[index], ...documentData };
    saveToStorage(STORAGE_KEYS.OTHER_DOCUMENTS, documents);
    return documents[index];
  },

  deleteOtherDocument: (id: string): boolean => {
    const documents = getFromStorage<OtherDocument>(STORAGE_KEYS.OTHER_DOCUMENTS);
    const filteredDocuments = documents.filter(d => d.id !== id);
    if (filteredDocuments.length === documents.length) return false;

    saveToStorage(STORAGE_KEYS.OTHER_DOCUMENTS, filteredDocuments);
    return true;
  },

  // Training Materials
  getTrainingMaterials: (): TrainingMaterial[] => getFromStorage<TrainingMaterial>(STORAGE_KEYS.TRAINING_MATERIALS),
  
  addTrainingMaterial: (materialData: Omit<TrainingMaterial, 'id' | 'createdAt'>): TrainingMaterial => {
    const materials = getFromStorage<TrainingMaterial>(STORAGE_KEYS.TRAINING_MATERIALS);
    const newMaterial: TrainingMaterial = {
      ...materialData,
      id: generateId(),
      createdAt: new Date().toISOString()
    };
    materials.push(newMaterial);
    saveToStorage(STORAGE_KEYS.TRAINING_MATERIALS, materials);
    return newMaterial;
  },

  updateTrainingMaterial: (id: string, materialData: Partial<TrainingMaterial>): TrainingMaterial | null => {
    const materials = getFromStorage<TrainingMaterial>(STORAGE_KEYS.TRAINING_MATERIALS);
    const index = materials.findIndex(m => m.id === id);
    if (index === -1) return null;

    materials[index] = { ...materials[index], ...materialData };
    saveToStorage(STORAGE_KEYS.TRAINING_MATERIALS, materials);
    return materials[index];
  },

  deleteTrainingMaterial: (id: string): boolean => {
    const materials = getFromStorage<TrainingMaterial>(STORAGE_KEYS.TRAINING_MATERIALS);
    const filteredMaterials = materials.filter(m => m.id !== id);
    if (filteredMaterials.length === materials.length) return false;

    saveToStorage(STORAGE_KEYS.TRAINING_MATERIALS, filteredMaterials);
    return true;
  },

  // Chat Messages
  getChatMessages: (userId: string): ChatMessage[] => {
    const key = `${STORAGE_KEYS.CHAT_MESSAGES}_${userId}`;
    return getFromStorage<ChatMessage>(key);
  },
  
  addChatMessage: (messageData: Omit<ChatMessage, 'id'>, userId: string): ChatMessage => {
    const key = `${STORAGE_KEYS.CHAT_MESSAGES}_${userId}`;
    const messages = getFromStorage<ChatMessage>(key);
    const newMessage: ChatMessage = {
      ...messageData,
      id: generateId()
    };
    messages.push(newMessage);
    saveToStorage(key, messages);
    return newMessage;
  },

  clearChatMessages: (userId: string): void => {
    const key = `${STORAGE_KEYS.CHAT_MESSAGES}_${userId}`;
    saveToStorage(key, []);
  }
};

// Initialize demo data
export const initializeDemoData = (): void => {
  const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  
  if (!isInitialized) {
    // Initialize users with IDs
    const usersWithIds = demoUsers.map(user => ({
      ...user,
      id: generateId(),
      createdAt: new Date().toISOString()
    }));
    saveToStorage(STORAGE_KEYS.USERS, usersWithIds);

    // Initialize FAQs with IDs
    const faqsWithIds = demoFaqs.map(faq => ({
      ...faq,
      id: generateId()
    }));
    saveToStorage(STORAGE_KEYS.FAQS, faqsWithIds);

    // Initialize announcements with IDs
    const announcementsWithIds = demoAnnouncements.map(announcement => ({
      ...announcement,
      id: generateId()
    }));
    saveToStorage(STORAGE_KEYS.ANNOUNCEMENTS, announcementsWithIds);

    // Initialize system updates with IDs
    const updatesWithIds = demoSystemUpdates.map(update => ({
      ...update,
      id: generateId()
    }));
    saveToStorage(STORAGE_KEYS.SYSTEM_UPDATES, updatesWithIds);

    // Initialize other documents with IDs
    const documentsWithIds = demoOtherDocuments.map(doc => ({
      ...doc,
      id: generateId()
    }));
    saveToStorage(STORAGE_KEYS.OTHER_DOCUMENTS, documentsWithIds);

    // Initialize training materials with IDs
    const materialsWithIds = demoTrainingMaterials.map(material => ({
      ...material,
      id: generateId()
    }));
    saveToStorage(STORAGE_KEYS.TRAINING_MATERIALS, materialsWithIds);

    // Initialize empty arrays for other data
    saveToStorage(STORAGE_KEYS.TICKETS, []);

    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  }
};