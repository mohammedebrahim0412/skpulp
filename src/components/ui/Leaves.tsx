/**
 * Decorative leafy branch (inline SVG, no image request). Purely ornamental: hidden from
 * assistive tech and never interactive. Leaves sway gently unless the visitor prefers
 * reduced motion.
 *
 * Position it with absolute utility classes on a `relative overflow-hidden` section, e.g.
 *   <Leaves className="-left-10 bottom-0 w-40 md:w-56" />
 */

// Arching stem: quadratic Bézier from the base (bottom-left) towards the tip (top-right)
const P0 = [0, 0];
const P1 = [30, -120];
const P2 = [150, -175];
const at = (t: number) => {
  const u = 1 - t;
  return [
    u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0],
    u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1],
  ];
};
const tangentDeg = (t: number) => {
  const dx = 2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]);
  const dy = 2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
};

// Leaves alternate sides along the stem and get smaller towards the tip
const LEAVES = [0.12, 0.26, 0.4, 0.54, 0.68, 0.82, 1].map((t, i) => {
  const [x, y] = at(t);
  const side = t === 1 ? 0 : i % 2 ? 1 : -1;
  return {
    x,
    y,
    r: tangentDeg(t) + 90 + side * 48, // leaf path points "up", so +90 aligns it with the stem
    s: 1.05 - t * 0.45,
    tone: (i % 3) as 0 | 1 | 2,
    d: i * 0.7,
  };
});

const TONES = [
  ["#9ad866", "#4f9a2c"],
  ["#b3e283", "#5fa333"],
  ["#6db53d", "#2f6f1f"],
];

// Slender leaf with a pointed tip, base at (0, 0), pointing up
const LEAF = "M0 0 C -22 -18 -26 -58 0 -92 C 26 -58 22 -18 0 0 Z";

/**
 * Leaf gradients, defined once per page (rendered in the root layout). Kept in a 0×0 SVG rather
 * than inside each sprig: duplicate ids are invalid, and gradients inside a `display: none`
 * sprig (most are hidden on phones) would stop rendering for every other sprig.
 */
export function LeafGradients() {
  return (
    <svg aria-hidden focusable="false" width="0" height="0" className="absolute">
      <defs>
        {TONES.map(([a, b], i) => (
          <linearGradient key={i} id={`leaf-g${i}`} x1="0" y1="1" x2="0.4" y2="0">
            <stop offset="0" stopColor={b} />
            <stop offset="1" stopColor={a} />
          </linearGradient>
        ))}
      </defs>
    </svg>
  );
}

export default function Leaves({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="-80 -275 330 300"
      className={`leaves-deco pointer-events-none absolute select-none ${flip ? "-scale-x-100" : ""} ${className}`}
    >
      <path
        d={`M${P0[0]} ${P0[1] + 20} L${P0[0]} ${P0[1]} Q${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`}
        stroke="#3d7a24"
        strokeWidth="3.2"
        fill="none"
        strokeLinecap="round"
      />
      {LEAVES.map((l, i) => (
        <g key={i} transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.r.toFixed(1)}) scale(${l.s.toFixed(2)})`}>
          <g className="leaf-sway" style={{ animationDelay: `${-l.d}s` }}>
            <path d={LEAF} fill={`url(#leaf-g${l.tone})`} />
            <path d="M0 0 C 22 -18 26 -58 0 -92 Z" fill="#1f5a1a" opacity="0.16" />
            <path d="M0 -3 Q 2 -45 0 -86" stroke="#eaf7dc" strokeOpacity="0.6" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path
              d="M0 -24 Q -8 -30 -12 -38 M0 -44 Q -8 -50 -12 -58 M0 -24 Q 8 -30 12 -38 M0 -44 Q 8 -50 12 -58"
              stroke="#eaf7dc"
              strokeOpacity="0.3"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </g>
      ))}
    </svg>
  );
}
