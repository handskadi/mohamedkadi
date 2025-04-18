'use client';

import { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import { CloudUpload, Download } from 'lucide-react';

type CompressionLevel = 'low' | 'medium' | 'high';

export default function ImageConverterTool() {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [webpFile, setWebpFile] = useState<File | null>(null);
    const [sliderValue, setSliderValue] = useState(80); // 0–100
    const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium');
    const [processing, setProcessing] = useState(false);

    // Map slider value to actual compression quality
    const getMappedQuality = () => {
        const percent = sliderValue / 100;
        switch (compressionLevel) {
            case 'low':
                return 0.8 + percent * 0.2; // 0.8–1.0
            case 'medium':
                return 0.4 + percent * 0.4; // 0.4–0.8
            case 'high':
                return 0.1 + percent * 0.3; // 0.1–0.4
        }
    };

    const getResizeLimit = () => {
        switch (compressionLevel) {
            case 'low':
                return 3000;
            case 'medium':
                return 1600;
            case 'high':
                return 800;
        }
    };

    // Dynamically resize only if image is larger than the limit
    const convertImage = async (file: File) => {
        setProcessing(true);

        const imageDataUrl = await imageCompression.getDataUrlFromFile(file);
        const img = new Image();
        img.src = imageDataUrl;

        img.onload = async () => {
            const originalWidth = img.width;
            const originalHeight = img.height;
            const resizeLimit = getResizeLimit();

            const shouldResize = originalWidth > resizeLimit || originalHeight > resizeLimit;

            const options: imageCompression.Options = {
                maxSizeMB: 5,
                fileType: 'image/webp',
                initialQuality: getMappedQuality(),
                useWebWorker: true,
                // ...(shouldResize && { maxWidthOrHeight: resizeLimit }),
            };

            try {
                const compressed = await imageCompression(file, options);
                setWebpFile(compressed);
            } catch (err) {
                console.error('Error compressing image:', err);
            } finally {
                setProcessing(false);
            }
        };
    };

    // Trigger convert on slider/mode change
    useEffect(() => {
        if (originalFile) convertImage(originalFile);
    }, [sliderValue, compressionLevel]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.size <= 5 * 1024 * 1024) {
            setOriginalFile(file);
            await convertImage(file);
        }
    };

    const getSize = (file: File | null) => {
        if (!file) return '—';
        const size = file.size;
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    };

    const getCompression = () => {
        if (!originalFile || !webpFile) return '—';
        const saved = 100 - (webpFile.size / originalFile.size) * 100;
        return saved.toFixed(2) + '% smaller';
    };

    const downloadWebP = () => {
        if (webpFile) {
            const url = URL.createObjectURL(webpFile);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'compressed.webp';
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    return (
        <>
            {/* Upload */}
            <label className="cursor-pointer block max-w-2xl mx-auto mb-6">
                <div className="border-2 border-dashed border-gray-300 p-10 rounded-xl bg-gray-50 hover:border-blue-500 transition text-center">
                    <div className="flex flex-col items-center space-y-2">
                        <CloudUpload className="w-12 h-12 text-blue-500" />
                        <p className="text-gray-600 font-medium">Click or drag to upload an image</p>
                        <p className="text-xs text-gray-400">Max size: 5MB | PNG, JPG</p>
                    </div>
                </div>
                <input type="file" accept="image/png,image/jpeg" onChange={handleUpload} className="hidden" />
            </label>

            {/* Compression Buttons */}
            <div className="flex justify-center mb-4 gap-2">
                {(['low', 'medium', 'high'] as CompressionLevel[]).map((level) => (
                    <button
                        key={level}
                        onClick={() => setCompressionLevel(level)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border ${compressionLevel === level
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                            }`}
                    >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                ))}
            </div>

            {/* Quality Slider */}
            <div className="text-center mb-8">
                <label className="text-gray-700 font-medium mr-2">Quality:</label>
                <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="w-full max-w-sm"
                />
                <div className="text-sm text-gray-500 mt-1">
                    {sliderValue}% → actual quality: {(getMappedQuality() * 100).toFixed(0)}%
                </div>
            </div>

            {/* Preview */}
            {originalFile && webpFile && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white rounded-lg p-4 shadow text-center">
                        <h2 className="font-semibold mb-2">Original</h2>
                        <img src={URL.createObjectURL(originalFile)} alt="original" className="rounded max-h-[300px] mx-auto" />
                        <p className="text-sm text-gray-500 mt-2">Size: {getSize(originalFile)}</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow text-center">
                        <h2 className="font-semibold mb-2">WebP</h2>
                        {processing ? (
                            <p className="text-blue-500">Compressing...</p>
                        ) : (
                            <>
                                <img src={URL.createObjectURL(webpFile)} alt="webp" className="rounded max-h-[300px] mx-auto" />
                                <p className="text-sm text-gray-500 mt-2">
                                    Size: {getSize(webpFile)}<br />
                                    Compression: {getCompression()}
                                </p>
                                <button
                                    onClick={downloadWebP}
                                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    <Download className="w-4 h-4" />
                                    Download WebP
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
