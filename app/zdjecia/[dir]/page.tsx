import Photos from "../../../components/photos";
import { Shell } from "../../../components/design";

export const dynamic = "force-dynamic";

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

async function getDirectory(dir: string): Promise<Directory> {
    const allDirs = await fetch(rura("index.json"), { cache: "no-store" }).then(x => x.json());
    const photosUrls = await fetch(rura(`${dir}/photos.json`), { cache: "no-store" }).then(x => x.json());
    const directory = allDirs.find((d: Directory) => d.dir === dir);
    const items = photosUrls.map((i: string) => ({
        thumb: rura(`${directory.dir}/thumb/${i}`),
        big: rura(`${directory.dir}/big/${i}`),
        full: rura(`${directory.dir}/big/${i}`),
    }));
    return { ...directory, items };
}

interface ZdjeciaProps {
    params: Promise<{ dir: string }>;
}

export async function generateMetadata({ params }: ZdjeciaProps) {
    const { dir } = await params;
    const directory = await getDirectory(dir);

    return {
        title: directory?.title ? `${directory.title} - zdjęcia` : "Galeria zdjęć",
        description: directory?.description,
    };
}

export default async function ZdjeciaDirPage({ params }: ZdjeciaProps) {
    const { dir } = await params;
    const directory = await getDirectory(dir);
    return (
        <div>
            <Shell className="mt-8 rounded-lg border border-stone-200 bg-white p-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <strong>INFO: </strong>Każde zdjęcie można pobrać w wysokiej rozdzielczości za pomocą odpowiedniego przycisku.
            </Shell>
            {directory && <Photos directory={directory} />}
        </div>
    );
}
