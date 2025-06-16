import { Metadata } from "next";
import Link from "next/link";
import { DateAdded } from "../components/date-added";
import { PostDetails } from "../components/post-details";
import { Slogan } from "../components/slogan";
import { posts } from "../posts";
import { mdiCalendar, mdiMapMarker, mdiFlagCheckered } from "@mdi/js";
import Icon from "@mdi/react";

export const metadata: Metadata = {
    title: "Rura na Kocierz - Wyścig MTB",
};

const sort = <T,>(items: T[], func: (item: T) => number): T[] => {
    const i = [...items];
    return i.sort((a, b) => func(a) - func(b));
};

const SneakPeak = ({ article }: { article: typeof posts[0] }) => (
    <Link href={`artykul/${article.alias}`}>
        <div className="flex-1 flex flex-col rounded-md group overflow-hidden justify-end max-h-72 relative cursor-pointer">
            <img
                src={`/assets/posts/${article.photo}`}
                alt={article.title}
                className="object-cover absolute object-center w-full h-full brightness-25 transition-transform group-hover:scale-105 duration-500"
                style={{ zIndex: -1 }}
            />

            <div className="p-6 pt-40 flex flex-col text-white">
                <h3 className="font-bold self-start duration-500 w-auto uppercase transition-colors group-hover:text-orange-500 text-2xl">
                    {article.title}
                </h3>

                <h4 className="my-4 line-clamp-1">{article.excerpt}</h4>
                <DateAdded date={article.date} />
            </div>
        </div>
    </Link>
);

const EventInfo = () => (
    <div className="w-full bg-zinc-100 py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Rura na Kocierz 2025</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="flex flex-col items-center text-center p-6">
                    <Icon path={mdiCalendar} size={2} className="text-orange-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Data</h3>
                    <p className="text-gray-600">5 października 2025</p>
                </div>
                <div className="flex flex-col items-center text-center p-6">
                    <Icon path={mdiMapMarker} size={2} className="text-orange-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Miejsce</h3>
                    <p className="text-gray-600">Park w Łękawicy oraz Kocierz Resort</p>
                </div>
                <div className="flex flex-col items-center text-center p-6">
                    <Icon path={mdiFlagCheckered} size={2} className="text-orange-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Trasa</h3>
                    <p className="text-gray-600">11km z ulicą Widokową</p>
                </div>
            </div>
        </div>
    </div>
);

const RegistrationCTA = () => (
    <div className="w-full bg-orange-500 py-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Gotowy na wyzwanie?</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                Dołącz do najlepszych kolarzy górskich w Polsce i zmierz się z legendarną trasą Rury na Kocierz.
            </p>
            <Link
                href="https://events.stoprace.com/pl/1/register/1"
                className="inline-block bg-white text-orange-500 px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
                Zapisz się teraz
            </Link>
        </div>
    </div>
);

export default function HomePage() {
    const sortedPosts = sort(posts, p => p.date.getTime()).reverse();
    const [mainPost] = sortedPosts;

    return (
        <>
            <Slogan {...mainPost} link={mainPost.alias} photo={`/assets/posts/${mainPost.photo}`} />

            <EventInfo />
            <RegistrationCTA />

            <div className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Najnowsze informacje</h2>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
                    {sortedPosts.slice(1, 4).map(sp => (
                        <SneakPeak key={sp.title} article={sp} />
                    ))}
                </div>
            </div>

            <div className="flex flex-col container mx-auto items-center w-full px-4 relative justify-center overflow-hidden">
                <div className="w-full mb-12 flex flex-col items-start justify-center">
                    {sortedPosts.length > 5 && (
                        <div className="w-full flex justify-center">
                            <Link
                                href="/artykuly"
                                className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-colors"
                            >
                                Zobacz wszystkie artykuły
                            </Link>
                        </div>
                    )}
                </div>
            </div>


        </>
    );
} 