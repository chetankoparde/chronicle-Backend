import { notFound } from "next/navigation"
import prisma from "../../lib/prisma"

interface PageProps {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params

  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
      status: "PUBLISHED"
    },
    include: {
      author: true,
      category: true,
      comments: {
        include: {
          author: true
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  })

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-lg dark:prose-invert mx-auto">
          <header className="mb-8">
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              <span>{post.author.name}</span>
              <span>•</span>
              <span>{post.category.name}</span>
              <span>•</span>
              <span>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString()
                  : "Unpublished"}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6">
                {post.excerpt}
              </p>
            )}
          </header>

          <div
            className="prose prose-zinc dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.featuredImage && (
            <div className="mt-8">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
        </article>

        {post.comments.length > 0 && (
          <section className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
              Comments ({post.comments.length})
            </h2>
            <div className="space-y-6">
              {post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-black dark:text-white">
                      {comment.author.name}
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}