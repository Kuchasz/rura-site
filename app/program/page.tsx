import { HeroWithVisual, Kicker, KickerLight, Lead, Panel, Section } from "../../components/design";

export const dynamic = "force-static";

const days = [
    {
        date: "8.04.2022, piątek",
        items: ["18:00-21:00 - otwarcie Biura Zawodów, odbieranie pakietów startowych, Kozubnik ul. Kochana 1"],
    },
    {
        date: "9.04.2022, sobota",
        items: [
            "9:00-11:30 - odbieranie pakietów startowych, Kozubnik ul. Kochana 1",
            "11:30-12:00 - odprawa techniczna",
            "13:30 - start zawodów dla dzieci",
            "14:00 - zakończenie zawodów dla dzieci",
            "13:00 - start RnK RACE",
            "18:00 - dekoracja RnK RACE",
        ],
    },
    {
        date: "10.04.2022, niedziela",
        items: [
            "7:00-9:30 - odbieranie pakietów startowych, Park w Łękawicy ul. Parkowa",
            "9:30-10:00 - odprawa techniczna",
            "11:00 - start RnK ITT",
            "14:00 - start zawodów dla dzieci",
            "14:45 - dekoracja zawodów dla dzieci",
            "15:00 - dekoracja RnK ITT",
        ],
    },
];

export default function Program() {
    return (
        <>
            <HeroWithVisual
                image="/assets/plan-zawodow-2022.jpg"
                alt="Program zawodów"
                pill="Archiwum"
                description="Szczegółowy harmonogram trzech dni: biuro zawodów, starty i dekoracje."
            >
                <KickerLight>Program</KickerLight>
                <h1>Program Rury na Kocierz.</h1>
                <Lead className="text-white/90">Program zawodów Rura na Kocierz 2022.</Lead>
            </HeroWithVisual>
            <Section>
                <div className="grid gap-2.5">
                    {days.map(day => (
                        <Panel key={day.date}>
                            <Kicker>{day.date}</Kicker>
                            <ul className="mt-4 grid gap-2 text-gray-700">
                                {day.items.map(item => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </Panel>
                    ))}
                </div>
            </Section>
        </>
    );
}
