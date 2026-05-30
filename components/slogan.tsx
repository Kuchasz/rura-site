import Link from "next/link";
import { ButtonClasses, HeroWithVisual, KickerLight } from "./design";

export type SloganProps = {
    photo: string;
    title: string;
    excerpt: string;
    link?: string;
    linkText?: string;
};

export const Slogan = ({ photo, title, excerpt, link, linkText }: SloganProps) => (
    <HeroWithVisual
        image={photo}
        alt={title}
        pill="Najnowszy wpis"
        description={excerpt}
    >
        <KickerLight>Rura na Kocierz</KickerLight>
        <h1>{title}</h1>
        {link && (
            <Link className={`${ButtonClasses(true)} mt-7`} href={`artykul/${link}`}>
                {linkText || "Czytaj więcej"}
            </Link>
        )}
    </HeroWithVisual>
);
