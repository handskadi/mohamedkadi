// app/tools/favicon-generator/page.tsx
import FaviconGeneratorTool from './FaviconGeneratorTool';

export const metadata = {
    title: "Favicon & Icon Generator | Mohamed Kadi Tools",
    description:
        "Generate favicons and app icons from any image. Crop, preview, and export all required favicon formats and meta tags for your website.",
};

export default function Page() {
    return (
        <div className="min-h-screen pt-[100px] pb-[100px] px-4 sm:px-8 max-w-6xl mx-auto bg-white text-gray-800">
            <section className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-2">Favicon & Icon Generator</h1>
                <p className="text-lg text-gray-600">
                    Free tool to generate browser favicons, Apple Touch icons, Android icons, and full HTML meta tags
                </p>
            </section>

            <FaviconGeneratorTool />

            <section className="mt-20 space-y-10 text-left">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Why Use Our Favicon Generator?</h2>
                    <p className="text-gray-700">
                        Favicons help users recognize your site in tabs, bookmarks, mobile homescreens, and more. A complete favicon set ensures your brand looks sharp across all browsers and devices.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">How It Works</h2>
                    <p className="text-gray-700">
                        Upload a square image (or crop it live), then our tool will generate the required PNG and ICO files. We also include an HTML snippet with all the necessary <code>&lt;link&gt;</code> and <code>&lt;meta&gt;</code> tags to copy into your website.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">What's Included in the ZIP?</h2>
                    <p className="text-gray-700">
                        You'll get a <strong>favicon.ico</strong> file, several PNGs in multiple sizes (16x16, 32x32, 48x48, 180x180, etc.), a <code>site.webmanifest</code>, and a <code>meta.html</code> snippet ready to paste in your site’s <code>&lt;head&gt;</code>.
                    </p>
                </div>
            </section>
        </div>
    );
}
