/**
 * Basit site denetimi: başlık, h1, başlık hiyerarşisi, alt metin, yinelenen id
 * ve iç bağlantıların çalışıp çalışmadığı.
 *
 *   node scripts/check-site.mjs [taban-adres]
 */
const base = process.argv[2] ?? "http://localhost:3000";

const routes = [
  "/", "/calismalar", "/hakkimda", "/stiller", "/studyo", "/bakim", "/sss",
  "/iletisim", "/randevu", "/hediye-karti",
  "/gizlilik", "/cerez-politikasi", "/kvkk", "/kullanim-kosullari",
  "/stiller/fine-line", "/stiller/minimal", "/stiller/blackwork", "/stiller/realism",
  "/stiller/micro-realism", "/stiller/geometric", "/stiller/abstract",
  "/stiller/traditional", "/stiller/lettering", "/stiller/custom-design",
];

const problems = [];
const linkTargets = new Set();
const note = (route, kind, message) => problems.push({ route, kind, message });

const strip = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

for (const route of routes) {
  const res = await fetch(base + route);
  if (!res.ok) {
    note(route, "durum", `HTTP ${res.status}`);
    continue;
  }
  const html = await res.text();
  const main = html.slice(html.indexOf("<main"), html.lastIndexOf("</main>") + 7) || html;

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) note(route, "title", "başlık yok");
  else if (title.length > 62) note(route, "title", `çok uzun (${title.length}): ${title}`);

  const decode = (value) =>
    value
      .replace(/&#x27;|&#39;|&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) note(route, "description", "açıklama yok");
  else {
    const length = decode(desc).length;
    if (length < 70 || length > 175) note(route, "description", `uzunluk ${length}`);
  }

  if (!html.includes('property="og:image"')) note(route, "og", "og:image yok");
  if (!html.includes('rel="canonical"')) note(route, "canonical", "canonical yok");

  const heads = [...main.matchAll(/<(h[1-4])[^>]*>([\s\S]*?)<\/\1>/g)].map((m) => ({
    level: Number(m[1][1]),
    text: strip(m[2]).slice(0, 46),
  }));
  const h1s = heads.filter((h) => h.level === 1);
  if (h1s.length !== 1) note(route, "h1", `${h1s.length} adet h1`);
  let prev = 0;
  for (const head of heads) {
    if (prev && head.level > prev + 1) note(route, "hiyerarşi", `h${prev} → h${head.level}: "${head.text}"`);
    prev = head.level;
  }

  for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\salt=/.test(tag)) note(route, "alt", `alt yok: ${tag.match(/src="([^"]*)"/)?.[1]}`);
    else if (/\salt=""/.test(tag) && !/aria-hidden/.test(tag) && !/role="presentation"/.test(tag)) {
      // Dekoratif görsellerde boş alt kabul edilir; yalnızca bilgi amaçlı not
    }
  }

  const ids = (html.match(/\sid="([^"]+)"/g) ?? []).map((m) => m.slice(5, -1));
  const seen = new Map();
  ids.forEach((id) => seen.set(id, (seen.get(id) ?? 0) + 1));
  [...seen].filter(([, n]) => n > 1).forEach(([id, n]) => note(route, "id", `yinelenen id "${id}" (${n})`));

  for (const href of html.match(/href="\/[^"#?]*"/g) ?? []) {
    linkTargets.add(href.slice(6, -1));
  }
}

// Bağlantı hedefleri
for (const target of [...linkTargets].sort()) {
  if (target.startsWith("/_next") || target.startsWith("/img")) continue;
  const res = await fetch(base + target, { method: "GET" });
  if (!res.ok) note("(bağlantı)", "kırık", `${target} → ${res.status}`);
}

if (!problems.length) {
  console.log(`✓ ${routes.length} sayfa, ${linkTargets.size} bağlantı hedefi — sorun yok`);
} else {
  console.log(`${problems.length} bulgu:\n`);
  for (const p of problems) console.log(`  ${p.route.padEnd(30)} ${p.kind.padEnd(12)} ${p.message}`);
  process.exitCode = 1;
}
