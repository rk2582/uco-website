export default function PostList({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        No entries published yet. Check back soon, or add content via the admin panel.
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <article key={post.id} className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
          <p className="text-xs text-gray-400 mb-2">
            {new Date(post.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <h3 className="font-heading font-semibold text-lg text-navy mb-2">{post.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{post.body}</p>
          {post.attachmentUrl && (
            <a href={post.attachmentUrl} className="inline-block mt-3 text-gold text-sm font-medium hover:text-navy">
              Download Attachment &rarr;
            </a>
          )}
        </article>
      ))}
    </div>
  );
}
