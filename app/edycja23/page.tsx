import { Anchor } from "../../components/anchor";
import { Slogan } from "../../components/slogan";

export const dynamic = "force-static";

export default function Edycja23() {
    return (
        <div>
            <Slogan title="Edycja 2023" excerpt="Garść najważniejszych informacji o Rurze na Kocierz 2023" photo="/assets/posts/podsumowanie-rura-2023.jpg" />
            <div className="flex w-full bg-zinc-200 justify-center">
                <div className="max-w-6xl my-14">
                    <div className="bg-white border border-gray-300 rounded-sm p-10">
                        <h2 className="text-2xl uppercase font-semibold">Podsumowujący klip video</h2>
                        <span>
                            <iframe
                                width="100%"
                                height="620"
                                src="https://www.youtube.com/embed/kJthfzb95ik"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </span>
                        <br />
                        <br />
                        <h2 className="text-2xl uppercase font-semibold">wyniki</h2>
                        <span>
                            Wyniki wszystkich zawodników możliwe są do pobrania w pliku .pdf poniżej
                            <div className="flex flex-col items-start">
                                <div className="my-2 flex">
                                    <Anchor href="/files/rnk_2023_wyniki.pdf">Pobierz plik .PDF</Anchor>
                                </div>
                            </div>
                        </span>
                        <br />
                        <br />
                        <h2 className="text-2xl uppercase font-semibold">trasa wyścigu</h2>
                        <span>
                            W roku 2023 Rura na Kocierz wróciła do korzeni. To jednodniowy uphill z jazdą indywidualną na czas.
                            <div className="my-8 flex flex-col items-start">
                                <span className="items-baseline">
                                    <h3 className="font-semibold text-lg">Time Trial</h3>
                                    <div className="text-lg">11km / 380m przewyższenia</div>
                                </span>
                                <div className="my-2 flex">
                                    <Anchor href="/gpsies/rura_na_kocierz_2022_time_trial.gpx">Pobierz plik .GPX</Anchor>
                                    <Anchor href="https://www.strava.com/routes/2897239796664260592">
                                        Zobacz w
                                        <img className="ml-2 self-center" src="assets/strava-logo-small.jpg" />
                                    </Anchor>
                                </div>
                            </div>
                        </span>
                        <br />
                        <h2 className="text-2xl uppercase font-semibold">zdjęcia</h2>
                        <span>
                            Kilka katalogów zdjęć z obu dni rywalizacji dostępne jest w zakładce "ZDJĘCIA". Można je pobierać dowoli za
                            pomocą przycisku pobierz, są w wysokiej rozdzielczości, nadają się np do wywołania.
                            <div className="flex flex-col items-start">
                                <div className="my-2 flex">
                                    <Anchor href="/zdjecia">Przejdź do zdjęć</Anchor>
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
