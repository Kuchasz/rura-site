import { Metadata } from "next";
import Link from "next/link";
import { PostDetails } from "../../components/post-details";
import { getAllPosts } from "../../lib/mdx";

export const metadata: Metadata = {
    title: "Wszystkie artykuły",
};

export default function AllPostsPage() {
    const sortedPosts = getAllPosts();

    return (
        <div className="flex w-full relative justify-center overflow-hidden">
            <div className="w-full my-12 max-w-6xl flex flex-col items-start justify-center px-4">
                <h1 className="text-3xl font-bold mb-8">Wszystkie artykuły</h1>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sortedPosts.map(sp => (
                        <Link className="w-full" key={sp.alias} href={`artykul/${sp.alias}`}>
                            <div className="cursor-pointer flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                <div className="relative w-full h-64">
                                    <img
                                        src={`/assets/posts/${sp.photo}`}
                                        alt={sp.title}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="p-6 flex flex-col">
                                    <div className="font-semibold text-xl uppercase mb-2">{sp.title}</div>
                                    <h4 className="text-gray-600 mb-4">{sp.excerpt}</h4>
                                    <PostDetails date={new Date(sp.date)} author={sp.author} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
} 