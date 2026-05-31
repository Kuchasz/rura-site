import { Metadata } from "next";
import Link from "next/link";
import { HeroWithVisual, Kicker, KickerLight, Lead, Section } from "../../components/design";
import { AuthorName } from "../../components/post-details";
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
                <h1>Wszystko o Rurze w jednym miejscu.</h1>
                <Lead className="text-white/90">Komunikaty organizacyjne, zapisy, wyniki i materiały z poprzednich edycji.</Lead>
            </HeroWithVisual>

            <Section>
                <YearFilter
                    years={years}
                    items={sortedPosts.map(post => ({
                        key: post.alias,
                        year: new Date(post.date).getFullYear().toString(),
                        content: (
                            <Link className="grid grid-cols-[128px_1fr_auto] items-center gap-4 rounded-xl border border-transparent bg-white p-4 shadow-sm transition-all duration-200 hover:border-orange-600 hover:shadow-md max-[760px]:grid-cols-1 max-[760px]:gap-3" href={`/artykul/${post.alias}`}>
                                <time className="font-mono text-sm font-semibold tracking-tight text-orange-600">{formatDate(post.date)}</time>
                                <strong className="text-base font-semibold leading-snug text-zinc-900">{post.title}</strong>
                                <AuthorName author={post.author} />
                            </Link>
                        ),
                    }))}
                />
            </Section>
        </>
    );
}
