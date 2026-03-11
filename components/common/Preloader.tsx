"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading or wait for window load
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 2000); // 2 seconds minimum for aesthetic feel
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -100,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Logo and Animation */}
            <div className="relative h-20 w-48 mb-6">
              <Image
                src="/images/logo.png"
                alt="REACT Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* Loading Bar */}
            <div className="h-[2px] w-full bg-slate-100 overflow-hidden relative rounded-full">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5, 
                  ease: "easeInOut" 
                }}
                className="absolute top-0 bottom-0 w-1/2 bg-linear-to-r from-brand-forest via-brand-teal to-brand-cyan"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-slate-400"
          >
            Empowering Local Resilience
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
