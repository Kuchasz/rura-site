import { Metadata } from "next";
import Link from "next/link";
import { Hero, Kicker, Lead, Section, VisualCard } from "../../components/design";
import { YearFilter } from "../../components/year-filter";
import { getAllPosts } from "../../lib/mdx";

export const metadata: Metadata = {
    title: "Wszystkie artykuły",
};

const formatDate = (date: string) => {
    const value = new Date(date);
    return `${value.getDate()}.${value.getMonth() + 1}.${value.getFullYear()}`;
};

export default function AllPostsPage() {
    const sortedPosts = getAllPosts();
    const [mainPost] = sortedPosts;
    const years = Array.from(new Set(sortedPosts.map(post => new Date(post.date).getFullYear().toString())));

    return (
        <>
            <Hero>
                <div>
                    <Kicker>Wszystkie artykuły</Kicker>
                    <h1>Komunikaty, zapisy, wyniki i archiwum.</h1>
                    <Lead>Indeks artykułów z rura.cc w układzie szybszym do skanowania przed startem i po zawodach.</Lead>
                </div>
                <VisualCard image={`/assets/posts/${mainPost.photo}`} alt={mainPost.title} pill="Najnowsze" hot>
                    {mainPost.title}
                </VisualCard>
            </Hero>

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
