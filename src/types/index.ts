export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'support' | 'user' | 'unassigned';
  createdAt: string;
}

export interface FAQ {
  id: string;
  title: string;
  content: string;
  category: FAQCategory;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type FAQCategory = 'policies' | 'it-systems' | 'hardware' | 'network';

export interface Announcement {
  id: string;
  title: string;
  description: string;
  type: 'alert' | 'memo';
  targetAudience: string;
  validityDate: string;
  attachments?: string[];
  isActive: boolean;
  createdAt: string;
}

export interface SystemUpdate {
  id: string;
  title: string;
  description: string;
  type: 'information' | 'advisory' | 'maintenance' | 'security';
  classification: 'internal' | 'external';
  severity: 'high' | 'medium' | 'low';
  status: 'active' | 'resolved' | 'scheduled';
  date: string;
  imageUrl: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  title: string;
  category: 'it-support' | 'hr' | 'facilities' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  description: string;
  attachments?: string[];
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdBy: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
}

export interface OtherDocument {
  id: string;
  documentName: string;
  description: string;
  fileUrl: string;
  createdAt: string;
  createdBy: string;
}

export interface TrainingMaterial {
  id: string;
  type: 'awareness-campaign' | 'training-video';
  // Awareness campaign fields
  title?: string;
  imageUrl?: string;
  // Training video fields
  category?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  videoTitle?: string;
  videoDescription?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  // Common fields
  createdAt: string;
  createdBy: string;
  isActive: boolean;
}

// Spotlights Types
export interface SpotlightUser {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'support' | 'user';
}

export interface SpotlightPost {
  id: string;
  author: SpotlightUser;
  content: string;
  tags: string[];
  media?: {
    type: 'image' | 'video';
    url: string;
    alt?: string;
  }[];
  timestamp: Date;
  reactions: Record<string, string[]>; // emoji -> array of user IDs
}

export interface CreateSpotlightPostData {
  content: string;
  tags: string[];
  media?: File[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  description?: string;
}

export interface MotivationalQuote {
  id: string;
  text: string;
  author: string;
  category: string;
}