import { Metadata } from "next";
import { Countdown } from "../components/countdown";
import { Actions, ButtonLink, ButtonRoute, Card, HeroWithVisual, Kicker, KickerLight, Lead, Section, SectionHead, Shell, StatCard } from "../components/design";
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
            <h3 className="mb-2.5">{article.title}</h3>
            <p className="mb-3.5 text-base leading-normal text-gray-500">{article.excerpt}</p>
            <ButtonRoute href={`/artykul/${article.alias}`}>
                Czytaj
            </ButtonRoute>
        </div>
    </Card>
);

export default function HomePage() {
    const sortedPosts = getAllPosts();
    const [mainPost, ...posts] = sortedPosts;
    const calendarParams = new URLSearchParams({
        action: "TEMPLATE",
        text: "Rura na Kocierz 2026",
        dates: "20260913/20260914",
        details: "Jazda indywidualna na czas Rura na Kocierz. Start w parku w Gminie Łękawica, meta pod Kocierz Resort. Więcej informacji na: https://rura.cc",
        location: "Łękawica + Kocierz",
    });
    const calendarUrl = `https://calendar.google.com/calendar/render?${calendarParams.toString()}`;

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
                        <h2>Najważniejsze informacje</h2>
                        <p className="mt-4 max-w-prose text-sm font-normal leading-normal text-gray-500">
                            Data, miejsce i trasa tegorocznej edycji w szybkim skrócie.
                        </p>
                    </>
                </SectionHead>
                <div className="grid grid-cols-3 gap-[18px] max-[760px]:grid-cols-1">
                    <StatCard label="Data" value="13.09.2026" className="min-h-[320px] p-[28px]">
                        <p>Piękna jesienna aura Beskidów gwarantowana</p>
                        <div className="mt-auto pt-7">
                            <ButtonLink className="w-full" href={calendarUrl} target="_blank" rel="noreferrer">
                                Dodaj do kalendarza
                            </ButtonLink>
                        </div>
                    </StatCard>
                    <StatCard label="Miejsce" value="Łękawica + Kocierz" negative className="min-h-[320px] p-[28px]">
                        <p>Startujemy w parku i finiszujemy na 7% podjeździe pod Kocierz Resort</p>
                        <div className="mt-auto grid gap-2.5 pt-7">
                            <ButtonLink className="w-full" primary href="https://kocierz.pl/" target="_blank" rel="noreferrer">
                                Kocierz Resort
                            </ButtonLink>
                            <ButtonLink className="w-full" href="https://lekawica.com.pl/" target="_blank" rel="noreferrer">
                                Gmina Łękawica
                            </ButtonLink>
                        </div>
                    </StatCard>
                    <StatCard label="Trasa" value="11 km" className="min-h-[320px] p-[28px]">
                        <p>Uzupełnione o 350m wzniosu i ulicę Widokową</p>
                        <div className="mt-auto pt-7">
                            <ButtonRoute className="w-full" href="/trasa">
                                Zobacz trasę
                            </ButtonRoute>
                        </div>
                    </StatCard>
                </div>
            </Section>

            <section className="border-y border-stone-200 bg-white py-12">
                <Shell>
                    <SectionHead>
                        <>
                            <Kicker>Start</Kicker>
                            <h2>Odliczanie do startu</h2>
                            <p className="mt-4 max-w-prose text-sm font-normal leading-normal text-gray-500">
                            Rura potoczy się w kierunku Kocierz Resort za:
                            </p>
                        </>
                    </SectionHead>
                    <Countdown targetDate="2026-09-13T11:00:00+02:00" />
                </Shell>
            </section>
        </>
    );
}
