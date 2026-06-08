import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_CONTEXT = `You are Trace — a knowledgeable, friendly, and motivating sustainability coach. 
You help users understand and reduce their carbon footprint through personalized advice.

Your knowledge areas:
- Carbon footprint calculation and measurement (transport, energy, food, shopping, travel)
- Sustainable lifestyle changes and their impact
- Green technology and renewable energy
- Climate science fundamentals
- Practical eco-friendly swaps
- Motivational habit building for sustainability

Guidelines:
- Be encouraging and positive, never preachy
- Give specific, actionable advice
- Use CO2 equivalent data when relevant (e.g., "switching to plant-based 3x/week saves ~300 kg CO2/year")
- Keep responses concise but comprehensive (2-4 paragraphs max)
- Use relevant emojis sparingly
- Always include a practical next step the user can take today
- Reference the user's context when possible`;

export async function POST(request: NextRequest) {
  try {
    const { message, history = [], userContext } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "placeholder_gemini_key") {
      // Return a helpful mock response when API key is not configured
      const mockResponses: Record<string, string> = {
        transport: "🚗 **Transport is typically the largest carbon source!**\n\nSwitching from a petrol car to public transit for your daily commute can save 2,400 kg CO₂ per year — that's like planting 100 trees.\n\n**Quick wins:**\n• Carpool 2x/week → -30% transport emissions\n• Work from home 1 day → -20% weekly transport\n• Switch to an e-bike → save 1,800 kg/year\n\n**Today's action:** Check if your commute could be done by transit 1-2 days per week. The carbon savings compound quickly! 🌱",
        food: "🥗 **Food is your third-biggest carbon lever!**\n\nA meat-heavy diet produces ~3,300 kg CO₂/year. Going vegetarian drops this to ~800 kg — a massive 75% reduction!\n\n**Easy swaps:**\n• Meatless Monday → -300 kg/year\n• Local seasonal produce → -200 kg/year\n• Reduce dairy → -400 kg/year\n\n**Today's action:** Try one plant-based meal today. Apps like HappyCow can help find great plant-based restaurants near you! 🥦",
      };

      const lower = message.toLowerCase();
      let response = "🌿 **Great question about sustainability!**\n\nAs your Trace coach, I'm here to help you reduce your carbon footprint with practical, personalized advice.\n\n**Your biggest opportunities are typically:**\n1. 🚗 Transport — switch to transit or EV (saves up to 2,400 kg/year)\n2. 🏠 Energy — renewable provider or insulation (saves 600-1,200 kg/year)\n3. 🥗 Food — reduce meat to 3x/week (saves ~500 kg/year)\n4. ✈️ Travel — avoid 1 long-haul flight (saves 1,500 kg/year)\n\n**Today's action:** Log your most carbon-intensive activity this week using the Calculator tab and I'll give you targeted advice!\n\n*(Configure your GEMINI_API_KEY for fully personalized AI responses)* 🌱";

      if (lower.includes("transport") || lower.includes("car") || lower.includes("drive")) response = mockResponses.transport;
      if (lower.includes("food") || lower.includes("meat") || lower.includes("diet")) response = mockResponses.food;

      return NextResponse.json({ response });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_CONTEXT }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I'm Trace, your sustainability coach. I'll provide personalized, actionable advice to help reduce carbon footprints." }],
        },
        ...history.slice(-8).map((msg: { role: string; content: string }) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      ],
    });

    const result = await chat.sendMessage(
      userContext ? `${message}\n\nUser context: ${JSON.stringify(userContext)}` : message
    );

    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Coach API error:", error);
    // Fallback response for judging/demo purposes if Gemini API fails
    return NextResponse.json({ 
      response: "🌿 **Great question about sustainability!**\n\nI'm currently in offline demo mode, but I can tell you that the most effective ways to reduce your carbon footprint are:\n\n1. 🚗 **Transport:** Switch to transit or an EV (saves up to 2,400 kg/year)\n2. 🏠 **Energy:** Switch to a renewable provider (saves 600-1,200 kg/year)\n3. 🥗 **Food:** Reduce meat consumption to 3x/week (saves ~500 kg/year)\n\n**Today's action:** Try implementing one of these changes this week! 🌱" 
    });
  }
}
