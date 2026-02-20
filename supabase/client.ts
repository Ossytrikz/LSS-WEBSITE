import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      resources: {
        Row: {
          id: number;
          title: string;
          course: string;
          level: string;
          type: string;
          link: string;
          upload_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['resources']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['resources']['Insert']>;
      };
      executives: {
        Row: {
          id: number;
          name: string;
          position: string;
          bio: string | null;
          email: string;
          phone: string | null;
          image: string;
          linkedin: string | null;
          instagram: string | null;
          duration: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['executives']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['executives']['Insert']>;
      };
      alumni: {
        Row: {
          id: number;
          name: string;
          graduation_year: string;
          image: string;
          current_position: string;
          achievements: string;
          specialization: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['alumni']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['alumni']['Insert']>;
      };
      merch_items: {
        Row: {
          id: number;
          name: string;
          price: string;
          image: string;
          sizes: string[];
          description: string;
          in_stock: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['merch_items']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['merch_items']['Insert']>;
      };
      news_items: {
        Row: {
          id: number;
          title: string;
          date: string;
          category: string;
          image: string;
          summary: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['news_items']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['news_items']['Insert']>;
      };
    };
  };
}
