import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import PageHero from '@/components/PageHero';

export const metadata = { title: 'My Dashboard | UCO' };

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div>
      <PageHero eyebrow="Members Area" title={`Welcome, ${session.user.name}`} />
      <section className="container-page py-16">
        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-8 max-w-xl">
          <p className="text-gray-600 mb-2">Email: {session.user.email}</p>
          <p className="text-gray-600">
            Membership Status:{' '}
            <span className="font-semibold text-navy">{session.user.status}</span>
          </p>
        </div>
      </section>
    </div>
  );
}
