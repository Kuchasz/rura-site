import { PostDetails } from "../../../components/post-details";
import { getPostByAlias } from "../../../lib/mdx";
import { Slogan } from "../../../components/slogan";
import { notFound } from "next/navigation";
import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '../../../components/mdx-components'

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
        <div>
            <Slogan {...post} photo={`/assets/posts/${post.photo}`} />
            <div className="flex w-full bg-zinc-200 justify-center">
                <div className="max-w-6xl my-14">
                    <div className="bg-white border border-gray-300 rounded-sm p-10">
                        <h2 className="text-2xl uppercase font-semibold">{post.title}</h2>
                        <PostDetails date={new Date(post.date)} author={post.author} />
                        <div className="prose prose-lg max-w-none">
                            <MDXRemote source={post.content} components={components} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
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