import Head from "next/head";
import Link from "next/link";
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
function Zdjecia({ directories }: { directories: Directory[] }) {
    return (
        <>
            <Head>
                <title>Zdjęcia</title>
            </Head>
            <div className="flex p-4 flex-col items-center">
                <div className="flex flex-wrap">
                    {directories.length !== 0
                        ? directories.map((d) => (
                              <Link key={d.dir} href={`zdjecia/${d.dir}`} className="relative w-full overflow-hidden md:w-1/3 cursor-pointer h-96">
                                  <img className="absolute z-[-10] top-0 w-full h-full object-center object-cover" src={d.items[0].big} />
                                  <div className="bg-gradient-to-b from-black via-transparent to-black absolute z-[-9] top-0 w-full h-full opacity-75"></div>
                                  <div className="group text-white font-semibold h-full flex flex-col hover:bg-gray-900 transition-colors justify-between p-4">
                                      <div className="flex flex-col">
                                          <span>{d.date}</span>
                                          <span>fot. {d.author}</span>
                                      </div>
                                      <div className="transition-transform group-hover:translate-x-2 text-3xl">{d.title}</div>
                                  </div>
                              </Link>
                          ))
                        : null}
                </div>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const directories = await fetch(rura(`index.json?v=${Math.random()}`))
        .then((x) => x.json())
        .then((dirs: Directory[]) =>
            Promise.all(
                dirs.map((d) =>
                    fetch(rura(`${d.dir}/photos.json`))
                        .then((x) => x.json())
                        .then((x: string[]) =>
                            Promise.resolve({
                                ...d,
                                date: d.date.replace(/-/g, "."),
                                items: x.map((i) => ({
                                    thumb: rura(`${d.dir}/thumb/${i}`),
                                    big: rura(`${d.dir}/big/${i}`),
                                    full: rura(`${d.dir}/full/${i}`),
                                })),
                            })
                        )
                )
            )
        );

    return {
        props: { directories },
    };
}

export default Zdjecia;
