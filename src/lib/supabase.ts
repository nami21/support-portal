import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Simple session management
export const setAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

export const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
};

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'support' | 'user';
          password_hash: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role?: 'admin' | 'support' | 'user';
          password_hash: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: 'admin' | 'support' | 'user';
          password_hash?: string;
          created_at?: string;
        };
      };
      faqs: {
        Row: {
          id: string;
          title: string;
          content: string;
          category: 'policies' | 'it-systems' | 'hardware' | 'network';
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          category: 'policies' | 'it-systems' | 'hardware' | 'network';
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          category?: 'policies' | 'it-systems' | 'hardware' | 'network';
          tags?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      announcements: {
        Row: {
          id: string;
          title: string;
          description: string;
          type: 'alert' | 'memo';
          target_audience: string;
          validity_date: string;
          attachments: string[];
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          type: 'alert' | 'memo';
          target_audience?: string;
          validity_date: string;
          attachments?: string[];
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          type?: 'alert' | 'memo';
          target_audience?: string;
          validity_date?: string;
          attachments?: string[];
          is_active?: boolean;
          created_at?: string;
        };
      };
      system_updates: {
        Row: {
          id: string;
          title: string;
          description: string;
          type: 'information' | 'advisory' | 'maintenance' | 'security';
          classification: 'internal' | 'external';
          severity: 'high' | 'medium' | 'low';
          status: 'active' | 'resolved' | 'scheduled';
          date: string;
          image_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          type: 'information' | 'advisory' | 'maintenance' | 'security';
          classification?: 'internal' | 'external';
          severity?: 'high' | 'medium' | 'low';
          status?: 'active' | 'resolved' | 'scheduled';
          date: string;
          image_url: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          type?: 'information' | 'advisory' | 'maintenance' | 'security';
          classification?: 'internal' | 'external';
          severity?: 'high' | 'medium' | 'low';
          status?: 'active' | 'resolved' | 'scheduled';
          date?: string;
          image_url?: string;
          created_at?: string;
        };
      };
      tickets: {
        Row: {
          id: string;
          title: string;
          category: 'it-support' | 'hr' | 'facilities' | 'other';
          priority: 'low' | 'medium' | 'high' | 'urgent';
          description: string;
          attachments: string[];
          status: 'open' | 'in-progress' | 'resolved' | 'closed';
          created_by: string;
          assigned_to: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          category: 'it-support' | 'hr' | 'facilities' | 'other';
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          description: string;
          attachments?: string[];
          status?: 'open' | 'in-progress' | 'resolved' | 'closed';
          created_by: string;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: 'it-support' | 'hr' | 'facilities' | 'other';
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          description?: string;
          attachments?: string[];
          status?: 'open' | 'in-progress' | 'resolved' | 'closed';
          created_by?: string;
          assigned_to?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      chat_messages: {
        Row: {
          id: string;
          content: string;
          is_bot: boolean;
          user_id: string;
          timestamp: string;
        };
        Insert: {
          id?: string;
          content: string;
          is_bot?: boolean;
          user_id: string;
          timestamp?: string;
        };
        Update: {
          id?: string;
          content?: string;
          is_bot?: boolean;
          user_id?: string;
          timestamp?: string;
        };
      };
    };
  };
}