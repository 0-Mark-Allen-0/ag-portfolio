import type { Metadata } from "next";
import { Architects_Daughter, Patrick_Hand } from "next/font/google";
import "./globals.css";

/*
 * Self-hosting fonts via next/font eliminates the Google Fonts @import
 * network round-trip.  The variable names here wire directly into the
 * @theme tokens in globals.css:
 *   --font-family-display → font-display Tailwind utility
 *   --font-family-body    → font-body    Tailwind utility
 */
const architectsDaughter = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-family-display",
  display: "swap",
});

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-family-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adharsh Portfolio",
  description:
    "Designer working across 3D, interactive media, and systems design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${architectsDaughter.variable} ${patrickHand.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
