// src/utils/helpers.js
// Shared utility functions used across the app

/**
 * Format a "YYYY-MM-DD" date string into a readable form like "5 Oct 2026".
 * We append T00:00:00 so the Date constructor uses local midnight, not UTC,
 * preventing the date from shifting by one day in IST and similar timezones.
 */
export function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Returns true if the event date is today or in the future.
 */
export function isUpcoming(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(dateStr + "T00:00:00");
  return eventDate >= today;
}

/**
 * Get the next N upcoming events, sorted by date ascending.
 * If there aren't enough upcoming events, falls back to the first N events.
 */
export function getUpcomingEvents(allEvents, n = 3) {
  const upcoming = allEvents
    .filter((e) => isUpcoming(e.date))
    .sort((a, b) => new Date(a.date + "T00:00:00") - new Date(b.date + "T00:00:00"));

  if (upcoming.length > 0) return upcoming.slice(0, n);

  // Fallback: return the first n events if not enough upcoming ones exist
  return allEvents.slice(0, n);
}

// ─── localStorage helpers ─────────────────────────────────────────────────────

const STORAGE_KEY = "registrations";

/**
 * Safely read all registrations from localStorage.
 * Returns an empty array if nothing is stored or parsing fails.
 */
export function getRegistrations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Save a new registration object to localStorage.
 * Appends to existing list.
 */
export function saveRegistration(registration) {
  try {
    const existing = getRegistrations();
    existing.push(registration);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a user (by email) is already registered for a given event (by id).
 */
export function isDuplicateRegistration(email, eventId) {
  const registrations = getRegistrations();
  return registrations.some(
    (r) =>
      r.email.toLowerCase() === email.toLowerCase() &&
      String(r.eventId) === String(eventId)
  );
}
