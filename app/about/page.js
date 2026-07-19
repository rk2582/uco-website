import PageHero from '@/components/PageHero';

export const metadata = { title: 'About UCO | United Contractors Organisation' };

export default function About() {
  return (
    <div>
      <PageHero eyebrow="About Us" title="About UCO" subtitle="The Collective Voice of the Construction & Infrastructure Industry" />
      <section className="container-page py-16 max-w-3xl">
        <p className="text-gray-700 leading-relaxed mb-5">
          The United Contractors Organisation (UCO) is a premier, pan-India professional body
          representing contractors, infrastructure developers, consultants and allied
          professionals.
        </p>
        <p className="text-gray-700 leading-relaxed mb-5">
          With a strong network across India and international chapters in key countries, UCO
          works towards strengthening the construction ecosystem through collaboration, knowledge
          sharing, policy advocacy and professional excellence.
        </p>

        <h2 className="font-heading font-bold text-2xl text-navy mt-10 mb-4">Why UCO?</h2>
        <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
          {['Collective Representation', 'Industry Expertise', 'Policy Advocacy', 'Knowledge Sharing', 'Business Networking', 'Sustainable Development'].map((i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-gold font-bold">&bull;</span> {i}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
