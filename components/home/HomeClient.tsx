"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Leaf, 
  Cpu, 
  Users, 
  Globe, 
  ShieldCheck, 
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";
import HeroCarousel from "@/components/common/HeroCarousel";
import CTA from "@/components/common/CTA";
import { BlogSection } from "@/components/blog/BlogComponents";
import GallerySection from "@/components/home/GallerySection";
import TestimonialSlider from "@/components/about/TestimonialSlider";
import TeamSection from "@/components/about/TeamSection";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
} as any;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
} as any;

export default function HomeClient({ posts }: { posts: any[] }) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroCarousel 
        slides={[
          {
            title: "Empowering Communities, Resilience Built Locally",
            subtitle: "We bridge the gap between climate solutions, technology, and people by empowering communities with practical tools and knowledge.",
            backgroundImage: "/images/gallery/IMG_2276.jpg"
          },
          {
            title: "Sustainable Climate Action",
            subtitle: "Advancing climate resilience and sustainable development in underserved communities through grassroots innovation.",
            backgroundImage: "/images/gallery/IMG_2022.JPG"
          },
          {
            title: "Environmental Restoration",
            subtitle: "Restoring ecosystems through community-led reforestation, landscape management, and hands-on conservation.",
            backgroundImage: "/images/gallery/IMG_2023.JPG"
          },
          {
            title: "Empowering Youth Leadership",
            subtitle: "Supporting the next generation to lead climate action and drive sustainable change from the ground up.",
            backgroundImage: "/images/gallery/IMG_2021.JPG"
          }
        ]}
        height="full"
        titleSize="xl"
        scrollTarget="#about-us"
        intervalMs={6000}
      >
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mt-8">
          <Link 
            href="/about" 
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-dark transition-all hover:bg-slate-100 hover:shadow-xl sm:w-auto"
          >
            Our Mission
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link 
            href="#our-pillars" 
            className="flex w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 sm:w-auto"
          >
            Explore Pillars
          </Link>
        </div>
      </HeroCarousel>

      {/* About Section - Brief */}
      <section id="about-us" className="section-padding bg-white relative overflow-hidden square-grid">
        <div aria-hidden="true" className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-brand-cyan/10 blur-3xl opacity-50"></div>
        <div aria-hidden="true" className="absolute top-1/2 left-0 -ml-24 h-64 w-64 rounded-full bg-brand-forest/10 blur-3xl opacity-30"></div>
        
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-teal flex items-center gap-2">
                <span className="h-0.5 w-8 bg-brand-teal"></span>
                Introduction
              </h2>
              <h3 className="mb-8 text-3xl font-extrabold leading-[1.2] text-slate-900 md:text-5xl">
                Youth-led, Community-centered, <br />
                <span className="header-highlight highlight-yellow text-slate-900">Climate Action</span>
              </h3>
              
              <div className="space-y-6 text-lg leading-relaxed text-slate-600">
                <p>
                  REACT Initiative is a youth-led organization advancing climate resilience and sustainable development in underserved communities.
                </p>
                <p>
                  Rooted in equity and local leadership, we support smallholder farmers, displaced populations, and young people through climate-smart agriculture and environmental restoration.
                </p>
              </div>
              
              <Link href="/about" className="mt-10 inline-flex items-center gap-2 font-bold text-brand-forest hover:gap-3 transition-all">
                Learn more about our journey <ArrowRight size={18} />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video lg:aspect-square overflow-hidden rounded-3xl shadow-2xl"
            >
              <Image 
                src="/images/gallery/IMG_2021.JPG" 
                alt="Community co-creation" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-brand-dark/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-6 glass-card rounded-2xl border-white/40 shadow-2xl">
                <p className="text-brand-dark font-bold quote text-lg leading-snug">
                  "Working with communities <br/> <span className="text-brand-forest">rather than for them.</span>"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section id="our-pillars" className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 square-grid opacity-60"></div>
        <div className="mx-auto max-w-7xl text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-20"
          >
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-teal">Core Verticals</h2>
            <h3 className="mb-6 text-3xl font-extrabold text-slate-900 md:text-6xl tracking-tight leading-tight">
              Our <span className="header-highlight highlight-yellow">Focus Areas</span>
            </h3>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 font-medium">
              Practical tools, knowledge, and systems that strengthen livelihoods and protect ecosystems through data-driven localized action.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                title: "Climate-Smart Agriculture",
                desc: "Supporting smallholder farmers with regenerative techniques and localized weather data.",
                icon: <Leaf className="h-8 w-8" />,
                color: "bg-emerald-50 text-emerald-600"
              },
              {
                title: "Environmental Restoration",
                desc: "Restoring ecosystems through community-led reforestation and landscape management.",
                icon: <Globe className="h-8 w-8" />,
                color: "bg-cyan-50 text-cyan-600"
              },
              {
                title: "Clean Energy Awareness",
                desc: "Bridging the energy gap with renewable awareness and capacity building for rural areas.",
                icon: <Lightbulb className="h-8 w-8" />,
                color: "bg-amber-50 text-amber-600"
              },
              {
                title: "Climate Technology",
                desc: "Integrating research and tech solutions into local contexts for better decision making.",
                icon: <Cpu className="h-8 w-8" />,
                color: "bg-indigo-50 text-indigo-600"
              },
              {
                title: "Humanitarian Response",
                desc: "Resilience-building for displaced populations and those vulnerable to climate shocks.",
                icon: <ShieldCheck className="h-8 w-8" />,
                color: "bg-rose-50 text-rose-600"
              },
              {
                title: "Youth Leadership",
                desc: "Empowering the next generation to lead climate action and grassroots innovation.",
                icon: <Users className="h-8 w-8" />,
                color: "bg-violet-50 text-violet-600"
              },
              {
                title: "Research for Sustainable Development",
                desc: "Conducting data-driven research to inform policies and effectively address local climate challenges.",
                icon: <Globe className="h-8 w-8" />,
                color: "bg-sky-50 text-sky-600"
              }
            ].map((pillar, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
                }}
                className="group relative overflow-hidden bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:border-gray active:scale-[0.98]"
              >
                {/* Background Accent */}
                <div className={cn("absolute top-0 right-0 h-40 w-40 opacity-0 group-hover:opacity-10 transition-opacity blur-2xl rounded-full translate-x-1/2 -translate-y-1/2", pillar.color.split(' ')[0])}></div>
                
                <div className={cn("mb-8 flex h-20 w-20 items-center justify-center rounded-3xl transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 shadow-lg", pillar.color)}>
                  {pillar.icon}
                </div>
                
                <h4 className="mb-4 text-2xl font-black text-slate-900 group-hover:text-brand-forest transition-colors leading-tight">{pillar.title}</h4>
                <p className="text-slate-600 text-[1.05rem] leading-relaxed font-medium mb-4 relative z-10">{pillar.desc}</p>
                
                {/* Card Icon Accent Bottom Right */}
                <div className={cn("absolute bottom-16 right-16 opacity-[0.06] scale-[6] transform transition-transform duration-1000 group-hover:scale-[10] group-hover:rotate-12", pillar.color.split(' ')[1])}>
                   {pillar.icon}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* Approach Section */}
      <section id="approach" className="section-padding bg-slate-900 text-white relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 square-grid opacity-10"></div>
        <div aria-hidden="true" className="absolute bottom-0 left-0 -ml-32 -mb-32 h-[500px] w-[500px] rounded-full bg-brand-cyan/20 blur-3xl opacity-40"></div>
        <div aria-hidden="true" className="absolute top-0 right-0 -mr-32 -mt-32 h-[500px] w-[500px] rounded-full bg-brand-forest/10 blur-3xl opacity-20"></div>
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-4/5 rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,173,239,0.15)] border border-white/10"
            >
              <Image 
                src="/images/gallery/IMG_2023.JPG" 
                alt="Farmer using technology" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-cyan flex items-center gap-3">
                <span className="h-0.5 w-10 bg-brand-cyan"></span>
                Our Philosophy
              </h2>
              <h3 className="mb-8 text-4xl font-extrabold leading-[1.2] md:text-5xl">
                Co-creation: Working <br/>
                <span className="header-highlight highlight-cyan ">With Communities</span>
              </h3>
              
              <p className="mb-12 text-xl text-slate-300 leading-relaxed font-medium">
                What makes REACT Initiative unique is our emphasis on co-creation—working with communities rather than for them. We combine <span className="text-white border-b border-brand-cyan/30">indigenous knowledge</span> with <span className="text-white border-b border-brand-cyan/30">climate technology</span>.
              </p>

              <div className="space-y-10">
                {[
                  {
                    label: "Transparency & Inclusion",
                    desc: "Building trust through open dialogue and inclusive participation.",
                    icon: <Users className="h-6 w-6" />
                  },
                  {
                    label: "Evidence-Based Solutions",
                    desc: "Leveraging data and research to ensure programs are effective.",
                    icon: <ShieldCheck className="h-6 w-6" />
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-8 group"
                  >
                    <div className="shrink-0 flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-white/5 border border-white/10 text-brand-cyan group-hover:bg-brand-cyan group-hover:text-slate-900 transition-all duration-500 shadow-xl">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="mb-2 text-2xl font-bold group-hover:text-brand-cyan transition-colors">{item.label}</h4>
                      <p className="text-slate-400 text-lg leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      
      <TeamSection />
      <TestimonialSlider />
      {/* Blog Section */}
      <BlogSection posts={posts} />

      <CTA 
        title="Ready to make an impact?"
        subtitle="Join our network of ambassadors, partners, and community leaders. Together, we can build a resilient future."
        primaryButtonText="Join the Movement"
        primaryButtonHref="/opportunities"
        secondaryButtonText="Work with Us"
        secondaryButtonHref="/contact"
      />
    </div>
  );
}
