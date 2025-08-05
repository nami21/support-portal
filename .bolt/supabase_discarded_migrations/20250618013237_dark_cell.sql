/*
  # Create FAQs table

  1. New Tables
    - `faqs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `category` (enum)
      - `tags` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `faqs` table
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create enum for FAQ categories
CREATE TYPE faq_category AS ENUM ('policies', 'it-systems', 'hardware', 'network');

-- Create FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category faq_category NOT NULL,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read FAQs"
  ON faqs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert FAQs"
  ON faqs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update FAQs"
  ON faqs
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can delete FAQs"
  ON faqs
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON faqs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample FAQs
INSERT INTO faqs (title, content, category, tags) VALUES
  (
    'How to reset my password?',
    'To reset your password, go to the login page and click "Forgot Password". Enter your email address and follow the instructions sent to your email.',
    'it-systems',
    ARRAY['password', 'reset', 'login']
  ),
  (
    'What are our remote work policies?',
    'Our remote work policy allows for flexible working arrangements. Employees can work from home up to 3 days per week with manager approval.',
    'policies',
    ARRAY['remote', 'work', 'policy']
  ),
  (
    'How to connect to office WiFi?',
    'Connect to "CompanyWiFi" network and use your employee credentials. If you have issues, contact IT support.',
    'network',
    ARRAY['wifi', 'network', 'connection']
  ),
  (
    'Laptop maintenance guidelines',
    'Keep your laptop clean, updated, and backed up regularly. Report any hardware issues immediately to IT support.',
    'hardware',
    ARRAY['laptop', 'maintenance', 'hardware']
  )
ON CONFLICT DO NOTHING;