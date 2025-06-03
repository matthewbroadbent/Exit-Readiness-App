// Supabase client setup
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with environment variables if available
let supabase = null;

try {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client initialized successfully');
  } else {
    console.log('Supabase environment variables not found, client not initialized');
  }
} catch (error) {
  console.error('Error initializing Supabase client:', error);
}

export { supabase };
