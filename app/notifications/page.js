import PageHero from '@/components/PageHero';
import PostList from '@/components/PostList';
import { prisma } from '@/lib/prisma';

export const metadata = { title: 'Government Notifications | UCO' };
export const dynamic = 'force-dynamic';

export default async function Notifications() {
  let posts = [];
  try {
    posts = await prisma.post.findMany({
      where: { category: 'NOTIFICATION' },
      orderBy: { publishDate: 'desc' },
    });
  } catch {
    // DB not connected yet during initial setup — page still renders with empty state
  }

  return (
    <div>
      <PageHero eyebrow="Stay Informed" title="Government Notifications" subtitle="Official notifications, circulars and policy updates relevant to the construction industry." />
      <section className="container-page py-16">
        <PostList posts={posts} />
      </section>
    </div>
  );
}
