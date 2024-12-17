import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import InteractiveGrid from "@/components/InteractiveGrid";
import Header from "@/components/Header";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saraansh Wadkar",
  description: "Personal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} antialiased relative bg-gray-900 text-white dark:bg-gray-800`}>
        {/* Interactive Grid */}
        <InteractiveGrid />
        <Header />
        {/* Content */}
        <main className="relative mt-20 dark:text-white text-gray-700">
          {children}
          </main>
      </body>
    </html>
  );
}
