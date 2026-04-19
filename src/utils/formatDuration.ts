// -------------------------------------------------------------
// Utility: formatDuration
// Purpose: Convert milliseconds → "Xh Ym:Zs" or "Xm:Zs"
// -------------------------------------------------------------
export function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // If duration is over 1 hour → show "1h 11m:23s"
  if (hours > 0) {
    return `${hours}h ${minutes}m:${seconds.toString().padStart(2, "0")}s`;
  }

  // Under 1 hour → show "11m:23s"
  return `${minutes}m:${seconds.toString().padStart(2, "0")}s`;
}
