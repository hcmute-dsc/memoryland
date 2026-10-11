import type { Metadata } from 'next';
import { Container, FormButton, PageHeader } from '@/components/ui';
import { formatDate, letters } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Lời nhắn',
  description: 'Những lá thư các thế hệ thành viên gửi đến HCMUTE DSC nhân dịp 5 năm.',
};

type Letter = { name: string; gen?: string; role?: string; date: string; message: string };

export default function LettersPage() {
  const list = letters.letters as Letter[];
  return (
    <>
      <PageHeader eyebrow="Letters to DSC" title="Những lá thư gửi DSC">
        Một lời cảm ơn, một kỷ niệm, một điều muốn nhắn đến thế hệ đang tiếp nối. Mời các thế hệ thành viên để lại lời nhắn nhân
        dịp 5 năm.
      </PageHeader>

      <Container className="grid gap-10 lg:grid-cols-[360px_1fr]">
        <aside className="h-fit rounded-3xl bg-ink p-7 text-paper lg:sticky lg:top-24 dark:bg-paper-2 dark:text-ink">
          <p className="text-xs font-semibold tracking-[0.2em] text-orange uppercase">Gợi ý cho lá thư của bạn</p>
          <ol className="mt-5 space-y-4">
            {letters.prompts.map((q, i) => (
              <li key={q} className="flex gap-3">
                <span className="font-mono text-sm text-orange">0{i + 1}</span>
                <span className="font-serif leading-relaxed italic">{q}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-paper/70 dark:text-ink-soft">
            Không cần hoàn hảo. Những câu chuyện chân thật mới là điều đáng giữ lại.
          </p>
          <div className="mt-6">
            <FormButton form="letter" variant="light">Viết lời nhắn</FormButton>
          </div>
        </aside>

        <section>
          {list.length ? (
            <div className="columns-1 gap-5 sm:columns-2">
              {list.map((l) => (
                <figure key={l.name + l.date} className="mb-5 break-inside-avoid rounded-3xl border border-line bg-card p-6">
                  <blockquote className="font-serif text-lg leading-relaxed text-ink-soft italic">“{l.message}”</blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-semibold">{l.name}</span>
                    {(l.gen || l.role) && <span className="text-muted"> · {[l.gen, l.role].filter(Boolean).join(' · ')}</span>}
                    <span className="block text-xs text-muted">{formatDate(l.date)}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="flex h-full min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-line bg-card p-10 text-center">
              <p className="text-5xl" aria-hidden>💌</p>
              <p className="mt-4 font-serif text-2xl italic">Hộp thư đang chờ lá thư đầu tiên</p>
              <p className="mt-2 max-w-md text-sm text-ink-soft">
                Lời nhắn được Ban dự án duyệt và chỉ công khai khi người gửi đồng ý.
              </p>
            </div>
          )}
        </section>
      </Container>
    </>
  );
}
