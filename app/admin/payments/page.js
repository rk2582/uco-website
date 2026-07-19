import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminPayments() {
  let payments = [];
  try {
    payments = await prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      include: { member: { select: { name: true, email: true } } },
    });
  } catch {
    // DB not connected yet
  }

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-navy mb-6">Payments ({payments.length})</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy text-white">
            <tr>
              <th className="px-4 py-3">Member</th>
              <th className="px-4 py-3">Purpose</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-navy">{p.member?.name || 'Anonymous / Donor'}</td>
                <td className="px-4 py-3 text-gray-600">{p.purpose.replace('_', ' ')}</td>
                <td className="px-4 py-3 text-gray-600">&#8377;{p.amount.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{p.razorpayOrderId}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    p.status === 'SUCCESS' ? 'bg-green-100 text-green-700' :
                    p.status === 'INITIATED' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{new Date(p.createdAt).toLocaleDateString('en-IN')}</td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No payments yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
