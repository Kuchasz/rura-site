"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shell } from "./design";
import { menuItems } from "./menu-items";
import { Partners } from "./partners";

const isActivePath = (activePath: string, to: string) => (to === "/" ? activePath === to : activePath.startsWith(to));

export const Footer = () => {
    const pathname = usePathname() || "/";

    return (
        <footer>
            <Partners />
            <div className="border-t border-stone-200 bg-white py-8">
                <Shell className="grid grid-cols-[minmax(170px,.7fr)_minmax(0,1.5fr)_auto] items-center gap-6 max-[760px]:grid-cols-1 max-[760px]:items-start">
                    <div className="grid gap-2.5">
                        <Link href="/">
                            <img className="h-auto w-32" src="/assets/logo-sm.png" alt="Rura na Kocierz" />
                        </Link>
                        <p className="m-0 text-xs font-extrabold uppercase tracking-[.04em] text-gray-500">
                            Rura na Kocierz © 2026
                        </p>
                    </div>
                    <nav aria-label="Stopka" className="flex flex-wrap justify-center gap-2 max-[760px]:justify-start">
                        {menuItems.map(item => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={classNames(
                                    "rounded-lg border border-transparent px-2.5 py-2 text-xs font-extrabold uppercase tracking-[.02em] transition-colors hover:border-stone-200 hover:bg-stone-100",
                                    { "text-orange-600": isActivePath(pathname, item.path) }
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/artykuly"
                            className="rounded-lg border border-transparent px-2.5 py-2 text-xs font-extrabold uppercase tracking-[.02em] transition-colors hover:border-stone-200 hover:bg-stone-100"
                        >
                            Artykuły
                        </Link>
                    </nav>
                    <div className="flex gap-2">
                        <a
                            href="mailto:biuro@rura.cc"
                            className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-lg border border-stone-200 bg-white text-gray-900 shadow-[0_1px_0_rgb(17_24_39_/_0.04)] transition-all duration-[180ms] hover:-translate-y-px hover:border-orange-600 hover:bg-orange-50"
                            aria-label="Email"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.facebook.com/ruranakocierz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-lg border border-stone-200 bg-white text-gray-900 shadow-[0_1px_0_rgb(17_24_39_/_0.04)] transition-all duration-[180ms] hover:-translate-y-px hover:border-orange-600 hover:bg-orange-50"
                            aria-label="Facebook"
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                    </div>
                </Shell>
            </div>
        </footer>
    );
};
