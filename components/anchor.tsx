import { ReactNode } from "react";

type AnchorProps = {
    children: ReactNode;
    href: string;
    className?: string;
};

export const Anchor = ({ children, href, className }: AnchorProps) => (
    <a href={href} className={`border py-2 px-4 flex border-gray-200 hover:bg-orange-500 hover:text-white ${className}`}>
        {children}
    </a>
);
