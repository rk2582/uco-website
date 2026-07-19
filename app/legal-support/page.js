import PageHero from '@/components/PageHero';
import SupportRequestForm from '@/components/SupportRequestForm';

export const metadata = { title: 'Legal Support | UCO' };

export default function LegalSupport() {
  return (
    <div>
      <PageHero
        eyebrow="Member Services"
        title="Legal Support"
        subtitle="Assistance with contract disputes, regulatory compliance and legal queries relevant to the construction industry."
      />
      <section className="container-page py-16">
        <SupportRequestForm type="LEGAL" label="Legal Support" />
      </section>
    </div>
  );
}
