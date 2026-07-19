import { prisma } from '@/lib/prisma';
import { addChapter, deleteChapter } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default async function AdminChapters() {
  let chapters = [];
  try {
    chapters = await prisma.stateChapter.findMany({ orderBy: { name: 'asc' } });
  } catch {
    // DB not connected yet
  }

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-navy mb-6">State / Regional Chapters</h1>

      <form action={addChapter} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8 grid sm:grid-cols-2 gap-4">
        <input name="name" placeholder="State / Region name" required className="border border-gray-300 rounded px-3 py-2" />
        <input name="region" placeholder="Zone (North / South / East / West)" className="border border-gray-300 rounded px-3 py-2" />
        <input name="chairpersonName" placeholder="Chapter chairperson" className="border border-gray-300 rounded px-3 py-2" />
        <input name="contactInfo" placeholder="Contact email/phone" className="border border-gray-300 rounded px-3 py-2" />
        <button type="submit" className="btn-primary sm:col-span-2 w-fit">Add Chapter</button>
      </form>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100">
        {chapters.map((c) => (
          <div key={c.id} className="flex justify-between items-center px-6 py-4">
            <div>
              <p className="font-medium text-navy">{c.name}</p>
              <p className="text-sm text-gray-500">{c.chairpersonName || 'No chairperson set'} &middot; {c.contactInfo || 'No contact set'}</p>
            </div>
            <form action={deleteChapter.bind(null, c.id)}>
              <button type="submit" className="text-red-500 text-sm hover:underline">Remove</button>
            </form>
          </div>
        ))}
        {chapters.length === 0 && <p className="px-6 py-8 text-center text-gray-400">No chapters added yet.</p>}
      </div>
    </div>
  );
}
