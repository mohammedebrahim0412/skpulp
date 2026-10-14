/**
 * Media pipeline — turns the factory film, photos and logos in "images videos/" into web assets.
 *
 *   npm run media
 *
 * Source film: an iPhone HDR (HLG, 10-bit HEVC) clip, tone-mapped here to standard
 * dynamic range H.264 so it plays everywhere. If the film is replaced, update the
 * scene timings in SCENES and re-run. Outputs go to public/media/ (and public/logos/);
 * existing files there are overwritten, never deleted.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, copyFileSync, readFileSync, writeFileSync } from "node:fs";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

const IN = "images videos";
const FILM = `${IN}/process.MP4`;
const OUT = "public/media";
const LOGOS = "public/logos";

/** Scene map of the film (seconds); a still from the middle of each scene illustrates its process step. */
const SCENES = [
  { id: "raw-material", from: 0.0, to: 6.8 },
  { id: "pulping", from: 6.9, to: 11.6 },
  { id: "forming", from: 11.7, to: 16.6 },
  { id: "drying", from: 16.7, to: 21.75 },
  { id: "storage", from: 21.85, to: 25.35 },
];

/** Photos: [output name, source file, optional crop {x,y,w,h} as fractions] */
const PHOTOS = [
  ["drying-field", "IMG_5960.DNG"],
  ["drying-stacks", "IMG_5962.DNG"],
  ["warehouse-row", "IMG_5963.DNG"],
  ["machine-operator", "IMG_5964.DNG"],
  ["machine-detail", "IMG_5965.DNG"],
  ["warehouse-stacks", "IMG_5966.DNG"],
  ["loader-raw", "IMG_5968.JPG.jpeg"],
  ["pulpers", "IMG_5972.DNG"],
  ["loader-feeding", "IMG_5975.DNG"],
  ["pulper-agitator", "IMG_5976.DNG"],
  ["machine-floor", "IMG_5983.DNG"],
  ["pulper-hall", "IMG_5984.DNG"],
  ["loader-tipping", "IMG_5989.PNG"],
  ["warehouse-wide", "IMG_5990.DNG"],
  // Detail crops from full-resolution originals
  ["detail-sheet-edges", "IMG_5962.DNG", { x: 0.12, y: 0.42, w: 0.45, h: 0.45 }],
  ["detail-stack", "IMG_5966.DNG", { x: 0.0, y: 0.38, w: 0.5, h: 0.5 }],
  ["detail-pulp", "IMG_5976.DNG", { x: 0.2, y: 0.4, w: 0.55, h: 0.55 }],
];

/**
 * Images supplied as finished artwork: [output name, source file, widths].
 * When replacing one, change its output name too (browsers cache /media for 7 days).
 */
const SUPPLIED = [
  ["hero-floor", "hero-source.webp", [1600, 800]],
  ["about-machine", "about-source.webp", [1600, 800]],
  ["portrait", "portrait-source.webp", [1000, 600]],
];

const LOGO_FILES = [
  ["everest", "everest.jpg"],
  ["hil", "HIL.jpg"],
  ["jolly-board", "JOLLYBOARD.png"],
  ["sahyadri", "Sahyadri Industries Limited.jpg"],
  ["acfa", "ACFA (Saudi Arabia).png"],
  ["united-mining", "United Mining Industries (Saudi Arabia).png"],
];

const ff = (args) =>
  execFileSync(ffmpegPath, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });

// HLG/BT.2020 → SDR BT.709
const TONEMAP =
  "zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p";
const H264 = ["-c:v", "libx264", "-preset", "slow", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an"];

// Files are overwritten in place. Never empty the folder: it also holds images that are
// not produced from the film (see SUPPLIED below and anything added by hand).
mkdirSync(OUT, { recursive: true });
mkdirSync(LOGOS, { recursive: true });

console.log("› hero film (landscape)");
ff(["-i", FILM, "-vf", `${TONEMAP},scale=1280:-2`, "-r", "30", ...H264, "-crf", "31", `${OUT}/hero-1280.mp4`]);
ff(["-ss", "1.2", "-i", FILM, "-frames:v", "1", "-vf", `${TONEMAP},scale=1600:-2`, "-q:v", "4", `${OUT}/hero-poster-1600.jpg`]);
ff(["-ss", "1.2", "-i", FILM, "-frames:v", "1", "-vf", `${TONEMAP},scale=800:-2`, "-q:v", "5", `${OUT}/hero-poster-800.jpg`]);

console.log("› stage stills");
for (const s of SCENES) {
  const mid = (s.from + s.to) / 2;
  for (const w of [1600, 800]) {
    ff(["-ss", String(mid), "-i", FILM, "-frames:v", "1", "-vf", `${TONEMAP},scale=${w}:-2`, "-q:v", w === 800 ? "5" : "4", `${OUT}/stage-${s.id}-${w}.jpg`]);
  }
}

console.log("› supplied images");
for (const [name, file, widths] of SUPPLIED) {
  for (const w of widths) {
    await sharp(`${IN}/${file}`).resize({ width: w, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true }).toFile(`${OUT}/${name}-${w}.jpg`);
  }
}

console.log("› photos");
for (const [name, file, crop] of PHOTOS) {
  const c = crop ? `crop=iw*${crop.w}:ih*${crop.h}:iw*${crop.x}:ih*${crop.y},` : "";
  for (const w of [1600, 800]) {
    ff(["-i", `${IN}/${file}`, "-frames:v", "1", "-vf", `${c}scale='min(${w},iw)':-2:flags=lanczos`, "-q:v", w === 800 ? "5" : "6", `${OUT}/${name}-${w}.jpg`]);
  }
}

console.log("› logos");
for (const [name, file] of LOGO_FILES) {
  ff(["-i", `${IN}/${file}`, "-vf", "format=rgba,scale='min(480,iw)':-2:flags=lanczos", `${LOGOS}/${name}.png`]);
}

console.log("› report");
mkdirSync("public/reports", { recursive: true });
const REPORT = "Jolly_Board_Limited_SKPULP_CPPRI_TEST_REPORT.pdf";
copyFileSync(REPORT, "public/reports/cppri-test-report-2025.pdf");
// The report is a single scanned page: pull the embedded JPEG out for an on-page preview.
{
  const buf = readFileSync(REPORT);
  const text = buf.toString("latin1");
  const m = /<<([^]*?\/Subtype\s*\/Image[^]*?)>>\s*stream\r?\n/.exec(text);
  if (m && /DCTDecode/.test(m[1])) {
    const start = m.index + m[0].length;
    writeFileSync(`${OUT}/.report.jpg`, buf.subarray(start, text.indexOf("endstream", start)));
    ff(["-i", `${OUT}/.report.jpg`, "-vf", "scale=900:-2", "-q:v", "4", "public/reports/cppri-test-report-2025-preview.jpg"]);
    rmSync(`${OUT}/.report.jpg`);
  }
}

console.log("✓ media written");
