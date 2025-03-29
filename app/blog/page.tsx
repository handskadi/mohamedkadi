'use client'
import Link from 'next/link'
import Image from 'next/image'

const posts = [
    {
        slug: 'why-every-business-needs-a-website-2024',
        title: 'Why Every Business Needs a Website in 2024',
        image: '/images/blog-business-growth.jpg',
        author: 'M. KADI',
        date: '7 days ago',
        category: 'Business Growth',
        description:
            'In today’s digital world, a website isn’t just an option—it’s a necessity. Learn how having a strong online presence increases credibility, reaches more customers, and boosts sales.',
    },
    {
        slug: 'power-of-full-stack-development',
        title: 'The Power of Full Stack Development for Business Success',
        image: '/images/blog-fullstack.jpg',
        author: 'M. KADI',
        date: '14 days ago',
        category: 'Full Stack Development',
        description:
            'Full Stack Development allows businesses to build scalable, secure, and high-performing applications. Discover why companies are investing in end-to-end solutions for their success.',
    },
    {
        slug: 'modern-web-tech-innovation',
        title: 'How Modern Web Technologies Drive Innovation',
        image: '/images/blog-tech-trends.jpg',
        author: 'M. KADI',
        date: '21 days ago',
        category: 'Technology & Trends',
        description:
            'From React and Next.js to cloud computing and AI, explore how modern web technologies are revolutionizing industries and transforming customer experiences.',
    },
]

export default function BlogPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 pt-[96px] pb-16">
            <h1 className="text-4xl font-bold mb-10 text-center">Our Blog</h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                Explore insights on web development, full stack solutions, and why having a strong digital presence is crucial for business success.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug}>
                        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition duration-300 bg-white dark:bg-gray-900">
                            <div className="relative h-52">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="p-5">
                                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium uppercase">{post.category}</p>
                                <h2 className="text-xl font-semibold mt-2 mb-2 text-gray-900 dark:text-white">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">{post.description}</p>
                                <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
                                    <span>By {post.author}</span>
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
