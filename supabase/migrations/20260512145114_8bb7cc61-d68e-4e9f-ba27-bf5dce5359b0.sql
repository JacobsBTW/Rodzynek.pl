
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  organization text NOT NULL,
  topic text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'new'
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone (incl. anon) may submit a contact form
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND length(organization) BETWEEN 1 AND 200
    AND length(topic) BETWEEN 1 AND 200
    AND (message IS NULL OR length(message) <= 4000)
  );

-- Only authenticated users can read/update submissions (admin panel later)
CREATE POLICY "Authenticated can view submissions"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update submissions"
  ON public.contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true);
