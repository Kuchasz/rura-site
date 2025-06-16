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
        <footer className="bg-zinc-100">
            <div className="flex flex-col items-center py-8 text-white">
                <div className="text-zinc-700 font-semibold text-3xl">PARTNERZY WYDARZENIA</div>
                <div className="text-zinc-600 text-center max-w-2xl mt-4 mb-8">
                    Organizacje i firmy, które pomagają w organizacji Rury na Kocierz
                </div>
                <div className="h-1 w-10 bg-orange-500 my-6"></div>
                <div className="max-w-6xl flex flex-col md:flex-row flex-wrap justify-center items-center md:gap-8">
                    <img src="/assets/partners25/logo-bluesport.png"></img>
                    <img src="/assets/partners25/logo-bikers.png"></img>
                    <img src="/assets/partners25/logo-eurowafel.png"></img>
                    <img src="/assets/partners25/logo-kocierz.png"></img>
                    <img src="/assets/partners25/logo-kross.png"></img>
                    <img src="/assets/partners25/logo-lyson.png"></img>
                    <img src="/assets/partners25/logo-manolo.png"></img>
                    <img src="/assets/partners25/logo-orbea.png"></img>
                    <img src="/assets/partners25/logo-peleton.png"></img>
                    <img src="/assets/partners25/logo-plusssz.png"></img>
                    <img src="/assets/partners25/logo-polsport.png"></img>
                    <img src="/assets/partners25/logo-pos.png"></img>
                    <img src="/assets/partners25/logo-ravelo.png"></img>
                    <img src="/assets/partners25/logo-shimano.png"></img>
                    <img src="/assets/partners25/logo-witt.png"></img>
                </div>
            </div>
            <div className="flex justify-center py-4 bg-zinc-900 text-white">
                <div className="w-full max-w-6xl flex flex-col sm:flex-row text-sm justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/">
                            <img className="cursor-pointer mr-2 md:mr-10" width="200px" src="/assets/logo-sm.png"></img>
                        </Link>
                        {/* <div className="grow text-zinc-400">
                            <div className="text-base">
                                Ambasador <strong>Marta Lach</strong>
                            </div>
                            <div className="text-2xs">Mistrzyni Polski, Olimpijka Tokio 2020</div>
                        </div> */}
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
