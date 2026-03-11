import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/common/Preloader";
import { Toaster } from "sonner";
import ChatBot from "@/components/common/ChatBot";

export const metadata: Metadata = {
  title: "REACT Initiative | Rural Empowerment and Climate Technology",
  description: "A youth-led organization advancing climate resilience, humanitarian response, and sustainable development in underserved and rural communities.",
  keywords: ["Climate Resilience", "Sustainability", "Rural Development", "Youth Leadership", "Climate Tech", "Humanitarian Response"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col">
        <Preloader />
        <Toaster position="top-right" richColors />
        <ChatBot />
        {children}
      </body>
    </html>
  );
}
