/**
 * Privacy-friendly approximate geolocation.
 *
 * We never read IP addresses or call third-party geolocation services. Instead
 * we derive an *approximate* country from the browser's own time zone
 * (Intl.DateTimeFormat), which stays entirely on the device. Aggregated counts
 * are stored in localStorage only — no personal information leaves the browser.
 */

export interface GeoPoint {
  country: string;
  lat: number;
  lon: number;
}

// Curated map of common IANA time zones -> approximate country centroid.
const TZ_MAP: Record<string, GeoPoint> = {
  'Africa/Cairo': { country: 'Egypt', lat: 30.0, lon: 31.2 },
  'Africa/Lagos': { country: 'Nigeria', lat: 9.1, lon: 8.7 },
  'Africa/Johannesburg': { country: 'South Africa', lat: -29.0, lon: 24.0 },
  'Africa/Nairobi': { country: 'Kenya', lat: -0.0, lon: 37.9 },
  'Africa/Casablanca': { country: 'Morocco', lat: 31.8, lon: -7.1 },
  'Africa/Algiers': { country: 'Algeria', lat: 28.0, lon: 1.7 },
  'Africa/Tunis': { country: 'Tunisia', lat: 34.0, lon: 9.6 },
  'Africa/Accra': { country: 'Ghana', lat: 7.9, lon: -1.0 },
  'Africa/Khartoum': { country: 'Sudan', lat: 15.5, lon: 32.5 },
  'America/New_York': { country: 'United States', lat: 39.5, lon: -98.4 },
  'America/Detroit': { country: 'United States', lat: 39.5, lon: -98.4 },
  'America/Chicago': { country: 'United States', lat: 39.5, lon: -98.4 },
  'America/Denver': { country: 'United States', lat: 39.5, lon: -98.4 },
  'America/Phoenix': { country: 'United States', lat: 39.5, lon: -98.4 },
  'America/Los_Angeles': { country: 'United States', lat: 39.5, lon: -98.4 },
  'America/Anchorage': { country: 'United States', lat: 39.5, lon: -98.4 },
  'America/Toronto': { country: 'Canada', lat: 56.1, lon: -106.3 },
  'America/Vancouver': { country: 'Canada', lat: 56.1, lon: -106.3 },
  'America/Mexico_City': { country: 'Mexico', lat: 23.6, lon: -102.5 },
  'America/Sao_Paulo': { country: 'Brazil', lat: -14.2, lon: -51.9 },
  'America/Argentina/Buenos_Aires': { country: 'Argentina', lat: -38.4, lon: -63.6 },
  'America/Bogota': { country: 'Colombia', lat: 4.6, lon: -74.3 },
  'America/Lima': { country: 'Peru', lat: -9.2, lon: -75.0 },
  'America/Santiago': { country: 'Chile', lat: -35.7, lon: -71.5 },
  'Europe/London': { country: 'United Kingdom', lat: 54.0, lon: -2.0 },
  'Europe/Dublin': { country: 'Ireland', lat: 53.4, lon: -8.2 },
  'Europe/Paris': { country: 'France', lat: 46.6, lon: 2.2 },
  'Europe/Madrid': { country: 'Spain', lat: 40.0, lon: -3.7 },
  'Europe/Berlin': { country: 'Germany', lat: 51.2, lon: 10.4 },
  'Europe/Rome': { country: 'Italy', lat: 41.9, lon: 12.6 },
  'Europe/Amsterdam': { country: 'Netherlands', lat: 52.1, lon: 5.3 },
  'Europe/Brussels': { country: 'Belgium', lat: 50.5, lon: 4.5 },
  'Europe/Zurich': { country: 'Switzerland', lat: 46.8, lon: 8.2 },
  'Europe/Vienna': { country: 'Austria', lat: 47.5, lon: 14.6 },
  'Europe/Stockholm': { country: 'Sweden', lat: 60.1, lon: 18.6 },
  'Europe/Oslo': { country: 'Norway', lat: 60.5, lon: 8.5 },
  'Europe/Copenhagen': { country: 'Denmark', lat: 56.3, lon: 9.5 },
  'Europe/Warsaw': { country: 'Poland', lat: 51.9, lon: 19.1 },
  'Europe/Moscow': { country: 'Russia', lat: 61.5, lon: 105.3 },
  'Europe/Istanbul': { country: 'Turkey', lat: 38.9, lon: 35.2 },
  'Europe/Athens': { country: 'Greece', lat: 39.1, lon: 21.8 },
  'Europe/Lisbon': { country: 'Portugal', lat: 39.4, lon: -8.2 },
  'Asia/Dubai': { country: 'United Arab Emirates', lat: 23.4, lon: 53.8 },
  'Asia/Riyadh': { country: 'Saudi Arabia', lat: 23.9, lon: 45.1 },
  'Asia/Qatar': { country: 'Qatar', lat: 25.4, lon: 51.2 },
  'Asia/Jerusalem': { country: 'Israel', lat: 31.0, lon: 34.9 },
  'Asia/Amman': { country: 'Jordan', lat: 30.6, lon: 36.2 },
  'Asia/Beirut': { country: 'Lebanon', lat: 33.9, lon: 35.9 },
  'Asia/Baghdad': { country: 'Iraq', lat: 33.2, lon: 43.7 },
  'Asia/Tehran': { country: 'Iran', lat: 32.4, lon: 53.7 },
  'Asia/Karachi': { country: 'Pakistan', lat: 30.4, lon: 69.3 },
  'Asia/Kolkata': { country: 'India', lat: 20.6, lon: 79.0 },
  'Asia/Calcutta': { country: 'India', lat: 20.6, lon: 79.0 },
  'Asia/Dhaka': { country: 'Bangladesh', lat: 23.7, lon: 90.4 },
  'Asia/Bangkok': { country: 'Thailand', lat: 15.9, lon: 101.0 },
  'Asia/Jakarta': { country: 'Indonesia', lat: -0.8, lon: 113.9 },
  'Asia/Singapore': { country: 'Singapore', lat: 1.35, lon: 103.8 },
  'Asia/Kuala_Lumpur': { country: 'Malaysia', lat: 4.2, lon: 101.9 },
  'Asia/Manila': { country: 'Philippines', lat: 12.9, lon: 121.8 },
  'Asia/Shanghai': { country: 'China', lat: 35.9, lon: 104.2 },
  'Asia/Hong_Kong': { country: 'Hong Kong', lat: 22.3, lon: 114.2 },
  'Asia/Taipei': { country: 'Taiwan', lat: 23.7, lon: 121.0 },
  'Asia/Seoul': { country: 'South Korea', lat: 36.5, lon: 127.8 },
  'Asia/Tokyo': { country: 'Japan', lat: 36.2, lon: 138.3 },
  'Australia/Sydney': { country: 'Australia', lat: -25.3, lon: 133.8 },
  'Australia/Melbourne': { country: 'Australia', lat: -25.3, lon: 133.8 },
  'Australia/Perth': { country: 'Australia', lat: -25.3, lon: 133.8 },
  'Pacific/Auckland': { country: 'New Zealand', lat: -41.0, lon: 174.0 },
};

// Coarse fallback by continent prefix when the exact zone is unknown.
const REGION_FALLBACK: Record<string, GeoPoint> = {
  Africa: { country: 'Africa', lat: 2.0, lon: 21.0 },
  America: { country: 'Americas', lat: 15.0, lon: -90.0 },
  Europe: { country: 'Europe', lat: 50.0, lon: 10.0 },
  Asia: { country: 'Asia', lat: 34.0, lon: 100.0 },
  Australia: { country: 'Australia', lat: -25.3, lon: 133.8 },
  Pacific: { country: 'Oceania', lat: -8.0, lon: 160.0 },
  Indian: { country: 'Indian Ocean', lat: -6.0, lon: 71.0 },
  Atlantic: { country: 'Atlantic', lat: 38.0, lon: -28.0 },
};

export function getApproxLocation(): GeoPoint | null {
  if (typeof Intl === 'undefined') return null;
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return null;
    if (TZ_MAP[tz]) return TZ_MAP[tz];
    const region = tz.split('/')[0];
    return REGION_FALLBACK[region] ?? null;
  } catch {
    return null;
  }
}

const STORE_KEY = 'siteReach.countries.v1';

export type CountryTally = Record<string, number>;

export function readCountryTally(): CountryTally {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as CountryTally) : {};
  } catch {
    return {};
  }
}

/** Record the current visitor's approximate country once per session. */
export function recordVisit(): CountryTally {
  if (typeof window === 'undefined') return {};
  const tally = readCountryTally();
  const loc = getApproxLocation();
  if (loc && !sessionStorage.getItem('siteReach.counted')) {
    tally[loc.country] = (tally[loc.country] ?? 0) + 1;
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(tally));
      sessionStorage.setItem('siteReach.counted', '1');
    } catch {
      /* ignore */
    }
  }
  return tally;
}

export function countryCentroid(country: string): GeoPoint | null {
  const fromTz = Object.values(TZ_MAP).find((p) => p.country === country);
  if (fromTz) return fromTz;
  const fromRegion = Object.values(REGION_FALLBACK).find((p) => p.country === country);
  return fromRegion ?? null;
}
