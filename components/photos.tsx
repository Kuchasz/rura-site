"use client";
import { useState } from "react";
import { Kicker, Lead, Section } from "./design";
import Lightbox, { LightboxItem } from "./lightbox";

type Props = {
    directory: { dir: string; title: string; description: string; items: LightboxItem[] };
};

const Photos = ({ directory }: Props) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <Section>
            <div className="mb-10 text-center">
                <Kicker>Galeria</Kicker>
                <h1>{directory.title}</h1>
                <Lead className="mx-auto">{directory.description}</Lead>
            </div>
            <div className="w-full">
                <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
                    {directory.items.map((i, idx) => (
                        <a
                            className="gallery-item block aspect-square cursor-pointer overflow-hidden rounded-xl border border-stone-200 bg-white shadow-[0_1px_0_rgb(17_24_39_/_0.04)] transition-all duration-[180ms] hover:-translate-y-px hover:shadow-[0_10px_24px_rgb(17_24_39_/_0.10)]"
                            href={i.big}
                            key={i.big}
                            onClick={e => {
                                e.preventDefault();
                                setOpenIndex(idx);
                            }}
                        >
                            <img
                                className="h-full w-full object-cover"
                                src={i.thumb}
                                alt=""
                                loading="lazy"
                                sizes="(max-width: 768px) 96px, 192px"
                            />
                        </a>
                    ))}
                </div>
                <Lightbox
                    items={directory.items}
                    index={openIndex}
                    onClose={() => setOpenIndex(null)}
                    onChange={setOpenIndex}
                />
            </div>
        </Section>
    );
};

export default Photos;
