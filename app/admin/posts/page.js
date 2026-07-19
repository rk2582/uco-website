import { prisma } from '@/lib/prisma';
import { addPost, deletePost } from '@/lib/admin-actions';

export const dynamic = 'force-dynamic';

export default async function AdminPosts() {
  let posts = [];
  try {
    posts = await prisma.post.findMany({ orderBy: { publishDate: 'desc' } });
  } catch {
    // DB not connected yet
  }

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-navy mb-6">
        News / Notifications / Training / Conference
      </h1>

      <form action={addPost} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8 grid gap-4">
        <input name="title" placeholder="Title" required className="border border-gray-300 rounded px-3 py-2" />
        <textarea name="body" placeholder="Content" required rows={4} className="border border-gray-300 rounded px-3 py-2" />
        <div className="grid sm:grid-cols-2 gap-4">
          <select name="category" required className="border border-gray-300 rounded px-3 py-2">
            <option value="NEWS">News & Media</option>
            <option value="NOTIFICATION">Government Notification</option>
            <option value="TRAINING">Training & Workshop</option>
            <option value="CONFERENCE">Annual Conference</option>
          </select>
          <input name="attachmentUrl" placeholder="Attachment URL (optional)" className="border border-gray-300 rounded px-3 py-2" />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" name="isMemberOnly" /> Member-only content
        </label>
        <button type="submit" className="btn-primary w-fit">Publish</button>
      </form>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100">
        {posts.map((p) => (
          <div key={p.id} className="flex justify-between items-start px-6 py-4">
            <div>
              <span className="text-xs uppercase text-gold font-semibold">{p.category}</span>
              <p className="font-medium text-navy">{p.title}</p>
              <p className="text-sm text-gray-500">{new Date(p.publishDate).toLocaleDateString('en-IN')}</p>
            </div>
            <form action={deletePost.bind(null, p.id)}>
              <button type="submit" className="text-red-500 text-sm hover:underline">Remove</button>
            </form>
          </div>
        ))}
        {posts.length === 0 && <p className="px-6 py-8 text-center text-gray-400">No posts published yet.</p>}
      </div>
    </div>
  );
}
