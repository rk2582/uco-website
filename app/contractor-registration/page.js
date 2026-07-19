import PageHero from '@/components/PageHero';
import MembershipForm from '@/components/MembershipForm';
import RazorpayScript from '@/components/RazorpayScript';

export const metadata = { title: 'Contractor Registration | UCO' };

export default function ContractorRegistration() {
  return (
    <div>
      <RazorpayScript />
      <PageHero
        eyebrow="Registration"
        title="Contractor Registration"
        subtitle="Register your contracting business with UCO to access tendering support, JV opportunities and technical resources."
      />
      <section className="container-page py-16 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-heading font-bold text-xl text-navy mb-4">What You&apos;ll Need</h2>
          <ul className="space-y-2 text-gray-700 mb-8">
            {[
              'Valid trade / contractor license number',
              'Company registration details',
              'Category of work (Civil / Electrical / Mechanical / Infrastructure)',
              'State chapter you wish to be affiliated with',
            ].map((i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-gold font-bold">&bull;</span> {i}
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500">
            Fee amount below is a placeholder &mdash; replace once actual contractor registration
            pricing is confirmed.
          </p>
        </div>
        <MembershipForm
          memberType="MEMBERSHIP_CONTRACTOR"
          feeAmount={7500}
          extraFields={[
            { name: 'tradeLicenseNumber', label: 'Trade License Number', required: true },
            { name: 'companyName', label: 'Company Name', required: true },
          ]}
        />
      </section>
    </div>
  );
}
