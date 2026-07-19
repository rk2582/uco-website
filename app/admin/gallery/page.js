import { prisma } from '@/lib/prisma';
import { addGalleryImage, deleteGalleryImage } from '@/lib/admin-actions';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function AdminGallery() {
  let images = [];
  try {
    images = await prisma.galleryImage.findMany({ orderBy: { uploadedAt: 'desc' } });
  } catch {
    // DB not connected yet
  }

  return (
    <div>
      <h1 className="font-heading font-bold text-2xl text-navy mb-6">Gallery</h1>

      <form action={addGalleryImage} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8 grid sm:grid-cols-2 gap-4">
        <input name="imageUrl" placeholder="Image URL (upload to Supabase Storage first)" required className="border border-gray-300 rounded px-3 py-2 sm:col-span-2" />
        <input name="caption" placeholder="Caption (optional)" className="border border-gray-300 rounded px-3 py-2" />
        <input name="eventName" placeholder="Event name (optional)" className="border border-gray-300 rounded px-3 py-2" />
        <button type="submit" className="btn-primary sm:col-span-2 w-fit">Add Image</button>
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative h-32">
              <Image src={img.imageUrl} alt={img.caption || 'Gallery image'} fill className="object-cover" />
            </div>
            <div className="p-3 flex justify-between items-center">
              <p className="text-xs text-gray-500 truncate">{img.caption || img.eventName || 'Untitled'}</p>
              <form action={deleteGalleryImage.bind(null, img.id)}>
                <button type="submit" className="text-red-500 text-xs hover:underline">Remove</button>
              </form>
            </div>
          </div>
        ))}
        {images.length === 0 && <p className="col-span-full text-center text-gray-400 py-8">No images uploaded yet.</p>}
      </div>
    </div>
  );
}
