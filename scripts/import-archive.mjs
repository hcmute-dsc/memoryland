// Import the club's activity archive (the /news section of hcmute-dsc.github.io) into this site:
// per-year stats, a featured selection with resized covers, and a light index of every post.
//
//   ARCHIVE_DIR=../hcmute-dsc.github.io node scripts/import-archive.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const ARCHIVE = path.resolve(ROOT, process.env.ARCHIVE_DIR ?? '../hcmute-dsc.github.io');
const NEWS = path.join(ARCHIVE, 'news');
const SITE = 'https://hcmute-dsc.io.vn';
const COVERS = path.join(ROOT, 'public', 'archive');
const OUT = path.join(ROOT, 'content', 'archive.json');
const FEATURED_PER_YEAR = 9;

// Club years start on the founding day, 20/07/2021 (the founding date on the fanpage).
const FOUNDED = { month: 7, day: 20, year: 2021 };
const clubYear = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  const start = m > FOUNDED.month || (m === FOUNDED.month && d >= FOUNDED.day) ? y : y - 1;
  return start - FOUNDED.year + 1;
};

const WEIGHT = { 'su-kien-cuoc-thi': 3, 'workshop-sinh-hoat': 2, 'doi-song-clb': 2, 'tuyen-thanh-vien': 1, 'chia-se-kien-thuc': 1, 'thong-bao': 0 };

function frontMatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  const fm = {};
  if (!m) return fm;
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith('"')) v = JSON.parse(v);
    fm[kv[1]] = v;
  }
  return fm;
}

const posts = [];
for (const dir of fs.readdirSync(NEWS).sort()) {
  const file = path.join(NEWS, dir, 'index.md');
  if (!fs.existsSync(file)) continue;
  const fm = frontMatter(fs.readFileSync(file, 'utf8').replace(/\r/g, ''));
  const date = String(fm.date);
  const slug = dir.slice(11);
  const [y, m, d] = date.split('-');
  const photos = fs.readdirSync(path.join(NEWS, dir)).filter((f) => /^img-\d+\.webp$/.test(f)).length;
  posts.push({
    id: dir,
    title: fm.title,
    date,
    year: clubYear(date),
    category: fm.category,
    description: fm.description ?? '',
    photos,
    cover: fm.image ? path.join(NEWS, dir, fm.image.replace(/^\.\//, '')) : null,
    url: `${SITE}/news/${y}/${m}/${d}/${slug}`,
  });
}

// Year 0 is the run-up before the founding day.
const years = [0, 1, 2, 3, 4, 5];
const byId = new Map(posts.map((p) => [p.id, p]));
const journey = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'journey.json'), 'utf8'));
const stories = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'stories.json'), 'utf8'));
const generations = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'generations.json'), 'utf8'));

// Every id the hand-written content points at must exist in the archive.
const refs = [
  ...journey.years.flatMap((y) => [...y.milestones.map((m) => m.post), ...y.featured]),
  journey.next.post,
  ...stories.archive.map((s) => s.post),
  ...generations.terms.flatMap((g) => [g.post, ...g.recruitment.map((r) => r.post)]),
  generations.next.post,
].filter(Boolean);
const missing = refs.filter((id) => !byId.has(id));
if (missing.length) {
  console.error('Unknown archive ids:\n  ' + missing.join('\n  '));
  process.exit(1);
}

fs.mkdirSync(COVERS, { recursive: true });

// Featured posts: the hand-picked list of the year, or the best-scored posts (one per series) if none.
const series = (t) => t.toLowerCase().split(/\s[|–-]\s|\spart\s/)[0];
function autoPick(year) {
  const seen = new Set();
  return posts
    .filter((p) => p.year === year && p.cover && p.category !== 'thong-bao')
    .map((p) => ({ p, score: (WEIGHT[p.category] ?? 0) + Math.min(p.photos, 10) * 0.3 }))
    .sort((a, b) => b.score - a.score)
    .map(({ p }) => p)
    .filter((p) => !seen.has(series(p.title)) && seen.add(series(p.title)))
    .slice(0, FEATURED_PER_YEAR)
    .sort((a, b) => a.date.localeCompare(b.date));
}

const featured = {};
for (const year of years) {
  const picked = journey.years.find((y) => y.year === year)?.featured ?? [];
  const pool = picked.length ? picked.map((id) => byId.get(id)).filter((p) => p.cover) : autoPick(year);
  featured[year] = [];
  for (const p of pool) {
    const name = `${p.id}.webp`;
    const dest = path.join(COVERS, name);
    if (!fs.existsSync(dest)) await sharp(p.cover).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 78 }).toFile(dest);
    const { width, height } = await sharp(dest).metadata();
    featured[year].push({ id: p.id, title: p.title, date: p.date, category: p.category, description: p.description, photos: p.photos, url: p.url, cover: `/archive/${name}`, width, height });
  }
}

const sum = (arr, f) => arr.reduce((n, x) => n + f(x), 0);
const stats = {
  posts: posts.length,
  photos: sum(posts, (p) => p.photos),
  events: posts.filter((p) => p.category === 'su-kien-cuoc-thi' || p.category === 'workshop-sinh-hoat').length,
  byYear: Object.fromEntries(years.map((y) => {
    const ps = posts.filter((p) => p.year === y);
    return [y, { posts: ps.length, photos: sum(ps, (p) => p.photos) }];
  })),
};

// Stories from the archive: keep the original text (markdown) and the cover.
const STORY_DIR = path.join(ROOT, 'content', 'stories', 'archive');
fs.mkdirSync(STORY_DIR, { recursive: true });
for (const { post } of stories.archive) {
  const p = byId.get(post);
  const md = fs.readFileSync(path.join(NEWS, post, 'index.md'), 'utf8').replace(/\r/g, '');
  const body = md
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .replace(/<!--truncate-->\n?/, '')
    .replace(/<div className="news-gallery">[\s\S]*?<\/div>\n?/g, '')
    .replace(/^!\[[^\]]*\]\([^)]*\)\n?/gm, '')
    .trim();
  let cover = null;
  if (p.cover) {
    cover = `/archive/${post}.webp`;
    const dest = path.join(COVERS, `${post}.webp`);
    if (!fs.existsSync(dest)) await sharp(p.cover).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 78 }).toFile(dest);
  }
  fs.writeFileSync(path.join(STORY_DIR, `${post}.json`), JSON.stringify({ title: p.title, date: p.date, url: p.url, cover, body }, null, 2) + '\n');
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({
  source: `${SITE}/news`,
  generatedAt: new Date().toISOString().slice(0, 10),
  stats,
  featured,
  // the cover path is local to this machine: leave it out
  posts: posts.map(({ cover: _local, ...p }) => p),
}, null, 2) + '\n');
console.log(`${posts.length} posts, ${stats.photos} photos -> ${path.relative(ROOT, OUT)}; covers: ${sum(years, (y) => featured[y].length)}`);
