import Link from "next/link";
import { HeroWithVisual, Kicker, KickerLight, Lead, Section } from "../../components/design";

export const dynamic = "force-static";

export const metadata = {
    title: "Zdjęcia",
};

const rura = (url: string) => `https://wed-gal-waw-001.s3.waw.io.cloud.ovh.net/rura/${url}`;

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
                    full: rura(`${d.dir}/big/${i}`),
                })),
            };
        })
    );
}

type DayGroup = {
    key: string;
    time: number;
    label: string;
    directories: Directory[];
};

const parseDate = (date: string) => {
    const [day, month, year] = date.split(".").map(Number);
    return new Date(year, month - 1, day);
};

const dayLabel = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" });

function groupByDay(directories: Directory[]): DayGroup[] {
    const groups = new Map<string, DayGroup>();
    for (const directory of directories) {
        const parsed = parseDate(directory.date);
        const group = groups.get(directory.date) ?? {
            key: directory.date,
            time: parsed.getTime(),
            label: dayLabel.format(parsed),
            directories: [],
        };
        group.directories.push(directory);
        groups.set(directory.date, group);
    }
    return Array.from(groups.values()).sort((a, b) => b.time - a.time);
}

const galleriesLabel = (count: number) => {
    if (count === 1) return "1 galeria";
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} galerie`;
    return `${count} galerii`;
};

const photosLabel = (count: number) => {
    if (count === 1) return "1 zdjęcie";
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${count} zdjęcia`;
    return `${count} zdjęć`;
};

export default async function ZdjeciaPage() {
    const directories = await getDirectories();
    const days = groupByDay(directories);

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

            <Section className="flex flex-col gap-14">
                {days.map(day => (
                    <div key={day.key}>
                        <div className="mb-5 flex items-end justify-between gap-4 border-b border-stone-200 pb-3">
                            <div>
                                <Kicker className="mb-1">{day.key}</Kicker>
                                <h2 className="text-2xl font-semibold text-gray-900">{day.label}</h2>
                            </div>
                            <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                {galleriesLabel(day.directories.length)}
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3.5 max-[1024px]:grid-cols-2 max-[760px]:grid-cols-1">
                            {day.directories.map(directory => (
                                <Link
                                    key={directory.dir}
                                    className="block rounded-xl border border-stone-200 bg-white p-4 text-gray-700 shadow-[0_1px_0_rgb(17_24_39_/_0.04)] transition-all duration-[180ms] hover:-translate-y-px hover:border-orange-600 hover:bg-orange-50 hover:shadow-[0_10px_24px_rgb(234_88_12_/_0.16)]"
                                    href={`/zdjecia/${directory.dir}`}
                                >
                                    <span className="mb-2 flex items-center justify-between gap-2 text-xs text-gray-500">
                                        <span>{directory.author}</span>
                                        <span className="shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-semibold text-gray-700">
                                            {photosLabel(directory.items.length)}
                                        </span>
                                    </span>
                                    <strong className="text-gray-900">{directory.title}</strong>
                                    {directory.description ? (
                                        <span className="mt-2 block text-sm leading-snug text-gray-500">{directory.description}</span>
                                    ) : null}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </Section>
        </>
    );
}
