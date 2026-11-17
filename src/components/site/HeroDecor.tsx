/**
 * Decorative 3D layer for page-top heroes (pure CSS, see luxe.css):
 * gold particles, a mouse-following spotlight (Tilt3D sets --mx/--my), a 3D gold grid floor,
 * and optional orbiting rings. Purely visual — hidden from screen readers, never clickable.
 */
// fixed star field (same on server and client): x%, y%, size px, delay s
const STARS: [number, number, number, number][] = [
  [6, 18, 2, 0.2], [12, 62, 3, 1.4], [18, 34, 2, 2.6], [24, 82, 2, 0.9], [29, 12, 3, 3.1], [34, 48, 2, 1.8],
  [41, 26, 2, 0.5], [46, 72, 3, 2.2], [52, 8, 2, 3.6], [57, 54, 2, 1.1], [61, 30, 3, 2.9], [66, 88, 2, 0.3],
  [71, 16, 2, 1.6], [75, 64, 3, 3.3], [79, 38, 2, 0.7], [84, 78, 2, 2.4], [88, 22, 3, 1.2], [92, 52, 2, 3.8],
  [95, 8, 2, 2.0], [3, 44, 2, 3.4], [37, 92, 2, 1.5], [48, 40, 3, 4.1], [68, 46, 2, 4.4], [86, 92, 3, 0.1],
];

export default function HeroDecor({ orbit = false }: { orbit?: boolean }) {
  return (
    <div className="hx" aria-hidden>
      <div className="hero-particles" />
      <div className="hx-stars">
        {STARS.map(([x, y, s, d], i) => (
          <i key={i} style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, animationDelay: `${d}s` }} />
        ))}
        <b className="hx-shoot" />
        <b className="hx-shoot hx-shoot-2" />
      </div>
      <div className="hx-spot" />
      <div className="hx-floor">
        <div className="hx-plane" />
      </div>
      {orbit && (
        <div className="hx-orbit">
          <span className="hx-ring hx-ring-1"><i /></span>
          <span className="hx-ring hx-ring-2"><i /></span>
          <span className="hx-ring hx-ring-3"><i /></span>
        </div>
      )}
    </div>
  );
}
