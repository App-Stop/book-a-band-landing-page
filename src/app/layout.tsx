import type { Metadata } from "next";
import { Great_Vibes, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Book a Band — Find Your Sound",
  description:
    "Book verified live bands for weddings, festivals, and events. AI matching, transparent packages, and escrow protection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${greatVibes.variable} h-full`}>
      <body className="min-h-full bg-black font-sans text-white antialiased">
        {children}
      </body>
    </html>
  );
}
