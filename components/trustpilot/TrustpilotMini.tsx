"use client";

import * as React from "react";
import Image from "next/image";

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

/**
 * Trustpilot-like colors based on rating ranges (approx from your image)
 * 1.0–1.7: red
 * 1.8–2.2: orange
 * 2.3–3.2: yellow
 * 3.3–4.2: light green
 * 4.3–5.0: green
 */
function starColorClass(rating: number) {
    if (rating <= 1.7) return "bg-red-500";
    if (rating <= 2.2) return "bg-orange-500";
    if (rating <= 3.2) return "bg-yellow-400";
    if (rating <= 4.2) return "bg-lime-500";
    return "bg-emerald-500";
}

function StarsRow({ value }: { value: number }) {
    const rating = clamp(value, 0, 5);
    const full = Math.floor(rating);
    const frac = rating - full;
    const hasHalf = frac >= 0.25 && frac < 0.75;
    const filledCount = full + (hasHalf ? 1 : 0); // we render half visually via overlay

    const fillClass = starColorClass(rating);

    return (
        <div className="flex justify-center gap-1" aria-label={`${rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => {
                const isFilled = i < full;
                const isHalf = hasHalf && i === full;

                return (
                    <span
                        key={i}
                        className={[
                            "relative inline-flex h-10 w-10 items-center justify-center rounded-[2px]",
                            isFilled || isHalf ? fillClass : "bg-gray-200",
                        ].join(" ")}
                    >
                        {/* half overlay: cover right half with gray */}
                        {isHalf && (
                            <span className="absolute right-0 top-0 h-full w-1/2 bg-gray-200" />
                        )}

                        <svg viewBox="0 0 24 24" className="relative z-10 h-6 w-6 fill-white">
                            <path d="M12 2l2.9 6.6 7.1.6-5.4 4.6 1.6 6.9L12 17.9 5.8 20.7l1.6-6.9L2 9.2l7.1-.6L12 2z" />
                        </svg>
                    </span>
                );
            })}
        </div>
    );
}

/**
 * trustpilotMini (Centered + colored stars)
 *
 * Props:
 * - rate: number | null
 * - reviewsNum: number
 * - href?: optional link wrapper (Trustpilot page)
 * - logoSrc?: default /tpv3.svg
 */
export default function TrustpilotMini({
    rate,
    reviewsNum,
    href,
    logoSrc = "/tpv3.svg",
}: {
    rate: number | null;
    reviewsNum: number;
    href?: string;
    logoSrc?: string;
}) {
    const safeRate = typeof rate === "number" ? clamp(rate, 0, 5) : 0;
    const scoreLabel = typeof rate === "number" ? safeRate.toFixed(1) : "—";

    const content = (
        <div className="mx-auto inline-flex w-full max-w-xs flex-col items-center text-center">
            <Image
                src={logoSrc}
                alt="Trustpilot"
                width={140}
                height={34}
                priority
                className="h-7 w-auto"
            />

            <div className="mt-2">
                <StarsRow value={safeRate} />
            </div>

            <div className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-900">
                <span className="text-gray-700">
                    TrustScore <span className="font-semibold text-gray-900">{scoreLabel}</span>
                </span>

                <span className="h-4 w-px bg-gray-300" aria-hidden="true" />

                <span className="font-semibold underline underline-offset-2">
                    {reviewsNum} reviews
                </span>
            </div>
        </div>
    );

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex w-full rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 mx-auto  justify-center"
                aria-label="Open Trustpilot reviews"
            >
                {content}
            </a>
        );
    }

    return <div className="w-full">{content}</div>;
}
