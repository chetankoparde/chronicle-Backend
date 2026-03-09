import prisma from "./lib/prisma"

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED"
    },
    include: {
      author: true,
      category: true
    },
    orderBy: {
      publishedAt: "desc"
    }
  })

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-3">Blog</h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Latest articles and stories
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500 dark:text-zinc-400">No posts published yet.</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="border-b border-zinc-200 dark:border-zinc-800 pb-8"
              >
                <div className="mb-2 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <span>{post.author.name}</span>
                  <span>•</span>
                  <span>
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString()
                      : "Unpublished"}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  {post.excerpt}
                </p>
                <a
                  href={`/posts/${post.slug}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Read more →
                </a>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
