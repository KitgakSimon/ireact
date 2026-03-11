import { getSession } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Users, 
  MessageSquare, 
  FileText, 
  LayoutDashboard, 
  ArrowLeft, 
  Settings,
  Bell
} from "lucide-react";
import Logo from "@/components/common/Logo";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    redirect("/login");
  }

  const sidebarLinks = [
    { name: "Overview", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Users", href: "/admin/users", icon: <Users size={20} /> },
    { name: "Blog Posts", href: "/admin/blog", icon: <FileText size={20} /> },
    { name: "Comments", href: "/admin/comments", icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-slate-200 z-50 hidden lg:block">
        <div className="p-8 border-b border-slate-100 mb-8">
           <Logo isDark className="scale-110 origin-left" />
           <p className="text-[10px] font-black uppercase tracking-widest text-brand-cyan mt-2">Administrative Portal</p>
        </div>

        <nav className="px-4 space-y-2">
          {sidebarLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-brand-forest transition-all"
            >
              <span className="text-slate-400">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 left-8 right-8">
           <Link 
            href="/" 
            className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-brand-forest transition-colors"
           >
             <ArrowLeft size={16} /> Back to Site
           </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between">
           <h1 className="text-lg font-black text-slate-900">Admin Dashboard</h1>
           
           <div className="flex items-center gap-6">
              <button className="relative p-2 text-slate-400 hover:text-brand-forest transition-colors">
                 <Bell size={20} />
                 <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 border-2 border-white"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                 <div className="text-right hidden sm:block">
                    <p className="text-sm font-black text-slate-900">{session.name as string}</p>
                    <p className="text-[10px] font-bold text-brand-cyan uppercase tracking-wider">{session.role as string}</p>
                 </div>
                 <div className="h-10 w-10 rounded-xl bg-brand-forest text-white flex items-center justify-center font-bold">
                    {(session.name as string).charAt(0)}
                 </div>
              </div>
           </div>
        </header>

        <div className="flex-1 p-8">
          {children}
        </div>

        {/* Admin Footer */}
        <footer className="mt-auto px-8 py-6 border-t border-slate-100 flex items-center justify-between bg-white/50">
           <div className="flex items-center gap-3">
              <Logo className="h-4 w-auto grayscale opacity-50" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administrative Portal</span>
           </div>
           <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              Powered by <span className="text-slate-900">Next.js</span>
           </p>
        </footer>
      </main>
    </div>
  );
}
