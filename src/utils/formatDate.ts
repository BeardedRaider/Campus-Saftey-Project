// -------------------------------------------------------------
// Utility: formatDate
// Purpose: Convert timestamps into consistent, readable strings
// Used in: Tracking, Check-ins, Contacts, Location, etc.
// -------------------------------------------------------------

export function formatDate(value: number | string | null | undefined) {
  if (!value) return "N/A";
  return new Date(Number(value)).toLocaleString();
}
