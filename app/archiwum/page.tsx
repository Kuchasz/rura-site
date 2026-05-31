import { ButtonRoute, HeroWithVisual, Kicker, KickerLight, Lead, Section, SectionHead } from "../../components/design";

export const metadata = {
    title: "Archiwum",
};

const editions = [
    {
        year: "2025",
        title: "Powrót na Widokową",
        description: "Jednodniowy uphill, 11 km trasy i oficjalne wyniki edycji 2025.",
        href: "/edycja25",
        image: "/assets/hero_edycja25.jpg",
    },
    {
        year: "2023",
        title: "Rura wróciła do korzeni",
        description: "Archiwum jednodniowego uphill z jazdą indywidualną na czas.",
        href: "/edycja23",
        image: "/assets/posts/podsumowanie-rura-2023.jpg",
    },
    {
        year: "2022",
        title: "Dwa dni ścigania",
        description: "Start wspólny PRO, FUN oraz Time Trial z wynikami i trasami GPX.",
        href: "/edycja22",
        image: "/assets/hero_edycja22.jpg",
    },
];

export default function ArchivePage() {
    return (
        <>
            <HeroWithVisual
                image="/assets/posts/podsumowanie_rnk_2025.jpg"
                alt="Archiwum Rury na Kocierz"
                pill="3 edycje"
                description="Wyniki, trasy, zdjęcia i najważniejsze informacje z edycji 2025, 2023 i 2022."
            >
                <KickerLight>Archiwum</KickerLight>
                <h1>Poprzednie edycje Rury na Kocierz.</h1>
                <Lead className="text-white/90">Wyniki, trasy, zdjęcia i najważniejsze informacje z minionych startów.</Lead>
            </HeroWithVisual>

            <Section>
                <SectionHead>
                    <>
                        <Kicker>Edycje</Kicker>
                        <h2>Wybierz rok</h2>
                    </>
                </SectionHead>
                <div className="grid grid-cols-3 gap-[18px] max-[1024px]:grid-cols-2 max-[760px]:grid-cols-1">
                    {editions.map(edition => (
                        <article key={edition.year} className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-[0_1px_0_rgb(17_24_39_/_0.04),0_12px_28px_rgb(17_24_39_/_0.06)]">
                            <img className="aspect-[16/10] w-full object-cover" src={edition.image} alt={edition.title} />
                            <div className="p-[18px]">
                                <Kicker>{edition.year}</Kicker>
                                <h3 className="mb-3">{edition.title}</h3>
                                <p className="mb-4 text-base leading-normal text-gray-500">{edition.description}</p>
                                <ButtonRoute href={edition.href}>Otwórz edycję</ButtonRoute>
                            </div>
                        </article>
                    ))}
                </div>
            </Section>
        </>
    );
}
