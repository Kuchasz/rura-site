"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "@mdi/react";
import { mdiChevronLeft, mdiChevronRight, mdiClose, mdiDownload } from "@mdi/js";
import classNames from "classnames";
import { Loader } from "./loader";

export type LightboxItem = {
    thumb: string;
    big: string;
    full: string;
};

type Props = {
    items: LightboxItem[];
    index: number | null;
    onClose: () => void;
    onChange: (index: number) => void;
};

const SWIPE_THRESHOLD = 50;

const fileNameFromUrl = (url: string) => {
    try {
        const name = new URL(url).pathname.split("/").pop();
        return name && decodeURIComponent(name);
    } catch {
        return undefined;
    }
};

const downloadFile = async (url: string) => {
    const name = fileNameFromUrl(url) || "photo";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = objectUrl;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch {
        window.open(url, "_blank", "noopener,noreferrer");
    }
};

const ControlButton = ({
    onClick,
    label,
    icon,
    className,
    disabled,
}: {
    onClick: () => void;
    label: string;
    icon: string;
    className?: string;
    disabled?: boolean;
}) => (
    <button
        type="button"
        aria-label={label}
        title={label}
        disabled={disabled}
        onClick={e => {
            e.stopPropagation();
            onClick();
        }}
        className={classNames(
            "flex items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:cursor-default disabled:opacity-30",
            className,
        )}
    >
        <Icon path={icon} className="h-6 w-6" />
    </button>
);

const Lightbox = ({ items, index, onClose, onChange }: Props) => {
    const isOpen = index !== null && index >= 0 && index < items.length;
    const current = isOpen ? items[index] : null;

    const [loaded, setLoaded] = useState<Record<string, boolean>>({});
    const [downloading, setDownloading] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const dragStart = useRef<{ x: number; y: number; pointerId: number } | null>(null);
    const thumbRefs = useRef<Map<number, HTMLButtonElement>>(new Map());

    const hasPrev = isOpen && index > 0;
    const hasNext = isOpen && index < items.length - 1;

    const goPrev = useCallback(() => {
        if (index !== null && index > 0) onChange(index - 1);
    }, [index, onChange]);

    const goNext = useCallback(() => {
        if (index !== null && index < items.length - 1) onChange(index + 1);
    }, [index, items.length, onChange]);

    // keyboard navigation
    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowLeft":
                    e.preventDefault();
                    goPrev();
                    break;
                case "ArrowRight":
                    e.preventDefault();
                    goNext();
                    break;
                case "Escape":
                    e.preventDefault();
                    onClose();
                    break;
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen, goPrev, goNext, onClose]);

    // lock body scroll while open
    useEffect(() => {
        if (!isOpen) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [isOpen]);

    // preload neighbours
    useEffect(() => {
        if (!isOpen) return;
        [index - 1, index + 1]
            .filter(i => i >= 0 && i < items.length)
            .forEach(i => {
                const img = new Image();
                img.src = items[i].big;
            });
    }, [isOpen, index, items]);

    // keep the active thumbnail visible
    useEffect(() => {
        if (!isOpen) return;
        thumbRefs.current.get(index)?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }, [isOpen, index]);

    // reset drag offset when the photo changes
    useEffect(() => {
        setDragOffset(0);
    }, [index]);

    if (!isOpen || !current) return null;

    const isLoaded = !!loaded[current.big];

    const onPointerDown = (e: React.PointerEvent) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        if ((e.target as HTMLElement).closest("button")) return;
        dragStart.current = { x: e.clientX, y: e.clientY, pointerId: e.pointerId };
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!dragStart.current || dragStart.current.pointerId !== e.pointerId) return;
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        if (Math.abs(dx) > Math.abs(dy)) setDragOffset(dx);
    };

    const onPointerEnd = (e: React.PointerEvent) => {
        if (!dragStart.current || dragStart.current.pointerId !== e.pointerId) return;
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        dragStart.current = null;
        setDragOffset(0);
        if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) goNext();
            else goPrev();
        }
    };

    const onDownload = async () => {
        if (downloading) return;
        setDownloading(true);
        try {
            await downloadFile(current.full);
        } finally {
            setDownloading(false);
        }
    };

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Podgląd zdjęcia"
            className="fixed inset-0 z-1000 flex flex-col bg-black/95 text-white select-none"
            onClick={onClose}
        >
            {/* top bar */}
            <div
                className="flex items-center justify-between gap-4 px-4 py-3 text-sm font-semibold tabular-nums"
                onClick={e => e.stopPropagation()}
            >
                <span aria-live="polite" className="text-white/80">
                    {index + 1} / {items.length}
                </span>
                <div className="flex items-center gap-2">
                    <ControlButton
                        label="Pobierz zdjęcie w wysokiej rozdzielczości"
                        icon={mdiDownload}
                        onClick={onDownload}
                        disabled={downloading}
                        className="h-10 w-10"
                    />
                    <ControlButton label="Zamknij" icon={mdiClose} onClick={onClose} className="h-10 w-10" />
                </div>
            </div>

            {/* stage */}
            <div
                className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-2 md:px-16"
                style={{ touchAction: "pan-y" }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerEnd}
                onPointerCancel={onPointerEnd}
            >
                {!isLoaded && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <Loader light />
                    </div>
                )}
                <img
                    key={current.big}
                    src={current.big}
                    alt=""
                    draggable={false}
                    onLoad={() => setLoaded(l => (l[current.big] ? l : { ...l, [current.big]: true }))}
                    onError={() => setLoaded(l => ({ ...l, [current.big]: true }))}
                    onClick={e => e.stopPropagation()}
                    className={classNames(
                        "max-h-full max-w-full object-contain transition-opacity duration-200",
                        isLoaded ? "opacity-100" : "opacity-0",
                    )}
                    style={{
                        transform: dragOffset ? `translateX(${dragOffset}px)` : undefined,
                        transition: dragOffset ? "none" : undefined,
                    }}
                />

                <ControlButton
                    label="Poprzednie zdjęcie"
                    icon={mdiChevronLeft}
                    onClick={goPrev}
                    disabled={!hasPrev}
                    className="absolute top-1/2 left-2 h-12 w-12 -translate-y-1/2 md:left-4"
                />
                <ControlButton
                    label="Następne zdjęcie"
                    icon={mdiChevronRight}
                    onClick={goNext}
                    disabled={!hasNext}
                    className="absolute top-1/2 right-2 h-12 w-12 -translate-y-1/2 md:right-4"
                />
            </div>

            {/* thumbnails */}
            <div
                className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-thin"
                onClick={e => e.stopPropagation()}
            >
                {items.map((item, i) => (
                    <button
                        key={item.big}
                        type="button"
                        aria-label={`Zdjęcie ${i + 1}`}
                        aria-current={i === index}
                        ref={el => {
                            if (el) thumbRefs.current.set(i, el);
                            else thumbRefs.current.delete(i);
                        }}
                        onClick={() => onChange(i)}
                        className={classNames(
                            "h-14 w-14 flex-none overflow-hidden rounded-md border-2 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:h-16 md:w-16",
                            i === index ? "border-white opacity-100" : "border-transparent opacity-50 hover:opacity-80",
                        )}
                    >
                        <img src={item.thumb} alt="" loading="lazy" draggable={false} className="h-full w-full object-cover" />
                    </button>
                ))}
            </div>
        </div>,
        document.body,
    );
};

export default Lightbox;
