/*
  # Create chat messages table

  1. New Tables
    - `chat_messages`
      - `id` (uuid, primary key)
      - `content` (text)
      - `is_bot` (boolean)
      - `user_id` (uuid, foreign key)
      - `timestamp` (timestamp)

  2. Security
    - Enable RLS on `chat_messages` table
    - Add policies for users to manage their own chat messages
*/

-- Create chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  is_bot boolean NOT NULL DEFAULT false,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  timestamp timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read their own chat messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own chat messages"
  ON chat_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can read all chat messages"
  ON chat_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );