"use client";

import * as React from "react";
import Image from "next/image";
import type { TrustpilotReview } from "@/lib/trustpilot";
import { createPortal } from "react-dom";

/* ---------------------- helpers ---------------------- */
function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function initials(name?: string | null) {
    const s = (name || "").trim();
    if (!s) return "U";
    const parts = s.split(/\s+/).filter(Boolean);
    const a = parts[0]?.[0] ?? "U";
    const b = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
    return (a + b).toUpperCase();
}

function Avatar({
    name,
    avatarUrl,
    size = 40,
}: {
    name?: string | null;
    avatarUrl?: string | null;
    size?: number;
}) {
    const s = Math.max(24, size);

    if (avatarUrl) {
        return (
            <span
                className="relative inline-flex overflow-hidden rounded-full ring-1 ring-inset ring-gray-200 bg-gray-50"
                style={{ width: s, height: s }}
            >
                <Image
                    src={avatarUrl}
                    alt={name ? `${name} avatar` : "User avatar"}
                    fill
                    sizes={`${s}px`}
                    className="object-cover"
                />
            </span>
        );
    }

    return (
        <span
            className="inline-flex items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-gray-900"
            style={{ width: s, height: s }}
            aria-label={name ? `${name} initials` : "User initials"}
        >
            {initials(name)}
        </span>
    );
}

function starColorClass(rate: number) {
    if (rate <= 1.7) return "bg-red-500 ring-red-600";
    if (rate <= 2.7) return "bg-orange-500 ring-orange-600";
    if (rate <= 3.7) return "bg-yellow-400 ring-yellow-500";
    if (rate <= 4.2) return "bg-lime-500 ring-lime-600";
    return "bg-emerald-500 ring-emerald-600";
}

// ✅ stable "now" for client-only relative time
function useNow() {
    const [now, setNow] = React.useState<number | null>(null);
    React.useEffect(() => {
        setNow(Date.now());
    }, []);
    return now;
}

function timeAgo(iso: string, nowMs: number | null) {
    if (!nowMs) return ""; // avoid SSR/first-render mismatch
    const t = new Date(iso).getTime();
    const diff = nowMs - t;
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${Math.max(1, mins)} minutes ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
}

// ✅ fixed locale to avoid server/client mismatch
function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
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

function extractCompanyFromTrustpilotUrl(url?: string | null) {
    try {
        if (!url) return null;
        const u = new URL(url);
        const parts = u.pathname.split("/").filter(Boolean);
        const reviewIdx = parts.indexOf("review");
        if (reviewIdx >= 0 && parts[reviewIdx + 1]) return parts[reviewIdx + 1];
        return null;
    } catch {
        return null;
    }
}

function buildEvaluateUrl(trustpilotUrl?: string | null) {
    const company = extractCompanyFromTrustpilotUrl(trustpilotUrl);
    if (!company) return null;
    return `https://www.trustpilot.com/evaluate/${company}`;
}

async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        return false;
    }
}

function openPopup(url: string) {
    const w = 720;
    const h = 640;
    const y = window.top?.outerHeight
        ? (window.top.outerHeight - h) / 2 + window.top.screenY
        : 100;
    const x = window.top?.outerWidth
        ? (window.top.outerWidth - w) / 2 + window.top.screenX
        : 100;
    window.open(url, "share", `toolbar=0,status=0,width=${w},height=${h},top=${y},left=${x}`);
}

function canUseNativeShare() {
    if (typeof window === "undefined") return false;
    const navAny = navigator as any;
    if (!navAny.share) return false;

    const isTouch =
        "ontouchstart" in window ||
        (navigator.maxTouchPoints ?? 0) > 0 ||
        (navigator as any).msMaxTouchPoints > 0;

    const isSmallScreen = window.matchMedia?.("(max-width: 768px)")?.matches ?? false;

    return isTouch || isSmallScreen;
}

/* ---------------------- UI icons ---------------------- */
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

function IconClose() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path
                d="M18 6L6 18M6 6l12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function IconShare() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4">
            <path
                d="M16 8a3 3 0 10-2.8-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M8 13l8-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M16 20a3 3 0 10-2.8-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M8 11a3 3 0 10-2.8 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M8 13l8 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

function IconPencil() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4">
            <path
                d="M12 20h9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M16.5 3.5a2.1 2.1 0 013 3L8 18l-4 1 1-4 11.5-11.5z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// Social icons
function IconWhatsapp() {
    return (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path
                d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />
            <path
                d="M8.8 7.7c.3-.7.5-.7.8-.7h.6c.2 0 .5.1.6.5l.9 2.2c.1.3.1.6-.1.9l-.5.7c-.1.2-.2.4 0 .6.5 1 1.6 2 2.6 2.5.2.1.4.1.6 0l.7-.5c.3-.2.6-.2.9-.1l2.2.9c.4.2.5.4.5.6v.6c0 .3 0 .5-.7.8-.5.2-1.6.6-3.2.1-1.5-.4-3.3-1.9-4.4-3-1.1-1.1-2.6-2.9-3-4.4-.5-1.6-.1-2.7.1-3.2z"
                fill="currentColor"
            />
        </svg>
    );
}

function IconMail() {
    return (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path
                d="M4 6h16v12H4V6z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />
            <path
                d="M4 7l8 6 8-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function IconSMS() {
    return (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path
                d="M4 5h16v11H7l-3 3V5z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />
            <path
                d="M7.5 9.5h9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
            />
            <path
                d="M7.5 12.5h7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
            />
        </svg>
    );
}

function IconFacebook() {
    return (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path
                d="M14 8h2V5h-2a4 4 0 00-4 4v2H8v3h2v6h3v-6h2.3l.7-3H13V9a1 1 0 011-1z"
                fill="currentColor"
            />
        </svg>
    );
}

function IconX() {
    return (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path
                d="M18.5 3H21l-6.7 7.6L21.5 21H16l-4.3-5.4L6.9 21H4.4l7.2-8.2L4 3h5.6l3.9 4.9L18.5 3z"
                fill="currentColor"
            />
        </svg>
    );
}

function IconLinkedIn() {
    return (
        <svg viewBox="0 0 24 24" className="h-6 w-6">
            <path
                d="M6 9H3v12h3V9zM4.5 3.5A1.75 1.75 0 104.5 7a1.75 1.75 0 000-3.5zM21 14.2c0-3.2-1.7-5.2-4.7-5.2-1.4 0-2.4.7-3 1.5V9H10v12h3.2v-6.2c0-1.6.3-3.1 2.2-3.1 1.9 0 1.9 1.8 1.9 3.2V21H21v-6.8z"
                fill="currentColor"
            />
        </svg>
    );
}

function IconCopy() {
    return (
        <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path
                d="M9 9h10v10H9V9z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />
            <path
                d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function Stars({ value, size = "md" }: { value: number; size?: "sm" | "md" }) {
    const rate = clamp(value, 0, 5);
    const v = clamp(Math.round(rate), 0, 5);

    const box = size === "sm" ? "h-6 w-6" : "h-7 w-7";
    const icon = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]";
    const filledCls = starColorClass(rate);

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

function VerifiedBadge() {
    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-xs text-gray-600 ring-1 ring-inset ring-gray-200">
            <span className="inline-block h-2 w-2 rounded-full bg-gray-400" />
            Verified
        </span>
    );
}

/* ---------------------- Portal Share Modal (pro) ---------------------- */
function useBodyScrollLock(locked: boolean) {
    React.useEffect(() => {
        if (!locked) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [locked]);
}

function ShareModal({
    open,
    onClose,
    url,
    title,
}: {
    open: boolean;
    onClose: () => void;
    url: string;
    title: string;
}) {
    const [mounted, setMounted] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    useBodyScrollLock(open);

    React.useEffect(() => setMounted(true), []);

    React.useEffect(() => {
        if (!open) return;
        setCopied(false);
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open || !mounted) return null;

    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(title);

    const actions: Array<{
        label: string;
        icon: React.ReactNode;
        onClick: () => void | Promise<void>;
    }> = [
            {
                label: "WhatsApp",
                icon: <IconWhatsapp />,
                onClick: () => openPopup(`https://wa.me/?text=${encodedText}%20${encodedUrl}`),
            },
            {
                label: "Email",
                icon: <IconMail />,
                onClick: () => {
                    window.location.href = `mailto:?subject=${encodedText}&body=${encodedText}%0A${encodedUrl}`;
                },
            },
            {
                label: "SMS",
                icon: <IconSMS />,
                onClick: () => {
                    window.location.href = `sms:?&body=${encodedText}%20${encodedUrl}`;
                },
            },
            {
                label: "Facebook",
                icon: <IconFacebook />,
                onClick: () => openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`),
            },
            {
                label: "X",
                icon: <IconX />,
                onClick: () =>
                    openPopup(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`),
            },
            {
                label: "LinkedIn",
                icon: <IconLinkedIn />,
                onClick: () =>
                    openPopup(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`),
            },
            {
                label: copied ? "Copied" : "Copy link",
                icon: <IconCopy />,
                onClick: async () => {
                    const ok = await copyToClipboard(url);
                    setCopied(ok);
                    window.setTimeout(() => setCopied(false), 1500);
                },
            },
        ];

    const modal = (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Share"
        >
            {/* overlay */}
            <button className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close share" />

            {/* dialog */}
            <div className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
                <div className="flex items-start justify-between gap-4 border-b border-gray-200 p-5">
                    <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-900">Share</div>
                        <div className="mt-1 truncate text-xs text-gray-500">{url}</div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-inset ring-gray-200 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        aria-label="Close"
                    >
                        <IconClose />
                    </button>
                </div>

                <div className="p-5">
                    <div className="grid grid-cols-3 gap-3">
                        {actions.map((a) => (
                            <button
                                key={a.label}
                                type="button"
                                onClick={async () => {
                                    await a.onClick();
                                    onClose();
                                }}
                                className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-3 text-center
                  shadow-[0_1px_0_rgba(0,0,0,0.02)] transition hover:bg-gray-50 hover:shadow-sm
                  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                            >
                                <span className="text-gray-900 transition group-hover:scale-[1.03]">{a.icon}</span>
                                <span className="text-xs font-medium text-gray-800">{a.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-4 rounded-xl bg-gray-50 p-3 text-xs text-gray-600 ring-1 ring-inset ring-gray-200">
                        Tip: if a provider doesn’t open (desktop), try “Copy link”.
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modal, document.body);
}

/* ---------------------- Review Modal ---------------------- */
function ReviewModal({
    open,
    onClose,
    review,
    trustpilotUrl,
    onShare,
    now,
}: {
    open: boolean;
    onClose: () => void;
    review: TrustpilotReview | null;
    trustpilotUrl?: string | null;
    onShare: () => void;
    now: number | null;
}) {
    useBodyScrollLock(open);

    React.useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    const evaluateUrl = buildEvaluateUrl(trustpilotUrl);

    if (!open || !review) return null;

    const name = review.consumer ?? "Anonymous";
    const title = review.title ?? "Review";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <button className="absolute inset-0 cursor-default bg-black/40" onClick={onClose} aria-label="Close modal" />

            <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
                <div className="flex items-start justify-between gap-4 border-b border-gray-200 p-5">
                    <div className="flex items-center gap-3">
                        <Avatar name={name} avatarUrl={review.avatarUrl} size={40} />
                        <div className="min-w-0">
                            <div className="truncate font-semibold text-gray-900">{name}</div>
                            <div className="text-xs text-gray-500">Trustpilot user</div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white ring-1 ring-inset ring-gray-200 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        aria-label="Close"
                    >
                        <IconClose />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-4">
                            <Stars value={review.rating} />
                            <VerifiedBadge />
                        </div>
                        <div className="text-sm text-gray-500">{timeAgo(review.createdAt, now)}</div>
                    </div>

                    <div className="mt-4 text-lg font-semibold text-gray-900">{title}</div>

                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-700">{review.text}</p>

                    <div className="mt-5">
                        <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-700 ring-1 ring-inset ring-gray-200">
                            {formatDate(review.createdAt)}
                        </span>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-gray-200 pt-4 text-sm text-gray-600">
                        {evaluateUrl ? (
                            <a href={evaluateUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-gray-900">
                                <IconPencil />
                                Write review
                            </a>
                        ) : (
                            <span className="inline-flex items-center gap-2 text-gray-400">
                                <IconPencil />
                                Write review
                            </span>
                        )}

                        <button type="button" className="inline-flex items-center gap-2 hover:text-gray-900" onClick={onShare}>
                            <IconShare />
                            Share
                        </button>

                        {review.consumerProfileUrl ? (
                            <a className="ml-auto text-emerald-700 hover:text-emerald-800" href={review.consumerProfileUrl} target="_blank" rel="noreferrer">
                                View profile
                            </a>
                        ) : (
                            <span className="ml-auto text-gray-400"> </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ---------------------- Main component ---------------------- */
export default function TrustpilotCarouselV2({
    rate,
    reviewsNum,
    reviews,
    trustpilotUrl,
}: {
    rate: number | null;
    reviewsNum: number;
    reviews: TrustpilotReview[];
    trustpilotUrl?: string | null;
}) {
    const desktopScrollerRef = React.useRef<HTMLDivElement | null>(null);
    const mobileScrollerRef = React.useRef<HTMLDivElement | null>(null);

    const [desktopCanLeft, setDesktopCanLeft] = React.useState(false);
    const [desktopCanRight, setDesktopCanRight] = React.useState(true);
    const [mobileCanLeft, setMobileCanLeft] = React.useState(false);
    const [mobileCanRight, setMobileCanRight] = React.useState(true);

    const now = useNow();

    // Auto-advance (desktop only)
    const [pauseAuto, setPauseAuto] = React.useState(false);
    const pauseUntilRef = React.useRef<number>(0);
    const pauseAutoFor = (ms: number) => {
        pauseUntilRef.current = Date.now() + ms;
    };

    // Review modal state
    const [reviewOpen, setReviewOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<TrustpilotReview | null>(null);
    const openReview = (r: TrustpilotReview) => {
        setSelected(r);
        setReviewOpen(true);
        pauseAutoFor(9000);
    };
    const closeReview = () => {
        setReviewOpen(false);
        window.setTimeout(() => setSelected(null), 150);
    };

    // Share modal state
    const [shareOpen, setShareOpen] = React.useState(false);

    const evaluateUrl = buildEvaluateUrl(trustpilotUrl);
    const shareUrl = trustpilotUrl || "";
    const shareTitle = "Check these Trustpilot reviews";

    const triggerShare = async () => {
        if (!shareUrl) return;

        if (canUseNativeShare()) {
            try {
                await navigator.share({
                    title: "Trustpilot",
                    text: shareTitle,
                    url: shareUrl,
                });
                return;
            } catch {
                // fallback
            }
        }

        setShareOpen(true);
    };

    // Observe desktop scroll
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

    // Observe mobile scroll
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

    // Auto-advance desktop carousel
    React.useEffect(() => {
        const el = desktopScrollerRef.current;
        if (!el) return;

        const id = window.setInterval(() => {
            if (pauseAuto) return;
            if (reviewOpen) return;
            if (shareOpen) return;
            if (Date.now() < pauseUntilRef.current) return;

            const max = el.scrollWidth - el.clientWidth;
            if (el.scrollLeft >= max - 4) {
                el.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                scrollByCards(el, "right");
            }
        }, 4500);

        return () => window.clearInterval(id);
    }, [pauseAuto, reviewOpen, shareOpen]);

    const label = scoreLabel(rate);

    const mobileItems = React.useMemo(() => {
        return [{ kind: "summary" as const }, ...reviews.slice(0, 12).map((r) => ({ kind: "review" as const, r }))];
    }, [reviews]);

    return (
        <section className="w-full">
            <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} url={shareUrl} title={shareTitle} />

            <ReviewModal open={reviewOpen} onClose={closeReview} review={selected} trustpilotUrl={trustpilotUrl} onShare={triggerShare} now={now} />

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                {/* Desktop layout */}
                <div className="hidden gap-6 md:flex md:items-stretch">
                    {/* Summary */}
                    <div className="w-[280px] shrink-0">
                        <div className="h-full rounded-2xl border border-gray-200 bg-white p-5">
                            <div className="text-4xl font-semibold tracking-tight text-gray-900">{label}</div>

                            <div className="mt-4">
                                <Stars value={rate ?? 0} />
                            </div>

                            <div className="mt-3 text-sm text-gray-600">
                                Based on <span className="font-medium text-gray-900">{reviewsNum}</span> reviews
                            </div>

                            <div className="mt-8 flex items-center gap-3">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white ring-1 ring-inset ring-emerald-600">
                                    ★
                                </span>
                                <div className="flex flex-col">
                                    <Image src="/tpv3.svg" alt="Trustpilot" width={120} height={30} priority />
                                    <span className="mt-1 text-xs text-gray-500">Showing our latest reviews</span>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-gray-700">
                                {evaluateUrl ? (
                                    <a href={evaluateUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-gray-900">
                                        <IconPencil />
                                        Write review
                                    </a>
                                ) : (
                                    <span className="inline-flex items-center gap-2 text-gray-400">
                                        <IconPencil />
                                        Write review
                                    </span>
                                )}

                                <button type="button" className="ml-auto inline-flex items-center gap-2 hover:text-gray-900" onClick={triggerShare}>
                                    <IconShare />
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Reviews scroller */}
                    <div className="relative min-w-0 flex-1" onMouseEnter={() => setPauseAuto(true)} onMouseLeave={() => setPauseAuto(false)}>
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
                            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {reviews.slice(0, 12).map((r, idx) => {
                                const name = r.consumer ?? "Anonymous";
                                const title = r.title ?? truncate(r.text, 52);

                                return (
                                    // ✅ article (not button) to prevent nested buttons
                                    <article
                                        key={`${r.createdAt}-${idx}`}
                                        data-card
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => openReview(r)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                openReview(r);
                                            }
                                        }}
                                        className="w-[360px] shrink-0 snap-start text-left rounded-2xl border border-gray-200 bg-white p-5
                      shadow-[0_1px_0_rgba(0,0,0,0.02)] transition hover:shadow-sm
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <Avatar name={name} avatarUrl={r.avatarUrl} size={40} />
                                                <div className="min-w-0">
                                                    <div className="truncate font-semibold text-gray-900">{name}</div>
                                                    <div className="text-xs text-gray-500">{timeAgo(r.createdAt, now)}</div>
                                                </div>
                                            </div>

                                            <VerifiedBadge />
                                        </div>

                                        <div className="mt-4 flex items-center gap-4">
                                            <Stars value={r.rating} size="sm" />
                                            <VerifiedBadge />
                                        </div>

                                        <div className="mt-4 line-clamp-2 text-[15px] font-semibold text-gray-900">{title}</div>

                                        <p className="mt-2 line-clamp-4 text-sm leading-6 text-gray-700">
                                            {r.text}
                                            <span className="ml-1 text-emerald-700">See more</span>
                                        </p>

                                        <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
                                            {evaluateUrl ? (
                                                <a
                                                    href={evaluateUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-2 hover:text-gray-900"
                                                >
                                                    <IconPencil />
                                                    Write review
                                                </a>
                                            ) : (
                                                <span className="inline-flex items-center gap-2 text-gray-400">
                                                    <IconPencil />
                                                    Write review
                                                </span>
                                            )}

                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    triggerShare();
                                                }}
                                                className="inline-flex items-center gap-2 hover:text-gray-900"
                                            >
                                                <IconShare />
                                                Share
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
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
                            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {mobileItems.map((item, idx) => {
                                if (item.kind === "summary") {
                                    return (
                                        <div key="summary" data-card className="w-[88%] shrink-0 snap-start rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                            <div className="flex flex-col items-center text-center">
                                                <div className="text-3xl font-semibold tracking-tight text-gray-900">{label}</div>

                                                <div className="mt-3">
                                                    <Stars value={rate ?? 0} />
                                                </div>

                                                <div className="mt-3 text-sm text-gray-600">
                                                    Based on <span className="font-medium text-gray-900">{reviewsNum}</span> reviews
                                                </div>

                                                <div className="mt-6 flex items-center justify-center gap-3">
                                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white ring-1 ring-inset ring-emerald-600">
                                                        ★
                                                    </span>
                                                    <Image src="/tpv3.svg" alt="Trustpilot" width={120} height={30} priority />
                                                </div>

                                                <div className="mt-3 text-xs text-gray-500">Swipe to read reviews →</div>

                                                <div className="mt-5 flex w-full items-center justify-center gap-6 text-sm text-gray-700">
                                                    {evaluateUrl ? (
                                                        <a href={evaluateUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-gray-900">
                                                            <IconPencil />
                                                            Write review
                                                        </a>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-2 text-gray-400">
                                                            <IconPencil />
                                                            Write review
                                                        </span>
                                                    )}

                                                    <button type="button" className="inline-flex items-center gap-2 hover:text-gray-900" onClick={triggerShare}>
                                                        <IconShare />
                                                        Share
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                const r = item.r;
                                const name = r.consumer ?? "Anonymous";
                                const title = r.title ?? truncate(r.text, 52);

                                return (
                                    // ✅ article (not button) to prevent nested buttons
                                    <article
                                        key={`${r.createdAt}-${idx}`}
                                        data-card
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => openReview(r)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                openReview(r);
                                            }
                                        }}
                                        className="w-[88%] shrink-0 snap-start text-left rounded-2xl border border-gray-200 bg-white p-5 shadow-sm
                      focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <Avatar name={name} avatarUrl={r.avatarUrl} size={40} />
                                                <div className="min-w-0">
                                                    <div className="truncate font-semibold text-gray-900">{name}</div>
                                                    <div className="text-xs text-gray-500">{timeAgo(r.createdAt, now)}</div>
                                                </div>
                                            </div>

                                            <VerifiedBadge />
                                        </div>

                                        <div className="mt-4 flex items-center gap-4">
                                            <Stars value={r.rating} size="sm" />
                                            <VerifiedBadge />
                                        </div>

                                        <div className="mt-4 line-clamp-2 text-[15px] font-semibold text-gray-900">{title}</div>

                                        <p className="mt-2 line-clamp-5 text-sm leading-6 text-gray-700">
                                            {r.text}
                                            <span className="ml-1 text-emerald-700">See more</span>
                                        </p>

                                        <div className="mt-6 flex items-center gap-6 text-sm text-gray-600">
                                            {evaluateUrl ? (
                                                <a
                                                    href={evaluateUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-2 hover:text-gray-900"
                                                >
                                                    <IconPencil />
                                                    Write review
                                                </a>
                                            ) : (
                                                <span className="inline-flex items-center gap-2 text-gray-400">
                                                    <IconPencil />
                                                    Write review
                                                </span>
                                            )}

                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    triggerShare();
                                                }}
                                                className="inline-flex items-center gap-2 hover:text-gray-900"
                                            >
                                                <IconShare />
                                                Share
                                            </button>
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
