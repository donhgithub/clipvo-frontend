import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import MobileSidebarToggle from "../components/layout/MobileSidebarToggle";

import AppSidebar from "../components/layout/AppSidebar";

// 👇 from shadcn sidebar
import { SidebarProvider, SidebarInset} from "../components/ui/sidebar";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ✅ Wrap everything in SidebarProvider */}
        <SidebarProvider>
          {/* Left sidebar */}
          <AppSidebar />

          {/* Right side (content area). SidebarInset is the shadcn wrapper that accounts for the sidebar width */}
          <SidebarInset className="min-h-screen flex flex-col">
            {/* Mobile hamburger trigger */}
            <div className="p-2 lg:hidden">
              <MobileSidebarToggle />
            </div>

            <main className="flex-1 p-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
