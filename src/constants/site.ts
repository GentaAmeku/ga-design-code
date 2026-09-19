export const SITE_ORIGIN = "https://www.genta-ameku.com";
export const SITE_NAME = "G.A Design & Code";
export const AUTHOR_NAME = "Genta Ameku";
export const DEFAULT_SOCIAL_IMAGE = "/images/presentation.png";

export const siteUrl = (path: string): string =>
  new URL(path, SITE_ORIGIN).toString();
