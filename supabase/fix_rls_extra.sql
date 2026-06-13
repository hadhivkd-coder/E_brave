CREATE POLICY "Enable all access for authenticated users on counseling_sessions" ON "public"."counseling_sessions" FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users on activity_logs" ON "public"."activity_logs" FOR ALL USING (auth.role() = 'authenticated');
