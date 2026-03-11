import prisma from "@/lib/prisma";
import SubscriberList from "@/components/admin/SubscriberList";

export default async function SubscribersPage() {
  const subscribers = await (prisma as any).newsletter.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-slate-900 mb-2">Newsletter Subscribers</h2>
        <p className="text-slate-500 font-medium">Manage and view all users who have subscribed to your newsletter.</p>
      </div>

      <SubscriberList subscribers={subscribers} />
    </div>
  );
}
