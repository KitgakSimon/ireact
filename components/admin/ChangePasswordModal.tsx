"use client";

import { useState } from "react";
import { X, Loader2, Lock, ShieldCheck } from "lucide-react";
import { changePassword } from "@/lib/actions/auth";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function ChangePasswordModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Validation Error", {
        description: "New passwords do not match."
      });
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Weak Password", {
        description: "Password must be at least 6 characters long."
      });
      return;
    }

    setIsPending(true);
    try {
      const result = await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      if (result.success) {
        toast.success("Security Updated", {
          description: "Your password has been changed successfully."
        });
        onClose();
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error("Update Failed", {
          description: result.error || "Could not change password."
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "An unexpected error occurred."
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden"
          >
            <div className="p-8 sm:p-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shadow-inner">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Security Access</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Update your Credentials</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Current Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={formData.oldPassword}
                      onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-forest/5 focus:border-brand-forest transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="h-px bg-slate-50 w-full"></div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">New Password</label>
                  <input
                    type="password"
                    required
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-cyan/5 focus:border-brand-cyan transition-all"
                    placeholder="Min. 6 characters"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-brand-cyan/5 focus:border-brand-cyan transition-all"
                    placeholder="Repeat new password"
                  />
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-3 bg-brand-forest text-white py-4 rounded-2xl text-sm font-black shadow-xl shadow-brand-forest/10 hover:bg-brand-dark transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isPending ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <ShieldCheck size={18} />
                    )}
                    {isPending ? "Updating Security..." : "Change Password"}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-4 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    Discard Changes
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
