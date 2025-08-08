import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'support' | 'user' | 'unassigned';
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role: 'admin' | 'support' | 'user' | 'unassigned';
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: 'admin' | 'support' | 'user' | 'unassigned';
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
          tags: string[];
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
          attachments: string[] | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          type: 'alert' | 'memo';
          target_audience: string;
          validity_date: string;
          attachments?: string[] | null;
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
          attachments?: string[] | null;
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
      other_documents: {
        Row: {
          id: string;
          document_name: string;
          description: string;
          file_url: string;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          document_name: string;
          description: string;
          file_url: string;
          created_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          document_name?: string;
          description?: string;
          file_url?: string;
          created_by?: string;
          created_at?: string;
        };
      };
      training_materials: {
        Row: {
          id: string;
          type: 'awareness-campaign' | 'training-video';
          title: string | null;
          image_url: string | null;
          category: string | null;
          level: 'Beginner' | 'Intermediate' | 'Advanced' | null;
          video_title: string | null;
          video_description: string | null;
          video_url: string | null;
          thumbnail_url: string | null;
          created_by: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          type: 'awareness-campaign' | 'training-video';
          title?: string | null;
          image_url?: string | null;
          category?: string | null;
          level?: 'Beginner' | 'Intermediate' | 'Advanced' | null;
          video_title?: string | null;
          video_description?: string | null;
          video_url?: string | null;
          thumbnail_url?: string | null;
          created_by: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          type?: 'awareness-campaign' | 'training-video';
          title?: string | null;
          image_url?: string | null;
          category?: string | null;
          level?: 'Beginner' | 'Intermediate' | 'Advanced' | null;
          video_title?: string | null;
          video_description?: string | null;
          video_url?: string | null;
          thumbnail_url?: string | null;
          created_by?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };
    };
  };
}