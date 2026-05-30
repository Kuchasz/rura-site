'use client';
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { Kicker, Lead, Section } from "./design";

type Item = {
    thumb: string;
    big: string;
    full: string;
};

type Props = {
    directory: { dir: string; title: string; description: string; items: Item[] };
};

const Photos = ({ directory }: Props) => {
    return (
        <Section>
            <div className="mb-10 text-center">
                <Kicker>Galeria</Kicker>
                <h1>{directory.title}</h1>
                <Lead className="mx-auto">{directory.description}</Lead>
            </div>
            <div className="w-full">
                <LightGallery
                    mobileSettings={{ download: true, showCloseIcon: true }}
                    elementClassNames="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3"
                    plugins={[lgThumbnail, lgZoom]}
                >
                    {directory.items.map(i => (
                        <a
                            className="gallery-item block aspect-square cursor-pointer overflow-hidden rounded-xl border border-stone-200 bg-white transition-opacity hover:opacity-75"
                            href={i.big}
                            key={i.big}
                            data-src={i.big}
                            data-download-url={i.full}
                        >
                            <img
                                className="h-full w-full object-cover"
                                src={i.thumb}
                                sizes="(max-width: 768px) 96px, 192px"
                            />
                        </a>
                    ))}
                </LightGallery>
            </div>
        </Section>
    );
};

export default Photos;
