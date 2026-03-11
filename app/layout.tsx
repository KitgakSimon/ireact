import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Preloader from "@/components/common/Preloader";

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
        <Navbar />
        <main className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
