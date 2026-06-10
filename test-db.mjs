import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTable(tableName) {
  const { data, error } = await supabase.from(tableName).select('id').limit(1);
  if (error) {
    if (error.code === '42P01') {
      return 'Missing';
    }
    return `Error: ${error.message}`;
  }
  return 'Exists';
}

async function run() {
  console.log("Checking tables...");
  const tables = ['profiles', 'carbon_logs', 'commitments', 'kudos', 'achievements', 'user_achievements'];
  for (const t of tables) {
    const status = await checkTable(t);
    console.log(`${t} -> ${status}`);
  }
}

run();
