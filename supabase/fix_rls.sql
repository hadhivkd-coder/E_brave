CREATE POLICY "Enable all access for authenticated users" ON "public"."persons" FOR ALL USING (auth.role() = 'authenticated');
