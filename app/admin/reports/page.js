import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getReportData() {
  try {
    const [byType, byStatus, byChapter, revenueByPurpose, revenueTotal, upcomingExpiries] = await Promise.all([
      prisma.member.groupBy({ by: ['memberType'], _count: true }),
      prisma.member.groupBy({ by: ['status'], _count: true }),
      prisma.member.groupBy({ by: ['stateChapter'], _count: true }),
      prisma.payment.groupBy({ by: ['purpose'], where: { status: 'SUCCESS' }, _sum: { amount: true }, _count: true }),
      prisma.payment.aggregate({ where: { status: 'SUCCESS' }, _sum: { amount: true } }),
      prisma.member.findMany({
        where: {
          membershipExpiry: {
            gte: new Date(),
            lte: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          },
        },
        select: { name: true, email: true, membershipExpiry: true },
        orderBy: { membershipExpiry: 'asc' },
      }),
    ]);
    return { byType, byStatus, byChapter, revenueByPurpose, revenueTotal, upcomingExpiries };
  } catch {
    return { byType: [], byStatus: [], byChapter: [], revenueByPurpose: [], revenueTotal: { _sum: { amount: 0 } }, upcomingExpiries: [] };
  }
}

export default async function Reports() {
  const { byType, byStatus, byChapter, revenueByPurpose, revenueTotal, upcomingExpiries } = await getReportData();

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-navy mb-8">Reports</h1>

      <div className="bg-navy text-white rounded-lg p-6 mb-8">
        <p className="text-sm text-gray-300">Total Revenue Collected</p>
        <p className="font-heading font-bold text-4xl text-gold mt-1">
          &#8377;{(revenueTotal._sum.amount || 0).toLocaleString('en-IN')}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <ReportCard title="Members by Type">
          {byType.map((r) => <Row key={r.memberType} label={r.memberType} value={r._count} />)}
        </ReportCard>

        <ReportCard title="Members by Status">
          {byStatus.map((r) => <Row key={r.status} label={r.status} value={r._count} />)}
        </ReportCard>

        <ReportCard title="Revenue by Purpose">
          {revenueByPurpose.map((r) => (
            <Row key={r.purpose} label={r.purpose} value={`₹${(r._sum.amount || 0).toLocaleString('en-IN')} (${r._count})`} />
          ))}
        </ReportCard>

        <ReportCard title="Members by Chapter">
          {byChapter.map((r) => <Row key={r.stateChapter || 'unassigned'} label={r.stateChapter || 'Unassigned'} value={r._count} />)}
        </ReportCard>
      </div>

      <ReportCard title="Upcoming Membership Expiries (next 60 days)">
        {upcomingExpiries.length === 0 ? (
          <p className="text-sm text-gray-400">None upcoming.</p>
        ) : (
          upcomingExpiries.map((m) => (
            <Row key={m.email} label={`${m.name} (${m.email})`} value={new Date(m.membershipExpiry).toLocaleDateString('en-IN')} />
          ))
        )}
      </ReportCard>
    </div>
  );
}

function ReportCard({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <h2 className="font-heading font-semibold text-navy mb-4">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm border-b border-gray-50 pb-2">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-navy">{value}</span>
    </div>
  );
}
