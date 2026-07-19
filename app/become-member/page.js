import PageHero from '@/components/PageHero';
import MembershipForm from '@/components/MembershipForm';
import RazorpayScript from '@/components/RazorpayScript';

export const metadata = { title: 'Become a Member | UCO' };

export default function BecomeMember() {
  return (
    <div>
      <RazorpayScript />
      <PageHero
        eyebrow="Join UCO"
        title="Become a Member"
        subtitle="For civil, electrical, mechanical & infrastructure contractors, and registered companies, LLPs & partnership firms."
      />
      <section className="container-page py-16 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-heading font-bold text-xl text-navy mb-4">Who Can Join as an Ordinary Member?</h2>
          <ul className="space-y-2 text-gray-700 mb-8">
            {[
              'Civil, Electrical, Mechanical & Infrastructure Contractors',
              'Government, Public Sector & Private Contractors',
              'Registered Companies, LLPs & Partnership Firms',
              'Specialised Contractors',
            ].map((i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-gold font-bold">&bull;</span> {i}
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500">
            Note: fee amount below is a placeholder &mdash; replace once actual membership pricing is confirmed.
          </p>
        </div>
        <MembershipForm memberType="MEMBERSHIP_INDIVIDUAL" feeAmount={5000} />
      </section>
    </div>
  );
}
