import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

// Force demo mode by not creating Supabase client
export const supabase = null;
export const isSupabaseConfigured = false;

// Demo authentication functions
export const signIn = async (email: string, password: string) => {
  // Demo mode - simulate login with demo accounts
  if (password === 'demo_password') {
    const demoUsers = [
      { email: 'admin@company.com', name: 'Admin User', role: 'admin' },
      { email: 'cto@company.com', name: 'CTO Admin', role: 'admin' },
      { email: 'support@company.com', name: 'Support Agent', role: 'support' },
      { email: 'user@company.com', name: 'Regular User', role: 'user' },
      { email: 'unassigned@company.com', name: 'Unassigned User', role: 'unassigned' }
    ];
    
    const user = demoUsers.find(u => u.email === email);
    if (user) {
      const demoUser = {
        id: `demo-${user.role}-${Date.now()}`,
        email: user.email,
        user_metadata: { name: user.name, role: user.role }
      };
      return { data: { user: demoUser, session: null }, error: null };
    }
  }
  return { data: null, error: { message: 'Invalid credentials. Use demo_password for demo accounts.' } };
};

export const signOut = async () => {
  return { error: null };
};

export const getCurrentUser = async () => {
  return { user: null, error: null };
};

export const getSession = async () => {
  return { session: null, error: null };
};

export const signUp = async (email: string, password: string, name: string) => {
  // Demo mode - simulate signup
  const demoUser = {
    id: 'demo-user-' + Date.now(),
    email: email,
    user_metadata: { name: name, role: 'user' }
  };
  return { data: { user: demoUser, session: null }, error: null };
};