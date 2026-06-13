-- ============================================================
-- Phase 3 Automation Engine
-- Automatic Follow-up Triggers
-- ============================================================

-- Create the trigger function
CREATE OR REPLACE FUNCTION trg_auto_schedule_followup()
RETURNS TRIGGER AS $$
DECLARE
    current_stage TEXT;
BEGIN
    -- Only trigger for person-related logs
    IF NEW.person_id IS NOT NULL THEN
        -- Get current stage
        SELECT lifecycle_stage INTO current_stage FROM public.persons WHERE id = NEW.person_id;
        
        -- Only bump to "Follow-up Required" if they are a New Lead, Old Lead, or Closed
        IF current_stage IN ('New Lead', 'Old Lead', 'Closed / Lost') THEN
            UPDATE public.persons
            SET last_contacted_at = NEW.created_at,
                next_action_due = NEW.created_at + INTERVAL '1 day',
                lifecycle_stage = 'Follow-up Required'
            WHERE id = NEW.person_id;
        ELSE
            -- Otherwise just update their contact timestamps so they stay in queue
            UPDATE public.persons
            SET last_contacted_at = NEW.created_at,
                next_action_due = NEW.created_at + INTERVAL '1 day'
            WHERE id = NEW.person_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to activity_logs
DROP TRIGGER IF EXISTS activity_log_auto_followup ON public.activity_logs;
CREATE TRIGGER activity_log_auto_followup
AFTER INSERT ON public.activity_logs
FOR EACH ROW
EXECUTE FUNCTION trg_auto_schedule_followup();
