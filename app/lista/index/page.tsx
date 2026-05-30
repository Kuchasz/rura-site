import { Anchor } from "../../../components/anchor";
import { Actions, HeroWithVisual, KickerLight, Lead } from "../../../components/design";

export const dynamic = "force-static";

export default function ListaIndex() {
    return (
        <HeroWithVisual
            image="/assets/lista-startowa-2022.jpg"
            alt="Lista zawodników"
            pill="Archiwum"
            description="Lista startowa edycji 2022 z podziałem na dystanse PRO, FUN i Time Trial."
        >
            <KickerLight>Lista zawodników</KickerLight>
            <h1>Lista zawodników z podziałem na dystanse.</h1>
            <Lead className="text-white/90">
                Zawodnicy startujący w klasyfikacji generalnej uwzględnieni zostali w wyścigach RnK PRO i RnK Time Trial.
                Godziny startów w TT zawodników klasyfikacji generalnej zostały uzupełnione po zakończeniu RnK PRO.
            </Lead>
            <Actions>
                <Anchor href="/lista/pro">RnK PRO</Anchor>
                <Anchor href="/lista/fun">RnK FUN</Anchor>
                <Anchor href="/lista/tt">RnK Time Trial</Anchor>
            </Actions>
        </HeroWithVisual>
    );
}
