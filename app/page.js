import Link from 'next/link';
import Image from 'next/image';

const services = [
  { title: 'Professional Representation', desc: 'Advocating for the collective interests of contractors before government authorities, regulators and public institutions.' },
  { title: 'Technical & Legal Support', desc: 'Guidance on contracts, procurement, dispute resolution, engineering practices and regulatory compliance.' },
  { title: 'Knowledge & Training', desc: 'Conferences, seminars, workshops, certification programmes, technical sessions and leadership development.' },
  { title: 'Business Networking', desc: 'Connecting contractors, consultants, suppliers, manufacturers, technology providers and financial institutions.' },
];

const impactStats = [
  { value: '5,000+', label: 'Registered Contractor Members' },
  { value: '20+', label: 'State & Regional Chapters' },
  { value: '150+', label: 'Training Sessions Delivered' },
  { value: '6', label: 'International Chapter Regions' },
];

const internationalRegions = ['Middle East', 'Southeast Asia', 'Europe', 'Africa', 'North America', 'Australia'];

export default function Home() {
  return (
    <div>
      {/* Hero — dark image background, white pill CTA, matching reference */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop"
            alt="Skyline under construction at dusk"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy/80 to-transparent" />
        </div>
        <div className="relative container-page py-28 sm:py-36">
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl max-w-2xl leading-tight">
            Building Excellence. Empowering Contractors.
          </h1>
          <p className="mt-5 text-lg text-gray-200 max-w-xl">
            The Collective Voice of India&apos;s Construction &amp; Infrastructure Industry.
          </p>
          <div className="mt-8">
            <Link href="/become-member" className="btn-hero">Become a Member</Link>
          </div>
        </div>
      </section>

      {/* Services — light gray panel, white cards, navy headings, outline "Learn More" */}
      <section className="py-16 bg-panel">
        <div className="container-page">
          <div className="flex justify-between items-end mb-10">
            <h2 className="font-heading font-bold text-3xl text-navy">Services</h2>
            <Link href="/about" className="btn-outline hidden sm:inline-block">Explore Our Services</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded p-6 shadow-sm">
                <h3 className="font-heading font-semibold text-navy mb-3">{s.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{s.desc}</p>
                <Link href="/about" className="text-navy text-sm font-semibold inline-flex items-center gap-1 hover:text-gold">
                  Learn More <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact — diagonal navy-to-maroon gradient band, matching reference exactly */}
      <section className="bg-navy-maroon-gradient text-white py-14">
        <div className="container-page">
          <h2 className="font-heading font-bold text-2xl mb-2">Impact</h2>
          <p className="text-gray-200 max-w-3xl mb-10 text-sm">
            UCO continues to strengthen India&apos;s construction and infrastructure ecosystem,
            reflecting the industry&apos;s growing national and international footprint.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((s) => (
              <div key={s.label}>
                <p className="font-heading font-bold text-3xl sm:text-4xl">{s.value}</p>
                <p className="text-sm text-gray-200 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* National Presence & International Outreach */}
      <section className="py-16">
        <div className="container-page grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-heading font-bold text-2xl text-navy mb-4">Our National Presence</h2>
            <p className="text-gray-600 mb-6">
              UCO maintains an active network of state and regional chapters across India,
              connecting contractors, consultants and industry professionals nationwide.
            </p>
            <div className="relative h-64 rounded overflow-hidden bg-panel flex items-center justify-center">
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
                alt="Map placeholder representing UCO's national chapter network"
                fill
                className="object-cover opacity-90"
              />
            </div>
            <Link href="/chapters" className="btn-outline mt-5 inline-block">View State Chapters</Link>
          </div>

          <div>
            <h2 className="font-heading font-bold text-2xl text-navy mb-4">Our International Outreach</h2>
            <p className="text-gray-600 mb-6">
              Connecting through chapters and partner networks across key global regions.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {internationalRegions.map((region) => (
                <div key={region} className="bg-panel rounded px-4 py-3 text-navy font-heading font-medium text-sm">
                  {region}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Membership CTA — solid navy block, matching CRB section style */}
      <section className="bg-navy text-white py-16">
        <div className="container-page">
          <div className="flex justify-between items-start mb-8">
            <h2 className="font-heading font-bold text-2xl">Become a Member</h2>
            <Link href="/become-member" className="btn-outline-white hidden sm:inline-block">Learn More</Link>
          </div>
          <p className="text-gray-200 max-w-2xl mb-8">
            By becoming a member, you gain access to a wide range of benefits, including
            collective representation, technical support, networking opportunities, policy
            advocacy and exclusive member benefits.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: 'Ordinary Members', desc: 'Civil, Electrical, Mechanical & Infrastructure Contractors' },
              { name: 'Associate Members', desc: 'Engineers, Architects, Consultants & Legal Professionals' },
              { name: 'Corporate & Honorary', desc: 'Organisations & industry leaders' },
            ].map((m) => (
              <div key={m.name} className="bg-white/10 rounded p-5">
                <p className="font-heading font-semibold mb-1">{m.name}</p>
                <p className="text-sm text-gray-300">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
