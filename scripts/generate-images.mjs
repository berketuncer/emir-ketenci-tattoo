/**
 * Tüm site görsellerini üretir.
 *
 *   node scripts/generate-images.mjs
 *
 * Çıktı: public/img/** altında SVG dosyaları.
 * Portfolyo görselleri bilinçli olarak yakın plan kadrajlardır — tam bir desen
 * sayfası değil, uygulanmış bir işin detayı gibi okunmaları hedeflenir.
 */
import fs from "node:fs";
import path from "node:path";
import * as d from "./lib/draw.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const out = (...parts) => path.join(ROOT, "public", "img", ...parts);

const ensure = (dir) => fs.mkdirSync(dir, { recursive: true });
const write = (file, svg) => {
  ensure(path.dirname(file));
  fs.writeFileSync(file, svg);
};

/* ---------------------------------------------------------------- */
/* Portfolyo                                                         */
/* ---------------------------------------------------------------- */

const worksSrc = fs.readFileSync(path.join(ROOT, "src/data/works.ts"), "utf8");
const works = [...worksSrc.matchAll(/\{ id: "(w-\d+)".*?style: "([a-z-]+)".*?ratio: "([a-z]+)"/g)].map(
  ([, id, style, ratio]) => ({ id, style, ratio }),
);

const stylePools = {
  "fine-line": ["branch", "wildflower", "feather"],
  minimal: ["crescent", "moonPhases", "ridgeline", "concentricArcs"],
  blackwork: ["ornamentalBand", "brushStrokes", "fracture"],
  realism: ["stippleSphere", "concentricArcs"],
  "micro-realism": ["feather", "wildflower", "branch"],
  geometric: ["mandala", "lattice", "sacredGeometry", "knot"],
  abstract: ["brushStrokes", "fracture", "waveField", "knot"],
  traditional: ["sacredGeometry", "mandala", "knot", "ornamentalBand"],
  lettering: ["lettering"],
  "custom-design": ["knot", "branch", "brushStrokes"],
};

const letteringLines = {
  "w-16": ["her iz", "bir karar"],
  "w-28": ["kalıcı olan"],
};

/** Kadraj çeşitliliği: bir kısmı tam kompozisyon, çoğu yakın plan detay. */
const zoomCycle = [1, 1.55, 1.05, 1.8, 1, 1.35, 1.65, 1.15];
const tones = ["neutral", "warm", "neutral", "cool"];

/** Her motif ailesi için parametre çeşitliliği — aynı motif iki kez aynı görünmesin. */
const optsFor = (name, rng) => {
  switch (name) {
    case "mandala":
      return { rings: rng.int(3, 6), radius: rng.range(310, 400), dotwork: rng.bool(0.7) };
    case "lattice":
      return { rings: rng.int(2, 4), sides: rng.int(5, 8), radius: rng.range(290, 380) };
    case "sacredGeometry":
      return { radius: rng.range(270, 345) };
    case "knot":
      return { loops: rng.int(3, 7), r: rng.range(250, 330) };
    case "branch":
      return { leaves: rng.int(11, 21), curve: rng.range(60, 185), leafLen: rng.range(160, 245) };
    case "wildflower":
      return { petals: rng.int(6, 13), headR: rng.range(130, 205), height: rng.range(700, 880) };
    case "feather":
      return { barbs: rng.int(30, 56), curve: rng.range(85, 195) };
    case "waveField":
      return { lines: rng.int(18, 36) };
    case "brushStrokes":
      return { count: rng.int(2, 6), tilt: rng.pick([-62, -28, 0, 24, 58]), spread: rng.range(14, 40) };
    case "fracture":
      return { count: rng.int(6, 12) };
    case "ridgeline":
      return { layers: rng.int(2, 4) };
    case "moonPhases":
      return { count: rng.int(3, 6), r: rng.range(70, 96) };
    case "crescent":
      return { r: rng.range(245, 330) };
    case "concentricArcs":
      return { count: rng.int(6, 12), rMax: rng.range(340, 425) };
    case "ornamentalBand":
      return { units: rng.int(3, 6), width: rng.range(340, 480) };
    case "stippleSphere":
      return { r: rng.range(245, 320) };
    default:
      return {};
  }
};

const draw = (name, rng, opts = {}) => {
  const fn = d[name];
  if (typeof fn !== "function") throw new Error(`Bilinmeyen motif: ${name}`);
  return fn(rng, opts);
};

/** Aynı tarzdaki her yeni iş, o tarzın havuzunda bir sonraki motife geçer. */
const styleCursor = {};

works.forEach((work, index) => {
  const pool = stylePools[work.style] ?? stylePools["custom-design"];
  const cursor = (styleCursor[work.style] = (styleCursor[work.style] ?? -1) + 1);
  const name = pool[cursor % pool.length];
  const rng = d.makeRng(`${work.id}:${name}`);
  const zoom = name === "lettering" ? 1 : zoomCycle[(index * 3 + cursor) % zoomCycle.length];
  const motif = draw(name, rng, name === "lettering" ? { lines: letteringLines[work.id] ?? ["iz"] } : optsFor(name, rng));
  const focus = zoom > 1.1 ? d.focusPoint(rng, motif, 240 / zoom) : [500, 500];
  const svg = d.plate({
    ratio: work.ratio,
    motif,
    seed: work.id,
    ratioSeed: work.id,
    zoom,
    focus,
    tone: tones[index % tones.length],
    fit: zoom > 1.15 ? 0.98 : 0.92,
  });
  write(out("works", `${work.id}.svg`), svg);
});

/* ---------------------------------------------------------------- */
/* Stil kapakları — tam kompozisyon                                  */
/* ---------------------------------------------------------------- */

const styleCovers = {
  "fine-line": "branch",
  minimal: "crescent",
  blackwork: "ornamentalBand",
  realism: "stippleSphere",
  "micro-realism": "feather",
  geometric: "mandala",
  abstract: "brushStrokes",
  traditional: "sacredGeometry",
  lettering: "lettering",
  "custom-design": "knot",
};

Object.entries(styleCovers).forEach(([slug, name], index) => {
  const rng = d.makeRng(`style:${slug}`);
  const motif = draw(name, rng, name === "lettering" ? { lines: ["her iz"] } : optsFor(name, rng));
  write(
    out("styles", `${slug}.svg`),
    d.plate({ ratio: "portrait", motif, seed: `style-${slug}`, zoom: 1, fit: 0.9, tone: tones[index % tones.length] }),
  );
});

/* ---------------------------------------------------------------- */
/* Portre — stüdyoda tek kişi var                                    */
/* ---------------------------------------------------------------- */

{
  const rng = d.makeRng("emir-ketenci");
  write(
    out("emir-ketenci.svg"),
    d.plate({
      ratio: "portrait",
      motif: d.portraitSilhouette(rng, { variant: 1 }),
      seed: "emir-ketenci",
      fit: 1.06,
      focus: [500, 600],
      tone: "warm",
      light: [32, 30],
    }),
  );
}

/* ---------------------------------------------------------------- */
/* Atölye                                                            */
/* ---------------------------------------------------------------- */

const studioShots = [
  ["studio-01", "landscape"],
  ["studio-02", "portrait"],
  ["studio-03", "portrait"],
  ["studio-04", "landscape"],
  ["studio-05", "portrait"],
  ["studio-06", "landscape"],
];

studioShots.forEach(([id, ratio], index) => {
  const rng = d.makeRng(`studio:${id}`);
  write(
    out("studio", `${id}.svg`),
    d.plate({
      ratio,
      motif: d.interiorStudy(rng, { variant: index }),
      seed: id,
      fit: 1.02,
      zoom: [2.4, 2.0, 1.9, 2.6, 1.85, 2.5][index],
      focus: [[330, 330], [560, 400], [430, 470], [420, 300], [470, 420], [620, 360]][index],
      tone: index % 3 === 0 ? "warm" : "neutral",
    }),
  );
});

const count = (dir) => fs.readdirSync(out(dir)).length;
console.log(
  `üretildi → works: ${count("works")}, styles: ${count("styles")}, studio: ${count("studio")}, portre: 1`,
);
