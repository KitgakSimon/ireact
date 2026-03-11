"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About Us", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Opportunities", href: "/opportunities" },
  { name: "Contact us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-white border-b border-slate-200/60 transition-all duration-300 px-6 py-4 md:px-12 shadow-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-14 w-36 overflow-hidden rounded-xl transition-all">
            <Image
              src="/images/logo.png"
              alt="REACT Logo"
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-bold transition-colors hover:text-brand-teal",
                pathname === link.href ? "text-brand-forest underline decoration-2 underline-offset-8" : "text-slate-600"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-4 border-l border-slate-200 pl-8">
            <Link
              href="/login"
              className="text-sm font-bold text-slate-700 transition-all hover:text-brand-forest hover:opacity-80"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-brand-forest px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-brand-dark hover:shadow-lg active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-slate-100 mt-4 -mx-6 rounded-b-3xl shadow-2xl"
          >
            <div className="flex flex-col gap-1 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl text-base font-bold transition-all",
                    pathname === link.href ? "bg-brand-cyan/10 text-brand-forest" : "text-slate-600 hover:bg-slate-50"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  <ArrowRight size={16} className="opacity-50" />
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="flex items-center justify-center p-4 rounded-xl border border-slate-200 text-base font-bold text-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center justify-center p-4 rounded-xl bg-brand-forest text-white text-base font-bold shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Join REACT
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
