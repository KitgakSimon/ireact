"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext
}: ImageLightboxProps) {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/95 backdrop-blur-xl p-4 md:p-10"
          onClick={onClose}
        >
          {/* Controls */}
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-10 right-10 text-white hover:text-brand-cyan transition-colors z-[110]"
          >
            <X size={32} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-6 md:left-10 text-white hover:text-brand-cyan transition-colors z-[110] p-4 bg-white/5 rounded-full backdrop-blur-md"
          >
            <ChevronLeft size={32} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-6 md:right-10 text-white hover:text-brand-cyan transition-colors z-[110] p-4 bg-white/5 rounded-full backdrop-blur-md"
          >
            <ChevronRight size={32} />
          </button>

          {/* Image Container */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src={`/images/gallery/${images[currentIndex]}`} 
              alt="Gallery Preview" 
              fill
              className="object-contain rounded-2xl shadow-2xl"
              priority
              quality={85}
            />
            
            {/* Counter */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/50 text-xs font-black uppercase tracking-[0.4em]">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
