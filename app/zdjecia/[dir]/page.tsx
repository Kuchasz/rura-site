import Photos from "../../../components/photos";

export const dynamic = "force-dynamic";

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

async function getDirectory(dir: string): Promise<Directory> {
    const allDirs = await fetch(rura("index.json"), { cache: "no-store" }).then(x => x.json());
    const photosUrls = await fetch(rura(`${dir}/photos.json`), { cache: "no-store" }).then(x => x.json());
    const directory = allDirs.find((d: Directory) => d.dir === dir);
    const items = photosUrls.map((i: string) => ({
        thumb: rura(`${directory.dir}/thumb/${i}`),
        big: rura(`${directory.dir}/big/${i}`),
        full: rura(`${directory.dir}/full/${i}`),
    }));
    return { ...directory, items };
}

interface ZdjeciaProps {
    params: Promise<{ dir: string }>;
}

export default async function ZdjeciaDirPage({ params }: ZdjeciaProps) {
    const { dir } = await params;
    const directory = await getDirectory(dir);
    return (
        <div className="flex p-4 flex-col items-center">
            <div className="p-4 text-white bg-zinc-700 rounded-md">
                <strong>INFO: </strong>Każde zdjęcie można pobrać w wysokiej rozdzielczości za pomocą odpowiedniego przycisku.
            </div>
            {directory && <Photos directory={directory} />}
        </div>
    );
}
