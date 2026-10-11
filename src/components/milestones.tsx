import { milestoneHref, type Milestone } from '@/lib/content';

/** Vertical timeline of a year's milestones; each one links to its post when there is one. */
export function Milestones({ items }: { items: Milestone[] }) {
  return (
    <ol className="relative border-l-2 border-line pl-6">
      {items.map((m) => {
        const href = milestoneHref(m);
        const title = <span className={m.highlight ? 'font-bold text-orange' : 'font-semibold'}>{m.title}</span>;
        return (
          <li key={m.date + m.title} className="relative pb-6 last:pb-0">
            <span
              aria-hidden
              className={`absolute top-1.5 -left-[33px] size-4 rounded-full border-2 border-paper ${m.highlight ? 'bg-orange ring-4 ring-orange/20' : 'bg-ink'}`}
            />
            <p className="font-mono text-xs tracking-wide text-muted">{m.date}</p>
            <p className="mt-0.5 leading-snug">
              {href ? (
                <a href={href} className="hover:text-orange hover:underline">
                  {title}
                </a>
              ) : (
                title
              )}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
