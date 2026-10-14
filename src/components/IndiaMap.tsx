import india from "@svg-maps/india";
import { company } from "@/config/site";

/**
 * Map: @svg-maps/india (CC BY 4.0), Government-of-India style outline.
 * Its projection was calibrated against Maharashtra's extent (72.6–80.9°E,
 * 15.6–22.03°N), giving ≈20.8px per degree of longitude with Mercator latitude.
 */
const PX_PER_DEG = 20.8;
const R = (PX_PER_DEG * 180) / Math.PI;
const merc = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));
const project = (lat: number, lon: number) => ({
  x: 93.5 + (lon - 72.6) * PX_PER_DEG,
  y: 364.1 - R * (merc(lat) - merc(22.03)),
});

const factory = project(company.location.lat, company.location.lon);

/** Abstract outbound routes (directions only — no implied hubs or customers). */
const routes = [
  { dx: 10, dy: -200, bend: -40 },
  { dx: 200, dy: -150, bend: 30 },
  { dx: 175, dy: 10, bend: -25 },
  { dx: 30, dy: 175, bend: 30 },
].map(({ dx, dy, bend }) => {
  const { x, y } = factory;
  const ex = x + dx;
  const ey = y + dy;
  const mx = (x + ex) / 2 - (dy / Math.hypot(dx, dy)) * bend;
  const my = (y + ey) / 2 + (dx / Math.hypot(dx, dy)) * bend;
  return `M${x.toFixed(1)} ${y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
});

export default function IndiaMap() {
  return (
    <svg
      viewBox={india.viewBox}
      role="img"
      aria-labelledby="map-title map-desc"
      className="h-auto w-full max-w-[34rem] overflow-visible"
    >
      <title id="map-title">Map of India</title>
      <desc id="map-desc">
        Maharashtra is highlighted, with a marker at Latur district showing the location of SK PULP &amp; FIBRE.
      </desc>
      <defs>
        <radialGradient id="route-fade" cx={factory.x} cy={factory.y} r="230" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#b9e68f" stopOpacity="0.95" />
          <stop offset="1" stopColor="#b9e68f" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g>
        {india.locations.map((l) => (
          <path
            key={l.id}
            d={l.path}
            fill={l.id === "mh" ? "#5fa333" : "#1c4d33"}
            stroke={l.id === "mh" ? "#9fd977" : "#2f6847"}
            strokeWidth={l.id === "mh" ? 0.9 : 0.5}
            strokeLinejoin="round"
          >
            <title>{l.name}</title>
          </path>
        ))}
      </g>
      {/* Export route: heads west, off the map, towards the Arabian Peninsula */}
      <path
        d={`M${factory.x.toFixed(1)} ${factory.y.toFixed(1)} Q${(factory.x - 70).toFixed(1)} ${(factory.y - 95).toFixed(1)} 2 ${(factory.y - 138).toFixed(1)}`}
        fill="none"
        stroke="#E7DDC8"
        strokeOpacity="0.75"
        strokeWidth="1.3"
        strokeDasharray="2 7"
        strokeLinecap="round"
        className="motion-safe:animate-[route-dash_2.4s_linear_infinite]"
      />
      <text x="2" y={factory.y - 150} fill="#E7DDC8" fontSize="10" fontWeight="700" letterSpacing="1.2">
        ← EXPORT · SAUDI ARABIA
      </text>
      <g fill="none" stroke="url(#route-fade)" strokeWidth="1.3" strokeLinecap="round">
        {routes.map((d, i) => (
          <path
            key={i}
            d={d}
            strokeDasharray="2 8"
            className="motion-safe:animate-[route-dash_2.4s_linear_infinite]"
            style={{ animationDelay: `${i * -0.45}s` }}
          />
        ))}
      </g>
      <g transform={`translate(${factory.x.toFixed(1)} ${factory.y.toFixed(1)})`}>
        <circle r="7" fill="#b9e68f" opacity="0.5" className="origin-center motion-safe:animate-[pulse-ring_2.6s_ease-out_infinite]" style={{ transformBox: "fill-box" }} />
        <circle r="5.5" fill="#E7DDC8" />
        <circle r="2.4" fill="#0e3a24" />
      </g>
      <g fontFamily="inherit" fontWeight="700">
        <text x={factory.x - 12} y={factory.y + 4} textAnchor="end" fill="#F7F6F0" fontSize="13">
          Latur
        </text>
        <text x={factory.x - 12} y={factory.y + 18} textAnchor="end" fill="#cfe7bb" fontSize="8.5" letterSpacing="1.4">
          MAHARASHTRA
        </text>
      </g>
    </svg>
  );
}
