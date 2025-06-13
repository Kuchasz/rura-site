import Link from "next/link";

export type SloganProps = {
    photo: string;
    title: string;
    excerpt: string;
    link?: string;
    linkText?: string;
};

export const Slogan = ({ photo, title, excerpt, link, linkText }: SloganProps) => (
    <div className="flex w-full h-128 uppercase text-white bg-center bg-contain relative justify-center overflow-hidden">
        <img
            src={photo}
            alt={title}

            className="object-cover absolute object-center brightness-50 w-full h-full"
            style={{ zIndex: -2 }}

            sizes="100vw"
        />
        <div className="w-full max-w-6xl flex drop-shadow-3xl p-4 flex-col items-center md:items-start justify-center">
            <div className="text-center md:text-left text-5xl font-semibold">{title}</div>
            <span className="my-4 font-semibold">{excerpt}</span>
            {link && (
                <Link href={`artykul/${link}`}>
                    <span className="mt-4 text-sm transition-colors duration-500 cursor-pointer border-2 hover:bg-orange-500 hover:border-orange-500 font-semibold px-8 py-2 border-white rounded-md">
                        {linkText || "CZYTAJ WIĘCEJ"}
                    </span>
                </Link>
            )}
        </div>
    </div>
);
