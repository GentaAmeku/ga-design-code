import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
export default function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("portfolio-section", className)}>
      <div className="section-content">{children}</div>
    </section>
  );
}
