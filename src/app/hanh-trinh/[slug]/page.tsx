import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Milestones } from '@/components/milestones';
import { ArrowLink, Container, Eyebrow, PhotoCard } from '@/components/ui';
import { featuredOf, generations, site, statsOf, yearBySlug, years } from '@/lib/content';

const clubYears = years.filter((y) => y.year > 0);

export function generateStaticParams() {
  return clubYears.map((y) => ({ slug: y.slug }));
}

export async function generateMetadata({ params }: PageProps<'/hanh-trinh/[slug]'>): Promise<Metadata> {
  const y = yearBySlug((await params).slug);
  return y ? { title: `${y.label}: ${y.title}`, description: y.summary } : {};
}

export default async function YearPage({ params }: PageProps<'/hanh-trinh/[slug]'>) {
  const y = yearBySlug((await params).slug);
  if (!y || y.year === 0) notFound();

  const s = statsOf(y.year);
  const photos = featuredOf(y.year);
  const term = generations[y.year - 1];
  const prev = clubYears.find((x) => x.year === y.year - 1);
  const next = clubYears.find((x) => x.year === y.year + 1);

  return (
    <>
      <Container className="reveal grid gap-10 pt-14 pb-12 sm:pt-20 lg:grid-cols-[1fr_320px]">
        <div>
          <Link href="/hanh-trinh" className="text-sm text-muted hover:text-orange">← Hành trình 5 năm</Link>
          <Eyebrow className="mt-6">{y.label} · {y.range}</Eyebrow>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{y.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{y.summary}</p>
        </div>
        <aside className="self-end rounded-2xl border border-line bg-card p-6">
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-xs text-muted">Bài đăng</dt>
              <dd className="text-3xl font-extrabold">{s.posts}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Ảnh</dt>
              <dd className="text-3xl font-extrabold">{s.photos}</dd>
            </div>
          </dl>
          {term && (
            <p className="mt-5 border-t border-line pt-4 text-sm text-ink-soft">
              Nhiệm kỳ <Link href={`/the-he#${term.slug}`} className="font-semibold text-violet hover:underline">{term.term} · {term.gen}</Link>
              <br />
              <span className="text-muted">{term.board[0].role.split(' · ')[0]}: {term.board[0].name}</span>
            </p>
          )}
        </aside>
      </Container>

      <Container className="grid gap-12 lg:grid-cols-[320px_1fr]">
        <section>
          <h2 className="mb-6 text-sm font-semibold tracking-widest text-muted uppercase">Dấu mốc</h2>
          <Milestones items={y.milestones} />
        </section>
        <section>
          <h2 className="mb-6 text-sm font-semibold tracking-widest text-muted uppercase">Khoảnh khắc</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {photos.map((p) => (
              <PhotoCard key={p.id} post={p} />
            ))}
          </div>
          <div className="mt-6">
            <ArrowLink href={site.links.gallery}>Xem tất cả ảnh trong Thư viện ảnh của CLB</ArrowLink>
          </div>
        </section>
      </Container>

      <Container className="mt-16">
        <nav className="grid gap-4 border-t border-line pt-8 sm:grid-cols-2" aria-label="Năm khác">
          {prev ? (
            <Link href={`/hanh-trinh/${prev.slug}`} className="rounded-2xl border border-line p-5 hover:border-orange">
              <span className="text-xs text-muted">← {prev.label}</span>
              <span className="mt-1 block font-semibold">{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/hanh-trinh/${next.slug}`} className="rounded-2xl border border-line p-5 text-right hover:border-orange">
              <span className="text-xs text-muted">{next.label} →</span>
              <span className="mt-1 block font-semibold">{next.title}</span>
            </Link>
          ) : (
            <Link href="/the-he" className="rounded-2xl border border-line p-5 text-right hover:border-orange">
              <span className="text-xs text-muted">Tiếp theo →</span>
              <span className="mt-1 block font-semibold">Gặp các thế hệ DSC</span>
            </Link>
          )}
        </nav>
      </Container>
    </>
  );
}
