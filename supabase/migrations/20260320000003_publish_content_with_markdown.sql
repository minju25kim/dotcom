-- Publish all rows that have markdown content
UPDATE content SET published = true WHERE markdown IS NOT NULL;
