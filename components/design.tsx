import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

const panelPadding = "p-[clamp(18px,3vw,30px)]";
const cardBase = "rounded-xl border border-stone-200 bg-white shadow-[0_1px_0_rgb(17_24_39_/_0.04),0_12px_28px_rgb(17_24_39_/_0.06)]";
const buttonBase = "inline-flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-lg border px-[18px] py-3 pb-[13px] font-bold leading-none transition-all duration-[180ms] hover:-translate-y-px";
const buttonSecondary = "border-stone-200 bg-white text-gray-900 shadow-[0_1px_0_rgb(17_24_39_/_0.04)] hover:border-orange-600 hover:bg-orange-50 hover:shadow-[0_10px_24px_rgb(234_88_12_/_0.16)]";
const buttonPrimary = "border-orange-600 bg-orange-600 text-white shadow-[0_10px_24px_rgb(234_88_12_/_0.20)] hover:border-orange-700 hover:bg-orange-700";

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <div className={`mx-auto w-[min(1180px,calc(100%_-_32px))] max-[760px]:w-[min(100%_-_24px,680px)] ${className}`}>{children}</div>;
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <section className={`mx-auto w-[min(1180px,calc(100%_-_32px))] py-[clamp(36px,7vw,82px)] max-[760px]:w-[min(100%_-_24px,680px)] ${className}`}>
            {children}
        </section>
    );
}

export function Hero({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <section className={`mx-auto w-[min(1180px,calc(100%_-_32px))] py-[clamp(44px,8vw,96px)] pb-12 max-[760px]:w-[min(100%_-_24px,680px)] ${className}`}>
            {children}
        </section>
    );
}

export function HeroWithVisual({ 
    image, 
    alt, 
    pill, 
    description,
    imageClassName = "motion-safe:animate-[hero-drift_11s_ease-in-out_infinite_alternate]",
    children 
}: { 
    image: string; 
    alt: string; 
    pill: string; 
    description: string;
    imageClassName?: string;
    children: ReactNode;
}) {
    return (
        <section className="relative min-h-[clamp(480px,60vh,680px)] overflow-hidden py-[clamp(44px,8vw,96px)] pb-12">
            <img className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`} src={image} alt={alt} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
            <div className="relative mx-auto flex h-full min-h-[clamp(480px,60vh,680px)] w-[min(1180px,calc(100%_-_32px))] flex-col justify-end pb-8 text-white max-[760px]:w-[min(100%_-_24px,680px)]">
                <div className="max-w-[840px]">
                    {children}
                </div>
            </div>
        </section>
    );
}

export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <p className={`mb-3.5 text-xs font-semibold uppercase tracking-wider text-orange-600 ${className}`}>{children}</p>;
}

export function KickerLight({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <p className={`mb-3.5 text-xs font-semibold uppercase tracking-wider text-orange-600 brightness-125 ${className}`}>{children}</p>;
}

export function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <p className={`mt-4 max-w-prose text-lg font-normal leading-normal text-gray-500 ${className}`}>{children}</p>;
}

export function Actions({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <div className={`mt-7 flex flex-wrap gap-3 ${className}`}>{children}</div>;
}

export function ButtonLink({
    children,
    className = "",
    primary = false,
    ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode; primary?: boolean }) {
    return (
        <a className={`${ButtonClasses(primary)} ${className}`} {...props}>
            {children}
        </a>
    );
}

export function ButtonRoute({
    children,
    className = "",
    primary = false,
    href,
}: {
    children: ReactNode;
    className?: string;
    primary?: boolean;
    href: string;
}) {
    return (
        <Link className={`${ButtonClasses(primary)} ${className}`} href={href}>
            {children}
        </Link>
    );
}

export function ButtonClasses(primary = false) {
    return `${buttonBase} ${primary ? buttonPrimary : buttonSecondary}`;
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <div className={`${cardBase} ${className}`}>{children}</div>;
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <Card className={`${panelPadding} ${className}`}>{children}</Card>;
}

export function VisualCard({
    image,
    alt,
    pill,
    hot = false,
    children,
}: {
    image: string;
    alt: string;
    pill: string;
    hot?: boolean;
    children: ReactNode;
}) {
    return (
        <article className={`${cardBase} overflow-hidden`}>
            <img className="aspect-[4/3] w-full object-cover" src={image} alt={alt} />
            <div className="grid gap-1 p-[18px]">
                <Pill hot={hot}>{pill}</Pill>
                <strong className="text-2xl leading-none tracking-normal">{children}</strong>
            </div>
        </article>
    );
}

export function Pill({ children, hot = false, className = "" }: { children: ReactNode; hot?: boolean; className?: string }) {
    return (
        <span className={`inline-flex w-fit items-center rounded-lg border px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider ${hot ? "border-orange-600 bg-orange-600 text-white" : "border-stone-200 bg-stone-100 text-gray-500"} ${className}`}>
            {children}
        </span>
    );
}

export function SectionHead({ children, action }: { children: ReactNode; action?: ReactNode }) {
    return (
        <div className="mb-[26px] flex items-end justify-between gap-[22px] max-[760px]:block">
            <div>{children}</div>
            {action ? <div className="shrink-0 max-[760px]:mt-5">{action}</div> : null}
        </div>
    );
}

export function StatCard({
    label,
    value,
    children,
    negative = false,
    className = "",
}: {
    label: string;
    value: string;
    children?: ReactNode;
    negative?: boolean;
    className?: string;
}) {
    return (
        <Card className={`flex min-h-[190px] flex-col p-[18px] ${negative ? "!border-gray-900 !bg-gray-900 text-white" : ""} ${className}`}>
            <span className={`text-xs font-semibold uppercase tracking-wider ${negative ? "text-gray-400" : "text-gray-500"}`}>{label}</span>
            <strong className="mt-3 block text-4xl leading-none tracking-tight">{value}</strong>
            {children ? (
                <div className={`mt-5 flex flex-1 flex-col text-sm font-normal leading-normal ${negative ? "text-gray-300" : "text-gray-500"}`}>
                    {children}
                </div>
            ) : null}
        </Card>
    );
}

export function RouteMap({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
            <img className="w-full object-cover" src={src} alt={alt} />
        </div>
    );
}
