"use client";

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
        <div className="mx-auto grid max-w-2xl my-24 grid-cols-4 gap-4 max-[640px]:grid-cols-2">
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
    );
}
