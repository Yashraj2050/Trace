-- Migration for Behavioral Mechanics (Streaks, Commitments, Kudos)

-- 1. Profiles Table Updates
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS current_streak integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_log_date timestamp with time zone;

-- 2. Commitments Table
CREATE TABLE IF NOT EXISTS public.commitments (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    title text NOT NULL,
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    completed_at timestamp with time zone
);

ALTER TABLE public.commitments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own commitments" ON public.commitments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own commitments" ON public.commitments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own commitments" ON public.commitments FOR UPDATE USING (auth.uid() = user_id);

-- 3. Kudos Table
CREATE TABLE IF NOT EXISTS public.kudos (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    log_id uuid REFERENCES public.carbon_logs(id) ON DELETE CASCADE,
    giver_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(log_id, giver_id)
);

ALTER TABLE public.kudos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view kudos" ON public.kudos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can give kudos" ON public.kudos FOR INSERT WITH CHECK (auth.uid() = giver_id);
CREATE POLICY "Users can delete their kudos" ON public.kudos FOR DELETE USING (auth.uid() = giver_id);
