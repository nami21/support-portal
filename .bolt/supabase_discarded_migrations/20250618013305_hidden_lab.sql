/*
  # Create tickets table

  1. New Tables
    - `tickets`
      - `id` (uuid, primary key)
      - `title` (text)
      - `category` (enum)
      - `priority` (enum)
      - `description` (text)
      - `attachments` (text array)
      - `status` (enum)
      - `created_by` (uuid, foreign key)
      - `assigned_to` (uuid, foreign key, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `tickets` table
    - Add policies for users to manage their own tickets
    - Add policies for admins and support to manage all tickets
*/

-- Create enums for tickets
CREATE TYPE ticket_category AS ENUM ('it-support', 'hr', 'facilities', 'other');
CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE ticket_status AS ENUM ('open', 'in-progress', 'resolved', 'closed');

-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category ticket_category NOT NULL,
  priority ticket_priority NOT NULL DEFAULT 'medium',
  description text NOT NULL,
  attachments text[] DEFAULT '{}',
  status ticket_status NOT NULL DEFAULT 'open',
  created_by uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assigned_to uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read their own tickets"
  ON tickets
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Support and admins can read all tickets"
  ON tickets
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'support')
    )
  );

CREATE POLICY "Users can create tickets"
  ON tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Support and admins can update tickets"
  ON tickets
  FOR UPDATE
  TO authenticated
  USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin', 'support')
    )
  );

-- Create trigger for updated_at
CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();