// Frosted-glass blur rules, added as an inline <style> by the root layout.
//
// Why inline: the production CSS minifier rewrites every `backdrop-filter` in the
// bundled stylesheets to the old `-webkit-backdrop-filter` only. Current Chrome no
// longer understands the -webkit- name, so all glass effects lost their blur and
// looked transparent. Inline styles are not minified, so these always reach the browser.
// Keep in sync with the backdrop-filter values in src/app/globals.css.
export const BACKDROP_CSS = [
  '.glass{backdrop-filter:blur(14px)}',
  '.site-header[data-scrolled]::before{backdrop-filter:blur(18px) saturate(180%)}',
  '.hdr-island{backdrop-filter:blur(var(--hdr-blur,22px)) saturate(185%) brightness(.92)}',
  '.glass-menu{backdrop-filter:blur(22px) saturate(170%)}',
  '.hdr-solid .site-header .hdr-island,.hdr-solid .site-header[data-scrolled] .hdr-island{backdrop-filter:none}',
  '.ftr-glass .site-footer .ftr-main{backdrop-filter:blur(var(--glass-blur,18px))}',
  '.bs-glass .btn-gold{backdrop-filter:blur(12px)}',
  '.glass-ui .glass,.glass-ui .theme-dark :is(.box,.card-lift){backdrop-filter:blur(var(--glass-blur,18px)) saturate(170%)}',
  '.glass-ui :is(.theme-light,.theme-sand) .card-lift{backdrop-filter:blur(var(--glass-blur,18px)) saturate(160%)}',
  // Tailwind utility classes used in the site and admin
  '.backdrop-blur,.backdrop-blur-sm{backdrop-filter:blur(8px)}',
  '.backdrop-blur-xl{backdrop-filter:blur(24px)}',
].join('');
