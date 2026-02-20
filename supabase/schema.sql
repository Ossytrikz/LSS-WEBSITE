-- Create tables for LSS Bowen Connect

-- Resources table
CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  course TEXT NOT NULL,
  level TEXT NOT NULL,
  type TEXT NOT NULL,
  link TEXT NOT NULL,
  upload_date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Executives table
CREATE TABLE executives (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  image TEXT NOT NULL,
  linkedin TEXT,
  instagram TEXT,
  duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alumni table
CREATE TABLE alumni (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  graduation_year TEXT NOT NULL,
  image TEXT NOT NULL,
  current_position TEXT NOT NULL,
  achievements TEXT NOT NULL,
  specialization TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Merch items table
CREATE TABLE merch_items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  image TEXT NOT NULL,
  sizes TEXT[] NOT NULL,
  description TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News items table
CREATE TABLE news_items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_resources_course ON resources(course);
CREATE INDEX idx_resources_level ON resources(level);
CREATE INDEX idx_executives_position ON executives(position);
CREATE INDEX idx_alumni_graduation_year ON alumni(graduation_year);
CREATE INDEX idx_merch_items_in_stock ON merch_items(in_stock);
CREATE INDEX idx_news_items_category ON news_items(category);
CREATE INDEX idx_news_items_date ON news_items(date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_executives_updated_at BEFORE UPDATE ON executives
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alumni_updated_at BEFORE UPDATE ON alumni
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_merch_items_updated_at BEFORE UPDATE ON merch_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_items_updated_at BEFORE UPDATE ON news_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data
INSERT INTO resources (title, course, level, type, link, upload_date) VALUES
  ('Constitutional Law - Lecture Notes', 'LAW 201', '200L', 'PDF', '#', '2025-03-01'),
  ('Criminal Law - Past Questions 2024', 'LAW 301', '300L', 'PDF', '#', '2025-02-28'),
  ('Contract Law - Study Guide', 'LAW 202', '200L', 'PDF', '#', '2025-02-25'),
  ('Legal Methods - Comprehensive Notes', 'LAW 101', '100L', 'PDF', '#', '2025-02-20'),
  ('Equity and Trusts - Past Questions', 'LAW 401', '400L', 'PDF', '#', '2025-02-15'),
  ('Evidence Law - Lecture Notes', 'LAW 302', '300L', 'PDF', '#', '2025-02-10');

INSERT INTO executives (name, position, bio, email, phone, image, linkedin, instagram, duration) VALUES
  ('Chioma Adeleke', 'President', 'Leading LSS with vision and dedication to academic excellence', 'president@lssbowen.edu.ng', '', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop', '#', '#', ''),
  ('Adefemi Johnson', 'Vice President', 'Supporting the president and coordinating academic programs', 'vp@lssbowen.edu.ng', '', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', '#', '', '2024/2025'),
  ('Blessing Okafor', 'Secretary General', 'Maintaining records and ensuring effective communication', 'secretary@lssbowen.edu.ng', '', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop', '', '#', ''),
  ('Tunde Balogun', 'Financial Secretary', 'Managing LSS finances with transparency and accountability', 'finance@lssbowen.edu.ng', '', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', '#', '', ''),
  ('Aminat Ibrahim', 'Director of Socials', 'Organizing events and fostering community engagement', 'socials@lssbowen.edu.ng', '', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop', '', '#', ''),
  ('Chukwudi Eze', 'Director of Sports', 'Promoting wellness and sporting activities among law students', 'sports@lssbowen.edu.ng', '', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', '', '', '');

INSERT INTO alumni (name, graduation_year, image, current_position, achievements, specialization) VALUES
  ('Barr. Oluwaseun Adeyemi', '2018', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop', 'Senior Associate, Aluko & Oyebode', 'Successfully handled over 50 corporate law cases; Featured speaker at Nigerian Bar Association Conference 2023', 'Corporate Law & Mergers'),
  ('Barr. Funmilayo Okonkwo', '2016', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop', 'Partner, Okonkwo & Partners', 'Founded her own law firm; Advocate for women''s rights; Winner of Outstanding Young Lawyer Award 2022', 'Human Rights & Family Law'),
  ('Barr. Mohammed Yusuf', '2015', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop', 'Legal Advisor, Central Bank of Nigeria', 'Contributed to major financial regulatory reforms; Published author on Banking Law', 'Banking & Finance Law'),
  ('Barr. Grace Nwosu', '2019', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop', 'Legal Counsel, Shell Nigeria', 'Expertise in oil and gas regulations; Youngest legal counsel at Shell Nigeria', 'Energy & Natural Resources'),
  ('Barr. Adebayo Lawal', '2017', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', 'Magistrate, Osun State Judiciary', 'Known for fair and swift justice delivery; Community service advocate', 'Criminal Law & Litigation'),
  ('Barr. Ngozi Eze', '2014', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop', 'Senior Lecturer, University of Lagos', 'Published multiple research papers on Constitutional Law; PhD in International Law', 'Academic & Constitutional Law');

INSERT INTO merch_items (name, price, image, sizes, description, in_stock) VALUES
  ('LSS Official T-Shirt', '₦5,000', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop', ARRAY['S', 'M', 'L', 'XL', 'XXL'], 'Premium quality cotton t-shirt with LSS logo', true),
  ('LSS Hoodie', '₦12,000', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop', ARRAY['M', 'L', 'XL'], 'Warm and comfortable hoodie for all seasons', true),
  ('LSS Cap', '₦3,500', 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop', ARRAY['One Size'], 'Stylish cap with embroidered LSS logo', true),
  ('LSS Polo Shirt', '₦7,500', 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=500&h=500&fit=crop', ARRAY['S', 'M', 'L', 'XL'], 'Professional polo shirt perfect for formal events', true),
  ('LSS Notebook & Pen Set', '₦4,000', 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&h=500&fit=crop', ARRAY['Standard'], 'Quality stationery set for your law studies', false),
  ('LSS Water Bottle', '₦2,500', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop', ARRAY['500ml'], 'Eco-friendly water bottle with LSS branding', true);

INSERT INTO news_items (title, date, category, image, summary, content) VALUES
  ('LSS Week 2025: Save the Date!', '2025-03-15', 'Event', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop', 'Get ready for the most exciting week of the year! LSS Week 2025 is scheduled for April with amazing activities, guest speakers, and networking opportunities.', 'Mark your calendars! LSS Week 2025 promises to be bigger and better than ever...'),
  ('Examination Timetable Now Available', '2025-03-14', 'Academic', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop', 'The official examination timetable for the current semester has been released. Students are advised to check the academic resources section.', 'The examination timetable for all law courses has been published...'),
  ('Guest Lecture: Introduction to Corporate Law Practice', '2025-03-12', 'Event', 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=400&fit=crop', 'Join us for an enlightening session with Barr. Chinedu Okafor, Senior Partner at a leading law firm in Lagos.', 'We are excited to announce a special guest lecture...'),
  ('New Study Materials for Constitutional Law', '2025-03-10', 'Academic', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=400&fit=crop', 'Fresh lecture notes and comprehensive study guides for Constitutional Law are now available in the resources section.', 'Students studying Constitutional Law will be pleased to know...'),
  ('Moot Court Competition Registration Open', '2025-03-08', 'Opportunity', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop', 'Registration is now open for the annual LSS Moot Court Competition. Sharpen your advocacy skills and compete for exciting prizes!', 'The LSS Moot Court Competition is back! This year''s theme focuses on...'),
  ('LSS General Meeting Highlights', '2025-03-05', 'Event', 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&h=400&fit=crop', 'Key decisions and announcements from the latest LSS general meeting held on March 5th.', 'The LSS general meeting was held successfully with high student turnout...');
