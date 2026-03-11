"use client";

import { Mail, Calendar, Trash2, Loader2 } from "lucide-react";
import { deleteSubscriber } from "@/lib/actions/newsletter";
import { useTransition } from "react";
import { toast } from "sonner";

export default function SubscriberList({ subscribers }: { subscribers: any[] }) {
  const [isPending, startTransition] = useTransition();

  const onDelete = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to remove ${email}?`)) return;

    startTransition(async () => {
      const result = await deleteSubscriber(id);
      if (result.success) {
        toast.success("Subscriber removed");
      } else {
        toast.error(result.error || "Failed to remove subscriber");
      }
    });
  };

  return (
    <div className="bg-white rounded-5xl overflow-hidden shadow-sm border border-slate-100">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Subscriber</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Date Joined</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {subscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Mail size={18} />
                    </div>
                    <span className="text-sm font-bold text-slate-900">{sub.email}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <Calendar size={14} className="text-slate-400" />
                    {new Date(sub.createdAt).toLocaleDateString(undefined, { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button 
                    onClick={() => onDelete(sub.id, sub.email)}
                    disabled={isPending}
                    className="p-2 text-slate-300 hover:text-rose-500 transition-colors disabled:opacity-50"
                  >
                    {isPending ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {subscribers.length === 0 && (
        <div className="py-20 text-center">
          <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <Mail size={32} />
          </div>
          <p className="text-slate-400 font-medium italic">No subscribers found in the database.</p>
        </div>
      )}
    </div>
  );
}
