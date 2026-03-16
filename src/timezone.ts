/**
 * Resolves the timezone parameter to an IANA timezone string.
 * - "local" → system's local timezone (e.g. "America/New_York")
 * - "utc" → "UTC"
 * - otherwise → pass through as IANA string
 */
export function resolveTimezone(timezone: string): string {
  const normalized = timezone.toLowerCase().trim();
  if (normalized === "local") {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  if (normalized === "utc") {
    return "UTC";
  }
  return timezone;
}

function getParts(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const map = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return map as Record<string, string>;
}

/**
 * Format a date as time only (HH:mm:ss).
 */
export function formatTime(date: Date, timeZone: string): string {
  const { hour, minute, second } = getParts(date, timeZone);
  return `${hour}:${minute}:${second}`;
}

/**
 * Format a date as date and time (YYYY-MM-DD HH:mm:ss).
 */
export function formatDateTime(date: Date, timeZone: string): string {
  const { year, month, day, hour, minute, second } = getParts(date, timeZone);
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
