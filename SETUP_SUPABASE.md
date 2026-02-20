# Supabase Backend Setup Guide

This guide will help you set up a complete backend database with image storage for the LSS Bowen Connect website.

## 🚀 Quick Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up/login with GitHub/Google
4. Create new project: `lss-bowen-connect`
5. Choose a database password (save it!)
6. Select region closest to your users

### 2. Run Database Schema
1. In your Supabase project, go to **SQL Editor**
2. Copy contents of `supabase/schema.sql`
3. Paste and run the SQL script
4. This creates all tables and inserts initial data

### 3. Set Up Storage
1. Go to **Storage** section
2. Click **Create new bucket**
3. Name it: `lss-images`
4. Make it **Public**
5. Copy contents of `supabase/storage.sql`
6. Run in SQL Editor to set up RLS policies

### 4. Get API Keys
1. Go to **Project Settings** → **API**
2. Copy **Project URL** and **anon public key**
3. Create `.env.local` file in project root:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 5. Install Dependencies
```bash
npm install @supabase/supabase-js
```

### 6. Update App Context
Replace the import in `App.tsx`:
```tsx
import { AdminDataProvider } from "@/context/AdminDataContextSupabase";
```

## 📁 File Structure After Setup

```
src/
├── context/
│   ├── AdminDataContext.tsx          # Original localStorage version
│   └── AdminDataContextSupabase.tsx # New Supabase version
├── components/
│   └── ImageUpload.tsx              # Image upload component
├── lib/
│   └── supabase.ts                # Supabase client & helpers
supabase/
│   ├── schema.sql                   # Database schema
│   ├── storage.sql                 # Storage policies
│   └── client.ts                  # Type definitions
.env.local                         # Environment variables
```

## 🖼️ Image Upload Features

- **Drag & Drop**: Upload images directly
- **File Validation**: Only images, max 5MB
- **Folder Organization**: Images stored by type (executives, alumni, etc.)
- **Manual URL**: Fallback to URL input
- **Public URLs**: Automatically generated for display

## 🗄️ Database Tables

### Resources
- Academic materials, lecture notes, past questions
- Fields: title, course, level, type, link, upload_date

### Executives  
- LSS committee members
- Fields: name, position, bio, email, phone, image, social links

### Alumni
- Graduate profiles and achievements
- Fields: name, graduation_year, current_position, achievements, specialization

### Merch Items
- LSS merchandise for sale
- Fields: name, price, image, sizes, description, in_stock

### News Items
- Announcements and events
- Fields: title, date, category, image, summary, content

## 🔒 Security Features

- **Row Level Security (RLS)**: Protects data access
- **Public Image Access**: Anyone can view uploaded images
- **Authenticated Uploads**: Only logged-in users can upload
- **CORS Enabled**: Works with your Vercel frontend

## 🚀 Deployment

### Vercel Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy - backend works automatically!

### Local Development
```bash
npm install
npm run dev
```

## 📱 Usage

### Admin Features
- **Add/Edit/Delete**: All data types
- **Image Upload**: Drag & drop or URL
- **Real-time Updates**: Changes sync across all users
- **Form Validation**: Required fields checked

### Public Display
- **Responsive Design**: Works on all devices
- **Fast Loading**: Optimized images
- **SEO Friendly**: Proper meta tags
- **No Caching Issues**: Real-time data

## 🛠️ Troubleshooting

### Common Issues
1. **"Missing environment variables"**
   - Check `.env.local` exists and has correct values
   - Restart dev server after adding env vars

2. **"Upload failed"**
   - Check file size < 5MB
   - Ensure file is image type
   - Verify storage bucket exists

3. **"CORS errors"**
   - Supabase project URL correct in env vars
   - Storage bucket is public

4. **"Database connection failed"**
   - Run schema.sql in Supabase SQL Editor
   - Check API keys are correct

### Getting Help
- Check Supabase dashboard for errors
- Review browser console logs
- Verify network requests in dev tools

## 🎉 Benefits

✅ **Real Database**: Persistent, scalable storage  
✅ **Image Hosting**: Built-in file storage  
✅ **Multi-user**: All users see same data  
✅ **No Server**: Serverless, no maintenance  
✅ **Fast**: CDN for images, optimized queries  
✅ **Secure**: RLS policies, API key protection  
✅ **Free Tier**: Generous limits for small projects  

Your LSS Bowen Connect now has a professional backend! 🚀
