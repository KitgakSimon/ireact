"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Amina Yusuf",
    role: "Community Leader",
    text: "IREACT Initiative has completely transformed how our village approaches farming and climate resilience.",
    image: "/images/gallery/IMG_2022.JPG",
    rating: 5
  },
  {
    name: "Dr. Samuel Okon",
    role: "Researcher",
    text: "Genuine commitment to bridging research and grassroots action with practical, data-driven solutions.",
    image: "/images/gallery/IMG_2017.JPG",
    rating: 5
  },
  {
    name: "Fatima Bello",
    role: "Local Farmer",
    text: "The reforestation efforts are seeing life return to our soil. They inspire the next generation.",
    image: "/images/gallery/IMG_2019.JPG",
    rating: 5
  },
  {
    name: "John Danjuma",
    role: "Youth Advocate",
    text: "Empowering young people to take the lead in climate technology has been a game-changer for us.",
    image: "/images/gallery/IMG_2021.JPG",
    rating: 5
  },
  {
    name: "Sarah Ibrahim",
    role: "Partner NGO",
    text: "Their approach to co-creation ensures that every project is sustainable and community-owned.",
    image: "/images/gallery/IMG_2023.JPG",
    rating: 5
  }
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % (testimonials.length - visibleCount + 1));
  };
  
  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + (testimonials.length - visibleCount + 1)) % (testimonials.length - visibleCount + 1));
  };

  const autoNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = testimonials.length - visibleCount;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  useEffect(() => {
    const timer = setInterval(autoNext, 6000);
    return () => clearInterval(timer);
  }, [visibleCount]);

  return (
    <section className="section-padding bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 square-grid opacity-10"></div>
      
      <div className="mx-auto max-w-7xl relative z-10 px-6 sm:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-cyan">Impact & Feedback</h2>
            <h3 className="text-4xl font-extrabold text-white md:text-5xl tracking-tight">Voices of <span className="header-highlight highlight-cyan text-white">Our Community</span></h3>
          </div>
          
          <div className="flex gap-4">
            <button onClick={prev} className="h-14 w-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-brand-cyan hover:text-slate-900 hover:scale-110 active:scale-95 transition-all backdrop-blur-sm">
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} className="h-14 w-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-brand-cyan hover:text-slate-900 hover:scale-110 active:scale-95 transition-all backdrop-blur-sm">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <motion.div 
            className="flex gap-6"
            animate={{ x: `calc(-${currentIndex * (100 / visibleCount)}% - ${currentIndex * (24 / visibleCount)}px)` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {testimonials.map((item, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "shrink-0 p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-start gap-6 transition-all duration-500",
                  visibleCount === 3 ? "w-[calc(33.333%-16px)]" : visibleCount === 2 ? "w-[calc(50%-12px)]" : "w-full"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="fill-amber-400 h-3.5 w-3.5" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-white/10" />
                </div>
                
                <p className="text-lg font-medium leading-relaxed text-slate-200">
                  "{item.text}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-brand-cyan/20">
                     <Image 
                       src={item.image} 
                       alt={item.name}
                       fill
                       className="object-cover"
                     />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white">{item.name}</h4>
                    <p className="text-brand-cyan text-[10px] font-bold uppercase tracking-wider">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center gap-2 mt-12">
          {testimonials.slice(0, testimonials.length - visibleCount + 1).map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentIndex(idx)}
              className={cn("h-1.5 rounded-full transition-all duration-300", currentIndex === idx ? "bg-brand-cyan w-8" : "bg-white/20 w-4 hover:bg-white/40")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
