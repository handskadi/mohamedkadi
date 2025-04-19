'use client';

import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { CloudUpload, Package } from 'lucide-react';
import { getCroppedImg } from './utils/cropImage';

export default function FaviconGeneratorTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [icons, setIcons] = useState<{ size: number; blob: Blob }[]>([]);
  const [loading, setLoading] = useState(false);

  const sizes = [16, 32, 48, 180, 192, 512];

  const onCropComplete = useCallback((_area: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImageSrc(reader.result as string);
  };

  const handleGenerateIcons = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setLoading(true);

    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
    const baseImage = await createImage(URL.createObjectURL(croppedBlob));
    const generated: { size: number; blob: Blob }[] = [];

    for (const size of sizes) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(baseImage, 0, 0, size, size);

      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => b && resolve(b), 'image/png')
      );
      generated.push({ size, blob });
    }

    setIcons(generated);
    setLoading(false);
  };

  const downloadAll = async () => {
    const zip = new JSZip();

    // PNGs
    icons.forEach(({ size, blob }) => {
      zip.file(`favicon-${size}x${size}.png`, blob);
    });

    // ICO generation via API
    const filesToSend = await Promise.all(
      icons
        .filter(i => [16, 32, 48].includes(i.size))
        .map(async ({ size, blob }) => {
          const base64 = await blobToBase64(blob);
          return { width: size, base64 };
        })
    );

    const res = await fetch('/api/generate-ico', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filesToSend),
    });

    const icoBlob = await res.blob();
    zip.file('favicon.ico', icoBlob);

    // manifest.json
    const manifest = {
      name: 'My Site',
      icons: icons.map(({ size }) => ({
        src: `favicon-${size}x${size}.png`,
        sizes: `${size}x${size}`,
        type: 'image/png',
      })),
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
    };
    zip.file('site.webmanifest', JSON.stringify(manifest, null, 2));

    // meta.html
    const meta = `
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="shortcut icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180x180.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#ffffff">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/favicon-192x192.png">
    `.trim();
    zip.file('meta.html', meta);

    const timestamp = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 16);
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, `compressed-icons-by-mohamedkadi.com-${timestamp}.zip`);
  };

  const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.crossOrigin = 'anonymous';
      img.src = url;
    });
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div>
      {!imageSrc && (
        <div className="mb-6">
          <label className="cursor-pointer block">
            <div className="border-2 border-dashed border-gray-300 p-10 rounded-xl bg-gray-50 hover:border-blue-500 transition text-center">
              <CloudUpload className="w-12 h-12 text-blue-500 mx-auto mb-2" />
              <p className="text-gray-600 font-medium">Click to upload an image</p>
              <p className="text-xs text-gray-400">PNG, JPG, SVG — square recommended</p>
            </div>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/svg+xml"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {imageSrc && (
        <>
          <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <div className="mt-4">
            <label className="text-sm">Zoom</label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-64"
            />
          </div>

          <button
            onClick={handleGenerateIcons}
            className="mt-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 font-medium"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Icons'}
          </button>
        </>
      )}

      {icons.length > 0 && (
        <>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {icons.map((icon) => (
              <div key={icon.size} className="text-center">
                <p className="text-xs mb-1">{icon.size}x{icon.size}</p>
                <img
                  src={URL.createObjectURL(icon.blob)}
                  alt={`icon-${icon.size}`}
                  className="w-16 h-16 mx-auto border border-gray-300"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={downloadAll}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-medium"
            >
              <Package className="w-4 h-4" />
              Download All as ZIP
            </button>
          </div>
        </>
      )}
    </div>
  );
}
