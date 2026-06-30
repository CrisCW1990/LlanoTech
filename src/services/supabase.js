import { createClient } from '@supabase/supabase-js';

// Load from environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase = null;

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
  } catch (err) {
    console.error('Error initializing Supabase client:', err);
  }
}

export { supabase, supabaseUrl, supabaseKey };
