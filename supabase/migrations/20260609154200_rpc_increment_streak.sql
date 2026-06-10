-- Migration to add the increment_streak RPC function

CREATE OR REPLACE FUNCTION public.increment_streak(user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    last_log_date timestamp with time zone;
    current_streak integer;
    today_date date := current_date;
    last_log_date_only date;
BEGIN
    -- Get current state
    SELECT p.last_log_date, p.current_streak 
    INTO last_log_date, current_streak
    FROM public.profiles p
    WHERE p.id = user_id;

    IF last_log_date IS NULL THEN
        -- First time logging ever
        UPDATE public.profiles 
        SET current_streak = 1, last_log_date = now()
        WHERE id = user_id;
    ELSE
        last_log_date_only := last_log_date::date;
        
        IF last_log_date_only = today_date THEN
            -- Already logged today, do nothing to streak
            UPDATE public.profiles SET last_log_date = now() WHERE id = user_id;
        ELSIF last_log_date_only = today_date - interval '1 day' THEN
            -- Logged yesterday, increment streak
            UPDATE public.profiles 
            SET current_streak = COALESCE(current_streak, 0) + 1, last_log_date = now()
            WHERE id = user_id;
        ELSE
            -- Missed a day or more, reset streak
            UPDATE public.profiles 
            SET current_streak = 1, last_log_date = now()
            WHERE id = user_id;
        END IF;
    END IF;
END;
$$;
