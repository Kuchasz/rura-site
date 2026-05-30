import { Metadata } from "next";
import { Actions, ButtonRoute, Card, HeroWithVisual, Kicker, KickerLight, Lead, Section, SectionHead, StatCard } from "../components/design";
import { PostDetails } from "../components/post-details";
import { getAllPosts } from "../lib/mdx";

export const metadata: Metadata = {
    title: "Rura na Kocierz - jazda indywidualna na czas",
};

const ArticleCard = ({ article }: { article: ReturnType<typeof getAllPosts>[0] }) => (
    <Card className="overflow-hidden">
        <img className="aspect-[16/10] w-full object-cover" src={`/assets/posts/${article.photo}`} alt={article.title} />
        <div className="p-[18px]">
            <PostDetails date={new Date(article.date)} author={article.author} />
            <h3 className="mb-2.5 text-[28px]">{article.title}</h3>
            <p className="mb-3.5 text-gray-700">{article.excerpt}</p>
            <ButtonRoute href={`/artykul/${article.alias}`}>
                Czytaj
            </ButtonRoute>
        </div>
    </Card>
);

export default function HomePage() {
    const sortedPosts = getAllPosts();
    const [mainPost, ...posts] = sortedPosts;

    return (
        <>
            <HeroWithVisual
                image={`/assets/posts/${mainPost.photo}`}
                alt={mainPost.title}
                pill="Najnowszy wpis"
                description={mainPost.excerpt}
            >
                <KickerLight>Aktualności</KickerLight>
                <h1>{mainPost.title}</h1>
                <Actions>
                    <ButtonRoute primary href={`/artykul/${mainPost.alias}`}>
                        Czytaj więcej
                    </ButtonRoute>
                    <ButtonRoute href="/trasa">
                        Zobacz trasę
                    </ButtonRoute>
                </Actions>
            </HeroWithVisual>

            <Section>
                <SectionHead
                    action={
                        <ButtonRoute href="/artykuly">
                            Zobacz wszystkie artykuły
                        </ButtonRoute>
                    }
                >
                    <>
                        <Kicker>Najnowsze informacje</Kicker>
                        <h2>Wiadomości dla zawodników</h2>
                    </>
                </SectionHead>
                <div className="grid grid-cols-3 gap-[18px] max-[1024px]:grid-cols-2 max-[760px]:grid-cols-1">
                    {posts.slice(0, 3).map(article => (
                        <ArticleCard key={article.alias} article={article} />
                    ))}
                </div>
            </Section>

            <Section>
                <SectionHead>
                    <>
                        <Kicker>Rura na Kocierz 2026</Kicker>
                        <h2>Najważniejsze dane</h2>
                    </>
                </SectionHead>
                <div className="grid grid-cols-3 gap-3.5 max-[760px]:grid-cols-1">
                    <StatCard label="Data" value="13.09.2026" />
                    <StatCard label="Miejsce" value="Łękawica + Kocierz" negative />
                    <StatCard label="Trasa" value="11 km" />
                </div>
            </Section>
        </>
    );
}
