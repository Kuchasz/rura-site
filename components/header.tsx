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

    const navItems = (variant: "desktop" | "mobile") => (
        <>
            {menuItems.map((item, index) => (
                <Link
                    key={item.path}
                    href={item.path}
                    aria-current={isActivePath(pathname, item.path) ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    tabIndex={variant === "mobile" && !menuOpen ? -1 : undefined}
                    className={classNames(
                        "rounded-lg border border-transparent text-xs font-semibold uppercase tracking-wider hover:border-stone-200 hover:bg-stone-100",
                        variant === "mobile"
                            ? "flex min-h-[38px] items-center px-3 py-2 leading-none transition-[opacity,transform,background-color,border-color,color] duration-200"
                            : "px-2.5 py-2.5 transition-colors xl:px-3",
                        variant === "mobile" && (menuOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"),
                        {
                            "border-stone-200 bg-stone-100": isActivePath(pathname, item.path),
                        }
                    )}
                    style={variant === "mobile" ? { transitionDelay: menuOpen ? `${index * 24}ms` : "0ms" } : undefined}
                >
                    {item.label}
                </Link>
            ))}
            <Link
                href="/rejestracja"
                onClick={() => setMenuOpen(false)}
                tabIndex={variant === "mobile" && !menuOpen ? -1 : undefined}
                className={classNames(
                    "rounded-lg border border-orange-600 bg-orange-600 text-xs font-semibold uppercase tracking-wider text-white hover:border-orange-700 hover:bg-orange-700",
                    variant === "mobile"
                        ? "mt-1 flex min-h-[40px] items-center justify-center px-3 py-2 leading-none transition-[opacity,transform,background-color,border-color,color] duration-200"
                        : "px-2.5 py-2.5 transition-colors lg:ml-2 xl:px-3",
                    variant === "mobile" && (menuOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0")
                )}
                style={variant === "mobile" ? { transitionDelay: menuOpen ? `${menuItems.length * 24}ms` : "0ms" } : undefined}
            >
                Zapisz się!
            </Link>
        </>
    );

    return (
        <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur-md">
            <Shell className="relative flex h-[64px] items-center justify-between gap-4 md:h-[68px]">
                <Link className="relative z-10 block h-full w-[225px] max-w-[48vw] shrink-0 focus:outline-none" href="/" onClick={() => setMenuOpen(false)}>
                    <img
                        className="absolute left-0 top-1/2 h-auto w-[225px] max-w-[48vw] -translate-y-1/4 object-contain"
                        src="/assets/logo-md.png"
                        alt="Rura na Kocierz"
                    />
                </Link>

                <button
                    type="button"
                    className={`${ButtonClasses()} lg:hidden`}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-navigation"
                    aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
                    onClick={() => setMenuOpen(value => !value)}
                >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path
                            className={classNames("origin-center transition-transform duration-200 motion-reduce:transition-none", {
                                "translate-y-[5px] rotate-45": menuOpen,
                            })}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 7h16"
                        />
                        <path
                            className={classNames("transition-opacity duration-150 motion-reduce:transition-none", {
                                "opacity-0": menuOpen,
                            })}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 12h16"
                        />
                        <path
                            className={classNames("origin-center transition-transform duration-200 motion-reduce:transition-none", {
                                "-translate-y-[5px] -rotate-45": menuOpen,
                            })}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 17h16"
                        />
                    </svg>
                    Menu
                </button>

                <nav aria-label="Główna nawigacja" className="hidden min-w-0 items-center gap-0.5 lg:flex xl:gap-1">
                    {navItems("desktop")}
                    <div className="ml-3 flex items-center gap-1">
                        <a
                            href="mailto:biuro@rura.cc"
                            className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-lg border border-stone-200 bg-white text-gray-900 shadow-[0_1px_0_rgb(17_24_39_/_0.04)] transition-all duration-[180ms] hover:-translate-y-px hover:border-orange-600 hover:bg-orange-50 hover:shadow-[0_10px_24px_rgb(234_88_12_/_0.16)]"
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
                            className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-lg border border-stone-200 bg-white text-gray-900 shadow-[0_1px_0_rgb(17_24_39_/_0.04)] transition-all duration-[180ms] hover:-translate-y-px hover:border-orange-600 hover:bg-orange-50 hover:shadow-[0_10px_24px_rgb(234_88_12_/_0.16)]"
                            aria-label="Facebook"
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                    </div>
                </nav>

                <nav
                    id="mobile-navigation"
                    aria-label="Główna nawigacja mobilna"
                    aria-hidden={!menuOpen}
                    className={classNames(
                        "absolute inset-x-0 top-[calc(100%+8px)] z-30 flex origin-top flex-col items-stretch gap-0.5 overflow-y-auto overscroll-contain rounded-xl border border-stone-200 bg-white p-2 shadow-[0_1px_0_rgb(17_24_39_/_0.04),0_12px_28px_rgb(17_24_39_/_0.06)] transition-[max-height,opacity,transform] duration-200 ease-out motion-reduce:transition-none lg:hidden",
                        menuOpen ? "max-h-[calc(100dvh-84px)] translate-y-0 opacity-100" : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
                    )}
                >
                    {navItems("mobile")}
                    <div
                        className={classNames(
                            "mt-2 flex justify-center gap-2 border-t border-stone-200 pt-2.5 transition-[opacity,transform] duration-200",
                            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                        )}
                        style={{ transitionDelay: menuOpen ? `${(menuItems.length + 1) * 24}ms` : "0ms" }}
                    >
                        <a
                            href="mailto:biuro@rura.cc"
                            className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-stone-200 bg-white text-gray-900 shadow-[0_1px_0_rgb(17_24_39_/_0.04)] transition-all duration-[180ms] hover:-translate-y-px hover:border-orange-600 hover:bg-orange-50 hover:shadow-[0_10px_24px_rgb(234_88_12_/_0.16)]"
                            aria-label="Email"
                            onClick={() => setMenuOpen(false)}
                            tabIndex={menuOpen ? undefined : -1}
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.facebook.com/ruranakocierz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-stone-200 bg-white text-gray-900 shadow-[0_1px_0_rgb(17_24_39_/_0.04)] transition-all duration-[180ms] hover:-translate-y-px hover:border-orange-600 hover:bg-orange-50 hover:shadow-[0_10px_24px_rgb(234_88_12_/_0.16)]"
                            aria-label="Facebook"
                            onClick={() => setMenuOpen(false)}
                            tabIndex={menuOpen ? undefined : -1}
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                    </div>
                </nav>
            </Shell>
        </header>
    );
};
