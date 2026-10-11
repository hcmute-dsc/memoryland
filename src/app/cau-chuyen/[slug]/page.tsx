import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLink, Container, Eyebrow, FormButton } from '@/components/ui';
import { formatDate, getStories, getStory } from '@/lib/content';

export async function generateStaticParams() {
  return (await getStories()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<'/cau-chuyen/[slug]'>): Promise<Metadata> {
  const s = await getStory((await params).slug);
  return s ? { title: s.title, description: s.excerpt } : {};
}

export default async function StoryPage({ params }: PageProps<'/cau-chuyen/[slug]'>) {
  const s = await getStory((await params).slug);
  if (!s) notFound();

  return (
    <article>
      <Container className="max-w-3xl pt-14 sm:pt-20">
        <Link href="/cau-chuyen" className="text-sm text-muted hover:text-orange">← Câu chuyện</Link>
        <Eyebrow className="mt-6">{s.kicker}</Eyebrow>
        <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight text-balance sm:text-5xl">{s.title}</h1>
        <p className="mt-4 text-sm text-muted">
          {s.author}{s.gen ? ` · ${s.gen}` : ''} · {formatDate(s.date)}
        </p>
      </Container>

      {s.cover && (
        <Container className="mt-10 max-w-4xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-paper-2">
            <Image src={s.cover} alt="" fill sizes="(min-width: 1024px) 56rem, 100vw" className="object-cover" priority />
          </div>
        </Container>
      )}

      <Container className="mt-10 max-w-3xl">
        <div className="prose-dsc" dangerouslySetInnerHTML={{ __html: s.html }} />

        {s.source && (
          <p className="mt-10 rounded-2xl bg-paper-2/70 p-4 text-sm text-ink-soft">
            Bài viết được đăng trên fanpage HCMUTE DSC ngày {formatDate(s.date)}.{' '}
            <a href={s.source} className="font-semibold text-orange hover:underline">Xem bài gốc kèm toàn bộ ảnh ↗</a>
          </p>
        )}

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
          <ArrowLink href="/cau-chuyen">Đọc thêm câu chuyện</ArrowLink>
          <FormButton form="story">Kể câu chuyện của bạn</FormButton>
        </div>
      </Container>
    </article>
  );
}
