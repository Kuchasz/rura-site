"use client";

import { useState } from "react";
import { ButtonClasses } from "./design";

type CopyButtonProps = {
    text: string;
    children: React.ReactNode;
    className?: string;
};

export function CopyButton({ text, children, className = "" }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    return (
        <button
            type="button"
            className={`${ButtonClasses()} ${className}`}
            onClick={async () => {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1600);
            }}
        >
            {copied ? "Skopiowano" : children}
        </button>
    );
}
