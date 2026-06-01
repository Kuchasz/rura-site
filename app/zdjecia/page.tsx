import Link from "next/link";
import { HeroWithVisual, KickerLight, Lead, Section } from "../../components/design";

export const dynamic = "force-static";

export const metadata = {
    title: "Zdjęcia",
};

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

    return (
        <>
            <HeroWithVisual
                image="/assets/hero_photos.jpg"
                alt="Zdjęcia w wysokiej jakości do pobrania"
                pill="Bezpłatne"
                description="Wysokiej rozdzielczości zdjęcia z trasy, startu, mety i dekoracji do swobodnego pobrania."
            >
                <KickerLight>Zdjęcia</KickerLight>
                <h1>Zdjęcia z trasy, startu, mety i dekoracji.</h1>
                <Lead className="text-white/90">
                    Zebrane galerie z poprzednich edycji Rury na Kocierz oraz Żar Everesting.
                </Lead>
            </HeroWithVisual>

            <Section>
                <div className="grid grid-cols-3 gap-3.5 max-[1024px]:grid-cols-2 max-[760px]:grid-cols-1">
                    {directories.map(directory => (
                        <Link
                            key={directory.dir}
                            className="block rounded-xl border border-stone-200 bg-white p-4 text-gray-700 shadow-[0_1px_0_rgb(17_24_39_/_0.04)] transition-all duration-[180ms] hover:-translate-y-px hover:border-orange-600 hover:bg-orange-50 hover:shadow-[0_10px_24px_rgb(234_88_12_/_0.16)]"
                            href={`/zdjecia/${directory.dir}`}
                        >
                            <span className="mb-2 block text-xs text-gray-500">
                                {directory.date} / {directory.author}
                            </span>
                            <strong className="text-gray-900">{directory.title}</strong>
                        </Link>
                    ))}
                </div>
            </Section>
        </>
    );
}
