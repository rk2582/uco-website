import { prisma } from '@/lib/prisma';
import { addNECMember, deleteNECMember } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default async function AdminNEC() {
  let members = [];
  try {
    members = await prisma.nECMember.findMany({ orderBy: { displayOrder: 'asc' } });
  } catch {
    // DB not connected yet
  }

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-navy mb-6">National Executive Committee</h1>

      <form action={addNECMember} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8 grid sm:grid-cols-2 gap-4">
        <input name="name" placeholder="Full name" required className="border border-gray-300 rounded px-3 py-2" />
        <input name="designation" placeholder="Designation" required className="border border-gray-300 rounded px-3 py-2" />
        <input name="photoUrl" placeholder="Photo URL (optional)" className="border border-gray-300 rounded px-3 py-2" />
        <input name="bio" placeholder="Short bio (optional)" className="border border-gray-300 rounded px-3 py-2" />
        <button type="submit" className="btn-primary sm:col-span-2 w-fit">Add NEC Member</button>
      </form>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100">
        {members.map((m) => (
          <div key={m.id} className="flex justify-between items-center px-6 py-4">
            <div>
              <p className="font-medium text-navy">{m.name}</p>
              <p className="text-sm text-gray-500">{m.designation}</p>
            </div>
            <form action={deleteNECMember.bind(null, m.id)}>
              <button type="submit" className="text-red-500 text-sm hover:underline">Remove</button>
            </form>
          </div>
        ))}
        {members.length === 0 && <p className="px-6 py-8 text-center text-gray-400">No NEC members added yet.</p>}
      </div>
    </div>
  );
}
