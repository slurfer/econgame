import { refreshInterval } from "@/config/config.json";

export function getMsUntilNextRefresh() {
  const now = Date.now();

  const lastRefresh = now - (now % refreshInterval);
  const next = lastRefresh + refreshInterval;
  return next - now;
}
