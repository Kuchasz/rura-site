"use client";

import Link from "next/link";
import { Shell } from "./design";
import { Partners } from "./partners";

const footerGroups = [
    {
        title: "Wydarzenie",
        links: [
            { href: "/", label: "Aktualności" },
            { href: "/trasa", label: "Trasa" },
            { href: "/regulamin", label: "Regulamin" },
            { href: "/rejestracja", label: "Zapisz się!" },
        ],
    },
    {
        title: "Archiwum",
        links: [
            { href: "/archiwum", label: "Wszystkie edycje" },
            { href: "/edycja25", label: "Edycja 2025" },
            { href: "/edycja23", label: "Edycja 2023" },
            { href: "/edycja22", label: "Edycja 2022" },
        ],
    },
    {
        title: "Materiały",
        links: [
            { href: "/artykuly", label: "Artykuły" },
            { href: "/zdjecia", label: "Zdjęcia" },
            { href: "mailto:biuro@rura.cc", label: "Email" },
            { href: "https://www.facebook.com/ruranakocierz", label: "Facebook", external: true },
        ],
    },
];

export const Footer = () => {
    return (
        <footer>
            <Partners />
            <div className="border-t border-stone-200 py-8">
                <Shell className="grid grid-cols-[minmax(220px,1.2fr)_repeat(3,minmax(120px,.8fr))] items-start gap-6 pb-8 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
                    <div className="grid max-w-sm gap-4">
                        <Link href="/">
                            <img className="h-auto w-32" src="/assets/logo-sm.png" alt="Rura na Kocierz" />
                        </Link>
                        <p className="m-0 text-sm leading-normal text-gray-500">
                            Jazda indywidualna na czas z Łękawicy na Kocierz.
                        </p>
                    </div>
                    {footerGroups.map(group => (
                        <nav key={group.title} aria-label={group.title} className="grid gap-2.5">
                            <h3 className="text-sm font-semibold leading-normal tracking-normal">{group.title}</h3>
                            <ul className="grid gap-2">
                                {group.links.map(link => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            target={link.external ? "_blank" : undefined}
                                            rel={link.external ? "noopener noreferrer" : undefined}
                                            className="text-sm leading-normal text-gray-500 transition-colors hover:text-orange-600"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </Shell>
                <Shell className="border-t border-stone-200 pt-6">
                    <p className="m-0 text-xs text-gray-500">
                        © 2026 Rura na Kocierz. Wszelkie prawa zastrzeżone.
                    </p>
                </Shell>
            </div>
        </footer>
    );
};
