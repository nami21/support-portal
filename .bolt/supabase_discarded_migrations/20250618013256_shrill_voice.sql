/*
  # Create system updates table

  1. New Tables
    - `system_updates`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `type` (enum)
      - `classification` (enum)
      - `severity` (enum)
      - `status` (enum)
      - `date` (timestamp)
      - `image_url` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `system_updates` table
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create enums for system updates
CREATE TYPE update_type AS ENUM ('information', 'advisory', 'maintenance', 'security');
CREATE TYPE update_classification AS ENUM ('internal', 'external');
CREATE TYPE update_severity AS ENUM ('high', 'medium', 'low');
CREATE TYPE update_status AS ENUM ('active', 'resolved', 'scheduled');

-- Create system updates table
CREATE TABLE IF NOT EXISTS system_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type update_type NOT NULL,
  classification update_classification NOT NULL DEFAULT 'internal',
  severity update_severity NOT NULL DEFAULT 'medium',
  status update_status NOT NULL DEFAULT 'active',
  date timestamptz NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE system_updates ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read system updates"
  ON system_updates
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert system updates"
  ON system_updates
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update system updates"
  ON system_updates
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete system updates"
  ON system_updates
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert sample system updates
INSERT INTO system_updates (title, description, type, classification, severity, status, date, image_url) VALUES
  (
    'Dashboard Update v2.1',
    'New analytics features and improved performance',
    'information',
    'internal',
    'medium',
    'active',
    '2024-12-19T00:00:00Z',
    'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400'
  ),
  (
    'Security Enhancement',
    'Enhanced security protocols and two-factor authentication',
    'security',
    'internal',
    'high',
    'active',
    '2024-12-18T00:00:00Z',
    'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=400'
  )
ON CONFLICT DO NOTHING;