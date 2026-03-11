"use client";

import { useState, useTransition } from "react";
import { sendCampaign } from "@/lib/actions/newsletter";
import { campaignTemplates } from "@/lib/constants/templates";
import { Send, Layout, Type, AlignLeft, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function CampaignForm() {
  const initialTemplate = campaignTemplates && campaignTemplates.length > 0 ? campaignTemplates[0] : { id: "", name: "", subject: "", content: "" };
  
  const [selectedTemplate, setSelectedTemplate] = useState(initialTemplate);
  const [subject, setSubject] = useState(initialTemplate.subject);
  const [content, setContent] = useState(initialTemplate.content);
  const [isPending, startTransition] = useTransition();

  const handleTemplateChange = (template: typeof campaignTemplates[0]) => {
    setSelectedTemplate(template);
    setSubject(template.subject);
    setContent(template.content);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!confirm(`Are you sure you want to send this campaign to all subscribers?`)) return;

    const formData = new FormData();
    formData.append("templateId", selectedTemplate.id);
    formData.append("subject", subject);
    formData.append("content", content);

    startTransition(async () => {
      const result = await sendCampaign(formData);
      if (result.success) {
        toast.success(`Success! Campaign sent to ${result.sentCount} subscribers.`);
      } else {
        toast.error(result.error || "Failed to send campaign");
      }
    });
  };

  return (
    <div className="grid lg:grid-cols-3 gap-10">
      {/* Left Column: Template Selection */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center">
              <Layout size={20} />
            </div>
            <h3 className="font-black text-slate-900">Choose Template</h3>
          </div>

          <div className="space-y-3">
            {campaignTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateChange(template)}
                className={cn(
                  "w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-1",
                  selectedTemplate.id === template.id
                    ? "bg-brand-forest/5 border-brand-forest/30 ring-1 ring-brand-forest/30"
                    : "bg-white border-slate-100 hover:border-slate-300"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("text-sm font-bold", selectedTemplate.id === template.id ? "text-brand-forest" : "text-slate-900")}>
                    {template.name}
                  </span>
                  {selectedTemplate.id === template.id && <CheckCircle2 size={16} className="text-brand-forest" />}
                </div>
                <span className="text-[10px] text-slate-400 font-medium truncate">{template.subject}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex gap-4">
          <AlertCircle className="text-amber-500 shrink-0" size={20} />
          <p className="text-xs text-amber-900 font-medium leading-relaxed">
            Sending a campaign will email all active newsletter subscribers immediately. Please review your content carefully.
          </p>
        </div>
      </div>

      {/* Right Column: Editor & Preview */}
      <div className="lg:col-span-2 space-y-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 space-y-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                <Type size={12} /> Email Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject line"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-base font-bold text-slate-900 outline-none focus:ring-2 focus:ring-brand-forest/10 focus:border-brand-forest transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                <AlignLeft size={12} /> Message Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Compose your message..."
                rows={12}
                className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-6 text-base font-medium text-slate-700 outline-none focus:ring-2 focus:ring-brand-forest/10 focus:border-brand-forest transition-all resize-none"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
             <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">i</div>
                <span className="text-xs text-slate-400 font-medium italic">Email will include IREACT brand footer automatically.</span>
             </div>
             <button
              type="submit"
              disabled={isPending || !subject || !content}
              className="flex items-center gap-3 bg-brand-forest text-white px-10 py-5 rounded-2xl font-black text-base shadow-xl hover:bg-brand-dark transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 shrink-0"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Sending...
                </>
              ) : (
                <>
                  Launch Campaign <Send size={20} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Live Preview Card */}
        <div className="bg-slate-50 rounded-[2.5rem] p-2 border border-slate-100">
           <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-8 text-center">— Mobile Preview —</h4>
              <div className="max-w-md mx-auto border border-slate-100 rounded-3xl p-8 bg-white shadow-inner">
                <div className="text-center mb-10">
                  <h2 className="text-2xl font-black text-brand-forest m-0 leading-tight">IREACT Initiative</h2>
                  <p className="uppercase text-[8px] tracking-widest font-black text-slate-400 mt-1">Rural Empowerment</p>
                </div>
                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-900 leading-relaxed">
                    {content ? content.split('\n')[0] : "Email body content starts here..."}
                  </p>
                  <div className="space-y-2">
                    {content.split('\n').slice(1, 4).map((line, i) => (
                      <p key={i} className="text-[10px] text-slate-600 leading-relaxed">{line}</p>
                    ))}
                  </div>
                </div>
                <div className="mt-10 pt-6 border-t border-slate-50 text-center">
                  <div className="inline-block px-6 py-3 bg-brand-forest rounded-xl text-white font-black text-[10px]">Read More on Blog</div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
