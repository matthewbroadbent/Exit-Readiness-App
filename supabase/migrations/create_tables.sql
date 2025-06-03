/*
  # Create initial tables for Business Exit Planning Scorecard

  1. New Tables
    - `page_views` - Tracks page views for analytics
    - `scorecard_submissions` - Stores user submissions and scores
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated and anonymous users
*/

-- Create page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create scorecard_submissions table
CREATE TABLE IF NOT EXISTS scorecard_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  scores jsonb NOT NULL,
  total_score integer NOT NULL,
  readiness_level text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE scorecard_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for page_views
CREATE POLICY "Allow anonymous insert on page_views" 
  ON page_views 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated select on page_views" 
  ON page_views 
  FOR SELECT 
  TO authenticated 
  USING (true);

-- Create policies for scorecard_submissions
CREATE POLICY "Allow anonymous insert on scorecard_submissions" 
  ON scorecard_submissions 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Allow authenticated select on scorecard_submissions" 
  ON scorecard_submissions 
  FOR SELECT 
  TO authenticated 
  USING (true);
