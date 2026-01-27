import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// LOG THESE TO THE CONSOLE
console.log('URL FOUND:', !!supabaseUrl);
console.log('KEY FOUND:', !!supabaseAnonKey);

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
