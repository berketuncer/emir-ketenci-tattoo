/**
 * Görsel üretim yardımcıları.
 *
 * Tüm portfolyo, stil, hazır tasarım ve atölye görselleri bu dosyadaki
 * fonksiyonlarla, deterministik olarak üretilir. Dışarıya hiçbir bağımlılık
 * yoktur; çıktı vektörel olduğu için her ekran yoğunluğunda net görünür.
 *
 * Motifler 1000x1000 birimlik bir karede çizilir, çerçeve bunu orana göre
 * ölçekler ve konumlandırır.
 */

export const INK = "#0B0908";

/* ------------------------------------------------------------------ */
/* Rastgelelik — tohumlu, tekrarlanabilir                              */
/* ------------------------------------------------------------------ */

export function hashSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function makeRng(seedStr) {
  let a = hashSeed(seedStr);
  const rng = () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  rng.range = (min, max) => min + rng() * (max - min);
  rng.int = (min, max) => Math.floor(rng.range(min, max + 1));
  rng.pick = (arr) => arr[Math.floor(rng() * arr.length)];
  rng.bool = (p = 0.5) => rng() < p;
  return rng;
}

/* ------------------------------------------------------------------ */
/* Küçük yardımcılar                                                   */
/* ------------------------------------------------------------------ */

export const n = (v) => Math.round(v * 10) / 10;
export const polar = (cx, cy, r, deg) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};

const attrs = (o = {}) =>
  Object.entries(o)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k}="${typeof v === "number" ? n(v) : v}"`)
    .join(" ");

export const stroke = (w = 6, extra = {}) => ({
  fill: "none",
  stroke: INK,
  "stroke-width": w,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  ...extra,
});

export const solid = (extra = {}) => ({ fill: INK, stroke: "none", ...extra });

export const path = (d, a = {}) => `<path d="${d}" ${attrs(a)}/>`;
export const circle = (cx, cy, r, a = {}) => `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" ${attrs(a)}/>`;
export const ellipse = (cx, cy, rx, ry, a = {}) =>
  `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" ${attrs(a)}/>`;
export const line = (x1, y1, x2, y2, a = {}) =>
  `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" ${attrs(a)}/>`;
export const group = (children, a = {}) => `<g ${attrs(a)}>${children}</g>`;

/** Noktalardan yumuşak bir eğri üretir (Catmull-Rom → kübik Bézier). */
export function smoothPath(points, closed = false) {
  if (points.length < 2) return "";
  const p = closed ? [points[points.length - 1], ...points, points[0], points[1]] : [points[0], ...points, points[points.length - 1]];
  let d = `M ${n(p[1][0])} ${n(p[1][1])}`;
  for (let i = 1; i < p.length - 2; i += 1) {
    const [x0, y0] = p[i - 1];
    const [x1, y1] = p[i];
    const [x2, y2] = p[i + 1];
    const [x3, y3] = p[i + 2];
    const c1x = x1 + (x2 - x0) / 6;
    const c1y = y1 + (y2 - y0) / 6;
    const c2x = x2 - (x3 - x1) / 6;
    const c2y = y2 - (y3 - y1) / 6;
    d += ` C ${n(c1x)} ${n(c1y)}, ${n(c2x)} ${n(c2y)}, ${n(x2)} ${n(y2)}`;
  }
  return closed ? `${d} Z` : d;
}

/** Bir alan içine noktasal gölge (dotwork) serper. */
export function stipple(rng, { cx, cy, rx, ry, count, minR = 1.6, maxR = 4.2, falloff = 1.6, rotate = 0 }) {
  const dots = [];
  for (let i = 0; i < count; i += 1) {
    const a = rng() * Math.PI * 2;
    const t = Math.pow(rng(), falloff);
    const x = Math.cos(a) * t * rx;
    const y = Math.sin(a) * t * ry;
    const rad = ((-rotate * Math.PI) / 180) * -1;
    const xr = x * Math.cos(rad) - y * Math.sin(rad);
    const yr = x * Math.sin(rad) + y * Math.cos(rad);
    const r = minR + (1 - t) * (maxR - minR) * rng.range(0.5, 1.2);
    dots.push(circle(cx + xr, cy + yr, r, solid({ opacity: n(0.35 + (1 - t) * 0.65) })));
  }
  return dots.join("");
}

/** Bir çizgi boyunca yoğunluğu azalan nokta bandı. */
export function stippleBand(rng, { x, y, w, h, count, dir = "down" }) {
  const dots = [];
  for (let i = 0; i < count; i += 1) {
    const u = rng();
    const v = Math.pow(rng(), dir === "down" ? 0.6 : 2.2);
    const px = x + u * w;
    const py = y + v * h;
    const r = 1.3 + (1 - v) * 2.6 * rng.range(0.6, 1.1);
    dots.push(circle(px, py, r, solid({ opacity: n(0.25 + (1 - v) * 0.6) })));
  }
  return dots.join("");
}

/* ------------------------------------------------------------------ */
/* Prosedürel motifler                                                 */
/* ------------------------------------------------------------------ */

/** Simetrik mandala — halka halka yaprak ve nokta dizileri. */
export function mandala(rng, { cx = 500, cy = 500, radius = 380, rings = 5, dotwork = true } = {}) {
  const out = [];
  const ringCount = rings;
  let inner = radius * 0.12;
  out.push(circle(cx, cy, inner * 0.55, solid()));
  out.push(circle(cx, cy, inner, stroke(5)));

  for (let ring = 0; ring < ringCount; ring += 1) {
    const t = (ring + 1) / ringCount;
    const outer = radius * (0.2 + 0.8 * Math.pow(t, 0.92));
    const petals = [8, 12, 16, 24, 32][Math.min(ring, 4)];
    const kind = ring % 3;
    for (let i = 0; i < petals; i += 1) {
      const a = (360 / petals) * i;
      const [ix, iy] = polar(cx, cy, inner, a);
      const [ox, oy] = polar(cx, cy, outer, a);
      if (kind === 0) {
        const half = 360 / petals / 2.4;
        const [lx, ly] = polar(cx, cy, (inner + outer) / 2, a - half);
        const [rx2, ry2] = polar(cx, cy, (inner + outer) / 2, a + half);
        out.push(path(`M ${n(ix)} ${n(iy)} Q ${n(lx)} ${n(ly)} ${n(ox)} ${n(oy)} Q ${n(rx2)} ${n(ry2)} ${n(ix)} ${n(iy)} Z`, stroke(4)));
      } else if (kind === 1) {
        out.push(line(ix, iy, ox, oy, stroke(3)));
        out.push(circle(ox, oy, 4.5, solid()));
      } else {
        const [mx, my] = polar(cx, cy, (inner + outer) / 2, a);
        out.push(circle(mx, my, (outer - inner) * 0.16, stroke(3)));
      }
    }
    out.push(circle(cx, cy, outer, stroke(ring % 2 === 0 ? 4 : 2.5)));
    inner = outer;
  }

  if (dotwork) {
    const dots = [];
    const band = radius * 1.02;
    for (let i = 0; i < 420; i += 1) {
      const a = rng() * 360;
      const rr = band + Math.pow(rng(), 2.1) * radius * 0.22;
      const [px, py] = polar(cx, cy, rr, a);
      dots.push(circle(px, py, rng.range(1.2, 3.4), solid({ opacity: n(rng.range(0.2, 0.75)) })));
    }
    out.push(dots.join(""));
  }
  return out.join("");
}

/** Ornamental dikey bant — simetrik, tekrar eden desen. */
export function ornamentalBand(rng, { cx = 500, top = 70, bottom = 950, width = 420, units = 4 } = {}) {
  const out = [];
  const h = (bottom - top) / units;
  const halfW = width / 2;

  // Dış hatlar
  out.push(line(cx - halfW, top, cx - halfW, bottom, stroke(7)));
  out.push(line(cx + halfW, top, cx + halfW, bottom, stroke(7)));
  out.push(line(cx - halfW + 22, top, cx - halfW + 22, bottom, stroke(2.4, { opacity: 0.7 })));
  out.push(line(cx + halfW - 22, top, cx + halfW - 22, bottom, stroke(2.4, { opacity: 0.7 })));

  for (let u = 0; u < units; u += 1) {
    const y0 = top + u * h;
    const y1 = y0 + h;
    const my = (y0 + y1) / 2;
    const inner = halfW - 46;

    // Baklava formu — dolu / boş dönüşümlü
    const dia = `M ${n(cx)} ${n(y0 + 14)} L ${n(cx + inner)} ${n(my)} L ${n(cx)} ${n(y1 - 14)} L ${n(cx - inner)} ${n(my)} Z`;
    out.push(path(dia, u % 2 === 0 ? solid({ opacity: 0.95 }) : stroke(6)));

    if (u % 2 === 1) {
      // Boş baklavanın içinde ornamental çiçek
      const petals = 8;
      for (let i = 0; i < petals; i += 1) {
        const a = (360 / petals) * i;
        const [tx2, ty2] = polar(cx, my, inner * 0.44, a);
        const [c1x, c1y] = polar(cx, my, inner * 0.3, a - 22);
        const [c2x, c2y] = polar(cx, my, inner * 0.3, a + 22);
        out.push(path(`M ${n(cx)} ${n(my)} Q ${n(c1x)} ${n(c1y)} ${n(tx2)} ${n(ty2)} Q ${n(c2x)} ${n(c2y)} ${n(cx)} ${n(my)} Z`, stroke(3.4)));
      }
      out.push(circle(cx, my, inner * 0.12, solid()));
    } else {
      // Dolu baklavanın içinde negatif kesikler
      out.push(circle(cx, my, inner * 0.2, { fill: "none", stroke: "#9a938c", "stroke-width": 9 }));
      out.push(line(cx - inner * 0.55, my, cx + inner * 0.55, my, { stroke: "#9a938c", "stroke-width": 5, "stroke-linecap": "round" }));
    }

    // Kenar süslemeleri
    for (const sgn of [-1, 1]) {
      out.push(circle(cx + sgn * (halfW - 11), my, 6, solid()));
      out.push(circle(cx + sgn * (halfW - 11), y0 + h * 0.24, 4, solid()));
      out.push(circle(cx + sgn * (halfW - 11), y1 - h * 0.24, 4, solid()));
      const [ax, ay] = [cx + sgn * (halfW - 34), my];
      out.push(path(`M ${n(ax)} ${n(ay - 34)} Q ${n(ax - sgn * 20)} ${n(ay)} ${n(ax)} ${n(ay + 34)}`, stroke(3)));
    }
    if (u > 0) out.push(line(cx - halfW, y0, cx + halfW, y0, stroke(3.4)));
  }

  out.push(stippleBand(rng, { x: cx - halfW - 70, y: bottom + 4, w: width + 140, h: 120, count: 220, dir: "up" }));
  return out.join("");
}

/** Geometrik ağ — düğüm noktaları ve bağlantı çizgileri. */
export function lattice(rng, { cx = 500, cy = 500, radius = 350, rings = 3, sides = 6 } = {}) {
  const out = [];
  const nodes = [[cx, cy]];
  for (let r = 1; r <= rings; r += 1) {
    const rr = (radius / rings) * r;
    const count = sides * r;
    for (let i = 0; i < count; i += 1) {
      nodes.push(polar(cx, cy, rr, (360 / count) * i + (r % 2 ? 0 : 360 / count / 2)));
    }
  }
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const dx = nodes[i][0] - nodes[j][0];
      const dy = nodes[i][1] - nodes[j][1];
      const d = Math.hypot(dx, dy);
      if (d < radius / rings + 12) {
        out.push(line(nodes[i][0], nodes[i][1], nodes[j][0], nodes[j][1], stroke(3.4, { opacity: 0.85 })));
      }
    }
  }
  for (let r = 1; r <= rings; r += 1) {
    out.push(circle(cx, cy, (radius / rings) * r, stroke(r === rings ? 5 : 2.2, { opacity: r === rings ? 1 : 0.55 })));
  }
  nodes.forEach(([x, y], i) => out.push(circle(x, y, i === 0 ? 9 : 5, solid())));
  out.push(stipple(rng, { cx, cy, rx: radius * 1.16, ry: radius * 1.16, count: 260, falloff: 0.35, minR: 1.1, maxR: 2.6 }));
  return out.join("");
}

/** Kutsal geometri — üst üste binen çemberler ve üçgenler. */
export function sacredGeometry(rng, { cx = 500, cy = 500, radius = 320 } = {}) {
  const out = [];
  out.push(circle(cx, cy, radius, stroke(5)));
  for (let i = 0; i < 6; i += 1) {
    const [x, y] = polar(cx, cy, radius / 2, 60 * i);
    out.push(circle(x, y, radius / 2, stroke(2.6, { opacity: 0.8 })));
  }
  const tri = (rot, w) => {
    const pts = [0, 120, 240].map((a) => polar(cx, cy, radius * 0.86, a + rot));
    return path(`M ${pts.map(([x, y]) => `${n(x)} ${n(y)}`).join(" L ")} Z`, stroke(w));
  };
  out.push(tri(0, 5));
  out.push(tri(180, 5));
  out.push(circle(cx, cy, radius * 0.43, stroke(3.4)));
  out.push(circle(cx, cy, radius * 0.14, solid()));
  out.push(circle(cx, cy, radius * 1.12, stroke(2)));
  out.push(stipple(rng, { cx, cy, rx: radius * 0.42, ry: radius * 0.42, count: 180, falloff: 0.8, minR: 1.2, maxR: 3 }));
  return out.join("");
}

/** Akan paralel çizgiler — soyut dalga alanı. */
export function waveField(rng, { x = 60, y = 200, w = 880, h = 600, lines = 30 } = {}) {
  const out = [];
  for (let i = 0; i < lines; i += 1) {
    const t = i / (lines - 1);
    const baseY = y + t * h;
    const amp = 40 + Math.sin(t * Math.PI) * 90;
    const pts = [];
    const steps = 14;
    const phase = rng.range(0, Math.PI * 2);
    for (let s = 0; s <= steps; s += 1) {
      const u = s / steps;
      const px = x + u * w;
      const py = baseY + Math.sin(u * Math.PI * 2.1 + phase + t * 1.4) * amp * (0.35 + 0.65 * Math.sin(u * Math.PI));
      pts.push([px, py]);
    }
    const weight = 2 + Math.sin(t * Math.PI) * 6;
    out.push(path(smoothPath(pts), stroke(weight, { opacity: n(0.5 + 0.5 * Math.sin(t * Math.PI)) })));
  }
  return out.join("");
}

/** Fırça darbesi etkisi — soyut, dolgulu organik lekeler. */
export function brushStrokes(rng, { count = 5, tilt = 0, spread = 38 } = {}) {
  const out = [];
  for (let i = 0; i < count; i += 1) {
    const x0 = rng.range(90, 340);
    const y0 = rng.range(110, 830);
    const len = rng.range(400, 760);
    const angle = tilt + rng.range(-spread, spread);
    const thick = rng.range(34, 96);
    const rad = (angle * Math.PI) / 180;
    const top = [];
    const bottom = [];
    const steps = 9;
    for (let s = 0; s <= steps; s += 1) {
      const u = s / steps;
      const taper = Math.sin(Math.PI * Math.pow(u, 0.8)) * rng.range(0.85, 1.15);
      const px = x0 + Math.cos(rad) * len * u;
      const py = y0 + Math.sin(rad) * len * u + Math.sin(u * 3.1) * 26;
      const half = (thick / 2) * taper;
      top.push([px + Math.sin(rad) * half, py - Math.cos(rad) * half]);
      bottom.push([px - Math.sin(rad) * half, py + Math.cos(rad) * half]);
    }
    out.push(path(`${smoothPath([...top, ...bottom.reverse()], true)}`, solid({ opacity: n(rng.range(0.72, 0.95)) })));
    for (let d = 0; d < 26; d += 1) {
      const u = rng();
      const px = x0 + Math.cos(rad) * len * u + rng.range(-1, 1) * thick;
      const py = y0 + Math.sin(rad) * len * u + rng.range(-1, 1) * thick * 1.6;
      out.push(circle(px, py, rng.range(1.4, 5), solid({ opacity: n(rng.range(0.2, 0.6)) })));
    }
  }
  return out.join("");
}

/** İnce çizgi botanik dal — algoritmik yaprak dizilimi. */
export function branch(rng, { x = 500, yTop = 90, yBottom = 940, leaves = 17, curve = 130, leafLen = 205 } = {}) {
  const out = [];
  const stemPts = [];
  const steps = 12;
  for (let s = 0; s <= steps; s += 1) {
    const u = s / steps;
    stemPts.push([x + Math.sin(u * Math.PI * 0.9) * curve * (1 - u * 0.3), yBottom + (yTop - yBottom) * u]);
  }
  const stemAt = (u) => {
    const idx = Math.min(steps, Math.max(0, u * steps));
    const i0 = Math.floor(idx);
    const i1 = Math.min(steps, i0 + 1);
    const f = idx - i0;
    return [
      stemPts[i0][0] + (stemPts[i1][0] - stemPts[i0][0]) * f,
      stemPts[i0][1] + (stemPts[i1][1] - stemPts[i0][1]) * f,
    ];
  };

  for (let i = 0; i < leaves; i += 1) {
    const u = 0.1 + (i / (leaves - 1)) * 0.88;
    const [px, py] = stemAt(u);
    const side = i % 2 === 0 ? 1 : -1;
    const scale = (0.45 + 0.55 * Math.sin(u * Math.PI)) * rng.range(0.85, 1.15);
    const len = leafLen * scale;
    const angle = side * rng.range(28, 52) - 62;
    const rad = (angle * Math.PI) / 180;
    const tx = px + Math.cos(rad) * len * side;
    const ty = py + Math.sin(rad) * len;
    const bulge = len * 0.36;
    const mx = (px + tx) / 2;
    const my = (py + ty) / 2;
    const nx = -(ty - py);
    const ny = tx - px;
    const nl = Math.hypot(nx, ny) || 1;
    out.push(
      path(
        `M ${n(px)} ${n(py)} Q ${n(mx + (nx / nl) * bulge)} ${n(my + (ny / nl) * bulge)} ${n(tx)} ${n(ty)} Q ${n(mx - (nx / nl) * bulge)} ${n(my - (ny / nl) * bulge)} ${n(px)} ${n(py)} Z`,
        stroke(4.4),
      ),
    );
    out.push(line(px, py, tx, ty, stroke(2, { opacity: 0.6 })));
  }
  out.push(path(smoothPath(stemPts), stroke(7)));
  return out.join("");
}

/** Kır çiçeği — sap, yaprak ve taç yaprak. */
export function wildflower(rng, { cx = 500, baseY = 950, height = 820, petals = 9, headR = 168 } = {}) {
  const out = [];
  const topY = baseY - height;
  const sway = rng.range(-70, 70);
  const stem = [
    [cx, baseY],
    [cx + sway * 0.3, baseY - height * 0.35],
    [cx + sway * 0.7, baseY - height * 0.7],
    [cx + sway, topY + headR * 0.6],
  ];
  out.push(path(smoothPath(stem), stroke(6.5)));
  const hx = cx + sway;
  const hy = topY + headR * 0.6;

  for (let i = 0; i < petals; i += 1) {
    const a = (360 / petals) * i + rng.range(-6, 6);
    const len = headR * rng.range(0.85, 1.15);
    const [tx, ty] = polar(hx, hy, len, a);
    const [l1x, l1y] = polar(hx, hy, len * 0.6, a - 15);
    const [l2x, l2y] = polar(hx, hy, len * 0.6, a + 15);
    out.push(path(`M ${n(hx)} ${n(hy)} Q ${n(l1x)} ${n(l1y)} ${n(tx)} ${n(ty)} Q ${n(l2x)} ${n(l2y)} ${n(hx)} ${n(hy)} Z`, stroke(4.4)));
  }
  out.push(circle(hx, hy, headR * 0.26, stroke(4)));
  out.push(stipple(rng, { cx: hx, cy: hy, rx: headR * 0.22, ry: headR * 0.22, count: 60, falloff: 0.6, minR: 1.4, maxR: 3.2 }));

  for (let i = 0; i < 4; i += 1) {
    const u = 0.25 + i * 0.18;
    const px = cx + sway * u * 0.9;
    const py = baseY - height * u;
    const side = i % 2 === 0 ? 1 : -1;
    const len = 120 * rng.range(0.7, 1.1);
    const tx = px + side * len;
    const ty = py - len * 0.5;
    out.push(path(`M ${n(px)} ${n(py)} Q ${n(px + side * len * 0.5)} ${n(py - len * 0.55)} ${n(tx)} ${n(ty)} Q ${n(px + side * len * 0.62)} ${n(py - len * 0.05)} ${n(px)} ${n(py)} Z`, stroke(4.2)));
  }
  return out.join("");
}

/** Minimal sıradağ silüeti. */
export function ridgeline(rng, { x = 40, y = 300, w = 920, h = 420, layers = 3 } = {}) {
  const out = [];
  const baseLine = y + h;
  for (let l = layers - 1; l >= 0; l -= 1) {
    const pts = [];
    const peaks = 3 + l;
    const lift = (layers - l) * (h / (layers + 1)) * 0.55;
    for (let i = 0; i <= peaks * 2; i += 1) {
      const u = i / (peaks * 2);
      const isPeak = i % 2 === 1;
      pts.push([x + u * w, baseLine - lift - (isPeak ? rng.range(150, 300) * (1 - l * 0.18) : rng.range(0, 50))]);
    }
    out.push(
      path(
        `M ${n(x)} ${n(baseLine)} L ${pts.map(([px, py]) => `${n(px)} ${n(py)}`).join(" L ")} L ${n(x + w)} ${n(baseLine)}`,
        stroke(l === 0 ? 9 : 5, { opacity: l === 0 ? 1 : 0.72 }),
      ),
    );
  }
  out.push(line(x, baseLine, x + w, baseLine, stroke(9)));
  out.push(circle(x + w * 0.78, y - 60, 68, stroke(6)));
  out.push(stippleBand(rng, { x, y: baseLine + 8, w, h: 150, count: 240, dir: "up" }));
  return out.join("");
}

/** Ay evreleri dizisi. */
export function moonPhases(rng, { cx = 500, cy = 500, count = 5, r = 84, gap = 218 } = {}) {
  const out = [];
  const startX = cx - ((count - 1) * gap) / 2;
  for (let i = 0; i < count; i += 1) {
    const x = startX + i * gap;
    const t = i / (count - 1);
    out.push(circle(x, cy, r, stroke(4.5)));
    const offset = (t - 0.5) * 2 * r * 1.85;
    const sweep = offset > 0 ? 1 : 0;
    const rx = Math.abs(offset) / 2;
    if (i === 0) {
      out.push(circle(x, cy, r, solid({ opacity: 0.9 })));
    } else if (i === count - 1) {
      out.push(stipple(rng, { cx: x, cy, rx: r * 0.72, ry: r * 0.72, count: 70, falloff: 0.5, minR: 1.2, maxR: 2.6 }));
    } else {
      out.push(
        path(
          `M ${n(x)} ${n(cy - r)} A ${n(r)} ${n(r)} 0 0 ${sweep} ${n(x)} ${n(cy + r)} A ${n(rx)} ${n(r)} 0 0 ${1 - sweep} ${n(x)} ${n(cy - r)} Z`,
          solid({ opacity: 0.9 }),
        ),
      );
    }
  }
  return out.join("");
}

/** Hilal. */
export function crescent(rng, { cx = 500, cy = 500, r = 300 } = {}) {
  const out = [];
  out.push(
    path(
      `M ${n(cx)} ${n(cy - r)} A ${n(r)} ${n(r)} 0 1 0 ${n(cx)} ${n(cy + r)} A ${n(r * 0.78)} ${n(r * 0.92)} 0 1 1 ${n(cx)} ${n(cy - r)} Z`,
      solid({ opacity: 0.94 }),
    ),
  );
  for (let i = 0; i < 5; i += 1) {
    const a = rng.range(0, 360);
    const [sx, sy] = polar(cx, cy, r * rng.range(1.25, 1.5), a);
    const s = rng.range(9, 20);
    out.push(path(`M ${n(sx)} ${n(sy - s)} L ${n(sx + s * 0.28)} ${n(sy - s * 0.28)} L ${n(sx + s)} ${n(sy)} L ${n(sx + s * 0.28)} ${n(sy + s * 0.28)} L ${n(sx)} ${n(sy + s)} L ${n(sx - s * 0.28)} ${n(sy + s * 0.28)} L ${n(sx - s)} ${n(sy)} L ${n(sx - s * 0.28)} ${n(sy - s * 0.28)} Z`, solid()));
  }
  return out.join("");
}

/** İç içe yaylar — geometrik bant. */
export function concentricArcs(rng, { cx = 500, cy = 620, count = 9, rMin = 90, rMax = 400 } = {}) {
  const out = [];
  for (let i = 0; i < count; i += 1) {
    const r = rMin + ((rMax - rMin) / (count - 1)) * i;
    const spread = 150 + i * 3;
    const a0 = 270 - spread / 2;
    const a1 = 270 + spread / 2;
    const [x0, y0] = polar(cx, cy, r, a0);
    const [x1, y1] = polar(cx, cy, r, a1);
    out.push(path(`M ${n(x0)} ${n(y0)} A ${n(r)} ${n(r)} 0 0 1 ${n(x1)} ${n(y1)}`, stroke(i % 3 === 0 ? 6 : 2.6, { opacity: n(0.45 + 0.55 * (1 - i / count)) })));
  }
  out.push(circle(cx, cy, 14, solid()));
  out.push(stipple(rng, { cx, cy: cy - 210, rx: 300, ry: 170, count: 220, falloff: 0.6, minR: 1.1, maxR: 2.8 }));
  return out.join("");
}

/** Örgülü düğüm — soyut, iç içe geçmiş eğriler. */
export function knot(rng, { cx = 500, cy = 500, r = 300, loops = 5 } = {}) {
  const out = [];
  for (let l = 0; l < loops; l += 1) {
    const pts = [];
    const rot = (360 / loops) * l;
    for (let i = 0; i <= 40; i += 1) {
      const t = (i / 40) * Math.PI * 2;
      const rr = r * (0.55 + 0.45 * Math.sin(t * 2 + (rot * Math.PI) / 180));
      const a = t + (rot * Math.PI) / 180;
      pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.92]);
    }
    out.push(path(smoothPath(pts, true), stroke(l % 2 === 0 ? 6 : 3.2, { opacity: n(0.6 + 0.4 * (1 - l / loops)) })));
  }
  out.push(circle(cx, cy, r * 0.1, solid()));
  return out.join("");
}

/** Negatif alan blackwork paneli. */
export function negativePanel(rng, { cx = 500, cy = 500, r = 400 } = {}) {
  // Dış organik form
  const outer = [];
  const steps = 16;
  for (let i = 0; i < steps; i += 1) {
    const a = (360 / steps) * i;
    const rr = r * (0.78 + 0.24 * Math.sin((i / steps) * Math.PI * 2 + 1.1) + rng.range(-0.05, 0.05));
    outer.push(polar(cx, cy, rr, a));
  }
  let d = smoothPath(outer, true);

  // Negatif delikler — arka plan buradan görünür
  const holeCount = rng.int(4, 6);
  for (let i = 0; i < holeCount; i += 1) {
    const a = (360 / holeCount) * i + rng.range(-18, 18);
    const dist = r * rng.range(0.16, 0.46);
    const [hx, hy] = polar(cx, cy, dist, a);
    const hr = r * rng.range(0.08, 0.2);
    if (rng.bool(0.55)) {
      // Dairesel delik (ters yönde çizilir)
      d += ` M ${n(hx + hr)} ${n(hy)} A ${n(hr)} ${n(hr)} 0 1 0 ${n(hx - hr)} ${n(hy)} A ${n(hr)} ${n(hr)} 0 1 0 ${n(hx + hr)} ${n(hy)} Z`;
    } else {
      // Yarık
      const len = r * rng.range(0.4, 0.8);
      const wdt = r * rng.range(0.03, 0.07);
      const ang = rng.range(-70, 70);
      const rad = (ang * Math.PI) / 180;
      const dx = Math.cos(rad);
      const dy = Math.sin(rad);
      const px = -dy * wdt;
      const py = dx * wdt;
      d += ` M ${n(hx - dx * len / 2 + px)} ${n(hy - dy * len / 2 + py)} L ${n(hx + dx * len / 2 + px)} ${n(hy + dy * len / 2 + py)} L ${n(hx + dx * len / 2 - px)} ${n(hy + dy * len / 2 - py)} L ${n(hx - dx * len / 2 - px)} ${n(hy - dy * len / 2 - py)} Z`;
    }
  }

  const out = [path(d, solid({ "fill-rule": "evenodd", opacity: 0.96 }))];
  out.push(stipple(rng, { cx, cy, rx: r * 1.22, ry: r * 1.18, count: 340, falloff: 0.3, minR: 1.2, maxR: 3.4 }));
  return out.join("");
}

/** Kuş tüyü / kanat — bir eğri boyunca dizilmiş tüyler. */
export function feather(rng, { x = 500, yTop = 80, yBottom = 950, curve = 140, barbs = 46 } = {}) {
  const out = [];
  const spine = [];
  for (let s = 0; s <= 10; s += 1) {
    const u = s / 10;
    spine.push([x + Math.sin(u * Math.PI * 0.8) * curve, yBottom + (yTop - yBottom) * u]);
  }
  const at = (u) => {
    const idx = u * 10;
    const i0 = Math.floor(idx);
    const i1 = Math.min(10, i0 + 1);
    const f = idx - i0;
    return [spine[i0][0] + (spine[i1][0] - spine[i0][0]) * f, spine[i0][1] + (spine[i1][1] - spine[i0][1]) * f];
  };
  for (let i = 0; i < barbs; i += 1) {
    const u = 0.08 + (i / (barbs - 1)) * 0.9;
    const [px, py] = at(u);
    const env = Math.sin(Math.pow(u, 0.8) * Math.PI) * 0.95 + 0.05;
    const len = 190 * env * rng.range(0.9, 1.08);
    for (const side of [-1, 1]) {
      const tx = px + side * len;
      const ty = py + len * 0.42;
      out.push(path(`M ${n(px)} ${n(py)} Q ${n(px + side * len * 0.55)} ${n(py + len * 0.02)} ${n(tx)} ${n(ty)}`, stroke(3.4, { opacity: n(rng.range(0.6, 1)) })));
    }
  }
  out.push(path(smoothPath(spine), stroke(6.5)));
  return out.join("");
}

/** Kırık / kesişen çizgiler — soyut kompozisyon. */
export function fracture(rng, { count = 9 } = {}) {
  const out = [];
  for (let i = 0; i < count; i += 1) {
    const pts = [];
    let px = rng.range(90, 910);
    let py = rng.range(60, 240);
    pts.push([px, py]);
    const segs = rng.int(3, 6);
    for (let s = 0; s < segs; s += 1) {
      px += rng.range(-210, 210);
      py += rng.range(120, 240);
      pts.push([Math.max(70, Math.min(930, px)), Math.min(950, py)]);
    }
    out.push(path(`M ${pts.map(([a, b]) => `${n(a)} ${n(b)}`).join(" L ")}`, stroke(rng.range(5, 17), { opacity: n(rng.range(0.7, 1)) })));
  }
  return out.join("");
}

/** Yazı plakası — sistem serif fontuyla el yazısı hissi. */
export function lettering(rng, { lines = ["her iz", "bir karar"], cx = 500, cy = 500, size = 190, italic = true } = {}) {
  const out = [];
  const lh = size * 1.12;
  const startY = cy - ((lines.length - 1) * lh) / 2;
  lines.forEach((text, i) => {
    out.push(
      `<text x="${n(cx)}" y="${n(startY + i * lh)}" text-anchor="middle" dominant-baseline="middle" font-family="Georgia, 'Times New Roman', 'Didot', serif" font-size="${n(size)}" font-style="${italic ? "italic" : "normal"}" fill="${INK}" letter-spacing="${n(size * 0.01)}">${text}</text>`,
    );
  });
  out.push(line(cx - size * 1.5, startY + lines.length * lh - lh * 0.3, cx + size * 1.5, startY + lines.length * lh - lh * 0.3, stroke(2.4, { opacity: 0.6 })));
  return out.join("");
}

/** Nokta gölgeli küre — realist ton çalışması. */
export function stippleSphere(rng, { cx = 500, cy = 500, r = 290 } = {}) {
  const out = [];
  const dots = [];
  const lightX = cx - r * 0.35;
  const lightY = cy - r * 0.4;
  for (let i = 0; i < 2600; i += 1) {
    const a = rng() * Math.PI * 2;
    const t = Math.sqrt(rng());
    const px = cx + Math.cos(a) * t * r;
    const py = cy + Math.sin(a) * t * r;
    const d = Math.hypot(px - lightX, py - lightY) / (r * 1.9);
    if (rng() > Math.pow(d, 1.5)) continue;
    dots.push(circle(px, py, 0.9 + Math.pow(d, 2) * 3.4, solid({ opacity: n(0.25 + d * 0.7) })));
  }
  out.push(dots.join(""));
  out.push(circle(cx, cy, r, stroke(2, { opacity: 0.35 })));
  out.push(ellipse(cx + r * 0.15, cy + r * 1.12, r * 0.85, r * 0.14, solid({ opacity: 0.5 })));
  return out.join("");
}

/* ------------------------------------------------------------------ */
/* Çerçeve — motifi "fotoğraf" hissi veren bir plakaya yerleştirir      */
/* ------------------------------------------------------------------ */

export const RATIOS = {
  square: [1000, 1000],
  portrait: [880, 1100],
  tall: [760, 1140],
  landscape: [1280, 854],
};

/**
 * Motifi ışık, doku, vinyet ve gren katmanlarıyla birlikte tam bir SVG'ye sarar.
 */
export function plate({ ratio = "portrait", motif, seed, fit = 0.94, offsetY = 0, light = null, tone = "neutral", zoom = 1, focus = [500, 500], contrast = 1 }) {
  const [w, h] = RATIOS[ratio] ?? RATIOS.portrait;
  const rng = makeRng(`${seed}:plate`);
  const scale = (Math.min(w, h) / 1000) * fit * zoom;
  const tx = w / 2 - focus[0] * scale;
  const ty = h / 2 - focus[1] * scale + offsetY;

  const lightX = light?.[0] ?? rng.range(24, 74);
  const lightY = light?.[1] ?? rng.range(20, 58);
  const spin = rng.range(-3.5, 3.5);

  const palettes = {
    neutral: ["#a09891", "#6d665f", "#282523", "#0a0a0a"],
    warm: ["#a89684", "#736355", "#2c251f", "#0b0908"],
    cool: ["#93929a", "#5f6167", "#242427", "#09090b"],
  };
  const t = palettes[tone] ?? palettes.neutral;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" preserveAspectRatio="xMidYMid slice">
<defs>
<radialGradient id="lit" cx="${n(lightX)}%" cy="${n(lightY)}%" r="88%">
<stop offset="0" stop-color="${t[0]}"/>
<stop offset="0.3" stop-color="${t[1]}"/>
<stop offset="0.66" stop-color="${t[2]}"/>
<stop offset="1" stop-color="${t[3]}"/>
</radialGradient>
<radialGradient id="vig" cx="${n(lightX)}%" cy="${n(lightY)}%" r="86%">
<stop offset="0.42" stop-color="#000" stop-opacity="0"/>
<stop offset="1" stop-color="#000" stop-opacity="0.55"/>
</radialGradient>
<filter id="mottle" x="0" y="0" width="100%" height="100%">
<feTurbulence type="fractalNoise" baseFrequency="0.005 0.009" numOctaves="4" seed="${hashSeed(seed) % 900}"/>
<feColorMatrix type="saturate" values="0"/>
</filter>
<filter id="grain" x="0" y="0" width="100%" height="100%">
<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${(hashSeed(seed) + 17) % 900}"/>
<feColorMatrix type="saturate" values="0"/>
</filter>
<filter id="bleed" x="-15%" y="-15%" width="130%" height="130%">
<feGaussianBlur stdDeviation="${n(1.9 / Math.max(scale, 0.2))}"/>
</filter>
<g id="motif">${motif}</g>
</defs>
<rect width="${w}" height="${h}" fill="url(#lit)"/>
<rect width="${w}" height="${h}" filter="url(#mottle)" opacity="0.38" style="mix-blend-mode:overlay"/>
<g transform="translate(${n(tx)} ${n(ty)}) scale(${n(scale * 1000) / 1000}) rotate(${n(spin)} ${n(focus[0])} ${n(focus[1])})">
<use href="#motif" filter="url(#bleed)" opacity="0.5"/>
<use href="#motif" opacity="${n(Math.min(1, 0.99 * contrast))}"/>
</g>
<rect width="${w}" height="${h}" fill="url(#vig)"/>
<rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.26" style="mix-blend-mode:overlay"/>
</svg>`;
}


/* ------------------------------------------------------------------ */
/* Portre ve mekân — motif değil, atmosfer                             */
/* ------------------------------------------------------------------ */

const HAIR = ["topuz", "kisa", "uzun", "kivircik", "at-kuyrugu", "dalgali"];

/**
 * Arkadan ışık alan büst silüeti. Yüz detayı çizilmez; ışık kenardan gelir.
 * Her sanatçı için saç formu ve duruş farklıdır.
 */
export function portraitSilhouette(rng, { variant = 0 } = {}) {
  const out = [];
  const hair = HAIR[variant % HAIR.length];
  const tilt = rng.range(-5, 5);
  const cx = 500 + rng.range(-30, 30);
  const headY = 350;
  const headRx = 132;
  const headRy = 162;
  const shoulderY = 760;
  const halfShoulder = 330 + rng.range(-30, 40);

  const bodyPts = [
    [cx - halfShoulder - 60, 1010],
    [cx - halfShoulder, shoulderY + 60],
    [cx - 112, shoulderY - 40],
    [cx - 78, headY + headRy - 26],
    [cx + 78, headY + headRy - 26],
    [cx + 112, shoulderY - 40],
    [cx + halfShoulder, shoulderY + 60],
    [cx + halfShoulder + 60, 1010],
  ];
  const body = smoothPath(bodyPts) + " L 1010 1010 L 1010 1200 L -10 1200 L -10 1010 Z";

  // Kenar ışığı: aynı formun bir tık büyüğü açık tonda
  out.push(
    group(
      [
        ellipse(cx, headY, headRx + 5, headRy + 5, { fill: "#c4b8ad", stroke: "none" }),
        path(body, { fill: "#c4b8ad", stroke: "none", transform: `translate(-4 -4)` }),
      ].join(""),
      { opacity: 0.4 },
    ),
  );

  const head = [];
  head.push(ellipse(cx, headY, headRx, headRy, solid()));
  head.push(path(body, solid()));

  // Saç formları
  if (hair === "topuz") {
    head.push(circle(cx + 118, headY - 118, 62, solid()));
    head.push(path(`M ${n(cx - headRx)} ${n(headY - 40)} Q ${n(cx)} ${n(headY - headRy - 70)} ${n(cx + headRx)} ${n(headY - 30)} Q ${n(cx)} ${n(headY - headRy + 30)} ${n(cx - headRx)} ${n(headY - 40)} Z`, solid()));
  } else if (hair === "kisa") {
    head.push(path(`M ${n(cx - headRx - 6)} ${n(headY - 20)} Q ${n(cx)} ${n(headY - headRy - 46)} ${n(cx + headRx + 6)} ${n(headY - 20)} L ${n(cx + headRx - 4)} ${n(headY - 70)} Q ${n(cx)} ${n(headY - headRy + 4)} ${n(cx - headRx + 4)} ${n(headY - 70)} Z`, solid()));
  } else if (hair === "uzun") {
    head.push(path(`M ${n(cx - headRx - 18)} ${n(headY - 40)} Q ${n(cx - headRx - 60)} ${n(headY + 250)} ${n(cx - headRx - 10)} ${n(shoulderY - 10)} L ${n(cx - 60)} ${n(shoulderY - 40)} L ${n(cx - 70)} ${n(headY)} Z`, solid()));
    head.push(path(`M ${n(cx + headRx + 18)} ${n(headY - 40)} Q ${n(cx + headRx + 60)} ${n(headY + 250)} ${n(cx + headRx + 10)} ${n(shoulderY - 10)} L ${n(cx + 60)} ${n(shoulderY - 40)} L ${n(cx + 70)} ${n(headY)} Z`, solid()));
    head.push(path(`M ${n(cx - headRx - 18)} ${n(headY - 20)} Q ${n(cx)} ${n(headY - headRy - 60)} ${n(cx + headRx + 18)} ${n(headY - 20)} Z`, solid()));
  } else if (hair === "kivircik") {
    for (let i = 0; i < 26; i += 1) {
      const a = rng.range(190, 350);
      const rr = headRx * rng.range(1.0, 1.28);
      const [px, py] = polar(cx, headY - 18, rr, a);
      head.push(circle(px, py, rng.range(26, 46), solid()));
    }
  } else if (hair === "at-kuyrugu") {
    head.push(path(`M ${n(cx - headRx)} ${n(headY - 30)} Q ${n(cx)} ${n(headY - headRy - 44)} ${n(cx + headRx)} ${n(headY - 30)} Z`, solid()));
    head.push(path(`M ${n(cx + headRx - 10)} ${n(headY - 60)} Q ${n(cx + 250)} ${n(headY + 40)} ${n(cx + 176)} ${n(headY + 262)} Q ${n(cx + 150)} ${n(headY + 120)} ${n(cx + headRx - 40)} ${n(headY + 10)} Z`, solid()));
  } else {
    head.push(path(`M ${n(cx - headRx - 14)} ${n(headY + 40)} Q ${n(cx - headRx - 34)} ${n(headY - headRy)} ${n(cx)} ${n(headY - headRy - 34)} Q ${n(cx + headRx + 34)} ${n(headY - headRy)} ${n(cx + headRx + 14)} ${n(headY + 40)} Q ${n(cx + headRx - 20)} ${n(headY - 60)} ${n(cx)} ${n(headY - 76)} Q ${n(cx - headRx + 20)} ${n(headY - 60)} ${n(cx - headRx - 14)} ${n(headY + 40)} Z`, solid()));
  }

  out.push(group(head.join(""), { transform: `rotate(${n(tilt)} ${n(cx)} ${n(headY)})` }));
  return out.join("");
}

/**
 * Atölye iç mekânı — pencere ışığı, düzlemler ve eşya silüetleri.
 */
export function interiorStudy(rng, { variant = 0 } = {}) {
  const out = [];
  const v = variant % 6;

  // Pencere / ışık kaynağı
  const wx = v % 2 === 0 ? 120 : 520;
  const wy = 90;
  const ww = 360;
  const wh = 480;
  out.push(`<rect x="-40" y="-40" width="1080" height="${n(wy + wh + 120)}" fill="#0f0d0c" opacity="0.18"/>`);
  out.push(`<rect x="${n(wx)}" y="${n(wy)}" width="${n(ww)}" height="${n(wh)}" fill="#d7ccc1" opacity="0.92"/>`);
  out.push(`<rect x="${n(wx)}" y="${n(wy)}" width="${n(ww)}" height="${n(wh)}" fill="none" stroke="${INK}" stroke-width="14"/>`);
  out.push(line(wx + ww / 2, wy, wx + ww / 2, wy + wh, stroke(12)));
  out.push(line(wx, wy + wh * 0.42, wx + ww, wy + wh * 0.42, stroke(12)));

  // Işık huzmesi
  const beam = `M ${n(wx)} ${n(wy + wh)} L ${n(wx + ww)} ${n(wy + wh)} L ${n(wx + ww + 330)} 1010 L ${n(wx - 190)} 1010 Z`;
  out.push(path(beam, { fill: "#d6cabe", stroke: "none", opacity: 0.26 }));
  out.push(stippleBand(rng, { x: wx - 240, y: wy + wh + 40, w: ww + 520, h: 420, count: 90, dir: "up" }));

  // Zemin / masa düzlemi
  const tableY = 700 + rng.range(-40, 60);
  out.push(path(`M -20 ${n(tableY + 120)} L 1020 ${n(tableY - 40)} L 1020 1020 L -20 1020 Z`, solid({ opacity: 0.9 })));
  out.push(line(-20, tableY + 120, 1020, tableY - 40, { stroke: "#c9bdb2", "stroke-width": 6, opacity: 0.5 }));

  if (v === 0 || v === 3) {
    // Çizim masası: lamba ve defterler
    out.push(path(`M 690 ${n(tableY - 30)} L 720 250 L 860 210`, stroke(14)));
    out.push(path(`M 860 210 L 940 190 L 906 286 L 828 268 Z`, solid()));
    out.push(`<rect x="120" y="${n(tableY + 34)}" width="260" height="26" rx="6" fill="${INK}"/>`);
    out.push(`<rect x="150" y="${n(tableY + 6)}" width="210" height="24" rx="6" fill="${INK}" opacity="0.85"/>`);
  } else if (v === 1 || v === 4) {
    // Raflar
    for (let i = 0; i < 3; i += 1) {
      const sy = 250 + i * 150;
      out.push(line(60, sy, 470, sy - 20, stroke(12)));
      for (let j = 0; j < 6; j += 1) {
        const bx = 80 + j * 62 + rng.range(-6, 6);
        const bh = rng.range(50, 96);
        out.push(`<rect x="${n(bx)}" y="${n(sy - 22 - bh - (j * 3))}" width="${n(rng.range(18, 34))}" height="${n(bh)}" fill="${INK}"/>`);
      }
    }
  } else {
    // Koltuk / stand
    out.push(path(`M 210 ${n(tableY + 60)} L 250 ${n(tableY - 220)} Q 300 ${n(tableY - 300)} 380 ${n(tableY - 268)} L 430 ${n(tableY + 30)} Z`, solid()));
    out.push(line(300, tableY + 40, 300, 1000, stroke(20)));
    out.push(path(`M 800 ${n(tableY - 10)} L 800 300 L 900 260`, stroke(12)));
    out.push(circle(910, 250, 34, solid()));
  }

  // Duvardaki çerçeveler
  const frames = v % 2 === 0 ? 3 : 2;
  for (let i = 0; i < frames; i += 1) {
    const fx = v % 2 === 0 ? 560 + i * 150 : 60 + i * 170;
    const fy = 150 + rng.range(0, 90);
    const fw = rng.range(90, 130);
    const fh = fw * rng.range(1.15, 1.45);
    out.push(`<rect x="${n(fx)}" y="${n(fy)}" width="${n(fw)}" height="${n(fh)}" fill="none" stroke="${INK}" stroke-width="9"/>`);
    out.push(`<rect x="${n(fx + 14)}" y="${n(fy + 14)}" width="${n(fw - 28)}" height="${n(fh - 28)}" fill="${INK}" opacity="0.45"/>`);
  }

  return out.join("");
}


/* ------------------------------------------------------------------ */
/* Kadraj yardımcısı                                                   */
/* ------------------------------------------------------------------ */

const NUM = /-?\d*\.?\d+/g;

/** Motif markup'ından koordinat bulutu çıkarır. */
export function inkPoints(markup) {
  const pts = [];

  for (const m of markup.matchAll(/\sd="([^"]+)"/g)) {
    const nums = m[1].match(NUM)?.map(Number) ?? [];
    for (let i = 0; i + 1 < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
  }
  for (const m of markup.matchAll(/cx="(-?[\d.]+)"\s+cy="(-?[\d.]+)"/g)) {
    pts.push([Number(m[1]), Number(m[2])]);
  }
  for (const m of markup.matchAll(/x1="(-?[\d.]+)"\s+y1="(-?[\d.]+)"\s+x2="(-?[\d.]+)"\s+y2="(-?[\d.]+)"/g)) {
    pts.push([Number(m[1]), Number(m[2])], [Number(m[3]), Number(m[4])]);
  }
  return pts.filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y) && x > -200 && x < 1200 && y > -200 && y < 1200);
}

/**
 * Yoğun bir mürekkep bölgesi seçer; kadraj boş alana denk gelmesin diye
 * rastgele bir noktanın çevresindeki komşuların ağırlık merkezini döndürür.
 */
export function focusPoint(rng, markup, radius = 210) {
  const pts = inkPoints(markup);
  if (pts.length < 8) return [500, 500];
  let best = null;
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const seedPt = pts[Math.floor(rng() * pts.length)];
    let sx = 0;
    let sy = 0;
    let count = 0;
    for (const [x, y] of pts) {
      if (Math.abs(x - seedPt[0]) < radius && Math.abs(y - seedPt[1]) < radius) {
        sx += x;
        sy += y;
        count += 1;
      }
    }
    if (!best || count > best.count) best = { count, x: sx / count, y: sy / count };
    if (best.count > pts.length * 0.25) break;
  }
  return [Math.max(180, Math.min(820, best.x)), Math.max(180, Math.min(820, best.y))];
}
