import { prisma } from '@/lib/prisma';
import { updateSupportRequestStatus } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default async function AdminSupportRequests() {
  let requests = [];
  try {
    requests = await prisma.supportRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: { member: { select: { name: true, email: true } } },
    });
  } catch {
    // DB not connected yet
  }

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-navy mb-6">
        Support Requests (Tendering / JV / Legal)
      </h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100">
        {requests.map((r) => (
          <div key={r.id} className="px-6 py-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-xs uppercase text-gold font-semibold">{r.type.replace('_', ' ')}</span>
                <p className="font-medium text-navy">{r.member?.name} &middot; {r.member?.email}</p>
              </div>
              <form action={async (formData) => {
                'use server';
                await updateSupportRequestStatus(r.id, formData.get('status'));
              }}>
                <select name="status" defaultValue={r.status} onChange={(e) => e.target.form.requestSubmit()} className="border border-gray-300 rounded px-2 py-1 text-sm">
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                </select>
              </form>
            </div>
            <p className="text-sm text-gray-600">{r.description}</p>
            <p className="text-xs text-gray-400 mt-1">{new Date(r.createdAt).toLocaleDateString('en-IN')}</p>
          </div>
        ))}
        {requests.length === 0 && <p className="px-6 py-8 text-center text-gray-400">No support requests yet.</p>}
      </div>
    </div>
  );
}
