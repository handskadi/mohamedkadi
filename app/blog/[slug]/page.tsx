// app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { Metadata } from 'next'

const posts = {
    'why-every-business-needs-a-website-2024': {
        title: 'Why Every Business Needs a Website in 2024',
        description:
            'Discover why having a professional website is crucial for business credibility, reach, and revenue growth.',
        date: 'Mar 27, 2025',
        author: {
            name: 'Mohamed KADI',
            role: 'Web Developer & Founder',
            image: '/mohamedkadi.jpg',
        },
        featuredImage: '/project1.webp',
        content: (
            <>
                <h2 className="text-2xl font-semibold mb-4">1. First Impressions Matter</h2>
                <p className="mb-6">
                    In today’s digital-first world, your website is often the very first impression people get of your business. It serves as your online storefront, and if it’s slow, outdated, or difficult to navigate, visitors may assume your services or products are the same. A modern, well-designed site signals to users that you care about quality, attention to detail, and user experience — all factors that build immediate trust.
                </p>

                <h2 className="text-2xl font-semibold mb-4">2. Credibility and Trust</h2>
                <p className="mb-6">
                    Studies show that users judge a business’s credibility based on its website within seconds. Without an online presence, potential customers may question whether your business is legitimate. A professional site, especially one with clear contact information, testimonials, and service descriptions, helps establish trust. It reassures users that they’re dealing with a real, reputable company.
                </p>

                <h2 className="text-2xl font-semibold mb-4">3. Reach a Wider Audience</h2>
                <p className="mb-6">
                    Unlike physical storefronts that close at night or operate within certain regions, websites are open 24/7 and accessible globally. This allows you to reach potential customers beyond your local area, expand into new markets, and accommodate different time zones. Whether someone visits your site at 2 PM or 2 AM, they can learn about your business, browse offerings, or submit a contact form — all without your intervention.
                </p>

                <h2 className="text-2xl font-semibold mb-4">4. Drive More Sales</h2>
                <p className="mb-6">
                    A well-structured website acts like a 24/7 sales agent. With clear calls to action, persuasive copy, and optimized user journeys, you can guide visitors toward conversions — whether that's scheduling a consultation, buying a product, or signing up for a service. Integrating analytics helps you understand what pages convert best and what users are searching for, giving you the power to continually improve performance and increase revenue.
                </p>

                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-8">
                    “If your business is not on the internet, then your business will be out of business.” — Bill Gates
                </blockquote>

                <h2 className="text-2xl font-semibold mb-4">5. SEO and Visibility</h2>
                <p className="mb-6">
                    Your website isn’t just a digital brochure — it’s a powerful marketing tool. With effective SEO (Search Engine Optimization), your business can show up in Google search results when people look for services or products you offer. That visibility is invaluable, especially when combined with local SEO tactics like Google Business Profile integration, reviews, and schema markup. The result: more traffic, more leads, and more growth.
                </p>

                <p className="mt-10 font-semibold text-gray-800 dark:text-gray-200">
                    The bottom line? A website isn’t a luxury — it’s a necessity. Whether you're a local service provider or a growing startup, a strong online presence is your foundation for long-term success.
                </p>
            </>
        ),
    },
} as const

type PostSlug = keyof typeof posts
type Params = { params: { slug: PostSlug } }

export function generateStaticParams(): Params['params'][] {
    return Object.keys(posts).map((slug) => ({
        slug: slug as PostSlug,
    }))
}

export function generateMetadata({ params }: Params): Metadata {
    const post = posts[params.slug]
    return {
        title: post?.title || 'Blog Post',
        description: post?.description,
    }
}

export default function BlogPost(props: Params) {
    const post = posts[props.params.slug]

    if (!post) return notFound()

    return (
        <main className="pt-[80px] pb-20 px-4">
            <div className="max-w-3xl mx-auto">
                {/* ✅ Featured Image */}
                {post.featuredImage && (
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-auto rounded-lg mb-8 object-cover"
                    />
                )}

                {/* ✅ Author Info */}
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

                {/* ✅ Article Content */}
                <article className="prose prose-lg dark:prose-invert max-w-none">
                    <h1 className="text-4xl font-bold text-center mb-10">{post.title}</h1>
                    {post.content}
                </article>
            </div>
        </main>
    )
}
