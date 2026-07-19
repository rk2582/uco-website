import PageHero from '@/components/PageHero';
import SupportRequestForm from '@/components/SupportRequestForm';

export const metadata = { title: 'Tendering Support | UCO' };

export default function TenderingSupport() {
  return (
    <div>
      <PageHero
        eyebrow="Member Services"
        title="Tendering Support"
        subtitle="Guidance on government and private tender documentation, bid preparation and procurement compliance."
      />
      <section className="container-page py-16">
        <SupportRequestForm type="TENDERING" label="Tendering Support" />
      </section>
    </div>
  );
}
