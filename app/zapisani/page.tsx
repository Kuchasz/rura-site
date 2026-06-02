import { HeroWithVisual, Kicker, KickerLight, Lead, Panel, Section, SectionHead } from "../../components/design";
import { ParticipantsEmbed } from "../../components/race-result";

export const dynamic = "force-static";

export const metadata = {
    title: "Zapisani zawodnicy",
};

export default function ZapisaniPage() {
    return (
        <>
            <HeroWithVisual
                image="/assets/hero_zapisy.jpg"
                alt="Zawodnicy na trasie Rura na Kocierz"
                pill="Lista zgłoszeń"
                description="Aktualna lista zawodników zapisanych na Rurę na Kocierz."
            >
                <KickerLight>Zapisani</KickerLight>
                <h1>Zapisani zawodnicy.</h1>
                <Lead className="text-white/90">
                    Sprawdź aktualną listę zgłoszeń obsługiwaną przez S:Time.
                </Lead>
            </HeroWithVisual>

            <Section>
                <SectionHead>
                    <>
                        <Kicker>Lista zgłoszeń</Kicker>
                        <h2>Zapisani zawodnicy</h2>
                    </>
                </SectionHead>
                <Panel>
                    <ParticipantsEmbed />
                </Panel>
            </Section>
        </>
    );
}
