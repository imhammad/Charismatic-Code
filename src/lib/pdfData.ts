export interface PdfGuide {
  slug: string;
  title: string;
  description: string;
  tagName: string; // Kit tag name (e.g. "pdf-connect")
  tagId: string;   // Kit tag ID — find this in Kit dashboard > Tags
  emoji: string;
  accentColor: string;
  downloadlink: string; // Tailwind color class suffix, e.g. "rose", "sky", "amber"
}

export const pdfGuides: PdfGuide[] = [
  {
    slug: "src\app\pdf\Office_Hour_Starter_Pack_freebie.pdf",
    title: "The Professor Office Hour Starter Pack",
    description:
      "A practical guide to building deeper, more meaningful relationships, personally and professionally. Includes 3 conversation frameworks you can use immediately.",
    tagName: "pdf-office-starterpack",
    tagId: "19783260",
    emoji: "🤝",
    accentColor: "rose",
    downloadlink: "https://drive.google.com/file/d/1arL7Bn_h5QJ4_7Zcbv2B5ncLcJLqd1bD/view?usp=sharing"
  },
  // {    // extra guides coming soon, just need to create them and upload to drive, then add the links here
  //   slug: "productivity",
  //   title: "Deep Work in 30 Days",
  //   description:
  //     "A no-fluff system for reclaiming your focus and doing your best work every day, even when life gets noisy.",
  //   tagName: "pdf-productivity",
  //   tagId: "REPLACE_WITH_KIT_TAG_ID_2",
  //   emoji: "⚡",
  //   accentColor: "amber",
  //   downloadlink: ""
  // },
  // {
  //   slug: "clarity",
  //   title: "The Clarity Method",
  //   description:
  //     "Stop overthinking. A step-by-step workbook for making confident decisions faster, with less second-guessing.",
  //   tagName: "pdf-clarity",
  //   tagId: "REPLACE_WITH_KIT_TAG_ID_3",
  //   emoji: "🔭",
  //   accentColor: "sky",
  //   downloadlink: ""
  // },
];

export function getPdfBySlug(slug: string): PdfGuide | undefined {
  return pdfGuides.find((p) => p.slug === slug);
}
