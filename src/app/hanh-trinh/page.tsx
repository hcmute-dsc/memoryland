import type { Metadata } from 'next';
import Image from 'next/image';
import { Milestones } from '@/components/milestones';
import { ArrowLink, Container, PageHeader } from '@/components/ui';
import { archivePost, nextChapter, statsOf, yearCover, years } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Hành trình',
  description: 'Hành trình 5 năm của HCMUTE DSC qua từng năm hoạt động, từ những ngày đầu năm 2021 đến hôm nay.',
};

export default function JourneyPage() {
  return (
    <>
      <PageHeader eyebrow="The Journey" title="Hành trình 5 năm">
        Mỗi năm hoạt động tính từ ngày thành lập 20/07. Chọn một năm để xem các dấu mốc, hình ảnh và bài viết gốc trong kho lưu trữ.
      </PageHeader>

      <Container>
        <div className="space-y-6">
          {years.map((y) => {
            const cover = yearCover(y.year);
            const s = statsOf(y.year);
            return (
              <article key={y.slug} className="reveal grid gap-6 rounded-3xl border border-line bg-card p-6 sm:p-8 lg:grid-cols-[200px_1fr_320px]">
                <div>
                  <p className="text-5xl font-extrabold tracking-tight text-orange">{y.year === 0 ? '00' : `0${y.year}`}</p>
                  <p className="mt-2 font-semibold">{y.label}</p>
                  <p className="text-sm text-muted">{y.range}</p>
                  {s.posts > 0 && <p className="mt-3 text-xs text-muted">{s.posts} bài đăng · {s.photos} ảnh</p>}
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{y.title}</h2>
                  <p className="mt-3 leading-relaxed text-ink-soft">{y.summary}</p>
                  <div className="mt-6">
                    <Milestones items={y.milestones.slice(0, 5)} />
                  </div>
                  {y.year > 0 && (
                    <div className="mt-6">
                      <ArrowLink href={`/hanh-trinh/${y.slug}`}>Xem trọn {y.label.toLowerCase()}</ArrowLink>
                    </div>
                  )}
                </div>
                {cover && (
                  <figure className="self-start lg:order-none">
                    <a href={cover.url} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-paper-2">
                      <Image src={cover.cover} alt={cover.title} fill sizes="(min-width: 1024px) 320px, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                    </a>
                    <figcaption className="mt-2 line-clamp-2 text-xs text-muted">{cover.title}</figcaption>
                  </figure>
                )}
              </article>
            );
          })}

          <article className="rounded-3xl border border-dashed border-violet/60 bg-violet/5 p-6 sm:p-8">
            <p className="text-sm font-semibold text-violet">{nextChapter.label}</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">{nextChapter.title}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{nextChapter.summary}</p>
            <div className="mt-4">
              <ArrowLink href={archivePost(nextChapter.post)?.url ?? '/'}>Thông tin tuyển Gen 7</ArrowLink>
            </div>
          </article>
        </div>
      </Container>
    </>
  );
}
