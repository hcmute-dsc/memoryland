import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLink, Container, FormButton, PageHeader } from '@/components/ui';
import { archivePost, generations, nextGeneration } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Các thế hệ',
  description: 'Các nhiệm kỳ Ban Chủ nhiệm và các thế hệ thành viên đã cùng xây dựng HCMUTE DSC.',
};

export default function GenerationsPage() {
  return (
    <>
      <PageHeader eyebrow="The People" title="Những thế hệ tạo nên DSC">
        Mỗi nhiệm kỳ một màu sắc, mỗi Gen một câu chuyện. Thông tin dưới đây được tổng hợp từ các bài giới thiệu Ban Chủ nhiệm
        trên fanpage. Nếu bạn thuộc một thế hệ còn thiếu thông tin, hãy giúp chúng mình bổ sung.
      </PageHeader>

      <Container className="space-y-6">
        {generations.map((g, i) => {
          const source = archivePost(g.post);
          return (
            <article id={g.slug} key={g.slug} className="reveal scroll-mt-24 overflow-hidden rounded-3xl border border-line bg-card">
              <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[260px_1fr]">
                <div>
                  <p className="font-mono text-xs tracking-widest text-muted">NHIỆM KỲ {String(i + 1).padStart(2, '0')}</p>
                  <p className="mt-2 text-3xl font-extrabold tracking-tight">{g.term}</p>
                  <p className="mt-1 font-semibold text-violet">{g.gen}</p>
                  <p className="mt-1 text-sm text-muted">{g.club}</p>
                  {!g.verified && (
                    <p className="mt-4 inline-block rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">Đang chờ bổ sung thông tin</p>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{g.name}</h2>
                  <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">{g.intro}</p>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {g.board.map((m) => (
                      <li key={m.role + m.name} className="flex items-center gap-3 rounded-2xl bg-paper-2/60 p-3">
                        <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-paper">
                          {m.name.split(' ').at(-1)?.[0]}
                        </span>
                        <span>
                          <span className="block leading-tight font-semibold">{m.name}</span>
                          <span className="text-xs text-muted">{m.role}</span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {g.highlights.map((h) => (
                      <span key={h} className="rounded-full border border-line px-3 py-1 text-xs text-ink-soft">{h}</span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    {g.recruitment.map((r) => (
                      <a key={r.label} href={archivePost(r.post)?.url} className="text-muted hover:text-orange">Tuyển {r.label} ↗</a>
                    ))}
                    {source && <ArrowLink href={source.url}>Bài giới thiệu nhiệm kỳ</ArrowLink>}
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        <article className="rounded-3xl border border-dashed border-violet/60 bg-violet/5 p-6 sm:p-8">
          <p className="font-semibold text-violet">{nextGeneration.gen} · {nextGeneration.term}</p>
          <p className="mt-2 max-w-2xl text-ink-soft">{nextGeneration.text}</p>
          <div className="mt-4">
            <ArrowLink href={archivePost(nextGeneration.post)?.url ?? '/'}>Tuyển thành viên Gen 7</ArrowLink>
          </div>
        </article>

        <div className="rounded-3xl bg-ink p-8 text-paper dark:bg-paper-2 dark:text-ink">
          <h2 className="text-2xl font-bold">Bạn thấy thiếu ai đó?</h2>
          <p className="mt-2 max-w-2xl text-paper/75 dark:text-ink-soft">
            Danh sách đầy đủ Ban Chủ nhiệm, ảnh tập thể và những gương mặt tiêu biểu của từng thế hệ cần chính các bạn xác nhận. Gửi
            thông tin hoặc ảnh, Ban dự án sẽ kiểm tra rồi cập nhật lên trang.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <FormButton form="memory" variant="light">Bổ sung thông tin thế hệ</FormButton>
            <Link href="/cau-chuyen" className="rounded-full px-5 py-3 text-sm font-semibold underline-offset-4 hover:underline">Đọc câu chuyện các thế hệ</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
