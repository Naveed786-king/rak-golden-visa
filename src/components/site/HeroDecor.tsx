/**
 * Decorative 3D layer for page-top heroes (pure CSS, see luxe.css):
 * gold particles, a mouse-following spotlight (Tilt3D sets --mx/--my), a 3D gold grid floor,
 * and optional orbiting rings. Purely visual — hidden from screen readers, never clickable.
 */
export default function HeroDecor({ orbit = false }: { orbit?: boolean }) {
  return (
    <div className="hx" aria-hidden>
      <div className="hero-particles" />
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
