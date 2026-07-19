import PageHero from '@/components/PageHero';

export const metadata = { title: 'Vision & Mission | UCO' };

const values = [
  { title: 'Integrity', desc: 'Conducting business with honesty, transparency and accountability.' },
  { title: 'Professional Excellence', desc: 'Encouraging continuous learning, innovation and quality.' },
  { title: 'Unity', desc: 'Building a collaborative community that supports every member.' },
  { title: 'Leadership', desc: 'Representing industry concerns through constructive dialogue.' },
  { title: 'Sustainability', desc: 'Promoting responsible construction practices for future generations.' },
  { title: 'Nation Building', desc: 'Supporting infrastructure that improves lives and drives economic growth.' },
];

export default function VisionMission() {
  return (
    <div>
      <PageHero eyebrow="Our Foundation" title="Vision, Mission & Values" />
      <section className="container-page py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-navy text-white rounded-lg p-8">
            <h2 className="font-heading font-bold text-xl text-gold mb-3">Our Vision</h2>
            <p className="text-gray-200 leading-relaxed">
              To be the most respected and influential organisation representing contractors and
              infrastructure professionals worldwide.
            </p>
          </div>
          <div className="bg-gold rounded-lg p-8">
            <h2 className="font-heading font-bold text-xl text-navy mb-3">Our Mission</h2>
            <p className="text-navy/90 leading-relaxed">
              To promote professionalism, protect member interests, encourage ethical practices,
              foster collaboration and contribute to sustainable infrastructure development.
            </p>
          </div>
        </div>

        <h2 className="font-heading font-bold text-2xl text-navy mb-8">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v) => (
            <div key={v.title} className="border-l-4 border-gold pl-4">
              <h3 className="font-heading font-semibold text-navy mb-1">{v.title}</h3>
              <p className="text-sm text-gray-600">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
