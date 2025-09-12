import TopNav from "@/components/TopNav";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AuthButton from "@/components/AuthButton";
import { getAuth } from "@/lib/auth";  // server helper
import SiteFooter from "@/components/SiteFooter";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clipvo",
  description: "AI-powered video creation platform",
  manifest: "/manifest.json",
  icons: [{ rel: "apple-touch-icon", url: "/icons/icon-192.png" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111827",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isSignedIn } = await getAuth(); // ✅ dynamic Sign in/Sign out

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <header className="border-b px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="font-semibold">Clipvo</a>
            <TopNav isSignedIn={isSignedIn} />
          </div>
          <AuthButton isSignedIn={isSignedIn} />
        </header>

        <main className="p-6">{children}</main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  );
}
