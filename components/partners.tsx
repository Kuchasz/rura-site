import { Kicker, Section, SectionHead } from "./design";

const partners = [
    "logo-bluesport.png",
    "logo-bikers.png",
    "logo-eurowafel.png",
    "logo-kocierz.png",
    "logo-kross.png",
    "logo-lyson.png",
    "logo-manolo.png",
    "logo-orbea.png",
    "logo-peleton.png",
    "logo-plusssz.png",
    "logo-polsport.png",
    "logo-pos.png",
    "logo-ravelo.png",
    "logo-shimano.png",
    "logo-witt.png",
    "logo-tech.png",
    "logo-sinum.png",
    "logo-mardo.png",
    "logo-ale.png",
];

export function Partners() {
    return (
        <Section>
            <SectionHead>
                <>
                    <Kicker>Partnerzy wydarzenia</Kicker>
                    <h2>Organizacje i firmy, które pomagają w organizacji Rury na Kocierz</h2>
                </>
            </SectionHead>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                {partners.map(name => (
                    <img
                        className="h-36 w-full rounded-lg border border-stone-200 bg-white p-4 object-contain"
                        key={name}
                        src={`/assets/partners25/${name}`}
                        alt="Partner wydarzenia"
                    />
                ))}
            </div>
        </Section>
    );
}
