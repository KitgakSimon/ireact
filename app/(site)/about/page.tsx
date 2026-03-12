"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Target, Heart, Eye } from "lucide-react";
import Hero from "@/components/common/Hero";
import TestimonialSlider from "@/components/about/TestimonialSlider";
import TeamSection from "@/components/about/TeamSection";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
} as any;

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <Hero 
        title="Our Mission & Story"
        subtitle="Rooted in equity, justice, and local leadership, REACT Initiative works at the intersection of climate action and grassroots innovation."
        backgroundImage="/images/gallery/IMG_2011.JPG"
        scrollTarget="#mission"
      />

      <section id="mission" className="section-padding bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-brand-forest font-bold uppercase tracking-widest text-sm mb-4">Who We Are</h2>
              <h3 className="text-4xl font-extrabold mb-8 text-slate-900 leading-tight">
                Empowering Communities with <br />
                <span className="header-highlight highlight-teal text-slate-900">Practical Tools</span>
              </h3>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  REACT Initiative (Rural Empowerment and Climate Technology Initiative) is a youth-led, community-centered organization advancing climate resilience, humanitarian response, and sustainable development in underserved and rural communities.
                </p>
                <p>
                  Our mission is to bridge the gap between climate solutions, technology, and people by empowering communities with practical tools, knowledge, and systems that strengthen livelihoods and protect ecosystems.
                </p>
              </div>
            </motion.div>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/images/gallery/IMG_2024.JPG" 
                alt="Our Team" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values & Vision */}
      <section className="section-padding bg-slate-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Our Vision",
                desc: "Building resilient communities that can adapt, thrive, and lead in the face of climate and humanitarian challenges.",
                icon: <Eye className="h-8 w-8 text-brand-forest" />
              },
              {
                title: "Our Mission",
                desc: "Connecting technology and people to create sustainable, community-led climate solutions.",
                icon: <Target className="h-8 w-8 text-brand-teal" />
              },
              {
                title: "Our Values",
                desc: "Transparency, inclusion, and evidence-based solutions combined with indigenous knowledge.",
                icon: <Heart className="h-8 w-8 text-rose-500" />
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 transition-hover hover:shadow-xl hover:-translate-y-2">
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold mb-12">What Makes <span className="header-highlight highlight-cyan text-slate-900">Us Unique?</span></h2>
          <div className="grid sm:grid-cols-2 gap-8 text-left">
            {[
              "Co-creation — working with communities rather than for them.",
              "Emphasis on local leadership and youth empowerment.",
              "Combining indigenous knowledge with modern climate technology.",
              "Evidence-based solutions rooted in data and research.",
              "Commitment to equity and justice in every program.",
              "Scaling global goals to locally relevant community action."
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <CheckCircle2 className="h-6 w-6 text-brand-forest shrink-0" />
                <p className="text-lg text-slate-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSlider />
      <TeamSection />
    </div>
  );
}
