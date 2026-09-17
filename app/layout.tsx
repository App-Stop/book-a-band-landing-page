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
    <html lang="en">
      <body className="antialiased">
        <GetAppProvider>{children}</GetAppProvider>
      </body>
    </html>
  );
}
