'use client'
import Link from 'next/link'
import Image from 'next/image'
import blogPosts from '../../data/blogPosts';

export default function BlogPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 pt-[96px] pb-16">
            <h1 className="text-4xl font-bold mb-10 text-center">Our Blog</h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                Explore insights on web development, full stack solutions, and why having a strong digital presence is crucial for business success.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug}>
                        <div className="flex flex-col h-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition duration-300 bg-white dark:bg-gray-900">
                            {/* Image */}
                            <div className="relative h-52 w-full">
                                <Image
                                    src={post.featuredImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Body */}
                            <div className="flex flex-col flex-grow p-5">
                                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium uppercase">{post.category}</p>
                                <h2 className="text-xl font-semibold mt-2 mb-2 text-gray-900 dark:text-white">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{post.description}</p>

                                {/* Footer */}
                                <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center mt-auto pt-2 border-t border-gray-100 dark:border-gray-700">
                                    <span>By {post.author.name}</span>
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    )
}
