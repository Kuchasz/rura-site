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
                className="rounded-lg border border-orange-600 bg-orange-600 px-3 py-2.5 text-xs font-extrabold uppercase tracking-[.02em] text-white transition-colors hover:border-orange-700 hover:bg-orange-700"
            >
                Zapisy wkrótce
            </Link>
        </>
    );

    return (
        <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur-md">
            <Shell className="relative flex min-h-[78px] items-center justify-between gap-4 md:min-h-[78px] max-md:min-h-[68px]">
                <Link className="inline-flex shrink-0 items-center" href="/" onClick={() => setMenuOpen(false)}>
                    <img
                        className="h-auto w-[clamp(118px,14vw,156px)] object-contain"
                        src="/assets/logo-sm.png"
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
                </nav>

                {menuOpen && (
                    <nav
                        id="mobile-navigation"
                        aria-label="Główna nawigacja mobilna"
                        className="absolute inset-x-0 top-[calc(100%+1px)] z-30 flex flex-col items-stretch rounded-xl border border-stone-200 bg-white p-3 shadow-[0_1px_0_rgb(17_24_39_/_0.04),0_12px_28px_rgb(17_24_39_/_0.06)] md:hidden"
                    >
                        {navItems}
                    </nav>
                )}
            </Shell>
        </header>
    );
};
