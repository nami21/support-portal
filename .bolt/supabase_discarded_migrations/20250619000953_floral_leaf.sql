/*
  # Fix infinite recursion in users table RLS policies

  1. Problem
    - The existing "Admins can manage all users" policy creates infinite recursion
    - It queries the users table to check if current user is admin, while evaluating access to the users table

  2. Solution
    - Remove the recursive policy that checks user role from the users table itself
    - Replace with a simpler approach using JWT claims or service role access
    - Keep the basic "Users can view own data" policy which doesn't cause recursion

  3. Changes
    - Drop the problematic admin policy
    - Keep the user self-access policy
    - Admin operations should be handled via service role or JWT claims
*/

-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Admins can manage all users" ON users;

-- The "Users can view own data" policy is fine as it doesn't cause recursion
-- It uses auth.uid() = id which doesn't query the users table recursively

-- For admin access, we'll rely on service role access or handle it differently
-- in the application layer to avoid the recursion issue