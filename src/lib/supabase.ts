import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Image upload helper
export const uploadImage = async (file: File, path: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${path}/${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('lss-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw error;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('lss-images')
    .getPublicUrl(fileName);

  return publicUrl;
};

// Delete image helper
export const deleteImage = async (url: string) => {
  // Extract file path from URL
  const urlParts = url.split('/');
  const fileName = urlParts[urlParts.length - 1];
  const path = urlParts[urlParts.length - 2];
  
  const { error } = await supabase.storage
    .from('lss-images')
    .remove([`${path}/${fileName}`]);

  if (error) {
    throw error;
  }
};
