import PageHero from '@/components/PageHero';
import PostList from '@/components/PostList';
import { prisma } from '@/lib/prisma';

export const metadata = { title: 'Training & Workshops | UCO' };
export const dynamic = 'force-dynamic';

export default async function Training() {
  let posts = [];
  try {
    posts = await prisma.post.findMany({
      where: { category: 'TRAINING' },
      orderBy: { publishDate: 'desc' },
    });
  } catch {
    // DB not connected yet
  }

  return (
    <div>
      <PageHero eyebrow="Capacity Building" title="Training & Workshops" subtitle="Certification programmes, technical sessions and leadership development for members." />
      <section className="container-page py-16">
        <PostList posts={posts} />
      </section>
    </div>
  );
}
