import Link from "next/link";
import { Hero, Kicker, Lead, Section, VisualCard } from "../../components/design";
import { YearFilter } from "../../components/year-filter";

export const dynamic = "force-static";

const rura = (url: string) => `https://eu2.contabostorage.com/b198b89caced412197f2059257d331be:wed-gal-eu-001/rura/${url}`;

type Item = {
    thumb: string;
    big: string;
    full: string;
};

type Directory = {
    dir: string;
    title: string;
    author: string;
    date: string;
    description: string;
    items: Item[];
};

async function getDirectories(): Promise<Directory[]> {
    const dirs = await fetch(rura(`index.json`), { cache: "no-store" }).then(x => x.json());
    return Promise.all(
        dirs.map(async (d: Directory) => {
            const x = await fetch(rura(`${d.dir}/photos.json`), { cache: "no-store" }).then(x => x.json());
            return {
                ...d,
                date: d.date.replace(/-/g, "."),
                items: x.map((i: string) => ({
                    thumb: rura(`${d.dir}/thumb/${i}`),
                    big: rura(`${d.dir}/big/${i}`),
                    full: rura(`${d.dir}/full/${i}`),
                })),
            };
        })
    );
}

export default async function ZdjeciaPage() {
    const directories = await getDirectories();
    const years = Array.from(new Set(directories.map(directory => directory.date.slice(0, 4)))).sort().reverse();

    return (
        <>
            <Hero>
                <div>
                    <Kicker>Zdjęcia</Kicker>
                    <h1>Katalogi z trasy, startu, mety i dekoracji.</h1>
                    <Lead>
                        Zebrane galerie z poprzednich edycji. Układ zachowuje listę katalogów, ale dodaje filtrowanie roczników dla
                        szybszego szukania.
                    </Lead>
                </div>
                <VisualCard image="/assets/posts/fotografowie-rura-2021.jpg" alt="Zdjęcia w wysokiej jakości do pobrania" pill="Bezpłatne pobieranie">
                    Zdjęcia w wysokiej rozdzielczości.
                </VisualCard>
            </Hero>

            <Section>
                <YearFilter
                    years={years}
                    listClassName="grid grid-cols-3 gap-3.5 max-[1024px]:grid-cols-2 max-[760px]:grid-cols-1"
                    items={directories.map(directory => ({
                        key: directory.dir,
                        year: directory.date.slice(0, 4),
                        content: (
                            <Link className="block rounded-xl border border-stone-200 bg-white p-4 text-gray-700" href={`/zdjecia/${directory.dir}`}>
                                <span className="mb-2 block text-xs text-gray-500">
                                    {directory.date} / {directory.author}
                                </span>
                                <strong className="text-gray-900">{directory.title}</strong>
                            </Link>
                        ),
                    }))}
                />
            </Section>
        </>
    );
}
