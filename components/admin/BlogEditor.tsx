"use client";

import { useState, useTransition, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { 
  Save, 
  Loader2, 
  ArrowLeft, 
  Image as ImageIcon, 
  Eye, 
  Sparkles, 
  Upload, 
  Link as LinkIcon,
  X,
  Plus
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBlogPost } from "@/lib/actions/blog";
import { toast } from "sonner";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const GEMINI_API_KEY = "AIzaSyCHHyQQTqPzzdcDhTV_TD6Ijqv5bCHfbLE"; // Provided by user
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const PLACEHOLDER_IMAGE = "https://blocks.astratic.com/img/general-img-landscape.png";

export default function BlogEditor({ initialData }: { initialData?: any }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [isPreview, setIsPreview] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isAiRefining, setIsAiRefining] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSave = () => {
    if (!title || !content) {
      toast.error("Required Fields Missing", {
        description: "Please provide both a title and content for your story."
      });
      return;
    }

    startTransition(async () => {
      let result;
      if (initialData?.id) {
        // We need to import updateBlogPost at the top
        result = await import("@/lib/actions/blog").then(m => 
            m.updateBlogPost(initialData.id, { title, excerpt, content, image: image || PLACEHOLDER_IMAGE })
        );
      } else {
        result = await createBlogPost({ title, excerpt, content, image: image || PLACEHOLDER_IMAGE });
      }
      
      if (result.success) {
        toast.success(initialData?.id ? "Story Updated!" : "Story Published!", {
          description: initialData?.id ? "Your changes have been saved." : "Your impact story is now live on the platform."
        });
        router.push("/admin/blog");
      } else {
        toast.error("Save Failed", {
          description: result.error || "An unexpected error occurred."
        });
      }
    });
  };

  const refineWithAI = async () => {
    if (!content && !title) {
        toast.error("Nothing to refine", { description: "Please enter some content or a title first." });
        return;
    }

    setIsAiRefining(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `Refine this blog post content for the REACT Initiative (Rural Empowerment and Climate Technology). 
      Make it professional, engaging, and impactful. Return the refined content in HTML format suitable for a blog post.
      
      Title: ${title}
      Excerpt: ${excerpt}
      Current Content: ${content}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Basic cleanup if Gemini wraps in markdown code blocks
      const cleanHtml = text.replace(/```html|```/g, "").trim();
      setContent(cleanHtml);
      
      toast.success("Content Refined", {
        description: "AI has polished your story for maximum impact."
      });
    } catch (error) {
      console.error("AI Refinement error:", error);
      toast.error("AI Refinement Failed", {
        description: "Could not connect to Gemini service."
      });
    } finally {
      setIsAiRefining(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setShowImageInput(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Header Navigation */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-slate-50/80 backdrop-blur-md py-4 border-b border-slate-200 -mx-4 px-4 sticky-nav">
          <div className="flex items-center gap-4">
            <Link href="/admin/blog" className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-forest transition-all shadow-sm">
                <ArrowLeft size={18} />
            </Link>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">Editor</h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">REACT CMS</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <button 
               onClick={() => setIsPreview(!isPreview)}
               className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold border transition-all ${isPreview ? 'bg-brand-forest text-white border-brand-forest shadow-lg' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-forest'}`}
             >
                <Eye size={16} />
                {isPreview ? "Exit Preview" : "Preview"}
             </button>

             <button 
               onClick={() => setShowImageInput(!showImageInput)}
               className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold border transition-all ${image ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-white text-slate-600 border-slate-200'}`}
             >
                <ImageIcon size={16} />
                {image ? "Change Image" : "Add Cover"}
             </button>

             <button 
               onClick={refineWithAI}
               disabled={isAiRefining}
               className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-100 transition-all disabled:opacity-50"
             >
                {isAiRefining ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                AI Refine
             </button>

             <button 
               onClick={handleSave}
               disabled={isPending}
               className="flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold bg-brand-forest text-white shadow-xl shadow-brand-forest/10 hover:bg-brand-dark transition-all disabled:opacity-50"
             >
                {isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                Publish
             </button>
          </div>
      </div>

      {/* Image Input Bar */}
      {showImageInput && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl animate-in fade-in slide-in-from-top-4">
           <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-black text-slate-900">Configure Featured Image</h4>
              <button onClick={() => setShowImageInput(false)} className="text-slate-400 hover:text-rose-500"><X size={20} /></button>
           </div>
           <div className="grid md:grid-cols-2 gap-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-brand-cyan hover:bg-slate-50 transition-all cursor-pointer group"
              >
                  <Upload size={32} className="text-slate-300 group-hover:text-brand-cyan transition-colors" />
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-900">Upload Media</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">JPG, PNG up to 5MB</p>
                  </div>
                  <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>
              <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-400 mb-2">
                     <LinkIcon size={16} />
                     <span className="text-[10px] font-bold uppercase tracking-widest">Or Paste Image URL</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="https://images.unsplash.com/..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-cyan/20"
                  />
                  {image && (
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-100 group">
                       <img src={image} className="w-full h-full object-cover" alt="Preview" />
                       <button onClick={() => setImage("")} className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><X size={16} /></button>
                    </div>
                  )}
              </div>
           </div>
        </div>
      )}

      {/* Editor Main Area */}
      {isPreview ? (
        <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-sm border border-slate-100 space-y-12 animate-in fade-in duration-500">
           <div className="max-w-4xl mx-auto space-y-10">
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl">
                 <img 
                    src={image || PLACEHOLDER_IMAGE} 
                    className="w-full h-full object-cover" 
                    alt="Cover"
                 />
              </div>
              <div className="space-y-6 text-center">
                 <h1 className="text-5xl font-black text-slate-900 leading-tight">{title || "Untilted Masterpiece"}</h1>
                 <p className="text-2xl text-slate-500 italic max-w-3xl mx-auto font-medium leading-relaxed">{excerpt}</p>
                 <div className="flex items-center justify-center gap-4 pt-6 border-t border-slate-50">
                    <div className="h-10 w-10 rounded-full bg-brand-forest"></div>
                    <div className="text-left">
                       <p className="text-sm font-black text-slate-900">Article Preview</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Local Draft Only</p>
                    </div>
                 </div>
              </div>
              <div 
                className="prose prose-xl prose-slate max-w-none pt-10 border-t border-slate-50"
                dangerouslySetInnerHTML={{ __html: content }}
              />
           </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative group">
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post Title..."
              className="w-full text-3xl font-black bg-white border border-slate-100 rounded-3xl px-8 py-6 placeholder:text-slate-100 focus:outline-none focus:ring-4 focus:ring-brand-cyan/5 focus:border-brand-cyan transition-all"
            />
          </div>

          <div className="space-y-6">
                <div className="bg-white border border-slate-100 rounded-3xl p-4 min-h-[500px] shadow-sm flex flex-col">
                    <ReactQuill 
                      theme="snow" 
                      value={content} 
                      onChange={setContent}
                      placeholder="Write your perspective here..."
                      className="flex-1 rounded-3xl overflow-hidden border-none quill-editor-surface"
                  modules={{
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        ['link', 'image'],
                        ['clean']
                    ],
                  }}
                />
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-6 w-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                      <ImageIcon size={14} />
                    </div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Short Summary / SEO Excerpt</label>
                </div>
                <textarea 
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A brief summary for search results and cards..."
                  className="w-full h-24 bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 transition-all resize-none"
                />
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .quill-editor-surface .ql-container {
          border: none !important;
          font-size: 1.1rem;
          font-family: inherit;
        }
        .quill-editor-surface .ql-toolbar {
          border: none !important;
          border-bottom: 1px solid #f1f5f9 !important;
          padding: 1rem 2rem !important;
        }
        .quill-editor-surface .ql-editor {
          padding: 2.5rem 2.5rem !important;
          min-h-[500px];
        }
        .prose h1 { margin-bottom: 2rem; font-weight: 900; color: #0f172a; }
        .prose p { margin-bottom: 1.5rem; line-height: 1.8; color: #475569; }
      `}</style>
    </div>
  );
}
