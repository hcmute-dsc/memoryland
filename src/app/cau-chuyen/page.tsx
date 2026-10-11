import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Container, FormButton, PageHeader } from '@/components/ui';
import { formatDate, getStories } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Câu chuyện',
  description: 'Những câu chuyện của HCMUTE DSC qua 5 năm, từ kho lưu trữ và từ chính các thành viên.',
};

export default async function StoriesPage() {
  const stories = await getStories();
  const members = stories.filter((s) => s.kind === 'member');
  const archived = stories.filter((s) => s.kind === 'archive');

  return (
    <>
      <PageHeader eyebrow="Stories" title="Những câu chuyện chưa kể hết">
        Những lá thư CLB từng gửi đi qua các năm, và câu chuyện của chính các thành viên: những đêm chạy deadline, những lần
        sự kiện không như kế hoạch, những người bạn tìm thấy ở DSC.
      </PageHeader>

      <Container>
        <section>
          <h2 className="mb-6 text-sm font-semibold tracking-widest text-muted uppercase">Từ các thành viên</h2>
          {members.length ? (
            <div className="grid gap-5 md:grid-cols-2">
              {members.map((s) => (
                <StoryCard key={s.slug} story={s} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-line bg-card p-8 text-center">
              <p className="font-serif text-xl italic">Câu chuyện đầu tiên có thể là của bạn.</p>
              <p className="mx-auto mt-2 max-w-lg text-sm text-ink-soft">
                Ban dự án đang thu thập câu chuyện từ các thế hệ. Câu chuyện được duyệt và có sự đồng ý của bạn sẽ xuất hiện ở đây.
              </p>
              <div className="mt-6">
                <FormButton form="story">Chia sẻ câu chuyện của bạn</FormButton>
              </div>
            </div>
          )}
        </section>

        <section className="mt-16">
          <h2 className="mb-6 text-sm font-semibold tracking-widest text-muted uppercase">Từ kho lưu trữ</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {archived.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}

function StoryCard({ story: s }: { story: Awaited<ReturnType<typeof getStories>>[number] }) {
  return (
    <Link href={`/cau-chuyen/${s.slug}`} className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-card transition hover:-translate-y-1 hover:shadow-lg">
      {s.cover && (
        <div className="relative aspect-[16/9] overflow-hidden bg-paper-2">
          <Image src={s.cover} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-widest text-orange uppercase">{s.kicker}</p>
        <h3 className="mt-2 text-xl leading-snug font-bold group-hover:text-orange">{s.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">{s.excerpt}</p>
        <p className="mt-auto pt-5 text-xs text-muted">
          {s.author}{s.gen ? ` · ${s.gen}` : ''} · {formatDate(s.date)}
        </p>
      </div>
    </Link>
  );
}
