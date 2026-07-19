import PageHero from '@/components/PageHero';
import { prisma } from '@/lib/prisma';

export const metadata = { title: 'Downloads | UCO' };
export const dynamic = 'force-dynamic';

export default async function Downloads() {
  let files = [];
  try {
    files = await prisma.download.findMany({ orderBy: { uploadedAt: 'desc' } });
  } catch {
    // DB not connected yet
  }

  return (
    <div>
      <PageHero eyebrow="Resource Library" title="Downloads" subtitle="Forms, circulars, membership documents and technical resources." />
      <section className="container-page py-16">
        {files.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No downloads published yet. Add files via the admin panel.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((f) => (
              <a
                key={f.id}
                href={f.fileUrl}
                className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold shrink-0 mt-1">
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div>
                  <h3 className="font-heading font-medium text-navy">{f.title}</h3>
                  {f.category && <p className="text-xs text-gray-400 mt-1">{f.category}</p>}
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
