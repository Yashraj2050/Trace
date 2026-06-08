export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          onboarding_completed: boolean
          sustainability_score: number
          total_carbon_kg: number
          carbon_goal_kg: number
          is_public: boolean
          streak_days: number
          last_activity_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          onboarding_completed?: boolean
          sustainability_score?: number
          total_carbon_kg?: number
          carbon_goal_kg?: number
          is_public?: boolean
          streak_days?: number
          last_activity_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          onboarding_completed?: boolean
          sustainability_score?: number
          total_carbon_kg?: number
          carbon_goal_kg?: number
          is_public?: boolean
          streak_days?: number
          last_activity_at?: string | null
          updated_at?: string
        }
      }
      carbon_entries: {
        Row: {
          id: string
          user_id: string
          category: 'transport' | 'energy' | 'food' | 'shopping' | 'travel' | 'other'
          subcategory: string | null
          description: string | null
          carbon_kg: number
          date: string
          source: 'manual' | 'calculator' | 'ocr' | 'import'
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category: 'transport' | 'energy' | 'food' | 'shopping' | 'travel' | 'other'
          subcategory?: string | null
          description?: string | null
          carbon_kg: number
          date: string
          source?: 'manual' | 'calculator' | 'ocr' | 'import'
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          category?: 'transport' | 'energy' | 'food' | 'shopping' | 'travel' | 'other'
          subcategory?: string | null
          description?: string | null
          carbon_kg?: number
          date?: string
          source?: 'manual' | 'calculator' | 'ocr' | 'import'
          metadata?: Json | null
        }
      }
      habits: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: string
          carbon_saved_kg: number
          is_completed_today: boolean
          streak_days: number
          total_completions: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          category: string
          carbon_saved_kg?: number
          is_completed_today?: boolean
          streak_days?: number
          total_completions?: number
          created_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          category?: string
          carbon_saved_kg?: number
          is_completed_today?: boolean
          streak_days?: number
          total_completions?: number
        }
      }
      achievements: {
        Row: {
          id: string
          slug: string
          title: string
          description: string
          icon: string
          category: string
          points: number
          rarity: 'common' | 'rare' | 'epic' | 'legendary'
          requirement_type: string
          requirement_value: number
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description: string
          icon: string
          category: string
          points?: number
          rarity?: 'common' | 'rare' | 'epic' | 'legendary'
          requirement_type: string
          requirement_value: number
          created_at?: string
        }
        Update: {
          title?: string
          description?: string
          icon?: string
          category?: string
          points?: number
          rarity?: 'common' | 'rare' | 'epic' | 'legendary'
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          unlocked_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          unlocked_at?: string
        }
        Update: never
      }
      chat_messages: {
        Row: {
          id: string
          user_id: string
          role: 'user' | 'assistant'
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: 'user' | 'assistant'
          content: string
          created_at?: string
        }
        Update: never
      }
      uploaded_documents: {
        Row: {
          id: string
          user_id: string
          file_name: string
          file_type: string
          document_type: 'receipt' | 'electricity_bill' | 'other'
          analysis_result: Json | null
          carbon_extracted_kg: number | null
          status: 'pending' | 'processing' | 'completed' | 'failed'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          file_name: string
          file_type: string
          document_type?: 'receipt' | 'electricity_bill' | 'other'
          analysis_result?: Json | null
          carbon_extracted_kg?: number | null
          status?: 'pending' | 'processing' | 'completed' | 'failed'
          created_at?: string
        }
        Update: {
          analysis_result?: Json | null
          carbon_extracted_kg?: number | null
          status?: 'pending' | 'processing' | 'completed' | 'failed'
        }
      }
      recommendations: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          category: string
          impact_kg: number
          difficulty: 'easy' | 'medium' | 'hard'
          is_completed: boolean
          ai_generated: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          category: string
          impact_kg?: number
          difficulty?: 'easy' | 'medium' | 'hard'
          is_completed?: boolean
          ai_generated?: boolean
          created_at?: string
        }
        Update: {
          is_completed?: boolean
        }
      }
    }
    Views: {
      leaderboard: {
        Row: {
          user_id: string
          full_name: string | null
          avatar_url: string | null
          sustainability_score: number
          total_carbon_kg: number
          rank: number
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type CarbonEntry = Database['public']['Tables']['carbon_entries']['Row']
export type Habit = Database['public']['Tables']['habits']['Row']
export type Achievement = Database['public']['Tables']['achievements']['Row']
export type UserAchievement = Database['public']['Tables']['user_achievements']['Row']
export type ChatMessage = Database['public']['Tables']['chat_messages']['Row']
export type UploadedDocument = Database['public']['Tables']['uploaded_documents']['Row']
export type Recommendation = Database['public']['Tables']['recommendations']['Row']

export type CarbonCategory = CarbonEntry['category']
export type AchievementRarity = Achievement['rarity']
