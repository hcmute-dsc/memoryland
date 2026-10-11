import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { formatDate, site, type FeaturedPost } from '@/lib/content';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-xs font-semibold tracking-[0.2em] text-orange uppercase ${className}`}>{children}</p>;
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <Container className="reveal pt-14 pb-10 sm:pt-20">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-3 max-w-3xl text-4xl leading-tight font-extrabold tracking-tight text-balance sm:text-5xl">{title}</h1>
      {children && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{children}</div>}
    </Container>
  );
}

export function SectionTitle({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith('http');
  const cls = 'group inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-orange';
  const inner = (
    <>
      {children}
      <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
    </>
  );
  return external ? (
    <a href={href} className={cls}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}

/** A photo from the archive, linking to the original post. */
export function PhotoCard({ post, className = '' }: { post: FeaturedPost; className?: string }) {
  return (
    <a href={post.url} className={`group block overflow-hidden rounded-2xl bg-card ring-1 ring-line/70 ${className}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        {post.photos > 1 && (
          <span className="absolute right-2.5 bottom-2.5 rounded-full bg-black/60 px-2 py-0.5 text-xs font-semibold text-white">
            {post.photos} ảnh
          </span>
        )}
      </div>
      <div className="p-4">
        <time className="text-xs text-muted" dateTime={post.date}>{formatDate(post.date)}</time>
        <p className="mt-1 line-clamp-2 leading-snug font-semibold group-hover:text-orange">{post.title}</p>
      </div>
    </a>
  );
}

/** Opens the matching Google Form when it is configured, otherwise says it is coming. */
export function FormButton({ form, children, variant = 'dark' }: { form: keyof typeof site.forms; children: ReactNode; variant?: 'dark' | 'light' }) {
  const url = site.forms[form];
  const base = 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition';
  const look = variant === 'dark' ? 'bg-ink text-paper hover:bg-orange hover:text-white' : 'bg-white text-ink hover:bg-orange hover:text-white';
  if (!url) {
    return (
      <span className={`${base} cursor-not-allowed bg-paper-2 text-muted`} title="Form đang được chuẩn bị">
        {children} · sắp mở
      </span>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`${base} ${look}`}>
      {children}
    </a>
  );
}
