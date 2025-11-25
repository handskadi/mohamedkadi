// app/portfolio/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import portfolio from "@/data/portfolios";
import Link from "next/link";

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = portfolio.find(p => p.slug === params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export async function generateStaticParams() {
  return portfolio.map(project => ({ slug: project.slug }));
}

export default function PortfolioDetailPage({ params }: Params) {
  const project = portfolio.find(p => p.slug === params.slug);

  if (!project) return notFound();

  return (
    <main className="pt-[100px] pb-20 px-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-blue-600 dark:hover:text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-blue-600 dark:hover:text-white">
                Portfolio
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="font-medium text-gray-600 dark:text-white">{project.title}</li>
          </ol>
        </nav>

        {/* Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full rounded-lg mb-6 object-cover"
        />

        {/* Title + Client */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{project.title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.client}</p>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>

        {/* Rich Content */}
        <div className="prose prose-blue dark:prose-invert">{project.content}</div>
      </div>
    </main>
  );
}
