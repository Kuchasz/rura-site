import { Actions, ButtonLink, ButtonRoute, HeroWithVisual, Kicker, KickerLight, Lead, Panel, Section } from "../../components/design";

export const dynamic = "force-static";

export default function Edycja23() {
    return (
        <>
            <HeroWithVisual
                image="/assets/posts/podsumowanie-rura-2023.jpg"
                alt="Edycja 2023"
                pill="Archiwum"
                description="Jednodniowy uphill z jazdą na czas — powrót do klasycznego formatu z pełnymi wynikami."
            >
                <KickerLight>Edycja 2023</KickerLight>
                <h1>Rura wróciła do korzeni.</h1>
                <Lead className="text-white/90">
                    Garść najważniejszych informacji o Rurze na Kocierz 2023: jednodniowy uphill z jazdą indywidualną na czas.
                </Lead>
                <Actions>
                    <ButtonLink primary href="https://events.stoprace.com/event/129/results">
                        Lista startowa i wyniki
                    </ButtonLink>
                    <ButtonRoute href="/zdjecia">
                        Przejdź do zdjęć
                    </ButtonRoute>
                </Actions>
            </HeroWithVisual>

            <Section>
                <div className="grid grid-cols-2 gap-[18px] max-[760px]:grid-cols-1">
                    <Panel>
                        <Kicker>Wyniki</Kicker>
                        <h2>PDF z wynikami</h2>
                        <p className="mt-5 text-gray-700">Wyniki wszystkich zawodników są dostępne w pliku PDF.</p>
                        <Actions>
                            <ButtonLink primary href="/files/rnk_2023_wyniki.pdf">
                                Pobierz plik .PDF
                            </ButtonLink>
                        </Actions>
                    </Panel>
                    <Panel>
                        <Kicker>Trasa wyścigu</Kicker>
                        <h2>Time Trial</h2>
                        <p className="mt-5 text-gray-700">11 km / 350 m przewyższenia.</p>
                        <Actions>
                            <ButtonLink href="/gpsies/rura_na_kocierz_2022_time_trial.gpx">
                                Pobierz plik .GPX
                            </ButtonLink>
                            <ButtonLink href="https://www.strava.com/routes/2897239796664260592">
                                Zobacz w Strava
                            </ButtonLink>
                        </Actions>
                    </Panel>
                </div>
            </Section>

            <Section>
                <Panel>
                    <Kicker>Zdjęcia</Kicker>
                    <h2>Katalogi zdjęć z rywalizacji</h2>
                    <p className="mt-5 text-gray-700">
                        Katalogi zdjęć są dostępne w zakładce Zdjęcia. Można je pobierać dowolnie; są w wysokiej rozdzielczości i
                        nadają się do wywołania.
                    </p>
                    <Actions>
                        <ButtonRoute primary href="/zdjecia">
                            Przejdź do zdjęć
                        </ButtonRoute>
                    </Actions>
                </Panel>
            </Section>
        </>
    );
}
