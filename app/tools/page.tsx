
import Link from 'next/link';



function ToolCard({ title, description }: { title: string; description: string }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 hover:shadow-lg transition duration-200 h-full">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
}

export const metadata = {
    title: 'Mohamed Kadi Tools | Free Online Converters & Optimizers',
    description:
        'Discover Mohamed Kadi\'s suite of free online tools to compress, convert, and optimize your files. Fast, private, and easy-to-use utilities — no sign-up needed.',
    keywords: [
        'Mohamed Kadi',
        'online tools',
        'image compressor',
        'webp converter',
        'PDF compressor',
        'resize image',
        'optimize images',
        'free tools',
        'SEO tools',
    ],
    openGraph: {
        title: 'Mohamed Kadi Tools',
        description: 'Free converters and optimizers to compress images, PDFs, and more — all private and fast.',
        url: 'https://your-domain.com/tools',
        siteName: 'Mohamed Kadi Tools',
        type: 'website',
    },
};

export default function ToolsPage() {
    const tools = [
        {
            name: 'Image Compressor & WebP Converter',
            description: 'Compress and convert PNG/JPG images to WebP. Preview differences, control quality, and download optimized results.',
            href: '/tools/image-compressor',
        },
        {
            name: 'PDF Compressor',
            description: 'Shrink PDF file sizes while retaining quality. Great for uploads, email attachments, and faster sharing.',
            href: '/tools/pdf-compressor',
        },
        {
            name: 'Image Resizer Tool',
            description: 'Resize large images to fit website or social platform dimensions without losing clarity.',
            href: '/tools/image-resizer',
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 py-[100px]">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Free Online Tools by Mohamed Kadi</h1>
                <p className="text-lg text-gray-600">
                    Optimize, convert, and compress your digital assets quickly with our suite of free tools.
                    No sign-up needed, 100% privacy-friendly.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {tools.map((tool) => (
                    <Link key={tool.name} href={tool.href} className="h-full">
                        <ToolCard title={tool.name} description={tool.description} />
                    </Link>
                ))}
            </div>

            <div className="mt-20 text-center text-sm text-gray-500">
                <p>
                    💡 More tools coming soon — built by <span className="font-semibold text-blue-600">Mohamed Kadi</span> to save time & improve your web workflow.
                </p>
            </div>
        </div>
    );
}
