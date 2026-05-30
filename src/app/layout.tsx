import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Free Guides | The Charismatic Code",
  description:
    "Download free, practical guides on connection, productivity, and clarity. No fluff — just tools that work.",
  openGraph: {
    title: "Free Guides | The Charismatic Code",
    description: "Practical guides delivered straight to your inbox.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-stone-950 text-stone-100 antialiased font-body" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}