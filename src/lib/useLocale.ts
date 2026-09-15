"use client";
import { usePathname } from "next/navigation";
import type { Locale } from "./locale";
export const useLocale = (): Locale =>
  usePathname().split("/")[1] === "en" ? "en" : "ja";
