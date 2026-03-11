"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Github, Linkedin, AlertCircle, User, Phone } from "lucide-react";
import Logo from "@/components/common/Logo";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-0 right-0 -mr-48 -mt-48 h-[600px] w-[600px] rounded-full bg-brand-cyan/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-48 -mb-48 h-[600px] w-[600px] rounded-full bg-brand-forest/10 blur-[100px] pointer-events-none"></div>

      <div className="mx-auto w-full max-w-md px-6 py-12 relative z-10">
        <div className="text-center mb-10">
          <Logo isDark className="justify-center mb-10 scale-125" />
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Create Account</h1>
          <p className="text-slate-600 font-medium">Register to join the REACT platform</p>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100"
        >
          <form className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-widest text-slate-500">Full Name</label>
              <div className="relative group/input transition-all">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-brand-cyan transition-colors">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 rounded-2xl border border-slate-200 pl-14 pr-6 py-4 focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                  placeholder="John Doe" 
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-widest text-slate-500">Email Address</label>
              <div className="relative group/input transition-all">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-brand-cyan transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  className="w-full bg-slate-50 rounded-2xl border border-slate-200 pl-14 pr-6 py-4 focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                  placeholder="name@example.com" 
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-widest text-slate-500">Password</label>
                  <div className="relative group/input transition-all">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-brand-cyan transition-colors">
                      <Lock size={18} />
                    </div>
                    <input 
                      type="password" 
                      className="w-full bg-slate-50 rounded-2xl border border-slate-200 pl-14 pr-6 py-4 focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                      placeholder="••••••••••••" 
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-widest text-slate-500">Confirm Password</label>
                  <div className="relative group/input transition-all">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-brand-cyan transition-colors">
                      <Lock size={18} />
                    </div>
                    <input 
                      type="password" 
                      className="w-full bg-slate-50 rounded-2xl border border-slate-200 pl-14 pr-6 py-4 focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
                      placeholder="••••••••••••" 
                    />
                  </div>
                </div>
            </div>

            <button type="submit" className="w-full rounded-2xl bg-brand-forest px-8 py-4 text-lg font-bold text-white shadow-xl shadow-forest-500/10 transition-all hover:bg-brand-dark hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 mt-10">
              Create Account
              <LogIn size={20} />
            </button>
          </form>


          <p className="text-center text-slate-600 font-medium">
            Already have an account? <Link href="/login" className="text-brand-forest font-black hover:text-brand-dark hover:underline transition-all">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
