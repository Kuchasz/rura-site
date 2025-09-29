import React from "react";
import { Anchor } from "../../components/anchor";
import { Slogan } from "../../components/slogan";

export default function TrasaPage() {
    return (
        <div>
            <Slogan
                title="Trasa wyścigu"
                excerpt="Udostępniamy trasę wyścigu w formie kompatybilnej z komputerami rowerowymi"
                photo="/assets/mapka-trasa-2022.jpg"
            />
            <div className="flex w-full bg-zinc-200 justify-center">
                <div className="max-w-6xl my-14">
                    <div className="bg-white border border-gray-300 rounded-sm p-10">
                        <h2 className="text-2xl uppercase font-semibold">trasa wyścigu</h2>
                        <br />
                        <span>
                            <div className="flex flex-col items-start">
                                <div className="font-semibold text-xl">11km / 350m przewyższenia</div>
                                <span className="my-4">
                                    Wymagająca, górska trasa wyścigu indywidualnej jazdy na czas. Startujemy w parku w Gminie Łękawica,
                                    na zawodników czeka 11km i 350m wzniosu. Po drodze przejedziemy ekstra atrakcję, ul. Widokową
                                </span>
                                <div className="my-2 flex">
                                    <Anchor href="/gpsies/rura_na_kocierz_2025_time_trial.gpx">Pobierz plik .GPX</Anchor>
                                    <Anchor href="https://www.strava.com/routes/3401126294890017916">
                                        Zobacz w
                                        <img className="ml-2 self-center" width={100} src="assets/strava-logo.png" />
                                    </Anchor>
                                </div>
                                <a className="w-full" target="_blank" href="https://www.strava.com/routes/3401126294890017916">
                                    <img className="w-full" src="assets/trasa-time-trial.jpg" />
                                </a>
                                <img src="assets/wysokosciowka-time-trial.png" />
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const metadata = {
    title: "Trasa",
}; 