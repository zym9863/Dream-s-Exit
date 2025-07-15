import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 数据库类型定义
export interface ChronoscrollEntry {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  music_url?: string;
  music_title?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface EchoEntry {
  id: string;
  content: string;
  created_at: string;
  expires_at: string;
}
