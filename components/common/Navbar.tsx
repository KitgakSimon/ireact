"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, User as UserIcon, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSession, logout } from "@/lib/actions/auth";

const navLinks = [
  { name: "About Us", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Research Reports", href: "/research-reports" },
  { 
    name: "Blog", 
    href: "/blog",
    subLinks: [
      { name: "All Posts", href: "/blog" },
      { name: "Stories", href: "/blog?section=Story" },
      { name: "Strategies", href: "/blog?section=Strategy" },
      { name: "Insights", href: "/blog?section=Insight" },
    ]
  },
  { name: "Opportunities", href: "/opportunities" },
  { name: "Contact us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const s = await getSession();
      setSession(s);
    };
    fetchSession();
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    setSession(null);
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200/60 transition-all duration-300 px-6 py-4 md:px-12 shadow-sm">
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
            link.subLinks ? (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => setBlogDropdownOpen(true)}
                onMouseLeave={() => setBlogDropdownOpen(false)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1.5 text-sm font-bold transition-all hover:text-brand-teal",
                    pathname.startsWith(link.href) ? "text-brand-forest underline decoration-2 underline-offset-8" : "text-slate-600"
                  )}
                >
                  {link.name}
                  <ChevronDown size={14} className={cn("transition-transform duration-200", blogDropdownOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {blogDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-1/2 -translate-x-1/2 mt-4 w-52 overflow-hidden rounded-2xl bg-white p-2 shadow-2xl border border-slate-100/50 backdrop-blur-xl"
                    >
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setBlogDropdownOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-xl p-3 text-xs font-bold transition-all hover:bg-slate-50",
                            pathname === sub.href ? "text-brand-forest bg-brand-forest/5" : "text-slate-600"
                          )}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
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
            )
          ))}

          <div className="flex items-center gap-4 border-l border-slate-200 pl-8">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 transition-all hover:bg-slate-100"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-forest text-white">
                    <UserIcon size={14} />
                  </div>
                  <span className="max-w-[100px] truncate">{session.name}</span>
                  <ChevronDown size={14} className={cn("transition-transform", userDropdownOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl bg-white p-2 shadow-2xl border border-slate-100"
                    >
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 rounded-xl p-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <LayoutDashboard size={18} className="text-brand-cyan" />
                        Admin Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl p-3 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
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
              </>
            )}
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
                <div key={link.name}>
                  {link.subLinks ? (
                    <div className="flex flex-col">
                      <button
                        onClick={() => setMobileBlogOpen(!mobileBlogOpen)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-xl text-base font-bold transition-all",
                          pathname.startsWith(link.href) ? "bg-brand-cyan/10 text-brand-forest" : "text-slate-600 hover:bg-slate-50"
                        )}
                      >
                        {link.name}
                        <ChevronDown size={18} className={cn("transition-transform duration-200", mobileBlogOpen && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {mobileBlogOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col gap-1 pl-6 pr-4 pb-2"
                          >
                            {link.subLinks.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className={cn(
                                  "flex items-center justify-between p-3 rounded-lg text-sm font-bold transition-all",
                                  pathname === sub.href ? "text-brand-forest" : "text-slate-500 hover:text-brand-forest"
                                )}
                                onClick={() => setIsOpen(false)}
                              >
                                {sub.name}
                                <ArrowRight size={14} className="opacity-30" />
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
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
                  )}
                </div>
              ))}
              
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                {session ? (
                  <>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 text-slate-700">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-forest text-white">
                        <UserIcon size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-black">{session.name}</p>
                        <p className="text-xs text-slate-500">{session.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/admin"
                      className="flex items-center justify-center p-4 rounded-xl border border-slate-200 text-base font-bold text-slate-700 gap-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboard size={20} className="text-brand-cyan" />
                      Admin Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center p-4 rounded-xl bg-rose-50 text-rose-600 text-base font-bold gap-2"
                    >
                      <LogOut size={20} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
