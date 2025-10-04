"use client";

import { mdiEmailOpenOutline, mdiFacebook, mdiMenu, mdiHumanMaleChild } from "@mdi/js";
import Icon from "@mdi/react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Email } from "./email";
import { menuItems } from "./menu-items";

const MenuText = ({ text }: { text: string }) => (
    <span className="text-sm md:text-base font-semibold transition-colors py-1 mx-2 md:mx-5 uppercase">{text}</span>
);

const MenuButton = ({ onClick, activePath = "", to, text }: { onClick?: () => void; activePath: string; to: string; text: string }) => (
    <Link
        href={to}
        onClick={onClick}
        className={classNames("hover:text-orange-500", {
            ["text-orange-500"]: to === "/" ? activePath === to : activePath.startsWith(to),
        })}
    >
        <MenuText text={text} />
    </Link>
);

export const Header = () => {
    const pathname = usePathname();
    const [menuRevealed, setMenuRevealed] = useState(false);
    return (
        <header className="flex flex-col">
            <div className="flex justify-center py-4 bg-zinc-900 text-white">
                <div className="w-full max-w-6xl flex flex-col sm:flex-row text-sm items-center justify-between">
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
            <div className="flex">
                <div className="w-full h-0.5 bg-zinc-700"></div>
            </div>
            <div className="flex justify-center py-3 bg-zinc-900 text-white">
                <div className="w-full max-w-6xl flex-col flex">
                    <div className="mx-4 sm:mx-0 gap-2 flex items-center justify-between">
                        <div className="hidden sm:flex justify-between md:justify-start">
                            {menuItems.map(mi => (
                                <MenuButton key={mi.path} activePath={pathname || ""} to={mi.path} text={mi.label} />
                            ))}
                        </div>
                        <div onClick={() => setMenuRevealed(!menuRevealed)} className="flex sm:hidden items-center">
                            <Icon size={1.5} path={mdiMenu} />
                            <MenuText
                                text={
                                    menuItems.find(mi =>
                                        mi.path === "/" ? (pathname || "") === mi.path : (pathname || "").startsWith(mi.path)
                                    )?.label ?? "MENU"
                                }
                            />
                        </div>
                        {/* <Link
                            href="https://app.rura.cc/timer/m/15"
                            target="_blank"
                            className="text-sm md:text-base transition-colors uppercase cursor-pointer text-center hover:bg-white hover:text-orange-500 font-bold rounded-full px-4 py-1"
                        >
                            ŚLEDZENIE STARTów
                        </Link> */}
                        {/* <Link
                            href="https://app.rura.cc/result/15"
                            target="_blank"
                            className="text-sm md:text-base transition-colors mx-2 md:mx-5 uppercase cursor-pointer text-center bg-orange-500 hover:bg-white hover:text-orange-500 font-bold rounded-full px-4 py-1"
                        >
                            WYNIKI
                        </Link> */}
                        <Link
                            href="https://events.stoprace.com/pl/1/"
                            className="text-xs px-2 md:px-4 md:text-base transition-colors uppercase cursor-pointer text-center bg-orange-500 hover:bg-white hover:text-orange-500 font-bold rounded-full py-1"
                        >
                            LISTA STARTOWA I WYNIKI
                        </Link>
                    </div>
                    <div className={classNames("flex-col ml-2 items-start", menuRevealed ? "flex sm:hidden" : "hidden")}>
                        {menuItems.map(mi => (
                            <MenuButton
                                onClick={() => setMenuRevealed(false)}
                                key={mi.path}
                                activePath={pathname || ""}
                                to={mi.path}
                                text={mi.label}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};
