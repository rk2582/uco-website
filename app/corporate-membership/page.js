import PageHero from '@/components/PageHero';
import MembershipForm from '@/components/MembershipForm';
import RazorpayScript from '@/components/RazorpayScript';

export const metadata = { title: 'Corporate Membership | UCO' };

export default function CorporateMembership() {
  return (
    <div>
      <RazorpayScript />
      <PageHero
        eyebrow="Corporate & Honorary"
        title="Corporate Membership"
        subtitle="For corporate organisations, institutions and industry leaders who contribute significantly to the construction and infrastructure sector."
      />
      <section className="container-page py-16 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-heading font-bold text-xl text-navy mb-4">Member Benefits</h2>
          <ul className="space-y-2 text-gray-700 mb-8">
            {[
              'Networking opportunities with industry leaders',
              'Access to industry updates and technical support',
              'Capacity building programmes',
              'Policy advocacy participation',
              'Exclusive member benefits',
            ].map((i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-gold font-bold">&bull;</span> {i}
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500">
            Fee amount below is a placeholder &mdash; replace once actual corporate membership
            pricing is confirmed.
          </p>
        </div>
        <MembershipForm
          memberType="MEMBERSHIP_CORPORATE"
          feeAmount={25000}
          extraFields={[{ name: 'companyName', label: 'Organisation Name', required: true }]}
        />
      </section>
    </div>
  );
}
