require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function runTests() {
  console.log("Testing Supabase...");
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const { data, error } = await supabase.from('profiles').select('id').limit(1);
  if (error) {
    if (error.code === 'PGRST116' || error.message.includes('relation "public.profiles" does not exist')) {
      console.log("✅ Supabase is connected! (Note: 'profiles' table is missing, but connection succeeded).");
    } else {
      console.error("❌ Supabase connection failed:", error);
    }
  } else {
    console.log("✅ Supabase is connected! Data retrieved.");
  }

  console.log("\nTesting Gemini...");
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Respond with exactly the word: 'CONNECTED'");
    const text = result.response.text().trim();
    if (text.includes("CONNECTED")) {
      console.log("✅ Gemini API is connected!");
    } else {
      console.log("❓ Gemini responded, but unexpected text:", text);
    }
  } catch (err) {
    console.error("❌ Gemini connection failed:", err.message);
  }
}
runTests();
