import Link from "next/link";
import { Home, BookOpen, Wrench } from "lucide-react";

export default function NotFound() {
  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen lg:mt-0 mt-[100px] flex flex-col justify-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 text-center">
        <div className="mx-auto max-w-screen-sm">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-600 dark:text-blue-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Something&apos;s missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the homepage.
          </p>
          <Link
            href="/"
            className="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4"
          >
            Back to Homepage
          </Link>
        </div>

        {/* Suggestion cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto">
          {/* Home Card */}
          <Link
            href="/"
            className="flex flex-col items-center p-6 border border-gray-200 rounded-xl shadow hover:shadow-lg transition bg-white dark:bg-gray-800 dark:border-gray-700 text-center"
          >
            <Home className="w-8 h-8 mb-2 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Home</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Return to the main page and start fresh.
            </p>
          </Link>

          {/* Blog Card */}
          <Link
            href="/blog"
            className="flex flex-col items-center p-6 border border-gray-200 rounded-xl shadow hover:shadow-lg transition bg-white dark:bg-gray-800 dark:border-gray-700 text-center"
          >
            <BookOpen className="w-8 h-8 mb-2 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Blog</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Explore tips, updates, and articles I've written.
            </p>
          </Link>

          {/* Tools Card */}
          <Link
            href="/tools"
            className="flex flex-col items-center p-6 border border-gray-200 rounded-xl shadow hover:shadow-lg transition bg-white dark:bg-gray-800 dark:border-gray-700 text-center"
          >
            <Wrench className="w-8 h-8 mb-2 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Tools</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Check out my free online tools to optimize and convert.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
