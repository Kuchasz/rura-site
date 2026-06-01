import { getTerms } from "@/set-api";
import { Actions, ButtonLink, ButtonRoute, HeroWithVisual, Kicker, KickerLight, Lead, Panel, Pill, Section } from "../../components/design";

export const dynamic = "force-static";

export const metadata = {
    title: "Regulamin",
};

function TermsDetails({ termsUrl }: { termsUrl?: string }) {
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
                        {termsUrl ? (
                            <ButtonLink primary target="_blank" href={termsUrl}>
                                Pobierz regulamin
                            </ButtonLink>
                        ) : null}
                        <ButtonLink href="mailto:biuro@rura.cc">Zadaj pytanie</ButtonLink>
                    </Actions>
                </div>
            </Panel>
        </Section>
    );
}

export default async function Regulamin() {
    const { status, data } = await getTerms();

    if (status === "success") {
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
                        <ButtonLink primary target="_blank" href={data!.termsUrl}>
                            Pobierz regulamin
                        </ButtonLink>
                    </Actions>
                </HeroWithVisual>

                <TermsDetails termsUrl={data!.termsUrl} />
            </>
        );
    }

    return (
        <>
            <HeroWithVisual
                image="/assets/hero_regulamin.jpg"
                alt="Regulamin zawodów"
                pill="Regulamin"
                description="Nie udało się pobrać regulaminu. Spróbuj ponownie później albo skontaktuj się z organizatorem."
            >
                <KickerLight>Regulamin</KickerLight>
                <h1>Regulamin chwilowo niedostępny.</h1>
                <Lead className="text-white/90">
                    Nie udało się pobrać regulaminu. Spróbuj ponownie później albo skontaktuj się z organizatorem.
                </Lead>
                <Actions>
                    <ButtonLink primary href="mailto:biuro@rura.cc">
                        Zapytaj organizatora
                    </ButtonLink>
                    <ButtonRoute href="/trasa">
                        Wróć do trasy
                    </ButtonRoute>
                </Actions>
            </HeroWithVisual>

            <Section>
                <Panel>
                    <Pill hot>Stan systemowy</Pill>
                    <h2 className="mt-4">Nie udało się pobrać regulaminu</h2>
                    <p className="mt-5 text-gray-700">Kontakt do organizatora: biuro@rura.cc.</p>
                </Panel>
            </Section>
            <TermsDetails />
        </>
    );
}
