// app/portfolio/page.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import portfolio from '@/data/portfolios';
import { useState } from 'react';

const categories = ['all', 'website', 'app', 'seo'];

export default function PortfolioPage() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProjects =
        activeCategory === 'all'
            ? portfolio
            : portfolio.filter((project) => project.category === activeCategory);

    return (
        <main className="py-24 px-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">Full Portfolio</h1>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                    Browse all our client projects, websites, apps, and SEO campaigns.
                </p>

                {/* Filters */}
                <div className="flex flex-wrap justify-center space-x-2 mb-10">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-5 py-2 text-sm font-semibold rounded-lg transition ${activeCategory === category
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:bg-blue-100 dark:text-gray-300'
                                }`}
                        >
                            {category.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                    {filteredProjects.map((project) => (
                        <Link href={`/portfolio/${project.slug}`} key={project.id}>
                            <div className="h-full flex flex-col rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition duration-300 bg-white dark:bg-gray-800">
                                <div className="relative h-52">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="p-5">
                                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium uppercase">
                                        {project.category}
                                    </p>
                                    <h2 className="text-xl font-semibold mt-2 mb-2 text-gray-900 dark:text-white">
                                        {project.title}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
                                        <span>{project.client}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
