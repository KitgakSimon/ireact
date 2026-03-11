"use client";

import { useState, useTransition } from "react";
import { postComment } from "@/lib/actions/blog";
import { MessageSquare, Send, Loader2, User as UserIcon, AlertCircle, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const StarRating = ({ rating, setRating, interactive = true }: { rating: number, setRating?: (r: number) => void, interactive?: boolean }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => interactive && setRating?.(s)}
          onMouseEnter={() => interactive && setHoverRating(s)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={`
            ${interactive ? 'hover:scale-125 transition-all duration-200 cursor-pointer active:scale-95' : ''} 
            ${s <= (hoverRating || rating) ? 'text-amber-400' : 'text-slate-200'}
          `}
        >
          <Star 
            size={interactive ? 28 : 14} 
            fill={s <= (hoverRating || rating) ? "currentColor" : "transparent"} 
            className="transition-colors"
          />
        </button>
      ))}
    </div>
  );
};

export default function CommentSection({ postId, comments, session }: { postId: string, comments: any[], session: any }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [guestName, setGuestName] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  const handlePost = () => {
    if (!content.trim()) return;
    
    startTransition(async () => {
      setError("");
      const result = await postComment(postId, {
        content,
        rating,
        guestName: session ? undefined : guestName,
      });

      if (result.success) {
        toast.success("Review posted!", {
          description: "Thank you for sharing your perspective."
        });
        setContent("");
        setGuestName("");
        setRating(0);
        router.refresh();
      } else {
        toast.error("Failed to post review", {
          description: result.error || "Please try again later."
        });
        setError(result.error || "Failed to post comment");
      }
    });
  };

  return (
    <div className="mt-32 pt-20 border-t border-slate-100">
      <div className="flex items-center gap-4 mb-12">
        <h3 className="text-3xl font-black text-slate-900">Discussion & Reviews</h3>
        <span className="px-4 py-1 rounded-full bg-slate-100 text-slate-500 font-bold text-sm">
          {comments.length}
        </span>
      </div>

      <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12">
        {/* Comment Form */}
        <div className="flex flex-col gap-8 mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="h-14 w-14 rounded-2xl bg-brand-forest text-white flex items-center justify-center shrink-0 shadow-lg shadow-forest-500/20">
              <UserIcon size={24} />
            </div>
            
            <div className="grow w-full space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div>
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Overall Rating</p>
                   <StarRating rating={rating} setRating={setRating} />
                </div>
                {!session && (
                  <div className="grow sm:max-w-xs">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Your Name</p>
                    <input 
                      type="text"
                      placeholder="Enter your name..."
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-cyan/20"
                    />
                  </div>
                )}
              </div>

              <div className="relative group">
                 <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={isPending}
                  className="w-full bg-white rounded-3xl border border-slate-200 p-8 min-h-[150px] focus:ring-4 focus:ring-brand-cyan/10 focus:border-brand-cyan outline-none transition-all placeholder:text-slate-300 text-slate-900 shadow-sm" 
                  placeholder="Share your thoughts or leave a review..."
                 ></textarea>
                 {error && (
                   <div className="mt-4 flex items-center gap-2 text-rose-500 text-xs font-bold animate-in fade-in slide-in-from-top-1">
                      <AlertCircle size={14} />
                      {error}
                   </div>
                 )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-6">
                <p className="text-sm text-slate-400 font-medium italic">
                  {session ? `Logged in as ${session.name}` : "Posting as Guest"}
                </p>
                <button 
                  onClick={handlePost}
                  disabled={isPending || !content.trim() || rating === 0 || (!session && !guestName.trim())}
                  className="flex items-center gap-3 rounded-2xl bg-brand-forest px-8 py-4 text-sm font-bold text-white transition-all hover:bg-brand-dark hover:shadow-xl hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {isPending ? <Loader2 className="animate-spin h-4 w-4" /> : <Send size={18} />}
                  Post Review
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-8">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 font-black shadow-sm shrink-0">
                  {(comment.user?.name || comment.guestName || "?").charAt(0)}
               </div>
               <div className="grow p-8 rounded-3xl bg-white shadow-sm border border-slate-100/50">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                     <div className="flex flex-col gap-1">
                        <span className="text-sm font-black text-slate-900">{comment.user?.name || comment.guestName}</span>
                        <StarRating rating={comment.rating} interactive={false} />
                     </div>
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">
                        {new Date(comment.createdAt).toLocaleDateString()}
                     </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium">
                     {comment.content}
                  </p>
               </div>
            </div>
          ))}

          {comments.length === 0 && (
            <div className="text-center py-10 opacity-40">
              <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Be the first to share a localized perspective</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
