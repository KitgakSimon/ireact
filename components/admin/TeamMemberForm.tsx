"use client";

import { useState } from "react";
import { Plus, X, Loader2, Sparkles } from "lucide-react";
import CloudinaryUpload from "./CloudinaryUpload";
import { createTeamMember, updateTeamMember } from "@/lib/actions/team";
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyCHHyQQTqPzzdcDhTV_TD6Ijqv5bCHfbLE"; // Provided by user
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

interface TeamMemberFormProps {
  initialData?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function TeamMemberForm({ initialData, onSuccess, onCancel }: TeamMemberFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    role: initialData?.role || "",
    bio: initialData?.bio || "",
    image: initialData?.image || "",
    linkedin: initialData?.linkedin || "",
    facebook: initialData?.facebook || "",
    instagram: initialData?.instagram || "",
    email: initialData?.email || "",
    order: initialData?.order || 0,
  });
  const [isPending, setIsPending] = useState(false);
  const [isAiRefining, setIsAiRefining] = useState(false);

  const refineBioWithAI = async () => {
    if (!formData.bio) {
      toast.error("Nothing to refine", { description: "Please enter some bio text first." });
      return;
    }

    setIsAiRefining(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Refine this professional bio for a team member of the REACT Initiative (Rural Empowerment and Climate Technology). 
      Make it professional, engaging, and impactful. 
      
      CRITICAL INSTRUCTIONS:
      1. Return ONLY the refined bio text. 
      2. Do NOT use ANY markdown formatting (no bold, no italics, no bullet points).
      3. Ensure there is exactly one space between sentences.
      4. Avoid technical jargon unless necessary.
      
      Current Bio: ${formData.bio}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().trim();
      
      // Remove any leftover markdown if Gemini ignores instructions
      const cleanText = text.replace(/[*_#`~]/g, "").trim();
      
      setFormData({ ...formData, bio: cleanText });
      
      toast.success("Bio Refined", {
        description: "AI has polished the profile bio for clarity and impact."
      });
    } catch (error) {
      console.error("AI Refinement error:", error);
      toast.error("AI Refinement Failed", {
        description: "Could not connect to the refinement service."
      });
    } finally {
      setIsAiRefining(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.bio) {
      toast.error("Required Fields Missing");
      return;
    }

    setIsPending(true);
    try {
      let result;
      if (initialData?.id) {
        result = await updateTeamMember(initialData.id, formData);
      } else {
        result = await createTeamMember(formData);
      }

      if (result.success) {
        toast.success(initialData ? "Member Updated" : "Member Created");
        onSuccess();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Photo</label>
            <CloudinaryUpload
              onUpload={(url) => setFormData({ ...formData, image: url })}
              defaultValue={formData.image}
            />
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
              placeholder="e.g. Kitgak Simon"
            />
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Role</label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
              placeholder="e.g. CEO"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 block">Bio</label>
              <button 
                type="button"
                onClick={refineBioWithAI}
                disabled={isAiRefining}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-100 transition-all disabled:opacity-50"
              >
                {isAiRefining ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />}
                {isAiRefining ? "Refining..." : "Refine with AI"}
              </button>
            </div>
            <textarea
              required
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 resize-none"
              placeholder="Brief professional background..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">LinkedIn</label>
              <input
                type="text"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                placeholder="URL"
              />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
                placeholder="public@ireact.org"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Display Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-black bg-brand-forest text-white shadow-xl shadow-brand-forest/10 hover:bg-brand-dark transition-all disabled:opacity-50"
        >
          {isPending && <Loader2 size={16} className="animate-spin" />}
          {initialData ? "Save Changes" : "Create Member"}
        </button>
      </div>
    </form>
  );
}
