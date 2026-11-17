/* Realistic round rubber stamp (SVG): curved text top and bottom, double ring, star centre, worn-ink texture.
   Purely decorative. */
export default function Stamp({ top = 'APPROVED', bottom = '10 YEARS', center = 'RAK', id = 'st', className = '' }: { top?: string; bottom?: string; center?: string; id?: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`stamp ${className}`} aria-hidden>
      <defs>
        <path id={`${id}-top`} d="M 32 100 A 68 68 0 0 1 168 100" />
        <path id={`${id}-bot`} d="M 40 100 A 60 60 0 0 0 160 100" />
        <filter id={`${id}-ink`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.75" result="holes" />
          <feComposite in="SourceGraphic" in2="holes" operator="in" result="worn" />
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" result="w" />
          <feDisplacementMap in="worn" in2="w" scale="2.2" />
        </filter>
      </defs>
      <g filter={`url(#${id}-ink)`} fill="currentColor" stroke="currentColor">
        <circle cx="100" cy="100" r="94" fill="none" strokeWidth="5" />
        <circle cx="100" cy="100" r="86" fill="none" strokeWidth="1.6" />
        <circle cx="100" cy="100" r="50" fill="none" strokeWidth="1.6" />
        <text fontFamily="Inter, Arial, sans-serif" fontWeight="800" fontSize="22" letterSpacing="4" stroke="none">
          <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">{top}</textPath>
        </text>
        <text fontFamily="Inter, Arial, sans-serif" fontWeight="700" fontSize="14" letterSpacing="5" stroke="none" dy="14">
          <textPath href={`#${id}-bot`} startOffset="50%" textAnchor="middle">{bottom}</textPath>
        </text>
        <path d="M24 100l6-4 6 4-6 4zM164 100l6-4 6 4-6 4z" stroke="none" />
        <path stroke="none" d="M100 66l4.4 9 9.9 1.4-7.2 7 1.7 9.8-8.8-4.6-8.8 4.6 1.7-9.8-7.2-7 9.9-1.4z" />
        <text x="100" y="124" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="22" letterSpacing="2" stroke="none">{center}</text>
      </g>
    </svg>
  );
}
