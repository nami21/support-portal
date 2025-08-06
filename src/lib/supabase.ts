import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a dummy client if environment variables are missing (for demo purposes)
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not found. Using demo mode.');
    // Return a mock client for demo purposes
    return null;
  }
  return createClient<Database>(supabaseUrl, supabaseAnonKey);
};

export const supabase = createSupabaseClient();
export const isSupabaseConfigured = !!supabase;

// Auth helpers
export const signIn = async (email: string, password: string) => {
  if (!supabase) {
    // Demo mode - simulate login
    if (password === 'demo_password') {
      const demoUser = {
        id: 'demo-user-id',
        email: email,
        user_metadata: { name: 'Demo User' }
      };
      return { data: { user: demoUser, session: null }, error: null };
    }
    return { data: null, error: { message: 'Invalid credentials' } };
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  if (!supabase) {
    return { error: null };
  }
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  if (!supabase) {
    return { user: null, error: null };
  }
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const getSession = async () => {
  if (!supabase) {
    return { session: null, error: null };
  }
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
};

export const signUp = async (email: string, password: string, name: string) => {
  if (!supabase) {
    // Demo mode - simulate signup
    const demoUser = {
      id: 'demo-user-' + Date.now(),
      email: email,
      user_metadata: { name: name }
    };
    return { data: { user: demoUser, session: null }, error: null };
  }
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) return { data: null, error };
  
  // Create user profile after successful signup
  if (data.user) {
    const { error: profileError } = await supabase
      .from('users')
      .insert([{
        id: data.user.id,
        email: data.user.email!,
        name: name,
        role: 'user' // Default role, admin can change later
      }]);
    
    if (profileError) {
      console.error('Error creating user profile:', profileError);
    }
  }
  
  return { data, error };
};