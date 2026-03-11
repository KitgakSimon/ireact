import prisma from "@/lib/prisma";
import { 
  Users, 
  MessageSquare, 
  FileText, 
  TrendingUp, 
  ArrowUpRight 
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const userCount = await prisma.user.count();
  const postCount = await prisma.post.count();
  const commentCount = await prisma.comment.count();

  const stats = [
    { name: "Total Users", value: userCount, icon: <Users />, color: "bg-blue-50 text-blue-600" },
    { name: "Blog Posts", value: postCount, icon: <FileText />, color: "bg-emerald-50 text-emerald-600" },
    { name: "Total Comments", value: commentCount, icon: <MessageSquare />, color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6">
            <div className={`h-16 w-16 rounded-2xl flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.name}</p>
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Recent Users */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900">Recent Ambassadors</h3>
              <Link href="/admin/users" className="text-sm font-bold text-brand-forest hover:underline">View All</Link>
           </div>
           
           <div className="space-y-4">
              {(await prisma.user.findMany({ take: 5, orderBy: { createdAt: 'desc' } })).map((user: any) => (
                <div key={user.id} className="flex items-center justify-between p-4 rounded-2x border border-slate-50 hover:bg-slate-50 transition-colors rounded-2xl">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                         {user.name?.charAt(0)}
                      </div>
                      <div>
                         <p className="text-sm font-bold text-slate-900">{user.name}</p>
                         <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{new Date(user.createdAt).toLocaleDateString()}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Recent Comments */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900">Recent Comments</h3>
              <Link href="/admin/comments" className="text-sm font-bold text-brand-forest hover:underline">View All</Link>
           </div>
           
           <div className="space-y-4">
              {(await prisma.comment.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { user: true } })).map((comment: any) => (
                <div key={comment.id} className="flex flex-col gap-2 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors">
                   <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-brand-cyan">{comment.user.name}</span>
                      <span className="text-[10px] text-slate-400">• {new Date(comment.createdAt).toLocaleDateString()}</span>
                   </div>
                   <p className="text-sm text-slate-600 line-clamp-2 italic">"{comment.content}"</p>
                </div>
              ))}
              {commentCount === 0 && (
                <div className="py-10 text-center text-slate-400 italic">No comments yet.</div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
