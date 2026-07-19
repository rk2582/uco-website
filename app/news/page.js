import PageHero from '@/components/PageHero';
import PostList from '@/components/PostList';
import { prisma } from '@/lib/prisma';

export const metadata = { title: 'News & Media | UCO' };
export const dynamic = 'force-dynamic';

export default async function News() {
  let posts = [];
  try {
    posts = await prisma.post.findMany({
      where: { category: 'NEWS' },
      orderBy: { publishDate: 'desc' },
    });
  } catch {
    // DB not connected yet
  }

  return (
    <div>
      <PageHero eyebrow="Media Centre" title="News & Media" subtitle="Latest updates, press releases and coverage from UCO." />
      <section className="container-page py-16">
        <PostList posts={posts} />
      </section>
    </div>
  );
}
