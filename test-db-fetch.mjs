import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function checkTable(tableName) {
  const res = await fetch(`${url}/rest/v1/${tableName}?select=id&limit=1`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`
    }
  });
  if (res.ok) return 'Exists';
  const data = await res.json();
  if (data.code === '42P01') return 'Missing';
  return `Error: ${data.message}`;
}

async function run() {
  console.log("Checking tables...");
  const tables = ['profiles', 'carbon_logs', 'commitments', 'kudos', 'achievements', 'user_achievements'];
  for (const t of tables) {
    console.log(`${t} -> ${await checkTable(t)}`);
  }
}

run();
