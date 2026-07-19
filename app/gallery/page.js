import PageHero from '@/components/PageHero';
import Image from 'next/image';

export const metadata = { title: 'Gallery | UCO' };

// PLACEHOLDER images — replace with real event photos via admin panel later
const placeholderImages = [
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&w=800&auto=format&fit=crop',
];

export default function Gallery() {
  return (
    <div>
      <PageHero eyebrow="Moments" title="Gallery" subtitle="Placeholder images shown — replace with real event photography via the admin panel." />
      <section className="container-page py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {placeholderImages.map((src, i) => (
            <div key={i} className="relative h-56 rounded-lg overflow-hidden">
              <Image src={src} alt={`UCO gallery image ${i + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
