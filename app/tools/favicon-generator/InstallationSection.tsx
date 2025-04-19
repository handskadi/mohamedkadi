'use client';

import { useState } from 'react';
import { Copy } from 'lucide-react';

export default function InstallationComponent() {
    const [copied, setCopied] = useState(false);

    const htmlSnippet = `
<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="shortcut icon" href="/favicon.ico">
<meta name="theme-color" content="#ffffff">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/favicon-192x192.png">
`.trim();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(htmlSnippet);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy failed', err);
        }
    };

    return (
        <section className="mt-20 space-y-8 bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold">Installation</h2>

            <p className="text-gray-700">
                First, use the download button above to download the following files and place them in the
                <strong> root of your website</strong>:
            </p>

            <ul className="list-disc pl-6 text-gray-800 space-y-1">
                <li>favicon.ico</li>
                <li>favicon-16x16.png</li>
                <li>favicon-32x32.png</li>
                <li>favicon-48x48.png</li>
                <li>favicon-180x180.png</li>
                <li>favicon-192x192.png</li>
                <li>favicon-512x512.png</li>
                <li>apple-touch-icon.png</li>
                <li>site.webmanifest</li>
                <li>meta.html (optional)</li>
            </ul>

            <div>
                <p className="mb-2 font-medium text-gray-700">
                    Then copy and paste the following into the <code>&lt;head&gt;</code> of your HTML:
                </p>
                <div className="relative">
                    <pre className="bg-gray-100 border text-sm text-gray-800 rounded p-4 overflow-auto">
                        <code className="whitespace-pre">{htmlSnippet}</code>
                    </pre>
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 flex items-center gap-1 px-3 py-1 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                        <Copy size={14} />
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>
            </div>

            <p className="text-sm text-gray-500">
                💡 <strong>Recommendation:</strong> Place all these icons in your website's public folder or root if using a static setup.
                If using Next.js or Vite, put them inside your <code>public/</code> folder so they’re accessible from <code>/favicon-32x32.png</code>, etc.
            </p>
        </section>
    );
}
