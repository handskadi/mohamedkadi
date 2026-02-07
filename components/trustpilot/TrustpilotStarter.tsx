"use client";

import * as React from "react";
import Image from "next/image";

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

/* ⭐ color depends on rating */
function starColorClass(rate: number) {
    if (rate <= 1.7) return "bg-red-500 ring-red-600";
    if (rate <= 2.7) return "bg-orange-500 ring-orange-600";
    if (rate <= 3.7) return "bg-yellow-400 ring-yellow-500";
    if (rate <= 4.2) return "bg-lime-500 ring-lime-600";
    return "bg-emerald-500 ring-emerald-600";
}

function StarsInline({ value }: { value: number }) {
    const rate = clamp(value, 0, 5);
    const v = Math.round(rate);
    const color = starColorClass(rate);

    return (
        <div className="flex justify-center gap-1" aria-label={`${v} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < v;
                return (
                    <span
                        key={i}
                        className={[
                            "inline-flex h-7 w-7 items-center justify-center rounded-[6px] ring-1 ring-inset transition",
                            filled ? color : "bg-gray-200 ring-gray-300",
                        ].join(" ")}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-[18px] w-[18px] fill-white"
                        >
                            <path d="M12 2l2.9 6.6 7.1.6-5.4 4.6 1.6 6.9L12 17.9 5.8 20.7l1.6-6.9L2 9.2l7.1-.6L12 2z" />
                        </svg>
                    </span>
                );
            })}
        </div>
    );
}

/**
 * trustpilotStarter
 * (UNCHANGED layout & behavior)
 */
export default function TrustpilotStarter({
    reviewsNum,
    rate,
    href,
    logoSrc = "/tpv3.svg",
}: {
    reviewsNum: number;
    rate: number | null;
    href?: string;
    logoSrc?: string;
}) {
    const inner = (
        <div
            className={[
                "group inline-flex w-full max-w-3xl items-center justify-center",
                "px-4 py-3",
                "flex-col gap-3 sm:flex-row sm:gap-5",
                "rounded-none border border-transparent bg-transparent shadow-none",
                "transition",
                "group-hover:bg-white group-hover:border-gray-200 group-hover:shadow-sm group-hover:rounded-md",
                "focus-within:bg-white focus-within:border-gray-200 focus-within:shadow-sm focus-within:rounded-md",
            ].join(" ")}
        >
            {/* Text */}
            <div className="text-center sm:text-left">
                <span className="text-base text-gray-800">
                    Check out our{" "}
                    <span className="font-semibold text-gray-900">{reviewsNum}</span>{" "}
                    reviews
                </span>
            </div>

            {/* Stars */}
            <div className="flex justify-center">
                <StarsInline value={rate ?? 0} />
            </div>

            {/* Logo */}
            <div className="flex justify-center">
                <Image
                    src={logoSrc}
                    alt="Trustpilot"
                    width={140}
                    height={34}
                    priority
                    className="h-7 w-auto"
                />
            </div>
        </div>
    );

    const centered = (
        <div className="w-full">
            <div className="mx-auto flex w-full justify-center">{inner}</div>
        </div>
    );

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="block w-full outline-none"
                aria-label="Open Trustpilot reviews"
            >
                {centered}
            </a>
        );
    }

    return centered;
}
