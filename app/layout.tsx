import type { Metadata } from "next";
import "./globals.css";
import { GetAppProvider } from "./components/GetAppModal";

export const metadata: Metadata = {
  title: "Book a Band — Find Your Sound",
  description:
    "Welcome to the official home of Book a Band — new platform for your favorite bands!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Hides animated elements from first paint (GSAP takes over on
            hydration); the timeout is a failsafe so nothing stays hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(!matchMedia("(prefers-reduced-motion: reduce)").matches){var d=document.documentElement;d.classList.add("anim");setTimeout(function(){d.classList.remove("anim")},4000)}`,
          }}
        />
      </head>
      <body className="antialiased">
        <GetAppProvider>{children}</GetAppProvider>
      </body>
    </html>
  );
}
