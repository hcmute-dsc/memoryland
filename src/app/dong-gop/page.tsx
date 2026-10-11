import type { Metadata } from 'next';
import { Container, FormButton, PageHeader } from '@/components/ui';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Góp ký ức',
  description: 'Gửi ảnh, câu chuyện và lời nhắn để cùng lưu giữ hành trình 5 năm của HCMUTE DSC.',
};

const WAYS = [
  {
    form: 'memory' as const,
    icon: '📸',
    title: 'Gửi ảnh & ký ức',
    text: 'Ảnh hoạt động, ảnh sinh hoạt nội bộ, poster, áo CLB, vật phẩm cũ. Ghi lại năm, sự kiện và những ai có trong ảnh nếu bạn nhớ.',
  },
  {
    form: 'story' as const,
    icon: '💬',
    title: 'Chia sẻ câu chuyện',
    text: 'Ngày đầu đến DSC, một sự kiện không như kế hoạch, một người bạn bạn tìm thấy ở đây, hay hiện tại bạn đang ở đâu, làm gì.',
  },
  {
    form: 'letter' as const,
    icon: '💌',
    title: 'Gửi lời nhắn',
    text: 'Vài dòng gửi đến CLB, đến những người đồng đội năm ấy, hoặc đến thế hệ đang tiếp nối DSC hôm nay.',
  },
];

const STEPS = [
  { title: 'Bạn gửi', text: 'Điền form, đính kèm ảnh hoặc link Google Drive. Chọn thế hệ / nhiệm kỳ của bạn.' },
  { title: 'Ban dự án kiểm tra', text: 'Xác minh thông tin, năm và sự kiện; hỏi lại bạn khi cần.' },
  { title: 'Xin phép', text: 'Chỉ công khai khi bạn đồng ý, và cân nhắc cả những người xuất hiện trong ảnh.' },
  { title: 'Xuất bản', text: 'Nội dung được đưa lên trang và lưu vào kho tư liệu chung của CLB.' },
];

export default function ContributePage() {
  return (
    <>
      <PageHeader eyebrow="We were there" title="Góp một ký ức vào hành trình 5 năm">
        Sau 5 năm, ký ức của DSC nằm rải rác ở fanpage, Google Drive của từng nhiệm kỳ, điện thoại và laptop của các thành viên.
        Có thể bạn đã rời CLB từ lâu, nhưng những khoảnh khắc bạn từng tạo nên vẫn là một phần của hành trình này.
      </PageHeader>

      <Container>
        <div className="grid gap-5 md:grid-cols-3">
          {WAYS.map((w) => (
            <article key={w.form} className="reveal flex flex-col rounded-3xl border border-line bg-card p-7">
              <p className="text-4xl" aria-hidden>{w.icon}</p>
              <h2 className="mt-4 text-xl font-bold">{w.title}</h2>
              <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{w.text}</p>
              <div className="mt-6">
                <FormButton form={w.form}>{w.title}</FormButton>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-20">
          <h2 className="text-3xl font-bold tracking-tight">Điều gì xảy ra sau khi bạn gửi?</h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl border-t-4 border-orange bg-card p-6">
                <p className="font-mono text-sm text-orange">0{i + 1}</p>
                <p className="mt-2 font-bold">{s.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20 rounded-3xl bg-paper-2/70 p-8">
          <h2 className="text-xl font-bold">Quyền riêng tư</h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-ink-soft">
            Chúng mình không đăng MSSV, số điện thoại, email hay ảnh sinh hoạt nội bộ khi chưa có sự đồng ý. Bạn có thể yêu cầu gỡ
            nội dung liên quan đến mình bất cứ lúc nào qua email{' '}
            <a href={`mailto:${site.links.email}`} className="font-semibold text-orange hover:underline">{site.links.email}</a> hoặc{' '}
            <a href={site.links.facebook} className="font-semibold text-orange hover:underline">fanpage CLB</a>.
          </p>
          <p className="mt-4 text-sm text-muted">{site.hashtags.join(' ')}</p>
        </section>
      </Container>
    </>
  );
}
