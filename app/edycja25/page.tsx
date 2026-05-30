import { Actions, ButtonLink, ButtonRoute, Hero, Kicker, Lead, Panel, Section, VisualCard } from "../../components/design";

export const dynamic = "force-static";

export const metadata = {
    title: "Edycja 2025",
};

export default function Edycja25() {
    return (
        <>
            <Hero>
                <div>
                    <Kicker>Edycja 2025</Kicker>
                    <h1>Widokowa, powrót i pełna energia.</h1>
                    <Lead>
                        Rura na Kocierz 2025 odbyła się 5 października jako jednodniowa jazda indywidualna na czas z Łękawicy na Kocierz.
                    </Lead>
                    <Actions>
                        <ButtonLink primary href="/files/rnk_2025_wyniki.pdf">
                            Pobierz wyniki PDF
                        </ButtonLink>
                        <ButtonRoute href="/artykul/podsumowanie-rura-2025">
                            Podsumowanie edycji
                        </ButtonRoute>
                        <ButtonRoute href="/zdjecia">
                            Zdjęcia
                        </ButtonRoute>
                    </Actions>
                </div>
                <VisualCard image="/assets/posts/podsumowanie_rnk_2025.jpg" alt="Edycja 2025" pill="Archiwum">
                    Emocje, rywalizacja i atmosfera na ulicy Widokowej.
                </VisualCard>
            </Hero>

            <Section>
                <div className="grid grid-cols-2 gap-[18px] max-[760px]:grid-cols-1">
                    <Panel>
                        <Kicker>Wyniki</Kicker>
                        <h2>Oficjalne klasyfikacje</h2>
                        <p className="mt-5 text-gray-700">Wyniki edycji 2025 są dostępne w pełnym pliku PDF oraz osobnych klasyfikacjach kobiet i mężczyzn.</p>
                        <Actions>
                            <ButtonLink primary href="/files/rnk_2025_wyniki.pdf">
                                Pełne wyniki
                            </ButtonLink>
                            <ButtonLink href="/files/wyniki-rura-kobiety-2025.pdf">
                                Kobiety
                            </ButtonLink>
                            <ButtonLink href="/files/wyniki-rura-mezczyzni-2025.pdf">
                                Mężczyźni
                            </ButtonLink>
                        </Actions>
                    </Panel>
                    <Panel>
                        <Kicker>Trasa wyścigu</Kicker>
                        <h2>Time Trial</h2>
                        <p className="mt-5 text-gray-700">11 km pod górę, około 350 m przewyższenia i kluczowy odcinek na ulicy Widokowej.</p>
                        <Actions>
                            <ButtonLink href="/gpsies/rura_na_kocierz_2025_time_trial.gpx">
                                Pobierz GPX
                            </ButtonLink>
                            <ButtonLink href="https://www.strava.com/routes/3401126294890017916">
                                Zobacz w Strava
                            </ButtonLink>
                        </Actions>
                    </Panel>
                </div>
            </Section>
        </>
    );
}
