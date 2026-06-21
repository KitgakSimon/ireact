"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, ExternalLink } from "lucide-react";
import { getResearch, deleteResearch } from "@/lib/actions/research";
import ResearchForm from "@/components/admin/ResearchForm";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminResearchPage() {
  const [research, setResearch] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingResearch, setEditingResearch] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchResearch = async () => {
    setIsLoading(true);
    const result = await getResearch();
    if (result.success) {
      setResearch(result.data || []);
    } else {
      toast.error(result.error || "Failed to load research");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchResearch();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete publication: "${title}"?`)) return;

    const result = await deleteResearch(id);
    if (result.success) {
      toast.success("Publication deleted");
      fetchResearch();
    } else {
      toast.error(result.error);
    }
  };

  const filteredResearch = research.filter(res => 
    res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Academic Research</h1>
          <p className="text-slate-500 font-medium mt-1">Manage publications and academic references</p>
        </div>
        <button
          onClick={() => { setEditingResearch(null); setIsFormOpen(true); }}
          className="w-full sm:w-auto px-6 py-3.5 bg-brand-forest text-white rounded-2xl font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand-forest/20 flex items-center justify-center gap-2"
        >
          <Plus size={20} /> Add Publication
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search publications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest transition-all"
            />
          </div>
        </div>

        {/* List */}
        <div className="p-6">
          {isLoading ? (
            <div className="py-12 text-center text-slate-400 font-bold animate-pulse">Loading publications...</div>
          ) : filteredResearch.length === 0 ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                <Search size={32} />
              </div>
              <p className="text-slate-500 font-medium">No publications found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredResearch.map((res) => (
                <div key={res.id} className="group p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-brand-forest/20 transition-all flex flex-col sm:flex-row justify-between gap-6">
                  <div className="flex-1">
                     <p className="text-slate-900 text-base leading-relaxed font-medium">
                      {res.authors} ({res.year}). <span className="font-bold text-brand-forest">{res.title}</span> <i>{res.source}.</i>
                    </p>
                    {res.url && (
                      <a href={res.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-brand-forest mt-3 bg-white px-3 py-1.5 rounded-lg border border-slate-100 transition-colors">
                        <ExternalLink size={14} /> Link attached
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => { setEditingResearch(res); setIsFormOpen(true); }}
                      className="p-2.5 text-slate-400 hover:text-brand-forest hover:bg-brand-forest/10 rounded-xl transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(res.id, res.title)}
                      className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsFormOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-2xl font-black text-slate-900">
                  {editingResearch ? "Edit Publication" : "Add Publication"}
                </h2>
                <p className="text-slate-500 font-medium mt-1">
                  Fill in the citation details for this academic research.
                </p>
              </div>
              <div className="p-8 max-h-[70vh] overflow-y-auto">
                <ResearchForm 
                  initialData={editingResearch}
                  onSuccess={() => {
                    setIsFormOpen(false);
                    fetchResearch();
                  }}
                  onCancel={() => setIsFormOpen(false)}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
