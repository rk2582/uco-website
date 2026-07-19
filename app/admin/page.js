import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getCounts() {
  try {
    const [members, activeMembers, payments, openRequests] = await Promise.all([
      prisma.member.count(),
      prisma.member.count({ where: { status: 'ACTIVE' } }),
      prisma.payment.count({ where: { status: 'SUCCESS' } }),
      prisma.supportRequest.count({ where: { status: 'OPEN' } }),
    ]);
    return { members, activeMembers, payments, openRequests };
  } catch {
    return { members: 0, activeMembers: 0, payments: 0, openRequests: 0 };
  }
}

export default async function AdminOverview() {
  const { members, activeMembers, payments, openRequests } = await getCounts();

  const cards = [
    { label: 'Total Members', value: members },
    { label: 'Active Members', value: activeMembers },
    { label: 'Successful Payments', value: payments },
    { label: 'Open Support Requests', value: openRequests },
  ];

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-navy mb-8">Admin Overview</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <p className="text-sm text-gray-500">{c.label}</p>
            <p className="font-heading font-bold text-3xl text-navy mt-2">{c.value}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-8">
        Use the sidebar to manage members, payments, content and support requests. Detailed
        revenue and membership breakdowns are on the Reports page.
      </p>
    </div>
  );
}
