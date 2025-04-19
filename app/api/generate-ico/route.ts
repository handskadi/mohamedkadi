import { NextRequest, NextResponse } from "next/server";
import pngToIco from "png-to-ico";

export const runtime = "nodejs"; // Force to run on Node.js side

export async function POST(req: NextRequest) {
  try {
    const files = await req.json(); // [{ width: number, base64: string }]

    const buffers: Buffer[] = await Promise.all(
      files.map(async ({ base64 }: { base64: string }) => {
        const res = await fetch(base64);
        const arrayBuffer = await res.arrayBuffer();
        return Buffer.from(arrayBuffer);
      })
    );

    const icoBuffer = await pngToIco(buffers); // returns full .ico Buffer
    return new NextResponse(icoBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/x-icon",
        "Content-Disposition": 'attachment; filename="favicon.ico"',
      },
    });
  } catch (err) {
    console.error("[ICO ERROR]", err);
    return new NextResponse("ICO generation failed", { status: 500 });
  }
}
