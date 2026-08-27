import type { Metadata } from "next";
import { getGlobalSettings } from "@/lib/cms/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import fs from "fs";
import path from "path";
import "./globals.css";

// Ensure logo1.png is synced to public/images
try {
  const src = path.join(process.cwd(), "design", "logo1.png");
  const dest = path.join(process.cwd(), "public", "images", "logo1.png");
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
} catch (e) {
  // safe fallback
}

export const metadata: Metadata = {
  title: "Rebel Rover — Travel Website Theme",
  description: "Explore the world with what you love beautiful natural beauty. Handcrafted travel packages and adventures.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalSettings = await getGlobalSettings();

  return (
    <html lang="en">
      <body className="bg-rebel-white text-rebel-gray-dark antialiased flex flex-col min-h-screen">
        <Header data={globalSettings.header} />
        <div className="flex-1">
          {children}
        </div>
        <Footer data={globalSettings.footer} />
      </body>
    </html>
  );
}
