"use client";

import { motion } from "framer-motion";
import { FileText, Download, Calendar, User, Search, ExternalLink, BookOpen } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getResearch } from "@/lib/actions/research";
import { subscribeNewsletter } from "@/lib/actions/newsletter";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";



export default function ResearchReportsPage() {
  const [academicResearch, setAcademicResearch] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribing(true);
    const formData = new FormData();
    formData.append("email", email);
    
    try {
      const result = await subscribeNewsletter(formData);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Successfully subscribed to research updates!");
        setEmail("");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubscribing(false);
    }
  };

  useEffect(() => {
    const fetchResearch = async () => {
      const result = await getResearch();
      if (result.success) {
        setAcademicResearch(result.data || []);
      }
      setIsLoading(false);
    };
    fetchResearch();
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 mb-20 overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-none mb-6 flex items-center gap-6">
                <BookOpen className="text-brand-forest" size={64} />
                <div>
                  <span className="text-brand-forest">Publications</span>
                </div>
              </h1>
              <p className="text-xl text-slate-600 font-medium leading-relaxed mb-10">
                Our research wing translates complex environmental data into actionable insights, empowering communities with the knowledge to build a sustainable future.
              </p>
              

            </motion.div>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -z-10 opacity-10">
          <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="400" cy="200" r="200" fill="url(#paint0_linear)" />
            <defs>
              <linearGradient id="paint0_linear" x1="200" y1="0" x2="600" y2="400" gradientUnits="userSpaceOnUse">
                <stop stopColor="#059669" />
                <stop offset="1" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>



      {/* Academic Research Section from Database */}
      <section className="px-6 lg:px-12 mt-24">
        <div className="mx-auto max-w-7xl">


          {isLoading ? (
            <div className="py-12 text-center text-slate-400 font-bold animate-pulse">Loading publications...</div>
          ) : academicResearch.length > 0 ? (
            <div className="space-y-6">
              {academicResearch.map((res, index) => (
                <motion.div
                  key={res.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-forest/30 transition-all duration-300"
                >
                  <p className="text-slate-900 text-lg leading-relaxed font-medium">
                    <span className="text-brand-forest font-black mr-2">{index + 1}.</span>
                    {res.authors} ({res.year}). <span className="font-bold text-slate-800">{res.title}</span> <i>{res.source}.</i>
                  </p>
                  
                  {res.url && (
                    <div className="mt-6 flex">
                      <a 
                        href={res.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-cyan hover:text-brand-forest transition-colors bg-slate-50 px-4 py-2 rounded-xl"
                      >
                        View Publication <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 font-medium">
              No academic publications currently available.
            </div>
          )}
        </div>
      </section>

      {/* Subscription Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-12 mt-32">
        <div className="bg-brand-forest rounded-[4rem] p-12 lg:p-24 relative overflow-hidden text-center text-white">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tight leading-none mb-8">Receive our Weekly <br />Impact Reports</h2>
            <p className="text-white/80 text-lg font-medium mb-12">
              Get the latest research and data-driven insights delivered straight to your inbox every Monday.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 outline-none focus:bg-white/20 transition-all text-white placeholder:text-white/40 font-bold"
              />
              <button 
                type="submit" 
                disabled={isSubscribing}
                className="bg-white text-brand-forest px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubscribing && <Loader2 size={16} className="animate-spin" />}
                Join Network
              </button>
            </form>
          </div>
          
          {/* Abstract decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="1200" height="600" fill="url(#paint_grad)" />
              <defs>
                <radialGradient id="paint_grad" cx="600" cy="300" r="400" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>
    </main>
  );
}
