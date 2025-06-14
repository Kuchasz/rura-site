'use client';

import { mdiEmailOpenOutline, mdiFacebook, mdiHumanMaleChild } from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import { Email } from "./email";
import { menuItems } from "./menu-items";

const MenuButton = ({
    activePath = "",
    to,
    children,
    isLast
}: {
    activePath: string;
    to: string;
    children: ReactNode;
    isLast: boolean;
}) => (
    <Link href={to} className={classNames("font-semibold cursor-pointer hover:text-orange-500 transition-colors uppercase", {
        ["text-orange-500 "]: to === "/" ? activePath === to : activePath.startsWith(to),
        ["ml-2"]: isLast,
        ["mx-2"]: !isLast
    })}>
        {children}
    </Link>
);

export const Footer = () => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <footer>
            <div className="flex flex-col items-center py-8 bg-zinc-100 text-white">
                <div className="text-zinc-700 font-semibold text-2xl">ORGANIZATORZY</div>
                <div className="h-1 w-10 bg-orange-500 my-6"></div>
                <div className="max-w-6xl flex flex-col md:flex-row flex-wrap justify-center items-center">
                    <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-innergy-racing-team.png"></img>
                    <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-kocierz.png"></img>
                    <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-gmina-lekawica.png"></img>
                    {/* <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-gmina-porabka.png"></img> */}
                </div>
                <div className="text-zinc-700 font-semibold text-2xl mt-20">SPONSORZY</div>
                <div className="h-1 w-10 bg-orange-500 my-6"></div>
                <div className="max-w-6xl flex flex-col md:flex-row flex-wrap justify-center items-center">
                    {/* <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-maspex.png"></img> */}
                    {/* <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-ceratizit.png"></img> */}
                    {/* <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-decathlon.png"></img> */}
                    <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-eurowafel.png"></img>
                    {/* <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-czaniecki-makaron.png"></img> */}
                    <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-agropunkt.png"></img>
                    {/* <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-pbw.png"></img> */}
                    {/* <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-pkp-cargo-service.png"></img> */}
                    <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-power-of-science.png"></img>
                    <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-ravelo.png"></img>
                    <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-euro-stempel.png"></img>
                    <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-trek.png"></img>
                    <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-bardomed.png"></img>
                    <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-artgrawer.png"></img>
                </div>
                <div className="text-zinc-700 font-semibold text-2xl mt-20">PATRONI MEDIALNI</div>
                <div className="h-1 w-10 bg-orange-500 my-6"></div>
                <div className="max-w-6xl flex flex-col md:flex-row flex-wrap justify-center items-center">
                    <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-kolarsko-pl.png"></img>
                    <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-turdetur.png"></img>
                    <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-velonews-pl.png"></img>
                    <img className="scale-50 -m-4 md:-m-8" src="/assets/partners/logo-naszosie-pl.png"></img>
                </div>
            </div>
            <div className="flex justify-center py-4 bg-zinc-900 text-white">
                <div className="w-full max-w-6xl flex flex-col sm:flex-row text-sm justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/">
                            <img className="cursor-pointer mr-2 md:mr-10" width="200px" src="/assets/logo-sm.png"></img>
                        </Link>
                        <div className="grow text-zinc-400">
                            <div className="text-base">
                                Ambasador <strong>Marta Lach</strong>
                            </div>
                            <div className="text-2xs">Mistrzyni Polski, Olimpijka Tokio 2020</div>
                        </div>
                    </div>
                    <div className="flex items-center my-3 md:my-0">
                        <Icon className="text-orange-500" size={1.5} path={mdiHumanMaleChild}></Icon>
                        <div className="ml-4">
                            <div className="text-zinc-700 font-bold">ZAWODY DLA DZIECI</div>
                            <Email>biuro@rura.cc</Email>
                            {/* <DumpEmail>zapisy 14:00 na mecie</DumpEmail> */}
                        </div>
                        <div className="h-8 inline-block mx-4 md:mx-12 w-0.5 bg-zinc-700"></div>
                        <Icon className="text-orange-500" size={1.5} path={mdiEmailOpenOutline}></Icon>
                        <div className="ml-4">
                            <div className="text-zinc-700 font-bold">KONTAKT</div>
                            <Email>biuro@rura.cc</Email>
                        </div>
                    </div>
                    <div>
                        <a target="_blank" href="https://www.facebook.com/ruranakocierz">
                            <Icon size={1.5} path={mdiFacebook} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-zinc-800 text-zinc-600 flex justify-center py-4 text-xs font-semibold">
                <div className="w-full max-w-6xl flex flex-col-reverse md:flex-row justify-between">
                    <div className="mx-2">RURA NA KOCIERZ © 2025</div>
                    <div>
                        {menuItems.map((mi, i) => (
                            <MenuButton
                                key={mi.path}
                                activePath={pathname}
                                to={mi.path}
                                isLast={i + 1 === menuItems.length}
                            >
                                {mi.label}
                            </MenuButton>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
