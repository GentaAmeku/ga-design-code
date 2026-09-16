import type { ReactNode } from "react";
import { FadeIn, FadeInWithStagger } from "@/lib/motion";
import { cn } from "@/lib/utils";
export default function Section({
  children,
  className,
  id,
  animate = true,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  animate?: boolean;
}) {
  return (
    <section id={id} className={cn("portfolio-section", className)}>
      <div className="section-content">
        {animate ? (
          <FadeInWithStagger>
            <FadeIn>{children}</FadeIn>
          </FadeInWithStagger>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
