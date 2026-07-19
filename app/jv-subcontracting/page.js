import PageHero from '@/components/PageHero';
import SupportRequestForm from '@/components/SupportRequestForm';

export const metadata = { title: 'JV / Sub-contracting Support | UCO' };

export default function JVSubcontracting() {
  return (
    <div>
      <PageHero
        eyebrow="Member Services"
        title="JV / Sub-contracting Support"
        subtitle="Support in finding joint venture partners and sub-contracting opportunities across UCO's member network."
      />
      <section className="container-page py-16">
        <SupportRequestForm type="JV_SUBCONTRACTING" label="JV / Sub-contracting Support" />
      </section>
    </div>
  );
}
