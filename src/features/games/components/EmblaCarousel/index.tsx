"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import type { SlideItem } from "@/features/games/types";
import { cn } from "@/lib/utils";

type EmblaCarouselProps = {
  slides: SlideItem[];
  direction?: "forward" | "backward";
};

export function EmblaCarousel({
  slides = [],
  direction = "forward",
}: EmblaCarouselProps) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, startIndex: direction === "forward" ? 1 : slides.length - 2 },
    [
      AutoScroll({
        speed: 0.6,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        startDelay: 0,
        direction,
      }),
    ],
  );

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {slides.map((slide) => (
            <div
              key={slide.title}
              className="flex-[0_0_75%] md:flex-[0_0_30%] min-w-0 mx-4 py-3 md:mx-4"
            >
              <Image
                src={slide.src}
                width={900}
                height={600}
                sizes="(max-width: 768px) 265px, 240px"
                loading="lazy"
                alt="slide image"
                className={cn(
                  "w-full aspect-[3/2] object-cover shadow-lg rounded-xl",
                  "transition-transform duration-300",
                  slide.youtubeId
                    ? "hover:scale-110 cursor-pointer active:scale-110"
                    : "",
                  // slide.youtubeId ? "hover:scale-110" : "",
                )}
              />
            </div>
          ))}
        </div>
      </div>
      {/* 左側のフェード */}
      <div className="absolute left-0 top-0 w-1 md:w-2 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      {/* 右側のフェード */}
      <div className="absolute right-0 top-0 w-1 md:w-2 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
    </div>
  );
}
