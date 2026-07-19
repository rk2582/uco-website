import PageHero from '@/components/PageHero';
import PostList from '@/components/PostList';
import { prisma } from '@/lib/prisma';

export const metadata = { title: 'Annual Conference | UCO' };
export const dynamic = 'force-dynamic';

export default async function Conference() {
  let posts = [];
  try {
    posts = await prisma.post.findMany({
      where: { category: 'CONFERENCE' },
      orderBy: { publishDate: 'desc' },
    });
  } catch {
    // DB not connected yet
  }

  return (
    <div>
      <PageHero eyebrow="Flagship Event" title="Annual Conference" subtitle="UCO's flagship gathering of contractors, industry leaders and policymakers." />
      <section className="container-page py-16">
        <PostList posts={posts} />
      </section>
    </div>
  );
}
