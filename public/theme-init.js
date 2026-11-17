// Appliqué avant le rendu pour éviter un flash de thème : voir le commentaire
// au-dessus de la balise <script src="/theme-init.js"> dans index.html.
// Fichier externe (et non inline) pour que la CSP n'ait pas besoin de 'unsafe-inline'.
(function () {
  var LIGHT_THEME_COLOR = '#c0392b';
  var DARK_THEME_COLOR = '#e2574a';
  var override = null;
  try {
    var stored = JSON.parse(localStorage.getItem('donorSettings'));
    if (stored && (stored.theme === 'light' || stored.theme === 'dark')) {
      override = stored.theme;
    }
  } catch (e) {
    // localStorage unavailable or the stored value isn't valid JSON —
    // fall back to following the system preference, same as a donor
    // who never set a theme.
  }
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var resolved = override || (prefersDark ? 'dark' : 'light');
  if (override) {
    document.documentElement.setAttribute('data-theme', override);
  }
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', resolved === 'dark' ? DARK_THEME_COLOR : LIGHT_THEME_COLOR);
})();
