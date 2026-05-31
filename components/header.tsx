"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ButtonClasses, Shell } from "./design";
import { menuItems } from "./menu-items";

const isActivePath = (activePath: string, to: string) => (to === "/" ? activePath === to : activePath.startsWith(to));

export const Header = () => {
    const pathname = usePathname() || "/";
    const [menuOpen, setMenuOpen] = useState(false);

    const navItems = (
        <>
            {menuItems.map(item => (
                <Link
                    key={item.path}
                    href={item.path}
                    aria-current={isActivePath(pathname, item.path) ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={classNames(
                        "rounded-lg border border-transparent px-3 py-2.5 text-xs font-extrabold uppercase tracking-[.02em] transition-colors hover:border-stone-200 hover:bg-stone-100",
                        {
                            "border-stone-200 bg-stone-100": isActivePath(pathname, item.path),
                        }
                    )}
                >
                    {item.label}
                </Link>
            ))}
            <Link
                href="/artykul/rura-na-kocierz-2026-zapowiedz"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg border border-orange-600 bg-orange-600 px-3 py-2.5 text-xs font-extrabold uppercase tracking-[.02em] text-white transition-colors hover:border-orange-700 hover:bg-orange-700 md:ml-3"
            >
                Zapisy wkrótce
            </Link>
        </>
    );

    return (
        <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur-md">
            <Shell className="relative flex h-[64px] items-center justify-between gap-4 md:h-[68px]">
                <Link className="relative z-10 block h-full w-[225px] max-w-[48vw] shrink-0 focus:outline-none" href="/" onClick={() => setMenuOpen(false)}>
                    <img
                        className="absolute left-0 top-1/2 h-auto w-[225px] max-w-[48vw] -translate-y-1/3 object-contain"
                        src="/assets/logo-md.png"
                        alt="Rura na Kocierz"
                    />
                </Link>

                <button
                    type="button"
                    className={`${ButtonClasses()} md:hidden`}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setMenuOpen(value => !value)}
                >
                    Menu
                </button>

                <nav aria-label="Główna nawigacja" className="hidden items-center gap-1 md:flex">
                    {navItems}
                    <div className="ml-3 flex items-center gap-1">
                        <a
                            href="mailto:biuro@rura.cc"
                            className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-lg border border-stone-200 bg-white text-gray-900 transition-colors hover:border-orange-600 hover:bg-orange-50"
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
                            className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-lg border border-stone-200 bg-white text-gray-900 transition-colors hover:border-orange-600 hover:bg-orange-50"
                            aria-label="Facebook"
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                    </div>
                </nav>

                {menuOpen && (
                    <nav
                        id="mobile-navigation"
                        aria-label="Główna nawigacja mobilna"
                        className="absolute inset-x-0 top-[calc(100%+1px)] z-30 flex flex-col items-stretch gap-1 rounded-xl border border-stone-200 bg-white p-3 shadow-[0_1px_0_rgb(17_24_39_/_0.04),0_12px_28px_rgb(17_24_39_/_0.06)] md:hidden"
                    >
                        {navItems}
                        <div className="mt-3 flex justify-center gap-2 border-t border-stone-200 pt-3">
                            <a
                                href="mailto:biuro@rura.cc"
                                className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-lg border border-stone-200 bg-white text-gray-900 shadow-[0_1px_0_rgb(17_24_39_/_0.04)] transition-colors hover:border-orange-600 hover:bg-orange-50"
                                aria-label="Email"
                                onClick={() => setMenuOpen(false)}
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.facebook.com/ruranakocierz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-lg border border-stone-200 bg-white text-gray-900 shadow-[0_1px_0_rgb(17_24_39_/_0.04)] transition-colors hover:border-orange-600 hover:bg-orange-50"
                                aria-label="Facebook"
                                onClick={() => setMenuOpen(false)}
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                        </div>
                    </nav>
                )}
            </Shell>
        </header>
    );
};
