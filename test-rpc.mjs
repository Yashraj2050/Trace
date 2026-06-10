import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function checkRpc() {
  const res = await fetch(`${url}/rest/v1/rpc/increment_streak`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user_id: '00000000-0000-0000-0000-000000000000' })
  });
  if (res.status === 204 || res.status === 200 || res.status === 400 || res.status === 500) {
    // 500 might be thrown if user doesn't exist but the RPC is found
    return 'Exists';
  }
  if (res.status === 404) return 'Missing';
  
  return 'Exists (Status: ' + res.status + ')';
}

checkRpc().then(console.log);
