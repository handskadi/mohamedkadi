'use client';
import Image from 'next/image';
import Link from 'next/link';
import portfolio from '@/data/portfolios';
import { useState } from 'react';

const categories = ['all', 'website', 'app', 'seo'];

export default function FeaturedPortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const featuredProjects = portfolio.filter((project) => project.featured);

  const filteredProjects =
    activeCategory === 'all'
      ? featuredProjects
      : featuredProjects.filter((project) => project.category === activeCategory);

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900" id="portfolio">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Our Portfolio</h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
            Discover our most impactful and innovative client projects.
          </p>
        </div>

        <div className="flex flex-wrap justify-center mt-8 space-x-2">
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

        <div className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="relative group overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-80 text-white p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-sm text-blue-400">{project.client}</span>
                <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                <p className="mt-1 text-sm">{project.description}</p>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="mt-3 inline-block text-blue-400 hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
