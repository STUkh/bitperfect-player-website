/** Analytic low-frequency colour fields, shared by contained and full-bleed maps. */
const palettes = {
  dark: { warm: [144, 122, 97], pearl: [153, 151, 143], neutral: [124, 125, 124], shadow: [6, 7, 10], umber: [111, 83, 60], linen: [136, 128, 110], copper: [139, 94, 69] },
  light: { warm: [213, 189, 154], pearl: [197, 199, 197], neutral: [169, 173, 172], shadow: [139, 137, 132], umber: [180, 150, 117], linen: [194, 185, 162], copper: [196, 155, 126] },
};
const smooth = (v) => { const t = Math.max(0, Math.min(1, v)); return t * t * (3 - 2 * t); };

export function softField({ size = 128, theme, fields, edgeMode = 'all', quietCenter = 0.45, strengthScale = 0.72 }) {
  const pixels = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / (size - 1), v = y / (size - 1);
      const sideFade = edgeMode === 'vertical' ? 1 : smooth(Math.min(u, 1 - u) / 0.14);
      const edge = sideFade * smooth(Math.min(v, 1 - v) / 0.20);
      const quiet = 1 - quietCenter * Math.exp(-(((u - 0.5) / 0.28) ** 4 + ((v - 0.48) / 0.36) ** 4));
      let alpha = 0;
      const rgb = [0, 0, 0];
      for (const [cx, cy, sx, sy, angle, ink, strength] of fields) {
        const dx = u - cx, dy = v - cy;
        const rx = Math.cos(angle) * dx + Math.sin(angle) * dy;
        const ry = -Math.sin(angle) * dx + Math.cos(angle) * dy;
        const weight = Math.exp(-0.5 * ((rx / sx) ** 2 + (ry / sy) ** 2)) * strength;
        alpha += weight;
        for (let c = 0; c < 3; c++) rgb[c] += palettes[theme][ink][c] * weight;
      }
      const i = (y * size + x) * 4;
      for (let c = 0; c < 3; c++) pixels[i + c] = alpha ? Math.round(rgb[c] / alpha) : 0;
      pixels[i + 3] = Math.round(Math.min(0.65, alpha) * edge * quiet * strengthScale * 255);
    }
  }
  return pixels;
}
