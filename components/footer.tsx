"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink, Shell } from "./design";
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
                    <ButtonLink href="mailto:biuro@rura.cc">
                        biuro@rura.cc
                    </ButtonLink>
                </Shell>
            </div>
        </footer>
    );
};
