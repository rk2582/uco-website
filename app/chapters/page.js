import PageHero from '@/components/PageHero';

export const metadata = { title: 'State & Regional Chapters | UCO' };

// PLACEHOLDER DATA — replace with real chapter list
const chapters = [
  { state: 'Delhi NCR', chairperson: 'To Be Updated', contact: 'delhi@ucoindia.org' },
  { state: 'Maharashtra', chairperson: 'To Be Updated', contact: 'maharashtra@ucoindia.org' },
  { state: 'Karnataka', chairperson: 'To Be Updated', contact: 'karnataka@ucoindia.org' },
  { state: 'Tamil Nadu', chairperson: 'To Be Updated', contact: 'tamilnadu@ucoindia.org' },
  { state: 'Telangana', chairperson: 'To Be Updated', contact: 'telangana@ucoindia.org' },
  { state: 'Gujarat', chairperson: 'To Be Updated', contact: 'gujarat@ucoindia.org' },
  { state: 'Kerala', chairperson: 'To Be Updated', contact: 'kerala@ucoindia.org' },
  { state: 'West Bengal', chairperson: 'To Be Updated', contact: 'westbengal@ucoindia.org' },
];

export default function Chapters() {
  return (
    <div>
      <PageHero eyebrow="Our Network" title="State / Regional Chapters" subtitle="Placeholder chapter list — replace with actual chapters and chairpersons." />
      <section className="container-page py-16">
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left">
            <thead className="bg-navy text-white">
              <tr>
                <th className="px-6 py-3 font-heading text-sm">State / Region</th>
                <th className="px-6 py-3 font-heading text-sm">Chapter Chairperson</th>
                <th className="px-6 py-3 font-heading text-sm">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {chapters.map((c) => (
                <tr key={c.state} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-navy">{c.state}</td>
                  <td className="px-6 py-4 text-gray-600">{c.chairperson}</td>
                  <td className="px-6 py-4 text-gray-600">{c.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
