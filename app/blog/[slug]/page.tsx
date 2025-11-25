import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import blogPosts from "@/data/blogPosts";

interface Params {
  params: { slug: string };
}

// ✅ Static metadata generator
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = params.slug;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

// ✅ Static path generation for pre-rendering
export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

// ✅ Blog post page
export default function BlogPost({ params }: Params) {
  const slug = params.slug;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return notFound();

  return (
    <main className="pt-[80px] pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* ✅ Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-sm">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <Link
                href="/blog"
                className="ms-1 text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                Blog
              </Link>
            </li>
            <li aria-current="page" className="flex items-center">
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-gray-500 md:ms-2 dark:text-gray-400">{post.title}</span>
            </li>
          </ol>
        </nav>

        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-auto rounded-lg mb-8 object-cover"
          />
        )}

        <div className="flex items-center gap-4 mb-6">
          <img
            src={post.author.image}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              {post.author.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {post.author.role} · {post.date}
            </p>
          </div>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-center mb-10">{post.title}</h1>
          {post.content}
        </article>
      </div>
    </main>
  );
}
