import type { Metadata } from "next";

export const commonMetadata: Metadata = {
  title: "G.A Design & Code | Web Developer Portfolio",
  description:
    "GentaAmeku's Web Developer portfolio. This site features my skills and a personal story, including my favorite games that inspired my journey as a developer.",
  alternates: {
    canonical: "https://www.genta-ameku.com",
  },
  openGraph: {
    title: "G.A Design & Code | Web Developer Portfolio",
    description:
      "GentaAmeku's Web Developer portfolio. This site features my skills and a personal story, including my favorite games that inspired my journey as a developer.",
    url: "https://www.genta-ameku.com",
    type: "website",
    images: ["https://www.genta-ameku.com/images/presentation.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "G.A Design & Code | Web Developer Portfolio",
    description:
      "GentaAmeku's Web Developer portfolio. This site features my skills and a personal story, including my favorite games that inspired my journey as a developer.",
    images: ["https://www.genta-ameku.com/images/presentation.png"],
  },
};
