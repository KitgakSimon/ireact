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
  Phone
} from "lucide-react";
import Image from "next/image";

const footerLinks = {
  navigation: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Pillars", href: "/#our-pillars" },
    { name: "Opportunities", href: "/opportunities" },
    { name: "Impact stories", href: "#" },
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
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-24 pb-12 text-slate-300 overflow-hidden relative">
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #ffffff 3px, transparent 3px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-brand-cyan via-brand-forest to-brand-dark opacity-10"></div>
      
      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        <div className="grid gap-16 border-b border-slate-800/50 pb-20 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="mb-8 flex items-center  group">
              <div className="relative h-20 w-16 overflow-hidden rounded-xl transition-all">
                <Image
                  src="/images/logo-dark.png"
                  alt="REACT Logo"
                  fill
                  className="object-contain transition-transform duration-500"
                />
              </div>
              <div className="ml-4">
                <span className="block text-3xl font-black tracking-tight text-white leading-none">REACT</span>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-brand-cyan mt-1 block">Initiative</span>
              </div>
            </Link>
            <p className="mb-10 text-sm leading-relaxed text-slate-400 max-w-xs">
              Translating global climate and development goals into community-level action through technology, data, and youth leadership.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link 
                  key={social.name} 
                  href={social.href} 
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/50 text-slate-400 transition-all hover:bg-brand-forest hover:text-white"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Site Navigation */}
          <div>
            <h4 className="mb-8 font-bold text-white uppercase tracking-widest text-xs">Explore</h4>
            <ul className="space-y-4">
              {footerLinks.navigation.map((linkItem) => (
                <li key={linkItem.name}>
                  <Link href={linkItem.href} className="text-sm font-medium transition-colors hover:text-brand-cyan hover:pl-2 inline-flex items-center gap-2 group">
                    <span className="h-1 w-1 bg-brand-cyan rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>
                    {linkItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pillars List */}
          <div>
            <h4 className="mb-8 font-bold text-white uppercase tracking-widest text-xs">Pillars</h4>
            <ul className="space-y-4">
              {footerLinks.pillars.map((linkItem) => (
                <li key={linkItem.name}>
                  <Link href={linkItem.href} className="text-sm font-medium transition-colors hover:text-brand-cyan hover:pl-2 inline-flex items-center gap-2 group">
                    <span className="h-1 w-1 bg-brand-cyan rounded-full opacity-0 group-hover:opacity-100 transition-all"></span>
                    {linkItem.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="mb-8 font-bold text-white uppercase tracking-widest text-xs">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800/50 text-brand-cyan">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Office Location</span>
                  <span className="text-sm leading-relaxed">45 Yakubu Gowon Way, <br/> Jos, Plateau State, Nigeria</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800/50 text-brand-cyan">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Phone Line</span>
                  <Link href="tel:+2349056596944" className="text-sm hover:text-white transition-colors">+234 (0) 905 659 6944</Link>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800/50 text-brand-cyan">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Email Support</span>
                  <Link href="mailto:info@reactinitiative.org" className="text-sm hover:text-white transition-colors">info@reactinitiative.org</Link>
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
            Building Resilience
          </div>
        </div>
      </div>
    </footer>
  );
}
