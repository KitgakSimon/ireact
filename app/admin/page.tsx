import prisma from "@/lib/prisma";
import { 
  Users, 
  MessageSquare, 
  FileText, 
  TrendingUp, 
  ArrowUpRight,
  Mail 
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const userCount = await (prisma as any).user.count();
  const postCount = await (prisma as any).post.count();
  const commentCount = await (prisma as any).comment.count();
  const subscriberCount = await (prisma as any).newsletter.count();

  const stats = [
    { name: "Total Users", value: userCount, icon: <Users />, color: "bg-blue-50 text-blue-600" },
    { name: "Blog Posts", value: postCount, icon: <FileText />, color: "bg-emerald-50 text-emerald-600" },
    { name: "Newsletter", value: subscriberCount, icon: <Mail />, color: "bg-purple-50 text-purple-600" },
    { name: "Comments", value: commentCount, icon: <MessageSquare />, color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-6">
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.name}</p>
              <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Recent Subscribers */}
        <div className="bg-white rounded-5xl p-8 shadow-sm border border-slate-100">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900">Recent Subscribers</h3>
              <Link href="/admin/subscribers" className="text-sm font-bold text-brand-forest hover:underline">View All</Link>
           </div>
           
           <div className="space-y-4">
              {(await (prisma as any).newsletter.findMany({ take: 5, orderBy: { createdAt: 'desc' } })).map((sub: any) => (
                <div key={sub.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                         <Mail size={16} />
                      </div>
                      <div>
                         <p className="text-sm font-bold text-slate-900">{sub.email}</p>
                         <p className="text-[10px] text-slate-400 font-medium">Joined {new Date(sub.createdAt).toLocaleDateString()}</p>
                      </div>
                   </div>
                   <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                </div>
              ))}
              {subscriberCount === 0 && (
                <div className="py-10 text-center text-slate-400 italic">No subscribers yet.</div>
              )}
           </div>
        </div>

        {/* Recent Comments */}
        <div className="bg-white rounded-5xl p-8 shadow-sm border border-slate-100">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900">Recent Comments</h3>
              <Link href="/admin/comments" className="text-sm font-bold text-brand-forest hover:underline">View All</Link>
           </div>
           
           <div className="space-y-4">
              {(await (prisma as any).comment.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { user: true } })).map((comment: any) => (
                <div key={comment.id} className="flex flex-col gap-2 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors">
                   <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-brand-cyan">{comment.user?.name || comment.guestName}</span>
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

      {/* Recent Users */}
      <div className="bg-white rounded-5xl p-8 shadow-sm border border-slate-100">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900">Recent Ambassadors</h3>
            <Link href="/admin/users" className="text-sm font-bold text-brand-forest hover:underline">View All</Link>
         </div>
         
         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(await (prisma as any).user.findMany({ take: 6, orderBy: { createdAt: 'desc' } })).map((user: any) => (
              <div key={user.id} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors">
                 <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-lg">
                    {user.name?.charAt(0)}
                 </div>
                 <div>
                    <p className="text-sm font-bold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
