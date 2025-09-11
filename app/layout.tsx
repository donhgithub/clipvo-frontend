import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import AppSidebar from "../components/layout/AppSidebar";

// 👇 from shadcn sidebar
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../components/ui/sidebar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clipvo",
  description: "AI-powered video creation platform",
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
              <SidebarTrigger />
            </div>

            <main className="flex-1 p-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
