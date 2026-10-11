import Image from 'next/image';
import Link from 'next/link';
import { ArrowLink, Container, Eyebrow, FormButton, PhotoCard, SectionTitle } from '@/components/ui';
import { featuredOf, generations, site, stats, statsOf, years } from '@/lib/content';

const NUMBERS = [
  { value: '5', label: 'năm hoạt động' },
  { value: `${generations.length}`, label: 'nhiệm kỳ Ban Chủ nhiệm' },
  { value: '6', label: 'thế hệ thành viên' },
  { value: `${stats.posts}`, label: 'bài đăng được lưu trữ' },
  { value: `${stats.photos}`, label: 'tấm ảnh hoạt động' },
  { value: `${stats.events}`, label: 'sự kiện, workshop & sinh hoạt' },
];

export default function Home() {
  const clubYears = years.filter((y) => y.year > 0);
  const collage = [featuredOf(2)[4], featuredOf(3)[5], featuredOf(1)[3], featuredOf(5)[2]].filter(Boolean);
  // [year, position in that year's featured list]: one event each, not the board posts
  const memories = ([[1, 0], [1, 6], [2, 4], [2, 6], [3, 2], [3, 7], [4, 3], [5, 2]] as const)
    .map(([y, i]) => featuredOf(y)[i])
    .filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Container className="grid items-center gap-12 pt-14 pb-20 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
          <div className="reveal">
            <Eyebrow>HCMUTE Developer Student Club · 2021 – 2026</Eyebrow>
            <h1 className="mt-5 text-5xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Năm năm.
              <br />
              Một cộng đồng.
              <br />
              <span className="text-orange">Vô vàn ký ức.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Từ ngày 20/07/2021, CLB Sinh viên Lập trình HCMUTE đã đi qua 5 năm, nhiều thế hệ và hàng trăm hoạt động. Đây là nơi
              lưu giữ hành trình ấy, và là nơi mỗi người từng ở DSC tìm lại một phần câu chuyện của mình.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/hanh-trinh" className="rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink">
                Khám phá hành trình
              </Link>
              <Link href="/dong-gop" className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold transition hover:border-ink">
                Góp một ký ức
              </Link>
            </div>
            <p className="mt-10 font-mono text-sm tracking-widest text-muted">20.07.2021 — 20.07.2026</p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none" aria-hidden>
            <span className="pointer-events-none absolute -top-10 -right-4 text-[14rem] leading-none font-extrabold text-orange/10 select-none sm:text-[18rem]">
              05
            </span>
            {collage.map((p, i) => (
              <div
                key={p.id}
                className={[
                  'absolute w-[52%] rounded-sm bg-card p-2 pb-7 shadow-xl ring-1 ring-line/60',
                  ['top-[4%] left-[2%] -rotate-6', 'top-[0%] right-[2%] rotate-3', 'bottom-[6%] left-[10%] rotate-2', 'right-[4%] bottom-[2%] -rotate-3'][i],
                ].join(' ')}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                  <Image src={p.cover} alt="" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" priority={i < 2} />
                </div>
                <p className="mt-2 truncate font-serif text-xs text-ink-soft italic">{p.title}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Numbers */}
      <section className="border-y border-line bg-card/60">
        <Container className="grid grid-cols-2 gap-y-8 py-10 sm:grid-cols-3 lg:grid-cols-6">
          {NUMBERS.map((n) => (
            <div key={n.label} className="px-2">
              <p className="text-4xl font-extrabold tracking-tight text-ink">{n.value}</p>
              <p className="mt-1 text-sm text-muted">{n.label}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Journey */}
      <Container className="py-20">
        <SectionTitle eyebrow="Hành trình" title="5 năm, 5 chặng đường" action={<ArrowLink href="/hanh-trinh">Xem toàn bộ hành trình</ArrowLink>} />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {clubYears.map((y) => (
            <li key={y.slug}>
              <Link href={`/hanh-trinh/${y.slug}`} className="group flex h-full flex-col rounded-2xl border border-line bg-card p-5 transition hover:-translate-y-1 hover:border-orange hover:shadow-lg">
                <span className="text-sm font-semibold text-orange">{y.label}</span>
                <span className="mt-1 text-xs text-muted">{y.range}</span>
                <span className="mt-4 text-lg leading-snug font-bold group-hover:text-orange">{y.title}</span>
                <span className="mt-auto pt-6 text-xs text-muted">
                  {statsOf(y.year).posts} bài đăng · {statsOf(y.year).photos} ảnh
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Container>

      {/* Motto */}
      <section className="bg-ink text-paper dark:bg-paper-2 dark:text-ink">
        <Container className="py-20 text-center">
          <p className="mx-auto max-w-3xl font-serif text-2xl leading-relaxed italic sm:text-3xl">“{site.motto}”</p>
          <p className="mt-6 text-sm tracking-widest text-paper/60 uppercase dark:text-muted">We came as strangers · We grew as a community · We remain part of the story</p>
        </Container>
      </section>

      {/* Memories */}
      <Container className="py-20">
        <SectionTitle eyebrow="Khoảnh khắc" title="Những ngày chúng ta từng có" action={<ArrowLink href={site.links.gallery}>Thư viện ảnh đầy đủ</ArrowLink>} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {memories.map((p) => (
            <PhotoCard key={p.id} post={p} />
          ))}
        </div>
      </Container>

      {/* People */}
      <Container className="py-10">
        <SectionTitle eyebrow="Con người" title="Những thế hệ dẫn dắt DSC" action={<ArrowLink href="/the-he">Gặp các thế hệ</ArrowLink>} />
        <ol className="relative grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-5">
          {generations.map((g) => (
            <li key={g.slug} className="bg-card p-5">
              <p className="text-sm font-semibold text-violet">{g.gen}</p>
              <p className="text-xs text-muted">{g.term}</p>
              <p className="mt-3 font-bold">{g.board[0].name}</p>
              <p className="text-xs text-muted">{g.board[0].role.split(' · ')[0]}</p>
            </li>
          ))}
        </ol>
      </Container>

      {/* Contribute */}
      <Container className="py-20">
        <div className="relative overflow-hidden rounded-3xl bg-orange px-6 py-14 text-white sm:px-12">
          <span aria-hidden className="pointer-events-none absolute -right-6 -bottom-16 text-[12rem] leading-none font-extrabold text-white/10 select-none">#WeWereThere</span>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase opacity-80">Memory Collection</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">Bạn đã ở đó. Hãy giúp chúng mình kể lại.</h2>
          <p className="mt-4 max-w-2xl text-white/85">
            Một tấm ảnh trong điện thoại cũ, một kỷ niệm sau buổi sinh hoạt, một lời muốn gửi đến những người đồng đội năm ấy. Mỗi
            đóng góp giúp hành trình 5 năm đầy đủ hơn.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <FormButton form="memory" variant="light">Gửi ảnh & ký ức</FormButton>
            <FormButton form="story" variant="light">Chia sẻ câu chuyện</FormButton>
            <FormButton form="letter" variant="light">Gửi lời nhắn</FormButton>
          </div>
        </div>
      </Container>
    </>
  );
}
