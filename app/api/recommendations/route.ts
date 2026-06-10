import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's carbon data
    const { data: entries } = await supabase
      .from("carbon_logs")
      .select("category, carbon_kg")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "placeholder_gemini_key") {
      // Return static recommendations
      return NextResponse.json({
        recommendations: [
          {
            title: "Switch to public transit for your commute",
            description: "Using bus or train instead of a private car can save up to 2,400 kg CO₂ annually. Even 2 days per week makes a significant difference.",
            category: "transport",
            impact_kg: 800,
            difficulty: "medium",
          },
          {
            title: "Adopt a flexitarian diet",
            description: "Reducing meat to 3 times per week instead of daily saves approximately 500 kg CO₂ per year. Start with Meatless Mondays!",
            category: "food",
            impact_kg: 500,
            difficulty: "easy",
          },
          {
            title: "Switch to a renewable energy provider",
            description: "Moving to 100% renewable electricity can reduce your energy carbon footprint by up to 90%, saving around 1,200 kg CO₂ annually.",
            category: "energy",
            impact_kg: 1200,
            difficulty: "easy",
          },
          {
            title: "Reduce online shopping deliveries",
            description: "Consolidate deliveries to once per week and choose slower shipping options. This can save 30-50 kg CO₂ per year.",
            category: "shopping",
            impact_kg: 40,
            difficulty: "easy",
          },
          {
            title: "Work from home 2 days per week",
            description: "If remote work is possible, 2 WFH days per week can eliminate up to 40% of your commuting emissions.",
            category: "transport",
            impact_kg: 480,
            difficulty: "medium",
          },
        ],
      });
    }

    // Generate AI recommendations based on user data
    const categoryTotals = ((entries || []) as { category: string; carbon_kg: number }[]).reduce(
      (acc: Record<string, number>, entry) => {
        acc[entry.category] = (acc[entry.category] || 0) + entry.carbon_kg;
        return acc;
      },
      {}
    );

    const topCategories = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat, total]) => `${cat}: ${total.toFixed(1)} kg CO₂`);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Based on this user's carbon footprint data:
Top emission categories: ${topCategories.join(", ")}

Generate 5 personalized carbon reduction recommendations. Return ONLY a valid JSON array:
[
  {
    "title": "Short action title",
    "description": "Detailed explanation with specific CO2 savings",
    "category": "transport|energy|food|shopping|travel",
    "impact_kg": number (estimated annual kg CO2 saved),
    "difficulty": "easy|medium|hard"
  }
]

Make recommendations specific, actionable, and ordered by impact. No markdown, just JSON.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let recommendations;
    try {
      const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
      recommendations = JSON.parse(cleaned);
    } catch {
      recommendations = [];
    }

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("Recommendations API error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
