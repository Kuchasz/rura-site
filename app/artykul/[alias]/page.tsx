import { PostDetails } from "../../../components/post-details";
import { getPostByAlias } from "../../../lib/mdx";
import { Slogan } from "../../../components/slogan";
import { notFound } from "next/navigation";
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { useMDXComponents } from '../../../components/mdx-components'
import { Section } from "../../../components/design";

// Force dynamic rendering to avoid React 19 SSR issues with embedded content
export const dynamic = 'force-dynamic';

interface Props {
    params: Promise<{
        alias: string;
    }>;
}

export default async function ArticlePage({ params }: Props) {
    const { alias } = await params;
    const post = getPostByAlias(alias);

    if (!post) {
        notFound();
    }

    const components = useMDXComponents({});

    return (
        <>
            <Slogan {...post} photo={`/assets/posts/${post.photo}`} />
            <Section>
                <h2>{post.title}</h2>
                <PostDetails date={new Date(post.date)} author={post.author} />
                <div className="mt-8 max-w-prose text-base font-normal leading-normal text-gray-900 [&_a]:font-semibold [&_a]:text-orange-600 [&_a]:underline-offset-2 [&_a:hover]:underline [&_iframe]:rounded-xl [&_img]:rounded-xl [&_li+li]:mt-2 [&_ol]:my-4 [&_ol]:pl-5 [&_p]:mb-4 [&_p]:mt-0 [&_ul]:my-4 [&_ul]:pl-5">
                    <MDXRemote
                        source={post.content}
                        components={components}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm],
                            },
                        }}
                    />
                </div>
            </Section>
        </>
    );
}

export async function generateMetadata({ params }: Props) {
    const { alias } = await params;
    const post = getPostByAlias(alias);
    
    if (!post) {
        return {
            title: "Article Not Found",
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
    };
}

// Remove static generation to avoid React 19 prerendering issues
// export async function generateStaticParams() {
//     return posts.map((post) => ({
//         alias: post.alias,
//     }));
// } 
