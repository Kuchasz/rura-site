import { Actions, ButtonLink, ButtonRoute, HeroWithVisual, Kicker, KickerLight, Lead, Panel, Section, SectionHead, StatCard } from "../../components/design";

export const dynamic = "force-static";

const routes = [
    {
        name: "Start wspólny - PRO",
        distance: "104 km",
        elevation: "2340 m przewyższenia",
        gpx: "/gpsies/rura_na_kocierz_2022_start_wspolny_pro.gpx",
        strava: "https://www.strava.com/routes/2897239559631378416",
    },
    {
        name: "Start wspólny - FUN",
        distance: "52 km",
        elevation: "1120 m przewyższenia",
        gpx: "/gpsies/rura_na_kocierz_2022_start_wspolny_fun.gpx",
        strava: "https://www.strava.com/routes/2897229113276376702",
    },
    {
        name: "Time Trial",
        distance: "11 km",
        elevation: "350 m przewyższenia",
        gpx: "/gpsies/rura_na_kocierz_2022_time_trial.gpx",
        strava: "https://www.strava.com/routes/2897239796664260592",
    },
];

export default function Edycja22() {
    return (
        <>
            <HeroWithVisual
                image="/assets/hero_edycja22.jpg"
                alt="Edycja 2022"
                pill="Archiwum"
                description="Start wspólny PRO i FUN oraz Time Trial — trzy formaty wyścigu w jeden weekend."
            >
                <KickerLight>Edycja 2022</KickerLight>
                <h1>Dwa dni ścigania, trzy formaty.</h1>
                <Lead className="text-white/90">
                    Rura na Kocierz 2022 toczyła się dwa dni z rzędu: start wspólny na dwóch dystansach oraz indywidualna jazda na
                    czas.
                </Lead>
                <Actions>
                    <ButtonLink primary href="/files/rnk_2022_wyniki.pdf">
                        Pobierz wyniki PDF
                    </ButtonLink>
                    <ButtonRoute href="/zdjecia">
                        Zdjęcia z edycji
                    </ButtonRoute>
                </Actions>
            </HeroWithVisual>

            <Section>
                <SectionHead>
                    <>
                        <Kicker>Trasa wyścigu</Kicker>
                        <h2>Formaty edycji 2022</h2>
                    </>
                </SectionHead>
                <div className="grid grid-cols-3 gap-[18px] max-[1024px]:grid-cols-2 max-[760px]:grid-cols-1">
                    {routes.map(route => (
                        <StatCard key={route.name} label={route.name} value={route.distance}>
                            <p className="mt-3 text-gray-700">{route.elevation}</p>
                            <Actions>
                                <ButtonLink href={route.gpx}>
                                    GPX
                                </ButtonLink>
                                <ButtonLink href={route.strava}>
                                    Strava
                                </ButtonLink>
                            </Actions>
                        </StatCard>
                    ))}
                </div>
            </Section>

            <Section>
                <Panel>
                    <Kicker>Zdjęcia</Kicker>
                    <h2>Materiały z obu dni</h2>
                    <p className="mt-5 text-gray-700">Katalogi zdjęć z rywalizacji są dostępne w zakładce Zdjęcia.</p>
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
