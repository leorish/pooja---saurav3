export type WeddingStageIST = 'before' | 'wedding_day' | 'after';

/**
 * Computes current calendar date string (YYYY-MM-DD) in Indian Standard Time (Asia/Kolkata).
 */
export function getCurrentISTDateString(now: Date = new Date()): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(now);
  } catch {
    // Fallback offset math for UTC+05:30
    const istMs = now.getTime() + 5.5 * 60 * 60 * 1000;
    const istDate = new Date(istMs);
    const y = istDate.getUTCFullYear();
    const m = String(istDate.getUTCMonth() + 1).padStart(2, '0');
    const d = String(istDate.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}

export function getWeddingStageIST(now: Date = new Date()): WeddingStageIST {
  const istToday = getCurrentISTDateString(now);
  const weddingDay = '2026-11-20';
  if (istToday < weddingDay) return 'before';
  if (istToday === weddingDay) return 'wedding_day';
  return 'after';
}
