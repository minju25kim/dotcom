-- Restrict content write access to admin only (minju25kim@gmail.com)
-- Previously "authenticated full access" allowed ANY logged-in user to write.

DROP POLICY IF EXISTS "authenticated full access" ON content;

CREATE POLICY "admin write access"
  ON content
  FOR ALL
  TO authenticated
  USING     (auth.jwt() ->> 'email' = 'minju25kim@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'minju25kim@gmail.com');
