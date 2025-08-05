/*
  # Create announcements table

  1. New Tables
    - `announcements`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `type` (enum: alert, memo)
      - `target_audience` (text)
      - `validity_date` (timestamp)
      - `attachments` (text array)
      - `is_active` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `announcements` table
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create enum for announcement types
CREATE TYPE announcement_type AS ENUM ('alert', 'memo');

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type announcement_type NOT NULL,
  target_audience text NOT NULL DEFAULT 'All Employees',
  validity_date timestamptz NOT NULL,
  attachments text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read active announcements"
  ON announcements
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can read all announcements"
  ON announcements
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can insert announcements"
  ON announcements
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update announcements"
  ON announcements
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete announcements"
  ON announcements
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert sample announcements
INSERT INTO announcements (title, description, type, target_audience, validity_date, is_active) VALUES
  (
    'System Maintenance Scheduled',
    'Our IT systems will undergo maintenance this weekend from 9 PM to 6 AM.',
    'alert',
    'All Employees',
    '2024-12-22T00:00:00Z',
    true
  ),
  (
    'New Holiday Policy',
    'Updated holiday policy now includes additional personal days and flexible time off.',
    'memo',
    'All Employees',
    '2025-01-19T00:00:00Z',
    true
  )
ON CONFLICT DO NOTHING;