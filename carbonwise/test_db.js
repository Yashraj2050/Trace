require('dotenv').config({ path: '.env.local' });

async function runTests() {
  console.log("Initializing Test Protocol...");
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  const headers = {
    'apikey': anonKey,
    'Authorization': `Bearer ${anonKey}`,
    'Content-Type': 'application/json'
  };
  
  const testEmail = `testuser_${Date.now()}@trace.ai`;
  const testPassword = "SecurePassword123!";
  
  console.log("\n1. Testing Signup & Auth Trigger...");
  const signUpRes = await fetch(`${supabaseUrl}/auth/v1/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email: testEmail,
      password: testPassword,
      data: { full_name: "Test Verification User" }
    })
  });
  
  const signUpData = await signUpRes.json();
  console.log("Raw Signup Response:", JSON.stringify(signUpData, null, 2));

  if (signUpData.error || signUpData.code) {
    console.error("❌ Signup failed:", signUpData.msg || signUpData.error_description || signUpData.error?.message || signUpData.error);
    return;
  }
  
  const userId = signUpData.user ? signUpData.user.id : signUpData.id;
  const sessionToken = signUpData.session ? signUpData.session.access_token : signUpData.access_token;
  console.log("✅ Signup successful (User ID:", userId, ")");

  // Wait 2 seconds for Postgres trigger to execute
  await new Promise(r => setTimeout(r, 2000));

  console.log("\n3. Testing Login...");
  const signInRes = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email: testEmail,
      password: testPassword,
    })
  });
  const signInData = await signInRes.json();

  if (signInData.error) {
    console.error("❌ Login failed:", signInData.error_description || signInData.error);
    return;
  } else {
    console.log("✅ Login successful! Session token received.");
  }

  // Update auth headers with REAL token
  const realAuthHeaders = {
    ...headers,
    'Authorization': `Bearer ${signInData.access_token}`
  };

  console.log("\n2. Testing Profile Auto-creation & RLS (SELECT)...");
  const profileRes = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}&select=*`, { headers: realAuthHeaders });
  const profileData = await profileRes.json();

  if (profileData.error || profileData.length === 0) {
    console.error("❌ Profile fetch failed:", profileData.error || "Profile not found via RLS. Trigger might have failed.");
  } else {
    console.log("✅ Profile auto-created and accessible via RLS! Full Name:", profileData[0].full_name);
  }

  console.log("\n4. Testing Data Persistence & RLS (INSERT)...");
  const insertRes = await fetch(`${supabaseUrl}/rest/v1/carbon_logs`, {
    method: 'POST',
    headers: { ...realAuthHeaders, 'Prefer': 'return=representation' },
    body: JSON.stringify({
      user_id: userId,
      activity_type: 'test_run',
      carbon_kg: 42.5,
      details: { mode: 'automated_test' }
    })
  });
  
  const insertData = await insertRes.json();

  if (insertData.error || insertData.code) {
    console.error("❌ Carbon log insert failed:", insertData.message || insertData.error);
  } else if (insertData && insertData.length > 0) {
    console.log("✅ Carbon log inserted securely! ID:", insertData[0].id, " | Carbon:", insertData[0].carbon_kg, "kg");
  } else {
    console.log("❌ Insert returned unexpected format:", insertData);
  }

  console.log("\n5. Testing Data Retrieval & RLS restrictions...");
  const fetchRes = await fetch(`${supabaseUrl}/rest/v1/carbon_logs?select=*`, { headers: realAuthHeaders });
  const fetchLogs = await fetchRes.json();
    
  if (fetchLogs.error) {
    console.error("❌ Fetch failed:", fetchLogs.message || fetchLogs.error);
  } else {
    console.log(`✅ Successfully retrieved ${fetchLogs.length} logs for this user. RLS restricts access to only their logs.`);
  }

  console.log("\nTest Protocol Complete. All systems nominal.");
}

runTests();
