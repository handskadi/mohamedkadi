'use client';

import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import ReactCompareImage from 'react-compare-image';
import { CloudUpload, Download, Trash2, Eye } from 'lucide-react';

type CompressionLevel = 'low' | 'medium' | 'high';

interface ImageItem {
    id: string;
    originalFile: File;
    compressedFile: File;
    originalDimensions: { width: number; height: number };
    compressedDimensions: { width: number; height: number };
    showCompare: boolean;
    qualityOverride: number;
    isUpdating: boolean;
}

export default function ImageConverterTool() {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [globalCompressionLevel, setGlobalCompressionLevel] = useState<CompressionLevel>('medium');
    const [resizeEnabled, setResizeEnabled] = useState(false);

    const getMappedQuality = (percent: number, level: CompressionLevel) => {
        const p = 1 - percent / 100;
        switch (level) {
            case 'low': return 0.8 + p * 0.2;
            case 'medium': return 0.4 + p * 0.4;
            case 'high': return 0.1 + p * 0.3;
        }
    };

    const getResizeLimit = (level: CompressionLevel) => {
        switch (level) {
            case 'low': return 3000;
            case 'medium': return 1600;
            case 'high': return 800;
        }
    };

    const compressImage = async (
        file: File,
        qualityPercent: number,
        level: CompressionLevel
    ): Promise<{ file: File; dimensions: { width: number; height: number } }> => {
        const options: imageCompression.Options = {
            fileType: 'image/webp',
            initialQuality: getMappedQuality(qualityPercent, level),
            useWebWorker: true,
            maxSizeMB: 5,
            ...(resizeEnabled && { maxWidthOrHeight: getResizeLimit(level) }),
        };

        const compressedFile = await imageCompression(file, options);
        const dataURL = await imageCompression.getDataUrlFromFile(compressedFile);
        const img = new Image();
        await new Promise((res) => {
            img.onload = res;
            img.src = dataURL;
        });

        return {
            file: compressedFile,
            dimensions: {
                width: img.width,
                height: img.height,
            },
        };
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []).slice(0, 5);
        const newImages: ImageItem[] = [];

        for (const file of files) {
            const dataURL = await imageCompression.getDataUrlFromFile(file);
            const originalImg = new Image();
            await new Promise((res) => {
                originalImg.onload = res;
                originalImg.src = dataURL;
            });

            const { file: compressed, dimensions } = await compressImage(file, 0, globalCompressionLevel);

            newImages.push({
                id: crypto.randomUUID(),
                originalFile: file,
                compressedFile: compressed,
                originalDimensions: { width: originalImg.width, height: originalImg.height },
                compressedDimensions: dimensions,
                showCompare: false,
                qualityOverride: 0,
                isUpdating: false,
            });
        }

        setImages((prev) => [...prev, ...newImages]);
    };

    const updateQuality = async (id: string, percent: number) => {
        setImages((prev) =>
            prev.map((img) =>
                img.id === id ? { ...img, isUpdating: true, qualityOverride: percent } : img
            )
        );

        const imgToUpdate = images.find((img) => img.id === id);
        if (!imgToUpdate) return;

        const { file: newCompressed, dimensions } = await compressImage(
            imgToUpdate.originalFile,
            percent,
            globalCompressionLevel
        );

        setImages((prev) =>
            prev.map((img) =>
                img.id === id
                    ? {
                        ...img,
                        compressedFile: newCompressed,
                        compressedDimensions: dimensions,
                        isUpdating: false,
                    }
                    : img
            )
        );
    };

    const removeImage = (id: string) => {
        setImages((prev) => prev.filter((img) => img.id !== id));
    };

    const toggleCompare = (id: string) => {
        setImages((prev) =>
            prev.map((img) =>
                img.id === id ? { ...img, showCompare: !img.showCompare } : img
            )
        );
    };

    const getSize = (file: File) => {
        const size = file.size;
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    };

    const getCompression = (original: File, compressed: File) => {
        const saved = 100 - (compressed.size / original.size) * 100;
        return saved.toFixed(2);
    };

    const downloadWebP = (file: File) => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'compressed.webp';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 pb-[100px]">
            <label className="cursor-pointer block mx-auto mb-6">
                <div className="border-2 border-dashed border-gray-300 p-10 rounded-xl bg-gray-50 hover:border-blue-500 transition text-center">
                    <CloudUpload className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                    <p className="text-gray-600 font-medium">Upload up to 5 images</p>
                    <p className="text-xs text-gray-400">Max 5MB each · PNG/JPG</p>
                </div>
                <input multiple type="file" accept="image/png,image/jpeg" onChange={handleUpload} className="hidden" />
            </label>

            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div className="flex gap-2">
                    {(['low', 'medium', 'high'] as CompressionLevel[]).map((level) => (
                        <button
                            key={level}
                            onClick={() => setGlobalCompressionLevel(level)}
                            className={`px-4 py-2 rounded-full text-sm font-medium border ${globalCompressionLevel === level
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="flex gap-2 items-center">
                    <label className="text-sm">Resize images</label>
                    <input type="checkbox" checked={resizeEnabled} onChange={(e) => setResizeEnabled(e.target.checked)} />
                </div>
            </div>

            {images.map((img) => {
                const fileType = img.originalFile.name.split('.').pop()?.toUpperCase();

                return (
                    <div key={img.id} className="bg-white rounded-xl shadow p-4 mb-6">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-4 items-center">
                                <img src={URL.createObjectURL(img.originalFile)} alt="thumb" className="w-16 h-16 object-cover rounded" />
                                <div>
                                    <p className="text-sm font-medium">{img.originalFile.name}</p>
                                    <p className="text-xs text-gray-500">{getSize(img.originalFile)}</p>
                                </div>
                                <span className="text-xs bg-orange-100 text-orange-700 font-bold px-2 py-1 rounded">
                                    {fileType}
                                </span>
                            </div>

                            <div className="text-right">
                                <p className="text-sm">{getSize(img.compressedFile)}</p>
                                <p className="text-xs font-semibold bg-green-100 text-green-700 inline-block px-2 py-1 rounded">
                                    {getCompression(img.originalFile, img.compressedFile)}% Smaller
                                </p>
                            </div>

                            <div className="flex gap-2 items-center">
                                <button onClick={() => toggleCompare(img.id)} className="text-sm border border-blue-600 text-blue-600 rounded px-3 py-1 hover:bg-blue-50">
                                    <Eye className="w-4 h-4 inline mr-1" /> Compare
                                </button>
                                <button onClick={() => downloadWebP(img.compressedFile)} className="text-sm bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700">
                                    <Download className="w-4 h-4 inline mr-1" /> Download
                                </button>
                                <button onClick={() => removeImage(img.id)} className="text-sm bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 text-center">
                            <label className="text-gray-700 text-sm">Adjust quality (0 = high, 100 = low):</label>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                step={1}
                                value={img.qualityOverride}
                                onChange={(e) => updateQuality(img.id, Number(e.target.value))}
                                disabled={img.isUpdating}
                                className="w-56 mx-3"
                            />
                            <span className="text-xs text-gray-500">
                                → {(getMappedQuality(img.qualityOverride, globalCompressionLevel) * 100).toFixed(0)}%
                            </span>
                            {img.isUpdating && (
                                <div className="mt-1 text-blue-500 text-xs flex items-center justify-center gap-1">
                                    <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    </svg>
                                    Compressing...
                                </div>
                            )}
                        </div>

                        {img.showCompare && (
                            <div className="mt-4">
                                <ReactCompareImage
                                    key={`${img.id}-${img.qualityOverride}-${img.compressedFile.size}`}
                                    leftImage={URL.createObjectURL(img.originalFile)}
                                    rightImage={URL.createObjectURL(img.compressedFile)}
                                    leftImageLabel="Original"
                                    rightImageLabel="Compressed"
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
