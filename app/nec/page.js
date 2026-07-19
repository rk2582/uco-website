import PageHero from '@/components/PageHero';
import Image from 'next/image';

export const metadata = { title: 'National Executive Committee | UCO' };

// PLACEHOLDER DATA — replace with real NEC members (name, designation, photo)
const necMembers = [
  { name: 'To Be Updated', designation: 'National President', photo: 'https://placehold.co/300x300/0A2647/FFFFFF?text=Photo' },
  { name: 'To Be Updated', designation: 'National Vice President', photo: 'https://placehold.co/300x300/0A2647/FFFFFF?text=Photo' },
  { name: 'To Be Updated', designation: 'General Secretary', photo: 'https://placehold.co/300x300/0A2647/FFFFFF?text=Photo' },
  { name: 'To Be Updated', designation: 'Treasurer', photo: 'https://placehold.co/300x300/0A2647/FFFFFF?text=Photo' },
  { name: 'To Be Updated', designation: 'Joint Secretary', photo: 'https://placehold.co/300x300/0A2647/FFFFFF?text=Photo' },
  { name: 'To Be Updated', designation: 'Executive Member', photo: 'https://placehold.co/300x300/0A2647/FFFFFF?text=Photo' },
];

export default function NEC() {
  return (
    <div>
      <PageHero eyebrow="Leadership" title="National Executive Committee" subtitle="Placeholder members shown below — replace with actual NEC details via the admin panel." />
      <section className="container-page py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {necMembers.map((m, i) => (
            <div key={i} className="text-center">
              <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-4">
                <Image src={m.photo} alt={m.name} fill className="object-cover" />
              </div>
              <h3 className="font-heading font-semibold text-navy">{m.name}</h3>
              <p className="text-sm text-gold">{m.designation}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
