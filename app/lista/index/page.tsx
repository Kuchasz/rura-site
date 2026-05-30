import { Anchor } from "../../../components/anchor";
import { Actions, Hero, Kicker, Lead, VisualCard } from "../../../components/design";

export const dynamic = "force-static";

export default function ListaIndex() {
    return (
        <Hero>
            <div>
                <Kicker>Lista zawodników</Kicker>
                <h1>Lista zawodników z podziałem na dystanse.</h1>
                <Lead>
                    Zawodnicy startujący w klasyfikacji generalnej uwzględnieni zostali w wyścigach RnK PRO i RnK Time Trial.
                    Godziny startów w TT zawodników klasyfikacji generalnej zostaną uzupełnione po zakończeniu RnK PRO.
                </Lead>
                <Actions>
                    <Anchor href="/lista/pro">RnK PRO</Anchor>
                    <Anchor href="/lista/fun">RnK FUN</Anchor>
                    <Anchor href="/lista/tt">RnK Time Trial</Anchor>
                </Actions>
            </div>
            <VisualCard image="/assets/lista-startowa-2022.jpg" alt="Lista zawodników" pill="Starty">
                Godziny startów TT zostaną uzupełnione po RnK PRO.
            </VisualCard>
        </Hero>
    );
}
