"use client";

import { Trophy, Flame, Target, Users, Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CommunityPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Community & Quests</h1>
        <p className="text-muted-foreground mt-1 text-sm font-medium">Join friends, maintain streaks, and complete challenges.</p>
      </header>

      {/* Your Streaks */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Your Streaks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Logging Streak</p>
              <p className="text-2xl font-bold text-foreground">12 Days</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Target className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Under Budget</p>
              <p className="text-2xl font-bold text-foreground">3 Weeks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Quests */}
      <div className="space-y-4 pt-4">
        <div className="flex justify-between items-end">
          <h2 className="text-lg font-semibold tracking-tight">Active Quests</h2>
          <span className="text-sm font-medium text-primary cursor-pointer hover:underline">Explore all</span>
        </div>
        
        <div className="space-y-3">
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
              <span className="text-2xl">🌱</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Vegan January</h3>
              <p className="text-sm text-muted-foreground mt-1">Replace all meat meals with plant-based alternatives for the entire month.</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full border border-card bg-blue-100"></div>
                  <div className="w-6 h-6 rounded-full border border-card bg-red-100"></div>
                  <div className="w-6 h-6 rounded-full border border-card bg-purple-100"></div>
                </div>
                <span className="text-xs text-muted-foreground ml-2">1,204 members</span>
              </div>
            </div>
            <div className="w-full sm:w-32 flex flex-col gap-2">
              <div className="flex justify-between text-xs font-medium">
                <span>Progress</span>
                <span className="text-primary">14/31</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Feed (Strava Style) */}
      <div className="space-y-4 pt-8">
        <h2 className="text-lg font-semibold tracking-tight">Friend Activity</h2>
        <div className="space-y-4">
          
          <FeedItem 
            name="Alex Rivera"
            avatar="bg-blue-100"
            time="2 hours ago"
            action="Logged a Zero-Emission Commute"
            impact="Saved 4.2 kg CO₂"
            initialKudos={12}
          />

          <FeedItem 
            name="Sarah Chen"
            avatar="bg-emerald-100"
            time="5 hours ago"
            action="Completed 'Vegan Week' Quest"
            impact="Saved 18.5 kg CO₂"
            initialKudos={45}
            isQuest
          />

          <FeedItem 
            name="Marcus Johnson"
            avatar="bg-purple-100"
            time="Yesterday"
            action="Installed Solar Panels"
            impact="Offsetting 1,200 kg CO₂ / year"
            initialKudos={128}
          />

        </div>
      </div>
    </div>
  );
}

function FeedItem({ name, avatar, time, action, impact, initialKudos, isQuest = false }: {
  name: string;
  avatar: string;
  time: string;
  action: string;
  impact: string;
  initialKudos: number;
  isQuest?: boolean;
}) {
  const [kudos, setKudos] = useState(initialKudos);
  const [given, setGiven] = useState(false);

  const handleKudos = () => {
    if (given) return;
    setKudos(prev => prev + 1);
    setGiven(true);
    
    toast.success(`You cheered for ${name}!`);
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full ${avatar} border border-border`}></div>
          <div>
            <p className="font-semibold text-sm text-foreground">{name}</p>
            <p className="text-xs text-muted-foreground">{time}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-foreground font-medium">{action}</p>
        <p className={`text-sm mt-1 font-semibold ${isQuest ? 'text-primary' : 'text-emerald-500'}`}>{impact}</p>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-border">
        <button 
          onClick={handleKudos}
          disabled={given}
          className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full transition-all ${
            given ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          <Heart className={`w-4 h-4 ${given ? 'fill-primary' : ''}`} /> 
          {kudos} {given ? 'Kudos Given' : 'Kudos'}
        </button>
      </div>
    </div>
  );
}
