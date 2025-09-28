import { GAMES } from "@/features/games/constants/data";
import type { SlideItem } from "@/features/games/types";

export const FIRST_SLIDES: SlideItem[] = GAMES.slice(0, 6);

export const SECOND_SLIDES: SlideItem[] = GAMES.slice(6, 12);
