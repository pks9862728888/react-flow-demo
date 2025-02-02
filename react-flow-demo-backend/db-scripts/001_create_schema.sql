DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'core') THEN
CREATE SCHEMA core;
END IF;
END $$;
