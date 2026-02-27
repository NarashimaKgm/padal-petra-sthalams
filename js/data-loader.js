/* ============================================================
   data-loader.js - Fetches and caches temple JSON data
   Singleton: fetch happens once per page session.
   ============================================================ */

const DataLoader = (() => {
  let _templesCache = null;
  let _nayanmarsCache = null;

  // Resolve correct base path whether on homepage or temple/ subdir
  function basePath() {
    // If current URL contains /temple/, go one level up
    return window.location.pathname.includes('/temple/') ? '../' : '';
  }

  async function getTemples() {
    if (_templesCache) return _templesCache;
    try {
      const res = await fetch(`${basePath()}data/temples.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      _templesCache = await res.json();
      return _templesCache;
    } catch (err) {
      console.error('Failed to load temples.json:', err);
      return [];
    }
  }

  async function getTempleById(id) {
    const temples = await getTemples();
    return temples.find(t => t.id === parseInt(id, 10)) || null;
  }

  async function getNayanmars() {
    if (_nayanmarsCache) return _nayanmarsCache;
    try {
      const res = await fetch(`${basePath()}data/nayanmars.json`);
      _nayanmarsCache = await res.json();
      return _nayanmarsCache;
    } catch (err) {
      console.error('Failed to load nayanmars.json:', err);
      return [];
    }
  }

  return { getTemples, getTempleById, getNayanmars };
})();
