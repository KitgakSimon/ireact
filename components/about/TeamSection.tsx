"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Linkedin, Facebook, Instagram, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getTeamMembers } from "@/lib/actions/team";

export default function TeamSection() {
  const [team, setTeam] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      const result = await getTeamMembers();
      if (result.success && result.data && result.data.length > 0) {
        setTeam(result.data);
      } else {
        // Fallback to static data if DB is empty
        setTeam([
          {
            name: "Kitgak Simon",
            role: "Chief Executive Officer",
            bio: "A visionary youth leader and climate advocate dedicated to empowering rural communities through innovative technology and grassroots leadership.",
            image: "/images/gallery/IMG_2006.JPG",
            linkedin: "#",
            email: "simon@ireact.org"
          },
          {
            name: "Adamu Elisha Inuwa",
            role: "Administrative Officer",
            bio: "Passionate about sustainable development and operational excellence, ensuring the efficient management of IREACT initiatives and community programs.",
            image: "/images/gallery/IMG_2007.JPG",
            linkedin: "#",
            email: "adamu@ireact.org"
          }
        ]);
      }
      setIsLoading(false);
    };
    fetchTeam();
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1 === team.length ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? team.length - 1 : prev - 1));
  };

  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-brand-cyan/5 blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 rounded-full bg-brand-forest/5 blur-3xl opacity-50"></div>
      
      <div className="mx-auto max-w-7xl relative z-10 px-6 sm:px-12">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-cyan">Our Leadership</h2>
          <h3 className="text-4xl font-extrabold text-slate-900 md:text-6xl mb-6 tracking-tight">The Minds Behind <span className="header-highlight highlight-yellow text-slate-900">IREACT</span></h3>
          <p className="text-xl text-slate-600 font-medium leading-relaxed">Meet the dedicated team driving sustainable change and climate resilience across underserved communities.</p>
        </div>

        <div className="relative group max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-[3rem] shadow-2xl bg-white border border-slate-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col md:flex-row items-center gap-10 lg:gap-16 p-8 md:p-16"
              >
                <div className="relative shrink-0 h-64 w-64 lg:h-80 lg:w-80 rounded-[2.5rem] overflow-hidden shadow-2xl ring-8 ring-slate-50">
                  <Image 
                    src={team[index]?.image || "/images/gallery/IMG_2006.JPG"} 
                    alt={team[index]?.name} 
                    fill 
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 text-center md:text-left space-y-6">
                  <div>
                    <h4 className="text-3xl lg:text-4xl font-black text-slate-900 mb-2">{team[index]?.name}</h4>
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-forest">{team[index]?.role}</p>
                  </div>
                  
                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed font-medium line-clamp-4">
                    "{team[index]?.bio}"
                  </p>

                  <div className="flex items-center justify-center md:justify-start gap-3">
                    {team[index]?.linkedin && (
                      <a href={team[index].linkedin} target="_blank" rel="noopener noreferrer" className="h-12 w-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-[#0a66c2] hover:bg-white hover:shadow-xl transition-all rounded-2xl border border-slate-100">
                        <Linkedin size={20} />
                      </a>
                    )}
                    {team[index]?.instagram && (
                      <a href={team[index].instagram} target="_blank" rel="noopener noreferrer" className="h-12 w-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-[#e4405f] hover:bg-white hover:shadow-xl transition-all rounded-2xl border border-slate-100">
                        <Instagram size={20} />
                      </a>
                    )}
                    {team[index]?.facebook && (
                      <a href={team[index].facebook} target="_blank" rel="noopener noreferrer" className="h-12 w-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-[#1877f2] hover:bg-white hover:shadow-xl transition-all rounded-2xl border border-slate-100">
                        <Facebook size={20} />
                      </a>
                    )}
                    {team[index]?.email && (
                      <a href={`mailto:${team[index].email}`} className="h-12 w-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-brand-forest hover:bg-white hover:shadow-xl transition-all rounded-2xl border border-slate-100">
                        <Mail size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          {team.length > 1 && (
            <div className="flex items-center justify-center gap-6 mt-12">
              <button 
                onClick={prevSlide}
                className="h-14 w-14 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-forest hover:border-brand-forest hover:shadow-xl transition-all active:scale-90"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="flex gap-2">
                 {team.map((_, i) => (
                   <button 
                     key={i} 
                     onClick={() => setIndex(i)}
                     className={`h-2 transition-all duration-300 rounded-full ${i === index ? 'w-8 bg-brand-forest' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
                   />
                 ))}
              </div>

              <button 
                onClick={nextSlide}
                className="h-14 w-14 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-forest hover:border-brand-forest hover:shadow-xl transition-all active:scale-90"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
