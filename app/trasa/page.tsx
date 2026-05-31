import React from "react";
import { CopyButton } from "../../components/copy-button";
import { Actions, ButtonLink, HeroWithVisual, Kicker, KickerLight, Lead, Panel, RouteMap, Section } from "../../components/design";

export const metadata = {
    title: "Trasa",
};

export default function TrasaPage() {
    const stravaUrl = "https://www.strava.com/routes/3401126294890017916";

    return (
        <>
            <HeroWithVisual
                image="/assets/hero_trasa.jpg"
                alt="Trasa wyścigu"
                pill="11 km"
                description="Start w Łękawicy, przez Widokową, meta na Kocierzu — wymagająca górska trasa z 350 m przewyższenia."
            >
                <KickerLight>Trasa wyścigu</KickerLight>
                <h1>11 km pod górę. 350 m przewyższenia.</h1>
                <Lead className="text-white/90">
                    Wymagająca, górska trasa indywidualnej jazdy na czas. Start w parku w Gminie Łękawica, po drodze ekstra
                    atrakcja: ulica Widokowa.
                </Lead>
                <Actions>
                    <ButtonLink primary href="/gpsies/rura_na_kocierz_2025_time_trial.gpx">
                        Pobierz plik .GPX
                    </ButtonLink>
                    <ButtonLink href={stravaUrl}>
                        Zobacz w Strava
                    </ButtonLink>
                    <CopyButton text={stravaUrl}>Kopiuj link</CopyButton>
                </Actions>
            </HeroWithVisual>

            <Section>
                <div className="grid grid-cols-2 gap-[18px] max-[760px]:grid-cols-1">
                    <Panel>
                        <Kicker>Profil</Kicker>
                        <h2>Widokowa robi selekcję.</h2>
                        <p className="mt-5 text-gray-700">
                            Trasa jest krótka, intensywna i czytelna dla zawodników z komputerami rowerowymi. Plik GPX i Strava
                            prowadzą dokładnie po odcinku Time Trial.
                        </p>
                    </Panel>
                    <Panel>
                        <img src="/assets/wysokosciowka-time-trial.png" alt="Profil wysokościowy trasy" />
                    </Panel>
                </div>
            </Section>

            <Section>
                <RouteMap src="/assets/26_trasa_tt.jpg" alt="Ulica Widokowa na trasie Time Trial" />
            </Section>
        </>
    );
}
