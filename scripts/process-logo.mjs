/**
 * Logo pipeline: the supplied logo has a "transparency" checkerboard baked into its pixels.
 * This removes the checkerboard greys, softens the cut edges, and writes transparent PNGs
 * meant to sit on light surfaces:
 *   public/brand/logo-full.png   emblem + "PULP & FIBRE" (for light backgrounds)
 *   public/brand/logo-mark.png   circular emblem only (512px; logo-mark-128.png for nav/footer)
 *   src/app/icon.png             favicon
 *
 *   node scripts/process-logo.mjs ["images videos/logo-source.webp"]
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = process.argv[2] ?? "images videos/logo-source.webp";
const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const px = (i) => [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]];
const isBackground = (i) => {
  const [r, g, b] = px(i);
  return Math.max(r, g, b) - Math.min(r, g, b) < 20 && Math.min(r, g, b) > 172 && Math.max(r, g, b) < 242;
};

// Mark every checkerboard-grey pixel as background. This includes enclosed gaps
// (inside letters, inside the ring). The logo's white outline around "SK" is the
// same grey, so it goes too: always place the logo on a light surface, which
// then reads as that outline.
const bg = new Uint8Array(W * H);
for (let i = 0; i < W * H; i++) if (isBackground(i)) bg[i] = 1;

// RGBA with soft edges: pixels next to the background get "colour-to-alpha" against the
// average checkerboard grey (~210), which un-blends the anti-aliased fringe
const out = Buffer.alloc(W * H * 4);
for (let i = 0; i < W * H; i++) {
  const [r, g, b] = px(i);
  let a = bg[i] ? 0 : 255;
  if (!bg[i]) {
    const x = i % W, y = (i / W) | 0;
    let edge = false;
    for (let dy = -2; dy <= 2 && !edge; dy++)
      for (let dx = -2; dx <= 2; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < W && ny < H && bg[ny * W + nx]) { edge = true; break; }
      }
    if (edge) {
      const REF = 210;
      const alpha = Math.max(REF - r, REF - g, REF - b, 0) / REF;
      a = Math.round(Math.min(1, alpha * 2.2) * 255);
      if (a > 0) {
        const k = a / 255;
        out[i * 4] = Math.max(0, Math.min(255, Math.round((r - REF * (1 - k)) / k)));
        out[i * 4 + 1] = Math.max(0, Math.min(255, Math.round((g - REF * (1 - k)) / k)));
        out[i * 4 + 2] = Math.max(0, Math.min(255, Math.round((b - REF * (1 - k)) / k)));
        out[i * 4 + 3] = a;
        continue;
      }
    }
  }
  out[i * 4] = r; out[i * 4 + 1] = g; out[i * 4 + 2] = b; out[i * 4 + 3] = a;
}

// Bounding boxes: whole logo, and the emblem (rows above the "PULP & FIBRE" line)
const bbox = (y0, y1) => {
  let minX = W, minY = H, maxX = 0, maxY = 0;
  for (let y = y0; y < y1; y++)
    for (let x = 0; x < W; x++)
      if (out[(y * W + x) * 4 + 3] > 24) {
        minX = Math.min(minX, x); maxX = Math.max(maxX, x);
        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
};
// Find the empty band between emblem and text
const rowFilled = (y) => { for (let x = 0; x < W; x++) if (out[(y * W + x) * 4 + 3] > 24) return true; return false; };
let y = (H * 0.35) | 0;
while (y < H && rowFilled(y)) y++; // end of emblem
const emblemEnd = y;
while (y < H && !rowFilled(y)) y++; // start of text
// Text bottom: stop at the first empty band after the text, so stray marks lower down are excluded
let textEnd = y;
while (textEnd < H && rowFilled(textEnd)) textEnd++;

const img = () => sharp(out, { raw: { width: W, height: H, channels: 4 } });
mkdirSync("public/brand", { recursive: true });
const full = bbox(0, textEnd);
const mark = bbox(0, emblemEnd);
await img().extract(full).resize({ width: 1200, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true, quality: 92 }).toFile("public/brand/logo-full.png");
await img().extract(mark).resize({ width: 512, height: 512, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9 }).toFile("public/brand/logo-mark.png");
await img().extract(mark).resize({ width: 128, height: 128, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile("public/brand/logo-mark-128.png");
await img().extract(mark).resize({ width: 192, height: 192, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile("src/app/icon.png");
console.log("✓ logo:", { full, mark });
