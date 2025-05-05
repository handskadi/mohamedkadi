'use client';

import Link from 'next/link';
import { FileText, Image as ImageIcon, ScanLine } from 'lucide-react';
import { ReactNode } from 'react';

function ToolCard({
    title,
    description,
    icon,
    href,
}: {
    title: string;
    description: string;
    icon: ReactNode;
    href: string;
}) {
    return (
        <Link
            href={href}
            className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 transition hover:shadow-xl flex flex-col text-center items-center gap-3"
        >
            <div className="text-blue-600">{icon}</div>
            <h3 className="text-lg font-semibold text-blue-700">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
        </Link>
    );
}

const tools = [
    {
        name: 'CV Builder',
        description:
            'Create a professional, ATS-optimized CV in minutes. Choose a template, enter your info, and download as PDF — free and no sign-up.',
        href: '/tools/cv-builder',
        icon: <FileText className="w-8 h-8" />,
    },
    {
        name: 'Image Compressor & WebP Converter',
        description:
            'Compress and convert PNG/JPG images to WebP. Preview differences, control quality, and download optimized results.',
        href: '/tools/image-compressor',
        icon: <ImageIcon className="w-8 h-8" />,
    },
    {
        name: 'Favicon & Icon Generator',
        description:
            'Generate favicons and app icons from any image. Crop, preview, export all necessary sizes and HTML meta tags in one click.',
        href: '/tools/favicon-generator',
        icon: <ScanLine className="w-8 h-8" />,
    },
];

export default function ToolShowcase() {
    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
            <div className="mx-auto max-w-screen-xl text-center">
                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    Try Our Free Online Tools
                </h2>
                <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                    Discover powerful utilities by Mohamed Kadi — compress images, generate icons, or build a standout CV.
                    Everything is fast, secure, and free to use — no sign-up required!
                </p>
            </div>

            <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3 max-w-screen-lg mx-auto">
                {tools.map((tool) => (
                    <ToolCard
                        key={tool.name}
                        title={tool.name}
                        description={tool.description}
                        icon={tool.icon}
                        href={tool.href}
                    />
                ))}
            </div>
        </section>
    );
}
