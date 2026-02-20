-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('lss-images', 'lss-images', true);

-- Set up Row Level Security (RLS) policies
-- Allow public read access to images
CREATE POLICY "Public images are viewable by everyone" ON storage.objects
  FOR SELECT USING (bucket_id = 'lss-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'lss-images');

-- Allow authenticated users to update their own images
CREATE POLICY "Authenticated users can update images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'lss-images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete images" ON storage.objects
  FOR DELETE USING (bucket_id = 'lss-images');
