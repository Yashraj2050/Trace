import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function checkMigrations() {
  // Query Supabase Migrations Table using PostgreSQL REST API 
  // Wait, the supabase_migrations schema might not be exposed over REST API.
  // We can just try running a query or check if 'commitments' exists.
  const res = await fetch(`${url}/rest/v1/commitments?select=id&limit=1`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`
    }
  });
  const data = await res.json();
  console.log(data);
}
checkMigrations();
