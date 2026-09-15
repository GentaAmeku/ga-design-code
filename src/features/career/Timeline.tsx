import { copy } from "@/features/content/copy";
import type { Locale } from "@/lib/locale";
export default function Timeline({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <ol className="career-timeline">
      {[
        { when: t.now, role: t.currentRole },
        { when: t.past, role: t.pastRole },
      ].map((item) => (
        <li key={item.when}>
          <span className="career-period">{item.when}</span>
          <h3 className="font-semibold text-lg">{item.role}</h3>
        </li>
      ))}
    </ol>
  );
}
