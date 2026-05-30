import { getTerms } from "@/set-api";
import { CopyButton } from "../../components/copy-button";
import { Actions, ButtonLink, ButtonRoute, Hero, Kicker, Lead, Panel, Pill } from "../../components/design";

export const dynamic = "force-static";

export default async function Regulamin() {
    const { status, data } = await getTerms();

    if (status === "success") {
        return (
            <Hero>
                <div>
                    <Kicker>Regulamin</Kicker>
                    <h1>Regulamin zawodów.</h1>
                    <Lead>Najważniejszy dokument dla zawodników, opiekunów i obsługi wyścigu.</Lead>
                    <Actions>
                        <ButtonLink primary target="_blank" href={data!.termsUrl}>
                            Pobierz regulamin
                        </ButtonLink>
                    </Actions>
                </div>
                <Panel>
                    <Pill>PDF</Pill>
                    <h2 className="mt-4">Gotowy do pobrania</h2>
                    <p className="mt-5 text-gray-700">
                        Otwórz dokument w nowej karcie i sprawdź zasady startu, klasyfikacji oraz organizacji zawodów.
                    </p>
                </Panel>
            </Hero>
        );
    }

    return (
        <Hero>
            <div>
                <Kicker>Regulamin</Kicker>
                <h1>Regulamin chwilowo niedostępny.</h1>
                <Lead>
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
            </div>
            <Panel>
                <Pill hot>Stan systemowy</Pill>
                <h2 className="mt-4">Nie udało się pobrać regulaminu</h2>
                <p className="mt-5 text-gray-700">Kontakt do organizatora: biuro@rura.cc.</p>
                <Actions>
                    <CopyButton text="biuro@rura.cc">Kopiuj email</CopyButton>
                </Actions>
            </Panel>
        </Hero>
    );
}
