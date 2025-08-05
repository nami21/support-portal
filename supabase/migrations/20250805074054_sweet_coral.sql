-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'unassigned' CHECK (role IN ('admin', 'support', 'user', 'unassigned')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FAQs table
CREATE TABLE public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('policies', 'it-systems', 'hardware', 'network')),
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Announcements table
CREATE TABLE public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('alert', 'memo')),
  target_audience VARCHAR(255) DEFAULT 'All Employees',
  validity_date TIMESTAMP NOT NULL,
  attachments TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System Updates table
CREATE TABLE public.system_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('information', 'advisory', 'maintenance', 'security')),
  classification VARCHAR(20) DEFAULT 'internal' CHECK (classification IN ('internal', 'external')),
  severity VARCHAR(20) DEFAULT 'medium' CHECK (severity IN ('high', 'medium', 'low')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'scheduled')),
  date TIMESTAMP NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Other Documents table
CREATE TABLE public.other_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_name VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  file_url TEXT NOT NULL,
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Training Materials table
CREATE TABLE public.training_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL CHECK (type IN ('awareness-campaign', 'training-video')),
  title VARCHAR(500),
  image_url TEXT,
  category VARCHAR(100),
  level VARCHAR(20) CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  video_title VARCHAR(500),
  video_description TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  created_by VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Spotlight Posts table
CREATE TABLE public.spotlight_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES public.users(id),
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  media JSONB,
  reactions JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.other_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spotlight_posts ENABLE ROW LEVEL SECURITY;

-- Users policies - Only allow reading user data for role checking
CREATE POLICY "Authenticated users can read user data" ON public.users 
FOR SELECT USING (auth.role() = 'authenticated');

-- FAQs policies - Everyone can read, admin/support can manage
CREATE POLICY "Everyone can read FAQs" ON public.faqs 
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin/Support can manage FAQs" ON public.faqs 
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role IN ('admin', 'support')
  )
);

-- Announcements policies
CREATE POLICY "Everyone can read announcements" ON public.announcements 
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin/Support can manage announcements" ON public.announcements 
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role IN ('admin', 'support')
  )
);

-- System Updates policies
CREATE POLICY "Everyone can read system updates" ON public.system_updates 
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin/Support can manage system updates" ON public.system_updates 
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role IN ('admin', 'support')
  )
);

-- Documents policies
CREATE POLICY "Everyone can read documents" ON public.other_documents 
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin/Support can manage documents" ON public.other_documents 
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role IN ('admin', 'support')
  )
);

-- Training Materials policies
CREATE POLICY "Everyone can read training materials" ON public.training_materials 
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin/Support can manage training materials" ON public.training_materials 
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role IN ('admin', 'support')
  )
);

-- Spotlight Posts policies
CREATE POLICY "Everyone can read posts" ON public.spotlight_posts 
FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin/Support can manage posts" ON public.spotlight_posts 
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role IN ('admin', 'support')
  )
);