"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Hero from "@/components/common/Hero";
import { useState } from "react";
import ImageLightbox from "@/components/common/ImageLightbox";

const galleryImages = [
  "IMG_2024.JPG", "IMG_2023.JPG", "IMG_2022.JPG", "IMG_2021.JPG", 
  "IMG_2019.JPG", "IMG_2018.JPG", "IMG_2017.JPG", "IMG_2015.JPG", 
  "IMG_2014.JPG", "IMG_2013.JPG", "IMG_2012.JPG", "IMG_2011.JPG",
  "IMG_2010.JPG", "IMG_2009.JPG", "IMG_2008.JPG", "IMG_2007.JPG",
  "IMG_2276.jpg", "IMG_1928.jpg", "IMG_2006.JPG"
];

const fadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
} as any;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
} as any;

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="flex flex-col">
      <Hero 
        title="Impact Gallery"
        subtitle="Visual stories representing our community co-creation, youth leadership, and local climate action."
        backgroundImage="/images/gallery/IMG_2022.JPG"
      />

      <section className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
          >
            {galleryImages.map((img, i) => (
              <motion.div 
                key={i} 
                variants={fadeIn}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                onClick={() => openLightbox(i)}
              >
                <div className="relative aspect-auto">
                    <img 
                      src={`/images/gallery/${img}`} 
                      alt={`Impact story ${i}`}
                      className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-brand-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-6 left-6 text-white font-bold text-lg">
                    Story of Impact #{i + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ImageLightbox 
        images={galleryImages}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setCurrentIndex((currentIndex - 1 + galleryImages.length) % galleryImages.length)}
        onNext={() => setCurrentIndex((currentIndex + 1) % galleryImages.length)}
      />
    </div>
  );
}
