import Link from "next/link";
import { ButtonClasses, Hero, Kicker, Lead, VisualCard } from "./design";

export type SloganProps = {
    photo: string;
    title: string;
    excerpt: string;
    link?: string;
    linkText?: string;
};

export const Slogan = ({ photo, title, excerpt, link, linkText }: SloganProps) => (
    <Hero>
        <div>
            <Kicker>Rura na Kocierz</Kicker>
            <h1>{title}</h1>
            <Lead>{excerpt}</Lead>
            {link && (
                <Link className={`${ButtonClasses(true)} mt-7`} href={`artykul/${link}`}>
                    {linkText || "Czytaj więcej"}
                </Link>
            )}
        </div>
        <VisualCard image={photo} alt={title} pill="Najnowszy wpis">
            {excerpt}
        </VisualCard>
    </Hero>
);
