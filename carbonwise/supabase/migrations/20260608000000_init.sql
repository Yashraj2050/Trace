-- Trace Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--------------------------------------------------------
-- 1. PROFILES
--------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    sustainability_score INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 0,
    onboarding_completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists to prevent errors on multiple runs
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

--------------------------------------------------------
-- 2. CARBON LOGS
--------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.carbon_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    activity_type TEXT NOT NULL,
    carbon_kg NUMERIC NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.carbon_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own logs" 
    ON public.carbon_logs FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own logs" 
    ON public.carbon_logs FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

--------------------------------------------------------
-- 3. ACHIEVEMENTS
--------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements" 
    ON public.achievements FOR SELECT 
    USING (auth.uid() = user_id);

--------------------------------------------------------
-- 4. LEADERBOARD (Materialized View or Table)
--------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.leaderboard (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
    score INTEGER DEFAULT 0,
    rank INTEGER,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Leaderboard is public for all authenticated users to see
CREATE POLICY "Anyone can view leaderboard" 
    ON public.leaderboard FOR SELECT 
    TO authenticated USING (true);

--------------------------------------------------------
-- 5. REPORTS
--------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    month_year TEXT NOT NULL,
    total_carbon_kg NUMERIC NOT NULL,
    score INTEGER NOT NULL,
    report_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reports" 
    ON public.reports FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reports" 
    ON public.reports FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

--------------------------------------------------------
-- 6. HABITS
--------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.habits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    frequency TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own habits" 
    ON public.habits FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own habits" 
    ON public.habits FOR ALL 
    USING (auth.uid() = user_id);

--------------------------------------------------------
-- 7. CHALLENGES
--------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.challenges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    target_kg_reduction NUMERIC NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;

-- Challenges are public for all authenticated users to read
CREATE POLICY "Anyone can view challenges" 
    ON public.challenges FOR SELECT 
    TO authenticated USING (true);

-- User-Challenges mapping table
CREATE TABLE IF NOT EXISTS public.user_challenges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    challenge_id UUID REFERENCES public.challenges(id) ON DELETE CASCADE NOT NULL,
    progress_kg NUMERIC DEFAULT 0,
    is_completed BOOLEAN DEFAULT false,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, challenge_id)
);

ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own challenge progress" 
    ON public.user_challenges FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own challenge progress" 
    ON public.user_challenges FOR ALL 
    USING (auth.uid() = user_id);
