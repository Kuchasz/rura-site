import Head from "next/head";
import Photos from "../../components/photos";

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

const rura = (url: string) => `https://ps-wed.azurewebsites.net/rura/${url}`;

function Zdjecia({ directory }: { directory: Directory }) {
    return (
        <>
            <Head>
                <title>Zdjęcia</title>
            </Head>
            <div className="flex p-4 flex-col items-center">
                <div className="p-4 text-white bg-zinc-700 rounded-md">
                    <strong>INFO: </strong>Każde zdjęcie można pobrać w wysokiej rozdzielczości za pomocą odpowiedniego przycisku.
                </div>

                {directory && <Photos directory={directory} />}
            </div>
        </>
    );
}

export default Zdjecia;

export const getStaticProps = async ({ params: { dir } }: { params: { dir: string } }) => {
    const allDirsResult = await fetch(rura("index.json"));
    const allDirs = (await allDirsResult.json()) as Directory[];

    const photosUrlsResult = await fetch(rura(`${dir}/photos.json`));
    const photosUrls = (await photosUrlsResult.json()) as string[];

    const directory = allDirs.find(d => d.dir === dir)!;

    const items = photosUrls.map(i => ({
        thumb: rura(`${directory.dir}/thumb/${i}`),
        big: rura(`${directory.dir}/big/${i}`),
        full: rura(`${directory.dir}/full/${i}`),
    }));

    return {
        props: {
            directory: { ...directory, items },
        },
    };
};

export const getStaticPaths = async () => {
    const result = await fetch(rura("index.json"));
    const allDirs = (await (await result).json()) as Directory[];

    return { paths: allDirs.map(d => ({ params: { dir: d.dir } })), fallback: false };
};
