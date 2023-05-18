import Head from "next/head";
import Link from "next/link";
import { DateAdded } from "../components/date-added";
import { PostDetails } from "../components/post-details";
import { posts } from "../posts";
import { Slogan } from "../components/slogan";

const sort = <T,>(items: T[], func: (item: T) => number): T[] => {
    const i = [...items];

    return i.sort((a, b) => func(a) - func(b));
};

const SneakPeak = ({ article }: { article: typeof posts[0] }) => (
    <Link href={`artykul/${article.alias}`}>
        <div className="flex-1 flex flex-col rounded-md group overflow-hidden justify-end mx-4 max-h-72 my-4 relative cursor-pointer">
            <div
                className="absolute w-full transition-transform group-hover:scale-105 duration-500 h-full bg-center bg-cover brightness-50"
                style={{ backgroundImage: `url(/assets/posts/${article.photo})`, zIndex: -1 }}
            ></div>

            <div className="p-6 pt-40 flex flex-col text-white">
                <h3 className="font-bold self-start duration-500 w-auto uppercase transition-colors hover:text-orange-500 text-2xl">
                    {article.title}
                </h3>

                <h4 className="my-4">{article.excerpt}</h4>
                <DateAdded date={article.date} />
            </div>
        </div>
    </Link>
);

const Index = () => {
    const sortedPosts = sort(posts, p => p.date.getTime()).reverse();
    const [mainPost] = sortedPosts;

    return (
        <>
            <Head>
                <title>Aktualności</title>
            </Head>
            <Slogan {...mainPost} link={mainPost.alias} photo={`assets/posts/${mainPost.photo}`} />
            <div className="flex w-full justify-center">
                <div className="w-full flex justify-center flex-col sm:flex-row py-4 px-12">
                    {sortedPosts.slice(1, 4).map(sp => (
                        <SneakPeak key={sp.title} article={sp} />
                    ))}
                </div>
            </div>
            <div className="flex w-full relative justify-center overflow-hidden">
                <div className="w-full my-12 max-w-6xl flex flex-col items-start justify-center">
                    {sortedPosts.slice(4).map(sp => (
                        <Link key={sp.alias} href={`artykul/${sp.alias}`}>
                            <div className="cursor-pointer flex flex-col md:flex-row mb-4">
                                <img
                                    className="w-full md:w-96 object-cover object-center"
                                    src={`assets/posts/${sp.photo}`}
                                ></img>
                                <div className="px-4 flex flex-col">
                                    <div className="font-semibold text-lg uppercase">{sp.title}</div>
                                    <h4>{sp.excerpt}</h4>
                                    <PostDetails date={sp.date} author={sp.author} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Index;
