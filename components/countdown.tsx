"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

const units: Array<{ key: keyof TimeLeft; label: string }> = [
    { key: "days", label: "dni" },
    { key: "hours", label: "godz." },
    { key: "minutes", label: "min" },
    { key: "seconds", label: "sek" },
];

const emptyTimeLeft: TimeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
};

function getTimeLeft(targetDate: string): TimeLeft {
    const distance = Math.max(0, new Date(targetDate).getTime() - Date.now());
    const totalSeconds = Math.floor(distance / 1000);

    return {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
    };
}

export function Countdown({ targetDate }: { targetDate: string }) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

    useEffect(() => {
        const update = () => setTimeLeft(getTimeLeft(targetDate));

        update();
        const interval = window.setInterval(update, 1000);

        return () => window.clearInterval(interval);
    }, [targetDate]);

    const visibleTimeLeft = timeLeft ?? emptyTimeLeft;

    return (
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="grid max-w-2xl grid-cols-4 gap-4 max-[640px]:grid-cols-2">
                {units.map(unit => (
                    <div key={unit.key} className="grid justify-items-center text-center">
                        <strong className="block tabular-nums text-7xl font-semibold leading-none tracking-tight text-orange-600 max-[760px]:text-5xl">
                            {String(visibleTimeLeft[unit.key]).padStart(2, "0")}
                        </strong>
                        <span className="mt-2 block min-w-16 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                            {unit.label}
                        </span>
                    </div>
                ))}
            </div>
            <div className="border-l border-stone-200 pl-8 max-lg:border-l-0 max-lg:border-t max-lg:pl-0 max-lg:pt-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Nie czekaj na ostatnią prostą</p>
                <Link
                    href="/rejestracja"
                    className="mt-3 inline-flex min-h-[58px] w-full items-center justify-center rounded-lg border border-orange-600 bg-orange-600 px-6 py-4 text-center text-lg font-bold leading-none text-white shadow-[0_16px_34px_rgb(234_88_12_/_0.24)] transition-all duration-[180ms] hover:-translate-y-px hover:border-orange-700 hover:bg-orange-700"
                >
                    Zapisz się na start
                </Link>
                <p className="mt-3 text-sm leading-normal text-gray-500">
                    Dołącz do innych zawodników i staw czoła Widokowej.
                </p>
            </div>
        </div>
    );
}
