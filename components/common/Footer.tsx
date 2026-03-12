"use client";

import Link from "next/link";
import { 
  Globe, 
  Mail, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Facebook,
  ArrowRight,
  Phone,
  Loader2,
  Send,
  Youtube
} from "lucide-react";
import Image from "next/image";
import { subscribeNewsletter } from "@/lib/actions/newsletter";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const footerLinks = {
  navigation: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Pillars", href: "/#our-pillars" },
    { name: "Opportunities", href: "/opportunities" },
    { name: "Impact stories", href: "/blog" },
  ],
  pillars: [
    { name: "Agriculture", href: "#" },
    { name: "Ecosystems", href: "#" },
    { name: "Clean Energy", href: "#" },
    { name: "Climate Tech", href: "#" },
    { name: "Youth Leadership", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Settings", href: "#" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: <Twitter size={18} />, href: "https://x.com/initiativereact?s=21" },
  { name: "LinkedIn", icon: <Linkedin size={18} />, href: "https://www.linkedin.com/company/eco360pedia/" },
  { name: "Instagram", icon: <Instagram size={18} />, href: "https://www.instagram.com/reactinitiative?igsh=dmRsYnVwZDVtazk2&utm_source=qr" },
  { name: "Facebook", icon: <Facebook size={18} />, href: "https://www.facebook.com/share/16ConLvZPu/?mibextid=wwXIfr" },
  { name: "YouTube", icon: <Youtube size={18} />, href: "https://youtube.com/@reactmedia-z4p?si=yBj-PZjI3vHVRqGC" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);

    startTransition(async () => {
      const result = await subscribeNewsletter(formData);
      if (result.success) {
        toast.success("Welcome aboard!", {
          description: "You've successfully subscribed to REACT perspectives."
        });
        setEmail("");
      } else {
        toast.error("Subscription failed", {
          description: result.error || "Please try again later."
        });
      }
    });
  };

  return (
    <footer className="bg-slate-900 pt-24 pb-12 text-slate-300 overflow-hidden relative">
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #ffffff 3px, transparent 3px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-brand-cyan via-brand-forest to-brand-dark opacity-10"></div>
      
      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        {/* Newsletter Section - Now at the Top */}
        <div className="mb-20 pb-16 border-b border-slate-800/50">
          <div className="grid lg:grid-cols-2 items-center gap-12 max-w-5xl mx-auto text-center lg:text-left">
            <div>
              <h4 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Stay informed with <span className="text-brand-cyan">IREACT</span></h4>
              <p className="text-slate-400 font-medium leading-relaxed">Join our global network to receive localized perspectives, research field notes, and community impact stories.</p>
            </div>
            <form onSubmit={handleSubscribe} className="relative group max-w-md w-full mx-auto lg:ml-auto lg:mr-0">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-3xl px-8 py-5 text-base font-bold text-white outline-none focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan transition-all placeholder:text-slate-500"
                  required
                />
                <button 
                  type="submit"
                  disabled={isPending || !email}
                  className="absolute right-2 top-2 bottom-2 px-6 rounded-2xl bg-brand-forest text-white font-bold flex items-center justify-center gap-2 transition-all hover:bg-brand-dark active:scale-95 disabled:opacity-50 shadow-lg"
                >
                  {isPending ? <Loader2 size={18} className="animate-spin" /> : <>Subcribe <Send size={16} /></>}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand Info */}
          <div className="col-span-1">
            <Link href="/" className="mb-8 flex items-center group">
              <div className="relative h-20 w-16 overflow-hidden rounded-xl transition-all">
                <Image
                  src="/images/logo-dark.png"
                  alt="REACT Logo"
                  fill
                  className="object-contain transition-transform duration-500"
                />
              </div>
              <div className="ml-4">
                <span className="block text-3xl font-black tracking-tight text-white leading-none">IREACT</span>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-brand-cyan mt-1 block">Initiative</span>
              </div>
            </Link>
            <p className="mb-10 text-base leading-relaxed text-slate-400 max-w-xs">
              Translating global climate and development goals into community-level action through technology, data, and youth leadership.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link 
                  key={social.name} 
                  href={social.href} 
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/50 text-slate-400 transition-all hover:bg-brand-forest hover:text-white hover:-translate-y-1 shadow-lg"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Site Navigation */}
          <div className="lg:pl-12">
            <h4 className="mb-8 font-bold text-white uppercase tracking-widest text-xs">Explore</h4>
            <ul className="space-y-4">
              {footerLinks.navigation.map((linkItem) => (
                <li key={linkItem.name}>
                  <Link href={linkItem.href} className="text-base font-medium transition-colors hover:text-brand-cyan hover:pl-2 inline-flex items-center gap-3 group">
                    <span className="h-1.5 w-1.5 bg-brand-cyan rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>
                    {linkItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:pl-12">
            <h4 className="mb-8 font-bold text-white uppercase tracking-widest text-xs">Reach Out</h4>
            <ul className="space-y-8">
              <li className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-800/50 text-brand-cyan shadow-lg">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Location</span>
                  <span className="text-base leading-relaxed font-semibold">45 Yakubu Gowon Way, Jos, Nigeria</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-800/50 text-brand-cyan shadow-lg">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Email</span>
                  <Link href="mailto:info@ireactinitiative.org" className="text-base font-semibold hover:text-white transition-colors">info@ireactinitiative.org</Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-between gap-8 pt-12 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <p className="text-xs text-slate-500 font-medium tracking-wide">
              © {new Date().getFullYear()} Rural Empowerment and Climate Technology Initiative. All rights reserved.
            </p>
            <div className="flex gap-8 text-xs text-slate-500 font-medium">
              {footerLinks.legal.map((item) => (
                <Link key={item.name} href={item.href} className="hover:text-white transition-colors">{item.name}</Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-100 border border-slate-700/50 rounded-full px-6 py-3 bg-slate-800/30">
            <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse"></span>
            Sustainable Communities Powered by Innovation
          </div>
        </div>
      </div>
    </footer>
  );
}
