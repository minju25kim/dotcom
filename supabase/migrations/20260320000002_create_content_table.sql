-- Create unified content table
CREATE TABLE content (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  type        text        NOT NULL CHECK (type IN ('blog', 'dev')),
  title       text,
  slug        text,
  markdown    text,
  author_id   text,
  published   boolean     DEFAULT false,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

-- RLS: anon can only read published rows
-- authenticated users have full access
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read published"
  ON content FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "authenticated full access"
  ON content FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Migrate dev data
INSERT INTO content (id, type, title, slug, markdown, author_id, published, created_at, updated_at)
SELECT gen_random_uuid(), 'dev', title, slug, markdown, author_id, published, created_at, updated_at
FROM dev;

-- Migrate blog data
INSERT INTO content (id, type, title, slug, markdown, author_id, published, created_at, updated_at)
SELECT gen_random_uuid(), 'blog', title, slug, markdown, author_id, published, created_at, updated_at
FROM blog;

-- Drop old tables
DROP TABLE dev;
DROP TABLE blog;
