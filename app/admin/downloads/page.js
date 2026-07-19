import { prisma } from '@/lib/prisma';
import { addDownload, deleteDownload } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default async function AdminDownloads() {
  let files = [];
  try {
    files = await prisma.download.findMany({ orderBy: { uploadedAt: 'desc' } });
  } catch {
    // DB not connected yet
  }

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-navy mb-6">Downloads</h1>

      <form action={addDownload} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8 grid sm:grid-cols-2 gap-4">
        <input name="title" placeholder="File title" required className="border border-gray-300 rounded px-3 py-2" />
        <input name="fileUrl" placeholder="File URL (upload to Supabase Storage first)" required className="border border-gray-300 rounded px-3 py-2" />
        <input name="category" placeholder="Category (optional)" className="border border-gray-300 rounded px-3 py-2" />
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" name="isMemberOnly" /> Member-only file
        </label>
        <button type="submit" className="btn-primary sm:col-span-2 w-fit">Add Download</button>
      </form>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100">
        {files.map((f) => (
          <div key={f.id} className="flex justify-between items-center px-6 py-4">
            <div>
              <p className="font-medium text-navy">{f.title}</p>
              <p className="text-sm text-gray-500">{f.category || 'Uncategorised'} {f.isMemberOnly && '· Member-only'}</p>
            </div>
            <form action={deleteDownload.bind(null, f.id)}>
              <button type="submit" className="text-red-500 text-sm hover:underline">Remove</button>
            </form>
          </div>
        ))}
        {files.length === 0 && <p className="px-6 py-8 text-center text-gray-400">No files uploaded yet.</p>}
      </div>
    </div>
  );
}
