import { ReactNode } from "react";
import { ButtonClasses } from "./design";

type AnchorProps = {
    children: ReactNode;
    href: string;
    className?: string;
};

export const Anchor = ({ children, href, className }: AnchorProps) => (
    <a href={href} className={`${ButtonClasses()} ${className ?? ""}`}>
        {children}
    </a>
);
