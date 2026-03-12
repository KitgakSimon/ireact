"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ArrowLeft,
  Bell
} from "lucide-react";
import Logo from "@/components/common/Logo";
import { cn } from "@/lib/utils";

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface AdminNavProps {
  sidebarLinks: SidebarLink[];
  session: {
    name: string | null;
    role: string | null;
  };
  children: React.ReactNode;
}

export default function AdminNav({ sidebarLinks, session, children }: AdminNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-slate-200 z-50 transition-transform duration-300 lg:translate-x-0 hidden lg:block"
      )}>
        <div className="p-8 border-b border-slate-100 mb-8">
           <Logo isDark className="scale-110 origin-left" />
           <p className="text-[10px] font-black uppercase tracking-widest text-brand-cyan mt-2">Administrative Portal</p>
        </div>

        <nav className="px-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all",
                pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href))
                  ? "bg-brand-forest/10 text-brand-forest" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-brand-forest"
              )}
            >
              <span className={cn(
                "transition-colors",
                pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href))
                  ? "text-brand-forest" 
                  : "text-slate-400"
              )}>
                {link.icon}
              </span>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 left-8 right-8">
           <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-brand-forest transition-colors"
           >
             <ArrowLeft size={16} /> Back to Site
           </Link>
        </div>
      </aside>

      {/* Mobile Sidebar (Animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-slate-200 z-50 lg:hidden overflow-y-auto"
          >
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
               <div>
                 <Logo isDark className="scale-110 origin-left" />
                 <p className="text-[10px] font-black uppercase tracking-widest text-brand-cyan mt-2">Administrative Portal</p>
               </div>
               <button 
                 onClick={() => setIsOpen(false)}
                 className="p-2 text-slate-400 hover:text-slate-600"
               >
                 <X size={24} />
               </button>
            </div>

            <nav className="px-4 py-8 space-y-2">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all",
                    pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href))
                      ? "bg-brand-forest/10 text-brand-forest" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-brand-forest"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={cn(
                    "transition-colors",
                    pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href))
                      ? "text-brand-forest" 
                      : "text-slate-400"
                  )}>
                    {link.icon}
                  </span>
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="p-8 mt-auto">
               <Link 
                href="/" 
                className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-brand-forest transition-colors"
               >
                 <ArrowLeft size={16} /> Back to Site
               </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 lg:pl-72 flex flex-col min-h-screen w-full">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-4 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsOpen(true)}
               className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl lg:hidden"
             >
               <Menu size={24} />
             </button>
             <h1 className="text-lg font-black text-slate-900 hidden sm:block">Admin Dashboard</h1>
             <h1 className="text-base font-black text-slate-900 sm:hidden">Admin</h1>
           </div>
           
           <div className="flex items-center gap-3 sm:gap-6">
              <button className="relative p-2 text-slate-400 hover:text-brand-forest transition-colors">
                 <Bell size={20} />
                 <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 border-2 border-white"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-3 sm:pl-6 border-l border-slate-200">
                 <div className="text-right hidden sm:block">
                    <p className="text-sm font-black text-slate-900">{session.name}</p>
                    <p className="text-[10px] font-bold text-brand-cyan uppercase tracking-wider">{session.role}</p>
                 </div>
                 <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-brand-forest text-white flex items-center justify-center font-bold text-sm sm:text-base">
                    {session.name?.charAt(0)}
                 </div>
              </div>
           </div>
        </header>

        <div className="flex-1 p-4 sm:p-8">
          {children}
        </div>

        {/* Admin Footer */}
        <footer className="mt-auto px-8 py-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between bg-white/50 gap-4">
           <div className="flex items-center gap-3">
              <Logo className="h-4 w-auto grayscale opacity-50" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administrative Portal</span>
           </div>
           <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest text-center sm:text-right">
              Powered by <span className="text-slate-900">Next.js</span>
           </p>
        </footer>
      </main>
    </div>
  );
}
