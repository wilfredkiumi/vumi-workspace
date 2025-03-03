/*
  # Initial Schema Setup for Vumi Platform

  1. New Tables
    - `users`
      - Core user data including authentication details
    - `creators`
      - Creator profiles with portfolio and professional info
    - `studios`
      - Production studio profiles and details
    - `projects`
      - Creative projects with metadata and relationships
    - `showcases`
      - Event showcases and exhibitions
    - `gigs`
      - Freelance opportunities and job postings
    - `applications`
      - Gig applications from creators
    - `team_members`
      - Studio team member relationships
    - `social_links`
      - Social media links for creators and studios
    - `portfolio_items`
      - Portfolio entries for creators
    - `experiences`
      - Work experience entries for creators
    - `awards`
      - Awards and recognition entries
    - `education`
      - Educational background entries

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policies for public access where needed

  3. Changes
    - Initial schema creation
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id text UNIQUE,
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  profile_image text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Creators table
CREATE TABLE IF NOT EXISTS creators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  username text UNIQUE NOT NULL,
  bio text NOT NULL,
  profile_image text,
  cover_image text,
  city text NOT NULL,
  country text NOT NULL,
  creator_type text NOT NULL CHECK (creator_type IN ('influencer', 'crew')),
  mode text NOT NULL CHECK (mode IN ('basic', 'basic_with_ads', 'pro', 'premium')),
  is_available_for_hire boolean DEFAULT true,
  freelance_status boolean DEFAULT false,
  fulltime_status boolean DEFAULT false,
  verified boolean DEFAULT false,
  featured boolean DEFAULT false,
  rating numeric(3,2) DEFAULT 0,
  response_rate integer DEFAULT 0,
  completed_projects integer DEFAULT 0,
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Studios table
CREATE TABLE IF NOT EXISTS studios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  logo text,
  cover_image text,
  city text NOT NULL,
  country text NOT NULL,
  website text,
  email text NOT NULL,
  phone text,
  plan text NOT NULL CHECK (plan IN ('basic', 'pro', 'premium')),
  verified boolean DEFAULT false,
  featured boolean DEFAULT false,
  rating numeric(3,2) DEFAULT 0,
  completed_projects integer DEFAULT 0,
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  thumbnail text NOT NULL,
  producer_id uuid REFERENCES creators(id),
  studio_id uuid REFERENCES studios(id),
  status text NOT NULL CHECK (status IN ('completed', 'in-progress', 'upcoming')),
  release_date timestamptz,
  duration text,
  views integer DEFAULT 0,
  likes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CHECK (producer_id IS NOT NULL OR studio_id IS NOT NULL)
);

-- Showcases table
CREATE TABLE IF NOT EXISTS showcases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  thumbnail text NOT NULL,
  cover_image text,
  start_date timestamptz NOT NULL,
  end_date timestamptz,
  location text NOT NULL,
  organizer text NOT NULL,
  organizer_id uuid REFERENCES studios(id),
  virtual boolean DEFAULT false,
  price numeric(10,2),
  attendees integer DEFAULT 0,
  website text,
  featured boolean DEFAULT false,
  status text NOT NULL CHECK (status IN ('in-development', 'upcoming', 'in-progress', 'completed')),
  attendance_type text NOT NULL CHECK (attendance_type IN ('physical', 'virtual', 'hybrid')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Gigs table
CREATE TABLE IF NOT EXISTS gigs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  subcategory text,
  budget_min numeric(10,2) NOT NULL,
  budget_max numeric(10,2) NOT NULL,
  budget_type text NOT NULL CHECK (budget_type IN ('fixed', 'hourly')),
  duration text,
  location_type text NOT NULL CHECK (location_type IN ('remote', 'onsite', 'hybrid')),
  city text,
  country text,
  posted_by_id uuid REFERENCES users(id) ON DELETE CASCADE,
  posted_date timestamptz DEFAULT now(),
  deadline timestamptz,
  status text NOT NULL CHECK (status IN ('open', 'in-progress', 'completed', 'cancelled')),
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id uuid REFERENCES gigs(id) ON DELETE CASCADE,
  creator_id uuid REFERENCES creators(id) ON DELETE CASCADE,
  cover_letter text NOT NULL,
  rate numeric(10,2) NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Team Members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id uuid REFERENCES studios(id) ON DELETE CASCADE,
  creator_id uuid REFERENCES creators(id),
  name text NOT NULL,
  role text NOT NULL,
  profile_image text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Social Links table
CREATE TABLE IF NOT EXISTS social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES creators(id) ON DELETE CASCADE,
  studio_id uuid REFERENCES studios(id) ON DELETE CASCADE,
  platform text NOT NULL,
  url text NOT NULL,
  followers integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CHECK (creator_id IS NOT NULL OR studio_id IS NOT NULL)
);

-- Portfolio Items table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES creators(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  thumbnail_url text NOT NULL,
  project_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES creators(id) ON DELETE CASCADE,
  role text NOT NULL,
  company text NOT NULL,
  start_date text NOT NULL,
  end_date text,
  description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Awards table
CREATE TABLE IF NOT EXISTS awards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES creators(id) ON DELETE CASCADE,
  title text NOT NULL,
  organization text NOT NULL,
  year text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Education table
CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES creators(id) ON DELETE CASCADE,
  degree text NOT NULL,
  institution text NOT NULL,
  year text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Junction Tables

-- Categories for creators
CREATE TABLE IF NOT EXISTS creator_categories (
  creator_id uuid REFERENCES creators(id) ON DELETE CASCADE,
  category text NOT NULL,
  PRIMARY KEY (creator_id, category)
);

-- Skills for creators
CREATE TABLE IF NOT EXISTS creator_skills (
  creator_id uuid REFERENCES creators(id) ON DELETE CASCADE,
  skill text NOT NULL,
  PRIMARY KEY (creator_id, skill)
);

-- Industries for studios
CREATE TABLE IF NOT EXISTS studio_industries (
  studio_id uuid REFERENCES studios(id) ON DELETE CASCADE,
  industry text NOT NULL,
  PRIMARY KEY (studio_id, industry)
);

-- Services for studios
CREATE TABLE IF NOT EXISTS studio_services (
  studio_id uuid REFERENCES studios(id) ON DELETE CASCADE,
  service text NOT NULL,
  PRIMARY KEY (studio_id, service)
);

-- Equipment for studios
CREATE TABLE IF NOT EXISTS studio_equipment (
  studio_id uuid REFERENCES studios(id) ON DELETE CASCADE,
  equipment text NOT NULL,
  PRIMARY KEY (studio_id, equipment)
);

-- Facilities for studios
CREATE TABLE IF NOT EXISTS studio_facilities (
  studio_id uuid REFERENCES studios(id) ON DELETE CASCADE,
  facility text NOT NULL,
  PRIMARY KEY (studio_id, facility)
);

-- Skills required for gigs
CREATE TABLE IF NOT EXISTS gig_skills (
  gig_id uuid REFERENCES gigs(id) ON DELETE CASCADE,
  skill text NOT NULL,
  PRIMARY KEY (gig_id, skill)
);

-- Categories for showcases
CREATE TABLE IF NOT EXISTS showcase_categories (
  showcase_id uuid REFERENCES showcases(id) ON DELETE CASCADE,
  category text NOT NULL,
  PRIMARY KEY (showcase_id, category)
);

-- Projects in showcases
CREATE TABLE IF NOT EXISTS showcase_projects (
  showcase_id uuid REFERENCES showcases(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  PRIMARY KEY (showcase_id, project_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE showcases ENABLE ROW LEVEL SECURITY;
ALTER TABLE gigs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE studio_industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE studio_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE studio_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE studio_facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE gig_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE showcase_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE showcase_projects ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = auth_id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = auth_id);

-- Create policies for creators table
CREATE POLICY "Anyone can read creator profiles" ON creators
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Creators can update own profile" ON creators
  FOR UPDATE TO authenticated
  USING (auth.uid() IN (
    SELECT auth_id FROM users WHERE id = user_id
  ));

-- Create policies for studios table
CREATE POLICY "Anyone can read studio profiles" ON studios
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Studio members can update studio profile" ON studios
  FOR UPDATE TO authenticated
  USING (auth.uid() IN (
    SELECT u.auth_id 
    FROM users u
    JOIN team_members tm ON tm.creator_id = (
      SELECT c.id FROM creators c WHERE c.user_id = u.id
    )
    WHERE tm.studio_id = id
  ));

-- Create policies for projects table
CREATE POLICY "Anyone can read projects" ON projects
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Creators can manage own projects" ON projects
  FOR ALL TO authenticated
  USING (auth.uid() IN (
    SELECT u.auth_id 
    FROM users u
    JOIN creators c ON c.user_id = u.id
    WHERE c.id = producer_id
  ));

-- Create policies for showcases table
CREATE POLICY "Anyone can read showcases" ON showcases
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Studios can manage own showcases" ON showcases
  FOR ALL TO authenticated
  USING (auth.uid() IN (
    SELECT u.auth_id 
    FROM users u
    JOIN team_members tm ON tm.creator_id = (
      SELECT c.id FROM creators c WHERE c.user_id = u.id
    )
    WHERE tm.studio_id = organizer_id
  ));

-- Create policies for gigs table
CREATE POLICY "Anyone can read gigs" ON gigs
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Users can manage own gigs" ON gigs
  FOR ALL TO authenticated
  USING (auth.uid() IN (
    SELECT auth_id FROM users WHERE id = posted_by_id
  ));

-- Create policies for applications table
CREATE POLICY "Creators can read own applications" ON applications
  FOR SELECT TO authenticated
  USING (auth.uid() IN (
    SELECT u.auth_id 
    FROM users u
    JOIN creators c ON c.user_id = u.id
    WHERE c.id = creator_id
  ));

CREATE POLICY "Creators can create applications" ON applications
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT u.auth_id 
    FROM users u
    JOIN creators c ON c.user_id = u.id
    WHERE c.id = creator_id
  ));

-- Create policies for other tables following similar patterns
-- Add more policies as needed for specific use cases