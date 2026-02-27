/* ============================================================
   utils.js - Shared utility functions
   ============================================================ */

/**
 * Read a single URL query parameter by name.
 * e.g. getQueryParam('id') on "temple/?id=42" -> "42"
 */
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

/**
 * Remove diacritics and lowercase a string for fuzzy searching.
 * e.g. normalizeText("Thiruvannamalai") -> "thiruvannamalai"
 */
function normalizeText(str) {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Build the URL for a temple detail page from its id.
 * Called from homepage tiles.
 */
function getTempleUrl(id) {
  return `../temple/?id=${id}`;
}

/**
 * Build the URL for a temple detail page from within the temple/ directory.
 */
function getTempleUrlRelative(id) {
  return `?id=${id}`;
}

/**
 * Build a Google Maps search URL for a temple.
 * Opens a search for "Temple Name, City" in Google Maps.
 */
function getGoogleMapsUrl(temple) {
  const query = encodeURIComponent(
    `${temple.official_name}, ${temple.location.city}, ${temple.location.state}`
  );
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * Format a location object into a readable string.
 * e.g. "Chidambaram, Cuddalore District, Tamil Nadu"
 */
function formatLocation(location) {
  const parts = [location.city];
  if (location.district) parts.push(`${location.district} Dt.`);
  if (location.state) parts.push(location.state);
  return parts.join(', ');
}

/**
 * Map nayanmar id to display label.
 */
const NAYANMAR_LABELS = {
  sambandar: 'Sambandar',
  appar:     'Appar',
  sundarar:  'Sundarar'
};

/**
 * Create a Nayanmar badge element.
 */
function createBadge(nayanmar) {
  const span = document.createElement('span');
  span.className = `badge badge-${nayanmar}`;
  span.textContent = NAYANMAR_LABELS[nayanmar] || nayanmar;
  span.title = NAYANMAR_LABELS[nayanmar] || nayanmar;
  return span;
}
