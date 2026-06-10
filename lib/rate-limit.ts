// Simple in-memory rate limiter for demonstration.

// Simple in-memory store for demonstration. 
// For production, use Redis (e.g. Upstash Rate Limit)
const ipStore = new Map<string, { count: number, timestamp: number }>();

export function rateLimit(ip: string, limit = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const record = ipStore.get(ip);
  
  if (!record) {
    ipStore.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (now - record.timestamp > windowMs) {
    ipStore.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count += 1;
  return true;
}
