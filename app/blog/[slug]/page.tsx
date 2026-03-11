import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";

export default async function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col bg-white">
      {/* Blog Detail Hero */}
      <section className="relative flex min-h-[60vh] items-end pb-32 pt-52 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-slate-900">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill 
            className="object-cover opacity-50 brightness-[0.6] transition-scale duration-5000 ease-linear hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
          <div>
            <Link 
              href="/blog" 
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-brand-cyan px-4 py-1.5 text-xs font-black uppercase tracking-widest text-slate-900 shadow-xl">
              {post.category}
            </div>
            
            <h1 className="mb-10 text-4xl font-black leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl drop-shadow-2xl">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-200">
               <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm border border-white/10">
                  <Calendar className="h-5 w-5 text-brand-cyan" />
                  {post.date}
               </div>
               <div className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm border border-white/10">
                  <User className="h-5 w-5 text-brand-teal" />
                  By {post.author}
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white relative overflow-hidden">
        <div className="mx-auto max-w-4xl relative z-10">
          {/* Top Share Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-16 pb-8 border-b border-slate-100">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mr-4">Share Story:</span>
            <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 border border-slate-100 transition-all hover:bg-brand-forest hover:text-white hover:-translate-y-1 active:scale-95">
              <Facebook size={18} />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 border border-slate-100 transition-all hover:bg-[#1DA1F2] hover:text-white hover:-translate-y-1 active:scale-95">
              <Twitter size={18} />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 border border-slate-100 transition-all hover:bg-[#0077b5] hover:text-white hover:-translate-y-1 active:scale-95">
              <Linkedin size={18} />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all hover:bg-brand-cyan hover:text-slate-900 hover:-translate-y-1 active:scale-95 shadow-inner ml-auto">
              <LinkIcon size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-16 items-start">
            
            {/* Main Content Area */}
            <article className="prose-react bg-white">
              <ReactMarkdown>{post.content}</ReactMarkdown>
              
              <div className="mt-20 pt-12 border-t border-slate-100 font-medium text-slate-500">
                You're reading an original perspective from the REACT Initiative field team. We aim to scale global resilience with local leadership. 
              </div>
            </article>
          </div>

          {/* Comments Section */}
          <div className="mt-32 pt-20 border-t border-slate-100">
            <h3 className="text-3xl font-black mb-12 text-slate-900">Discussion (0)</h3>
            <div className="bg-slate-50 rounded-[2.5rem] p-10 md:p-16">
              <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                <div className="h-16 w-16 rounded-full bg-slate-200 flex-shrink-0"></div>
                <div className="grow w-full">
                  <textarea 
                    className="w-full bg-white rounded-3xl border border-slate-200 p-8 min-h-[150px] focus:ring-2 focus:ring-brand-cyan focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-slate-900" 
                    placeholder="Share your thoughts on this perspective..."
                  ></textarea>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
                    <p className="text-sm text-slate-500 font-medium italic">Your email will not be published.</p>
                    <button className="rounded-2xl bg-brand-forest px-8 py-4 text-sm font-bold text-white transition-all hover:bg-brand-dark hover:shadow-lg active:scale-95">
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>

              {/* Empty state or sample comment */}
              <div className="text-center py-10 opacity-40">
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Be the first to share a localized perspective</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Section (Simple) */}
      <section className="section-padding bg-slate-50 overflow-hidden relative">
        <div className="mx-auto max-w-7xl">
            <h3 className="text-3xl font-black mb-12 text-slate-900">Explore more perspectives</h3>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 opacity-80 hover:opacity-100 transition-all">
                {/* Simplified recommendation link */}
                <Link href="/blog" className="glass-card p-10 rounded-[2.5rem] border-none group transition-all hover:-translate-y-2 hover:bg-white hover:shadow-2xl">
                    <span className="text-brand-forest font-bold mb-4 inline-block text-xs uppercase tracking-widest">Resource Hub</span>
                    <h4 className="text-xl font-bold mb-6 text-slate-900 group-hover:text-brand-forest transition-colors leading-tight">Access all our field research and community impact stories</h4>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-forest text-white transition-transform group-hover:translate-x-3">
                        <ArrowLeft className="rotate-180" />
                    </div>
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
