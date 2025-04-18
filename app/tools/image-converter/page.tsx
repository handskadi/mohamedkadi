// app/tools/image-converter/page.tsx
import ImageConverterTool from './ImageConverterTool';

export default function Page() {
    return (
        <div className="min-h-screen pt-[100px] pb-[100px] px-4 sm:px-8 max-w-6xl mx-auto bg-white text-gray-800">
            <section className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-2">Convert & Compress PNG/JPG to WebP</h1>
                <p className="text-lg text-gray-600">Free online tool for smart image optimization and instant WebP conversion</p>
            </section>

            <ImageConverterTool />

            <section className="mt-20 space-y-10 text-left">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Why Use Our Image Converter?</h2>
                    <p className="text-gray-700">
                        Large image files can slow down your website and use more bandwidth. Our converter helps reduce image sizes with minimal quality loss, ensuring faster loading times and a better user experience.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">How It Works</h2>
                    <p className="text-gray-700">
                        We use modern Web APIs to convert your images to WebP format directly in the browser. Just upload a PNG or JPG, adjust the compression level, and download your optimized image instantly.
                    </p>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">Supported Formats & Limits</h2>
                    <p className="text-gray-700">
                        Upload PNG, JPG, or WebP images up to 5MB. The tool supports up to 5 images at once (coming soon). The slider lets you choose a compression level between <strong>10% and 100%</strong> for full control.
                    </p>
                </div>
            </section>
        </div>
    );
}
