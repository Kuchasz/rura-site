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
                    <div
                        key={name}
                        className="group h-36 overflow-hidden rounded-lg border border-stone-200 bg-white shadow-[0_1px_0_rgb(17_24_39_/_0.04)] transition-all duration-[180ms] hover:-translate-y-px hover:border-orange-600 hover:bg-orange-50 hover:shadow-[0_10px_24px_rgb(234_88_12_/_0.16)]"
                    >
                        <img
                            className="h-full w-full object-contain p-4 transition-transform duration-[180ms] group-hover:scale-[1.02]"
                            src={`/assets/partners25/${name}`}
                            alt="Partner wydarzenia"
                        />
                    </div>
                ))}
            </div>
        </Section>
    );
}
