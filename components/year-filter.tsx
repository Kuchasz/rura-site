"use client";

import { useMemo, useState } from "react";
import { ButtonClasses } from "./design";

export type FilterItem = {
    key: string;
    year: string;
    content: React.ReactNode;
};

type YearFilterProps = {
    years: string[];
    items: FilterItem[];
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
