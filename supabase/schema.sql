-- ============================================
-- Trace — Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  sustainability_score INTEGER DEFAULT 0,
  total_carbon_kg DECIMAL(10,2) DEFAULT 0,
  carbon_goal_kg DECIMAL(10,2) DEFAULT 2000,
  is_public BOOLEAN DEFAULT TRUE,
  streak_days INTEGER DEFAULT 0,
  last_activity_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CARBON ENTRIES TABLE
-- ============================================
CREATE TYPE carbon_category AS ENUM ('transport', 'energy', 'food', 'shopping', 'travel', 'other');
CREATE TYPE entry_source AS ENUM ('manual', 'calculator', 'ocr', 'import');

CREATE TABLE IF NOT EXISTS public.carbon_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  category carbon_category NOT NULL,
  subcategory TEXT,
  description TEXT,
  carbon_kg DECIMAL(10,4) NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  source entry_source DEFAULT 'manual',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- HABITS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.habits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  carbon_saved_kg DECIMAL(8,4) DEFAULT 0,
  is_completed_today BOOLEAN DEFAULT FALSE,
  streak_days INTEGER DEFAULT 0,
  total_completions INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ACHIEVEMENTS TABLE
-- ============================================
CREATE TYPE achievement_rarity AS ENUM ('common', 'rare', 'epic', 'legendary');

CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  points INTEGER DEFAULT 10,
  rarity achievement_rarity DEFAULT 'common',
  requirement_type TEXT NOT NULL,
  requirement_value DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- USER ACHIEVEMENTS (Junction)
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- ============================================
-- CHAT MESSAGES TABLE
-- ============================================
CREATE TYPE message_role AS ENUM ('user', 'assistant');

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role message_role NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- UPLOADED DOCUMENTS TABLE
-- ============================================
CREATE TYPE document_type AS ENUM ('receipt', 'electricity_bill', 'other');
CREATE TYPE document_status AS ENUM ('pending', 'processing', 'completed', 'failed');

CREATE TABLE IF NOT EXISTS public.uploaded_documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  document_type document_type DEFAULT 'other',
  analysis_result JSONB,
  carbon_extracted_kg DECIMAL(10,4),
  status document_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RECOMMENDATIONS TABLE
-- ============================================
CREATE TYPE difficulty_level AS ENUM ('easy', 'medium', 'hard');

CREATE TABLE IF NOT EXISTS public.recommendations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  impact_kg DECIMAL(8,4) DEFAULT 0,
  difficulty difficulty_level DEFAULT 'medium',
  is_completed BOOLEAN DEFAULT FALSE,
  ai_generated BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LEADERBOARD VIEW
-- ============================================
CREATE OR REPLACE VIEW public.leaderboard AS
SELECT
  p.id AS user_id,
  p.full_name,
  p.avatar_url,
  p.sustainability_score,
  p.total_carbon_kg,
  RANK() OVER (ORDER BY p.sustainability_score DESC) AS rank
FROM public.profiles p
WHERE p.is_public = TRUE
ORDER BY p.sustainability_score DESC;

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_carbon_entries_user_id ON public.carbon_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_carbon_entries_date ON public.carbon_entries(date DESC);
CREATE INDEX IF NOT EXISTS idx_carbon_entries_category ON public.carbon_entries(category);
CREATE INDEX IF NOT EXISTS idx_habits_user_id ON public.habits(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON public.chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id ON public.recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON public.user_achievements(user_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carbon_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view public profiles" ON public.profiles
  FOR SELECT USING (is_public = TRUE OR auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Carbon entries policies
CREATE POLICY "Users can CRUD own carbon entries" ON public.carbon_entries
  FOR ALL USING (auth.uid() = user_id);

-- Habits policies
CREATE POLICY "Users can CRUD own habits" ON public.habits
  FOR ALL USING (auth.uid() = user_id);

-- Achievements policies (read-only for all)
CREATE POLICY "Everyone can view achievements" ON public.achievements
  FOR SELECT USING (TRUE);

-- User achievements policies
CREATE POLICY "Users can view own achievements" ON public.user_achievements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements" ON public.user_achievements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Chat messages policies
CREATE POLICY "Users can CRUD own chat messages" ON public.chat_messages
  FOR ALL USING (auth.uid() = user_id);

-- Uploaded documents policies
CREATE POLICY "Users can CRUD own documents" ON public.uploaded_documents
  FOR ALL USING (auth.uid() = user_id);

-- Recommendations policies
CREATE POLICY "Users can CRUD own recommendations" ON public.recommendations
  FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- TRIGGERS
-- ============================================
-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- SEED ACHIEVEMENTS
-- ============================================
INSERT INTO public.achievements (slug, title, description, icon, category, points, rarity, requirement_type, requirement_value) VALUES
('first-steps', 'First Steps', 'Log your first carbon entry', '🌱', 'general', 10, 'common', 'entries_count', 1),
('green-week', 'Green Week', 'Log carbon for 7 consecutive days', '📅', 'streak', 25, 'common', 'streak_days', 7),
('carbon-crusher', 'Carbon Crusher', 'Reduce monthly carbon by 10%', '⚡', 'reduction', 50, 'rare', 'monthly_reduction_pct', 10),
('habit-hero', 'Habit Hero', 'Complete 10 sustainable habits', '💪', 'habits', 30, 'common', 'habits_completed', 10),
('solar-champion', 'Solar Champion', 'Track solar energy usage', '☀️', 'energy', 40, 'rare', 'energy_entries', 5),
('plant-power', 'Plant Power', 'Log 30 plant-based meals', '🥗', 'food', 35, 'rare', 'plant_meals', 30),
('eco-commuter', 'Eco Commuter', 'Use public transport 20 times', '🚌', 'transport', 45, 'rare', 'public_transport', 20),
('net-zero-hero', 'Net Zero Hero', 'Achieve net zero for a month', '🌍', 'general', 200, 'legendary', 'net_zero_months', 1),
('century-club', 'Century Club', 'Save 100kg CO2 total', '💯', 'reduction', 100, 'epic', 'carbon_saved_kg', 100),
('community-star', 'Community Star', 'Reach top 10 on leaderboard', '⭐', 'social', 75, 'epic', 'leaderboard_rank', 10),
('streak-master', 'Streak Master', 'Maintain a 30-day streak', '🔥', 'streak', 150, 'epic', 'streak_days', 30),
('report-guru', 'Report Guru', 'Download 5 sustainability reports', '📊', 'general', 30, 'common', 'reports_downloaded', 5),
('scanner-pro', 'Scanner Pro', 'Scan 10 receipts or bills', '📄', 'general', 40, 'rare', 'documents_scanned', 10),
('goal-setter', 'Goal Setter', 'Set and achieve a carbon goal', '🎯', 'general', 60, 'rare', 'goals_achieved', 1),
('tree-friend', 'Tree Friend', 'Plant the equivalent of 10 trees in carbon savings', '🌳', 'nature', 80, 'epic', 'tree_equivalent', 10)
ON CONFLICT (slug) DO NOTHING;
