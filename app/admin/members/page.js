import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminMembers() {
  let members = [];
  try {
    members = await prisma.member.findMany({ orderBy: { registrationDate: 'desc' } });
  } catch {
    // DB not connected yet
  }

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-navy mb-6">Members ({members.length})</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy text-white">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Chapter</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Registered</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-navy">{m.name}</td>
                <td className="px-4 py-3 text-gray-600">{m.email}</td>
                <td className="px-4 py-3 text-gray-600">{m.memberType.replace('MEMBERSHIP_', '')}</td>
                <td className="px-4 py-3 text-gray-600">{m.stateChapter || '-'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    m.status === 'ACTIVE' ? 'bg-green-100 text-green-700' :
                    m.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {m.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(m.registrationDate).toLocaleDateString('en-IN')}
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No members yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
