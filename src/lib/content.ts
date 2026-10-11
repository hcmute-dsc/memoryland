import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

import archive from '../../content/archive.json';
import journeyData from '../../content/journey.json';
import generationsData from '../../content/generations.json';
import storiesData from '../../content/stories.json';
import lettersData from '../../content/letters.json';
import siteData from '../../content/site.json';

export const site = siteData;
export const stats = archive.stats;
export const letters = lettersData;

export type ArchivePost = (typeof archive.posts)[number];
export type FeaturedPost = (typeof archive.featured)['1'][number];

const posts = new Map<string, ArchivePost>(archive.posts.map((p) => [p.id, p]));

/** The archived post on hcmute-dsc.io.vn, or undefined for an unknown id. */
export const archivePost = (id?: string) => (id ? posts.get(id) : undefined);

export type Milestone = { date: string; title: string; post?: string; url?: string; highlight?: boolean };
export type Year = Omit<(typeof journeyData.years)[number], 'milestones'> & { milestones: Milestone[] };

export const years = journeyData.years as Year[];
export const nextChapter = journeyData.next;
export const yearBySlug = (slug: string) => years.find((y) => y.slug === slug);
export const featuredOf = (year: number): FeaturedPost[] =>
  (archive.featured as Record<string, FeaturedPost[]>)[String(year)] ?? [];
export const statsOf = (year: number) =>
  (archive.stats.byYear as Record<string, { posts: number; photos: number }>)[String(year)] ?? { posts: 0, photos: 0 };

/** Where a milestone points: the archived post, or its own url. */
export const milestoneHref = (m: { post?: string; url?: string }) => archivePost(m.post)?.url ?? m.url;

export const generations = generationsData.terms;
export const nextGeneration = generationsData.next;
export type Generation = (typeof generations)[number];

// Stories: posts from the archive (copied by `npm run import`) and members' own stories in markdown.
export type Story = {
  slug: string;
  kind: 'archive' | 'member';
  kicker: string;
  title: string;
  date: string;
  author: string;
  gen?: string;
  cover: string | null;
  excerpt: string;
  html: string;
  source?: string;
};

const ROOT = process.cwd();

function excerptOf(md: string, n = 200) {
  const text = md
    .replace(/\\([\\[\]_*#>+-])/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_#>`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length <= n ? text : text.slice(0, n).replace(/\s+\S*$/, '') + '…';
}

export async function getStories(): Promise<Story[]> {
  const fromArchive = await Promise.all(
    storiesData.archive.map(async ({ post, slug, kicker }) => {
      const raw = JSON.parse(await fs.readFile(path.join(ROOT, 'content/stories/archive', `${post}.json`), 'utf8'));
      return {
        slug,
        kind: 'archive' as const,
        kicker,
        title: raw.title,
        date: raw.date,
        author: 'HCMUTE DSC',
        cover: raw.cover,
        excerpt: excerptOf(raw.body),
        html: await marked.parse(raw.body, { breaks: true }),
        source: raw.url,
      };
    }),
  );

  const dir = path.join(ROOT, 'content/stories/members');
  const files = (await fs.readdir(dir).catch(() => [] as string[])).filter((f) => f.endsWith('.md'));
  const fromMembers = await Promise.all(
    files.map(async (file) => {
      const { data, content } = matter(await fs.readFile(path.join(dir, file), 'utf8'));
      return {
        slug: file.replace(/\.md$/, ''),
        kind: 'member' as const,
        kicker: data.gen ? `Câu chuyện · ${data.gen}` : 'Câu chuyện thành viên',
        title: String(data.title),
        date: String(data.date),
        author: String(data.author),
        gen: data.gen ? String(data.gen) : undefined,
        cover: data.cover ? String(data.cover) : null,
        excerpt: data.excerpt ? String(data.excerpt) : excerptOf(content),
        html: await marked.parse(content),
      };
    }),
  );

  // Members' stories first: they are what this project is for.
  return [
    ...fromMembers.sort((a, b) => b.date.localeCompare(a.date)),
    ...fromArchive.sort((a, b) => a.date.localeCompare(b.date)),
  ];
}

export async function getStory(slug: string) {
  return (await getStories()).find((s) => s.slug === slug);
}

const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
export function formatDate(iso: string) {
  const [y, m, d] = iso.split('-');
  return `${d}/${MONTHS[Number(m) - 1]}/${y}`;
}

/** Whole years since the founding day. */
export function yearsSinceFounding(now = new Date()) {
  const f = new Date(site.founded);
  let n = now.getFullYear() - f.getFullYear();
  if (now.getMonth() < f.getMonth() || (now.getMonth() === f.getMonth() && now.getDate() < f.getDate())) n--;
  return n;
}
