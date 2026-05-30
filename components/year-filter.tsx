"use client";

import { useMemo, useState } from "react";
import { ButtonClasses } from "./design";

export type FilterItem = {
    key: string;
    year: string;
    content: React.ReactNode;
};

export type EventFilterItem = {
    key: string;
    event: string;
    content: React.ReactNode;
};

type YearFilterProps = {
    years: string[];
    items: FilterItem[];
    listClassName?: string;
};

type EventFilterProps = {
    events: string[];
    items: EventFilterItem[];
    listClassName?: string;
};

export function YearFilter({ years, items, listClassName = "grid gap-2.5" }: YearFilterProps) {
    const [activeYear, setActiveYear] = useState("all");
    const visibleItems = useMemo(
        () => items.filter(item => activeYear === "all" || item.year === activeYear),
        [activeYear, items]
    );

    return (
        <>
            <div className="mb-[18px] flex flex-wrap gap-2.5">
                {["all", ...years].map(year => (
                    <button
                        key={year}
                        type="button"
                        aria-pressed={activeYear === year}
                        className={ButtonClasses(activeYear === year)}
                        onClick={() => setActiveYear(year)}
                    >
                        {year === "all" ? "Wszystkie" : year}
                    </button>
                ))}
            </div>
            <div className={listClassName}>{visibleItems.map(item => <div key={item.key}>{item.content}</div>)}</div>
        </>
    );
}

export function EventFilter({ events, items, listClassName = "grid gap-2.5" }: EventFilterProps) {
    const [activeEvent, setActiveEvent] = useState("all");
    const visibleItems = useMemo(
        () => items.filter(item => activeEvent === "all" || item.event === activeEvent),
        [activeEvent, items]
    );

    return (
        <>
            <div className="mb-[18px] flex flex-wrap gap-2.5">
                {["all", ...events].map(event => (
                    <button
                        key={event}
                        type="button"
                        aria-pressed={activeEvent === event}
                        className={ButtonClasses(activeEvent === event)}
                        onClick={() => setActiveEvent(event)}
                    >
                        {event === "all" ? "Wszystkie" : event}
                    </button>
                ))}
            </div>
            <div className={listClassName}>{visibleItems.map(item => <div key={item.key}>{item.content}</div>)}</div>
        </>
    );
}
