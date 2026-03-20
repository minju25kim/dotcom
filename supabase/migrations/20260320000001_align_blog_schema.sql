-- Align blog table columns to match dev table
ALTER TABLE blog RENAME COLUMN content TO markdown;
ALTER TABLE blog ADD COLUMN published boolean DEFAULT false;
