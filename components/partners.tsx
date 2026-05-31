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
                        className="group relative h-36 overflow-hidden rounded-lg border border-stone-200 bg-white transition-all duration-300 before:absolute before:inset-y-[-35%] before:left-[-85%] before:z-10 before:w-1/2 before:rotate-12 before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent before:opacity-0 before:blur-sm before:transition-all before:duration-[1400ms] hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-[0_12px_30px_rgb(17_24_39_/_0.08)] hover:before:left-[135%] hover:before:opacity-100"
                    >
                        <img
                            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
                            src={`/assets/partners25/${name}`}
                            alt="Partner wydarzenia"
                        />
                    </div>
                ))}
            </div>
        </Section>
    );
}
