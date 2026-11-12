import { Reveal } from "./Reveal";

export function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <Reveal className="mb-10 max-w-2xl">
      <div className="section-heading">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[.22em] text-steel">{eyebrow}</p>
        <h2 className="text-3xl font-bold text-slate-950 dark:text-white md:text-4xl">{title}</h2>
        {text && <p className="mt-4 text-slate-600 dark:text-slate-300">{text}</p>}
      </div>
    </Reveal>
  );
}
