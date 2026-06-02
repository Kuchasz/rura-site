import { Actions, ButtonLink, HeroWithVisual, Kicker, KickerLight, Lead, Panel, Section } from "../../components/design";

export const dynamic = "force-static";

export const metadata = {
    title: "Regulamin",
};

const termsUrl = "/files/regulamin_rnk26.pdf";

function TermsDetails() {
    return (
        <Section>
            <Panel>
                <div className="grid grid-cols-[1fr_auto] items-center gap-[18px] max-[760px]:grid-cols-1">
                    <div>
                        <Kicker>Masz pytanie?</Kicker>
                        <h2>W razie wątpliwości napisz do organizatora.</h2>
                        <p className="mt-5 text-gray-700">
                            Regulamin jest punktem odniesienia dla zawodników, opiekunów i obsługi. Jeżeli zapis w dokumencie wymaga
                            doprecyzowania, skontaktuj się z biurem zawodów przed dniem startu.
                        </p>
                    </div>
                    <Actions className="mt-0 justify-end max-[760px]:justify-start">
                        <ButtonLink primary target="_blank" href={termsUrl}>
                            Pobierz regulamin
                        </ButtonLink>
                        <ButtonLink href="mailto:biuro@rura.cc">Zadaj pytanie</ButtonLink>
                    </Actions>
                </div>
            </Panel>
        </Section>
    );
}

export default function Regulamin() {
    return (
        <>
            <HeroWithVisual
                image="/assets/hero_regulamin.jpg"
                alt="Regulamin zawodów"
                pill="PDF"
                description="Najważniejszy dokument dla zawodników, opiekunów i obsługi wyścigu."
            >
                <KickerLight>Regulamin</KickerLight>
                <h1>Regulamin zawodów.</h1>
                <Lead className="text-white/90">Najważniejszy dokument dla zawodników, opiekunów i obsługi wyścigu.</Lead>
                <Actions>
                    <ButtonLink primary target="_blank" href={termsUrl}>
                        Pobierz regulamin
                    </ButtonLink>
                </Actions>
            </HeroWithVisual>

            <TermsDetails />
        </>
    );
}
