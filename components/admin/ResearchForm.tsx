"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createResearch, updateResearch } from "@/lib/actions/research";

interface ResearchFormProps {
  initialData?: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ResearchForm({ initialData, onSuccess, onCancel }: ResearchFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    authors: initialData?.authors || "",
    year: initialData?.year || new Date().getFullYear(),
    title: initialData?.title || "",
    source: initialData?.source || "",
    url: initialData?.url || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = initialData
        ? await updateResearch(initialData.id, formData)
        : await createResearch(formData);

      if (result.success) {
        toast.success(initialData ? "Research updated" : "Research added");
        onSuccess();
      } else {
        toast.error(result.error || "Failed to save research");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Authors (e.g., Simon, K.)</label>
          <input
            required
            type="text"
            value={formData.authors}
            onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-brand-forest/5 focus:border-brand-forest transition-all"
            placeholder="Author names"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Publication Year</label>
          <input
            required
            type="number"
            min="1900"
            max="2100"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-brand-forest/5 focus:border-brand-forest transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700">Research Title</label>
        <textarea
          required
          rows={2}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-brand-forest/5 focus:border-brand-forest transition-all resize-none"
          placeholder="e.g., Project REACT: Sustainable Agroecology..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Source (Journal/Publisher)</label>
          <input
            required
            type="text"
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-brand-forest/5 focus:border-brand-forest transition-all"
            placeholder="e.g., Zenodo"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">URL / DOI Link (Optional)</label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-brand-forest/5 focus:border-brand-forest transition-all"
            placeholder="https://doi.org/..."
          />
        </div>
      </div>

      {/* Form Preview */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mt-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Preview Citation</p>
        <p className="text-sm text-slate-800">
          {formData.authors || "Authors"} ({formData.year}). <span className="font-bold text-brand-forest">{formData.title || "Title"}</span> <i>{formData.source || "Source"}.</i>
        </p>
      </div>

      <div className="flex gap-3 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-colors disabled:opacity-50 text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-[2] px-6 py-3 rounded-xl bg-brand-forest text-white font-bold hover:bg-brand-dark transition-all disabled:opacity-50 shadow-lg shadow-brand-forest/20 text-sm flex items-center justify-center gap-2"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {initialData ? "Update Publication" : "Save Publication"}
        </button>
      </div>
    </form>
  );
}
