import prisma from "@/lib/prisma";
import { 
  User as UserIcon, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  MoreVertical 
} from "lucide-react";

export default async function AdminUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900">User Management</h2>
        <p className="text-slate-500 font-medium">Manage all ambassadors and staff accounts.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest">Ambassador</th>
              <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest">Role</th>
              <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest">Joined Date</th>
              <th className="px-8 py-5 text-sm font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user: any) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-brand-forest/10 text-brand-forest flex items-center justify-center font-bold text-lg">
                      {user.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <Mail size={12} /> {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    user.role === 'ADMIN' 
                    ? 'bg-rose-50 text-rose-600 border-rose-100' 
                    : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <p className="text-sm font-bold text-slate-600 flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    {new Date(user.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </p>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
