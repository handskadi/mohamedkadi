"use client";

import * as React from "react";
import Image from "next/image";
import type { TrustpilotReview } from "@/lib/trustpilot";

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

/** ✅ Star color depends on rating value (0–5) */
function starTone(value: number) {
    const v = clamp(value, 0, 5);

    // Matches your color table idea
    if (v <= 1.7) return "bg-red-500 ring-red-600";
    if (v <= 2.7) return "bg-orange-500 ring-orange-600";
    if (v <= 3.7) return "bg-yellow-400 ring-yellow-500";
    if (v <= 4.2) return "bg-lime-500 ring-lime-600";
    return "bg-emerald-500 ring-emerald-600";
}

function Stars({ value, size = "md" }: { value: number; size?: "sm" | "md" }) {
    const v = clamp(Math.round(value), 0, 5);
    const box = size === "sm" ? "h-6 w-6" : "h-7 w-7";
    const icon = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]";

    const filledCls = starTone(value);

    return (
        <div className="flex gap-1" aria-label={`${v} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < v;
                return (
                    <span
                        key={i}
                        className={[
                            "inline-flex items-center justify-center rounded-[6px] ring-1 ring-inset",
                            box,
                            filled ? filledCls : "bg-gray-100 ring-gray-200",
                        ].join(" ")}
                    >
                        <svg viewBox="0 0 24 24" className={`${icon} fill-white`}>
                            <path d="M12 2l2.9 6.6 7.1.6-5.4 4.6 1.6 6.9L12 17.9 5.8 20.7l1.6-6.9L2 9.2l7.1-.6L12 2z" />
                        </svg>
                    </span>
                );
            })}
        </div>
    );
}

function timeAgo(iso: string) {
    const t = new Date(iso).getTime();
    const diff = Date.now() - t;
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${Math.max(1, mins)} minutes ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
}

function truncate(str: string, n = 170) {
    const s = (str || "").trim();
    return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

function scoreLabel(rate: number | null) {
    if (rate == null) return "—";
    if (rate >= 4.5) return "Excellent";
    if (rate >= 4.0) return "Great";
    if (rate >= 3.0) return "Average";
    return "Poor";
}

function IconChevron({ dir }: { dir: "left" | "right" }) {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
            {dir === "left" ? (
                <path
                    d="M15 18l-6-6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            ) : (
                <path
                    d="M9 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
        </svg>
    );
}

function VerifiedBadge() {
    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-xs text-gray-600 ring-1 ring-inset ring-gray-200">
            <span className="inline-block h-2 w-2 rounded-full bg-gray-400" />
            Verified
        </span>
    );
}

function getCardWidth(el: HTMLDivElement | null) {
    if (!el) return 340;
    const card = el.querySelector<HTMLElement>("[data-card]");
    return card ? card.offsetWidth : 340;
}

function scrollByCards(el: HTMLDivElement | null, dir: "left" | "right") {
    if (!el) return;
    const w = getCardWidth(el);
    el.scrollBy({ left: dir === "left" ? -w : w, behavior: "smooth" });
}

function updateArrowsFor(
    el: HTMLDivElement | null,
    setLeft: (v: boolean) => void,
    setRight: (v: boolean) => void
) {
    if (!el) return;
    const left = el.scrollLeft;
    const max = el.scrollWidth - el.clientWidth;
    setLeft(left > 4);
    setRight(left < max - 4);
}

export default function TrustpilotCarousel({
    rate,
    reviewsNum,
    reviews,
}: {
    rate: number | null;
    reviewsNum: number;
    reviews: TrustpilotReview[];
}) {
    const desktopScrollerRef = React.useRef<HTMLDivElement | null>(null);
    const mobileScrollerRef = React.useRef<HTMLDivElement | null>(null);

    const [desktopCanLeft, setDesktopCanLeft] = React.useState(false);
    const [desktopCanRight, setDesktopCanRight] = React.useState(true);
    const [mobileCanLeft, setMobileCanLeft] = React.useState(false);
    const [mobileCanRight, setMobileCanRight] = React.useState(true);

    // Auto-advance (desktop only)
    const [pauseAuto, setPauseAuto] = React.useState(false);
    const pauseUntilRef = React.useRef<number>(0);

    const pauseAutoFor = (ms: number) => {
        pauseUntilRef.current = Date.now() + ms;
    };

    React.useEffect(() => {
        const el = desktopScrollerRef.current;
        if (!el) return;

        const onScroll = () => updateArrowsFor(el, setDesktopCanLeft, setDesktopCanRight);

        onScroll();
        el.addEventListener("scroll", onScroll, { passive: true });

        const ro = new ResizeObserver(onScroll);
        ro.observe(el);

        return () => {
            el.removeEventListener("scroll", onScroll);
            ro.disconnect();
        };
    }, []);

    React.useEffect(() => {
        const el = mobileScrollerRef.current;
        if (!el) return;

        const onScroll = () => updateArrowsFor(el, setMobileCanLeft, setMobileCanRight);

        onScroll();
        el.addEventListener("scroll", onScroll, { passive: true });

        const ro = new ResizeObserver(onScroll);
        ro.observe(el);

        return () => {
            el.removeEventListener("scroll", onScroll);
            ro.disconnect();
        };
    }, []);

    React.useEffect(() => {
        const el = desktopScrollerRef.current;
        if (!el) return;

        const id = window.setInterval(() => {
            if (pauseAuto) return;
            if (Date.now() < pauseUntilRef.current) return;

            const max = el.scrollWidth - el.clientWidth;
            if (el.scrollLeft >= max - 4) {
                el.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                scrollByCards(el, "right");
            }
        }, 4500);

        return () => window.clearInterval(id);
    }, [pauseAuto]);

    const label = scoreLabel(rate);

    const mobileItems = React.useMemo(() => {
        return [
            { kind: "summary" as const },
            ...reviews.slice(0, 12).map((r) => ({ kind: "review" as const, r })),
        ];
    }, [reviews]);

    return (
        <section className="w-full">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                {/* Desktop layout */}
                <div className="hidden gap-6 md:flex md:items-stretch">
                    {/* Summary */}
                    <div className="w-[280px] shrink-0">
                        <div className="h-full rounded-2xl border border-gray-200 bg-white p-5">
                            <div className="text-4xl font-semibold tracking-tight text-gray-900">
                                {label}
                            </div>

                            <div className="mt-4">
                                <Stars value={rate ?? 0} />
                            </div>

                            <div className="mt-3 text-sm text-gray-600">
                                Based on{" "}
                                <span className="font-medium text-gray-900">{reviewsNum}</span>{" "}
                                reviews
                            </div>

                            <div className="mt-8 flex items-center gap-3">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white ring-1 ring-inset ring-emerald-600">
                                    ★
                                </span>
                                <div className="flex flex-col">
                                    <Image src="/tpv3.svg" alt="Trustpilot" width={120} height={30} priority />
                                    <span className="mt-1 text-xs text-gray-500">
                                        Showing our latest reviews
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews scroller */}
                    <div
                        className="relative min-w-0 flex-1"
                        onMouseEnter={() => setPauseAuto(true)}
                        onMouseLeave={() => setPauseAuto(false)}
                    >
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />

                        <button
                            type="button"
                            onClick={() => {
                                pauseAutoFor(6000);
                                scrollByCards(desktopScrollerRef.current, "left");
                            }}
                            disabled={!desktopCanLeft}
                            className={[
                                "absolute left-2 top-1/2 z-10 -translate-y-1/2",
                                "inline-flex h-11 w-11 items-center justify-center rounded-full",
                                "bg-white/90 ring-1 ring-inset ring-gray-200 shadow-sm backdrop-blur",
                                "transition active:scale-[0.98]",
                                "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
                                desktopCanLeft ? "hover:bg-white" : "opacity-40",
                            ].join(" ")}
                            aria-label="Previous reviews"
                        >
                            <IconChevron dir="left" />
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                pauseAutoFor(6000);
                                scrollByCards(desktopScrollerRef.current, "right");
                            }}
                            disabled={!desktopCanRight}
                            className={[
                                "absolute right-2 top-1/2 z-10 -translate-y-1/2",
                                "inline-flex h-11 w-11 items-center justify-center rounded-full",
                                "bg-white/90 ring-1 ring-inset ring-gray-200 shadow-sm backdrop-blur",
                                "transition active:scale-[0.98]",
                                "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
                                desktopCanRight ? "hover:bg-white" : "opacity-40",
                            ].join(" ")}
                            aria-label="Next reviews"
                        >
                            <IconChevron dir="right" />
                        </button>

                        <div
                            ref={desktopScrollerRef}
                            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 pr-2
                [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {reviews.slice(0, 12).map((r, idx) => (
                                <article
                                    key={`${r.createdAt}-${idx}`}
                                    data-card
                                    className="w-[360px] shrink-0 snap-start rounded-2xl border border-gray-200 bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.02)]
                    transition hover:shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <Stars value={r.rating} size="sm" />
                                        <VerifiedBadge />
                                    </div>

                                    <div className="mt-4 line-clamp-1 text-[15px] font-semibold text-gray-900">
                                        {r.title ?? truncate(r.text, 48)}
                                    </div>

                                    <p className="mt-2 line-clamp-4 text-sm leading-6 text-gray-700">
                                        {r.text}
                                    </p>

                                    <div className="mt-5 text-xs text-gray-600">
                                        <span className="font-medium text-gray-900">
                                            {r.consumer ?? "Anonymous"}
                                        </span>
                                        <span className="mx-1 text-gray-400">•</span>
                                        <span>{timeAgo(r.createdAt)}</span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile layout */}
                <div className="md:hidden">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" />

                        <div
                            ref={mobileScrollerRef}
                            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 pr-2
                [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {mobileItems.map((item, idx) => {
                                if (item.kind === "summary") {
                                    return (
                                        <div
                                            key="summary"
                                            data-card
                                            className="w-[88%] shrink-0 snap-start rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                                        >
                                            <div className="flex flex-col items-center text-center">
                                                <div className="text-3xl font-semibold tracking-tight text-gray-900">
                                                    {label}
                                                </div>

                                                <div className="mt-3">
                                                    <Stars value={rate ?? 0} />
                                                </div>

                                                <div className="mt-3 text-sm text-gray-600">
                                                    Based on{" "}
                                                    <span className="font-medium text-gray-900">{reviewsNum}</span>{" "}
                                                    reviews
                                                </div>

                                                <div className="mt-6 flex items-center justify-center gap-3">
                                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white ring-1 ring-inset ring-emerald-600">
                                                        ★
                                                    </span>
                                                    <Image src="/tpv3.svg" alt="Trustpilot" width={120} height={30} priority />
                                                </div>

                                                <div className="mt-3 text-xs text-gray-500">Swipe to read reviews →</div>
                                            </div>
                                        </div>
                                    );
                                }

                                const r = item.r;
                                return (
                                    <article
                                        key={`${r.createdAt}-${idx}`}
                                        data-card
                                        className="w-[88%] shrink-0 snap-start rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <Stars value={r.rating} size="sm" />
                                            <VerifiedBadge />
                                        </div>

                                        <div className="mt-4 line-clamp-1 text-[15px] font-semibold text-gray-900">
                                            {r.title ?? truncate(r.text, 48)}
                                        </div>

                                        <p className="mt-2 line-clamp-5 text-sm leading-6 text-gray-700">
                                            {r.text}
                                        </p>

                                        <div className="mt-5 text-xs text-gray-600">
                                            <span className="font-medium text-gray-900">{r.consumer ?? "Anonymous"}</span>
                                            <span className="mx-1 text-gray-400">•</span>
                                            <span>{timeAgo(r.createdAt)}</span>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        <div className="mt-3 flex items-center justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => scrollByCards(mobileScrollerRef.current, "left")}
                                disabled={!mobileCanLeft}
                                className={[
                                    "inline-flex h-10 w-10 items-center justify-center rounded-full",
                                    "bg-white ring-1 ring-inset ring-gray-200 shadow-sm",
                                    "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
                                    mobileCanLeft ? "active:scale-[0.98]" : "opacity-40",
                                ].join(" ")}
                                aria-label="Previous"
                            >
                                <IconChevron dir="left" />
                            </button>

                            <button
                                type="button"
                                onClick={() => scrollByCards(mobileScrollerRef.current, "right")}
                                disabled={!mobileCanRight}
                                className={[
                                    "inline-flex h-10 w-10 items-center justify-center rounded-full",
                                    "bg-white ring-1 ring-inset ring-gray-200 shadow-sm",
                                    "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
                                    mobileCanRight ? "active:scale-[0.98]" : "opacity-40",
                                ].join(" ")}
                                aria-label="Next"
                            >
                                <IconChevron dir="right" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
