export const SITE_ORIGIN = "https://www.genta-ameku.com";
export const SITE_NAME = "G.A Design & Code";
export const AUTHOR_NAME = "Genta Ameku";
export const AUTHOR_JOB_TITLE = "AI Enablement Engineer";
export const AUTHOR_IMAGE = "/images/GentaAmeku.png";
// 同じ人物だと検索エンジンや AI が結び付けられるよう、公開プロフィールを並べる。Zenn や X を作ったら足す
export const AUTHOR_PROFILES = ["https://github.com/GentaAmeku"];
export const DEFAULT_SOCIAL_IMAGE = "/images/presentation.png";

export const siteUrl = (path: string): string =>
  new URL(path, SITE_ORIGIN).toString();
