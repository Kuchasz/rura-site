import { HeroWithVisual, Kicker, KickerLight, Lead, Panel, Section, SectionHead } from "../../components/design";
import { ParticipantsEmbed, RegistrationEmbed } from "./registration-client";

export const dynamic = "force-static";

export const metadata = {
    title: "Rejestracja",
};

export default function RegistrationPage() {
    return (
        <>
            <HeroWithVisual
                image="/assets/hero_zapisy.jpg"
                alt="Zawodnicy na trasie Rura na Kocierz"
                pill="Zapisy"
                description="Rejestracja zawodników na Rurę na Kocierz."
            >
                <KickerLight>Rejestracja</KickerLight>
                <h1>Zapisz się na Rurę na Kocierz.</h1>
                <Lead className="text-white/90">
                    Formularz zapisów obsługuje S:Time. Wypełnij dane zawodnika i potwierdź start bezpośrednio na stronie.
                </Lead>
            </HeroWithVisual>

            <Section>
                <SectionHead>
                    <>
                        <Kicker>Formularz zgłoszeniowy</Kicker>
                        <h2>Rejestracja zawodnika</h2>
                    </>
                </SectionHead>
                <Panel>
                    <RegistrationEmbed />
                </Panel>
            </Section>

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
