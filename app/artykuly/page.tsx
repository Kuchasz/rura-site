import { Metadata } from "next";
import Link from "next/link";
import { HeroWithVisual, Kicker, KickerLight, Lead, Section } from "../../components/design";
import { YearFilter } from "../../components/year-filter";
import { getAllPosts } from "../../lib/mdx";

export const metadata: Metadata = {
    title: "Wszystkie artykuły",
};

const formatDate = (date: string) => {
    const value = new Date(date);
    const day = String(value.getDate()).padStart(2, '0');
    const month = String(value.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}.${value.getFullYear()}`;
};

export default function AllPostsPage() {
    const sortedPosts = getAllPosts();
    const [mainPost] = sortedPosts;
    const years = Array.from(new Set(sortedPosts.map(post => new Date(post.date).getFullYear().toString())));

    return (
        <>
            <HeroWithVisual
                image={`/assets/posts/${mainPost.photo}`}
                alt={mainPost.title}
                pill="Najnowsze"
                description={mainPost.title}
            >
                <KickerLight>Wszystkie artykuły</KickerLight>
                <h1>Komunikaty, zapisy, wyniki i archiwum.</h1>
                <Lead className="text-white/90">Indeks artykułów z rura.cc w układzie szybszym do skanowania przed startem i po zawodach.</Lead>
            </HeroWithVisual>

            <Section>
                <YearFilter
                    years={years}
                    items={sortedPosts.map(post => ({
                        key: post.alias,
                        year: new Date(post.date).getFullYear().toString(),
                        content: (
                            <Link className="grid grid-cols-[118px_1fr_auto] items-center gap-3.5 rounded-lg border border-stone-200 bg-white p-3.5 text-gray-700 hover:border-orange-600 max-[760px]:grid-cols-1" href={`/artykul/${post.alias}`}>
                                <time className="font-black text-orange-600">{formatDate(post.date)}</time>
                                <strong className="text-gray-900 leading-[1.15]">{post.title}</strong>
                                <span>{post.author}</span>
                            </Link>
                        ),
                    }))}
                />
            </Section>
        </>
    );
}
