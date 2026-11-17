/* Drawn travel artwork: passport, boarding pass and a plane — used where a section needs a visual */
export default function PassportArt({ className = '', id = 'pa' }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 360 400" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}Pass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1b2b4d" />
          <stop offset="1" stopColor="#0a1222" />
        </linearGradient>
        <linearGradient id={`${id}Gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e8c3" />
          <stop offset=".55" stopColor="#c8a255" />
          <stop offset="1" stopColor="#8f6d2c" />
        </linearGradient>
      </defs>
      {/* boarding pass */}
      <g transform="rotate(-14 250 150)">
        <rect x="150" y="70" width="190" height="96" rx="12" fill="#fff" />
        <rect x="150" y="70" width="190" height="24" rx="12" fill={`url(#${id}Gold)`} />
        <rect x="150" y="82" width="190" height="12" fill={`url(#${id}Gold)`} />
        <text x="164" y="87" fontSize="11" fontWeight="700" fill="#0a1222" fontFamily="Inter, sans-serif">BOARDING PASS</text>
        <text x="164" y="122" fontSize="22" fontWeight="800" fill="#0a1222" fontFamily="Inter, sans-serif">RKT</text>
        <text x="270" y="122" fontSize="22" fontWeight="800" fill="#0a1222" fontFamily="Inter, sans-serif">DXB</text>
        <path d="M218 114h40" stroke="#c8a255" strokeWidth="2" strokeDasharray="4 4" />
        <rect x="164" y="134" width="70" height="6" rx="3" fill="#e6eaf1" />
        <rect x="164" y="146" width="44" height="6" rx="3" fill="#e6eaf1" />
        <g fill="#0a1222">
          {[0, 5, 8, 13, 16, 21, 24, 27, 32, 35, 40, 44].map((x) => (
            <rect key={x} x={270 + x} y="134" width={x % 2 ? 2 : 3} height="20" />
          ))}
        </g>
      </g>
      {/* passport */}
      <g transform="rotate(8 150 250)">
        <rect x="70" y="150" width="160" height="214" rx="16" fill={`url(#${id}Pass)`} />
        <rect x="80" y="160" width="140" height="194" rx="10" fill="none" stroke="#c8a255" strokeOpacity=".5" />
        <circle cx="150" cy="248" r="38" fill="none" stroke={`url(#${id}Gold)`} strokeWidth="3" />
        <path d="M112 248h76M150 210v76M124 222c16 16 36 16 52 0M124 274c16-16 36-16 52 0" stroke={`url(#${id}Gold)`} strokeWidth="2.5" fill="none" />
        <text x="150" y="190" textAnchor="middle" fontSize="14" fontWeight="800" letterSpacing="3" fill="#e9d29a" fontFamily="Inter, sans-serif">PASSPORT</text>
        <text x="150" y="324" textAnchor="middle" fontSize="11" fontWeight="700" letterSpacing="2" fill="#c8a255" fontFamily="Inter, sans-serif">GOLDEN VISA</text>
        <rect x="128" y="336" width="44" height="6" rx="3" fill="#c8a255" opacity=".6" />
      </g>
      {/* plane */}
      <g transform="translate(40 70) rotate(-25)" fill="#fff">
        <path d="M0 18 L60 10 L74 0 L82 2 L74 14 L104 18 L74 22 L82 34 L74 36 L60 26 Z" />
      </g>
      <path d="M30 120 C 70 60, 130 40, 190 40" stroke="#fff" strokeOpacity=".7" strokeWidth="2" strokeDasharray="5 6" fill="none" />
    </svg>
  );
}

