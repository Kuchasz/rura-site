'use client';
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";

// If you want you can use SCSS instead of css
import "lightgallery/scss/lg-zoom.scss";
import "lightgallery/scss/lightgallery.scss";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

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
        <div className="flex p-4 flex-col items-center">
            <h1 className="text-4xl text-center font-bold my-10">{directory.title}</h1>
            <h2 className="text-xl text-center text-zinc-500 mb-10">{directory.description}</h2>
            <div className="w-full flex flex-wrap justify-center">
                <LightGallery
                    mobileSettings={{ download: true, showCloseIcon: true }}
                    elementClassNames="w-full flex flex-wrap justify-center"
                    plugins={[lgThumbnail, lgZoom]}
                >
                    {directory.items.map(i => (
                        <a
                            className="gallery-item block hover:opacity-50 h-24 w-24 md:h-48 md:w-48 cursor-pointer m-1 md:m-3 relative"
                            href={i.big}
                            key={i.big}
                            data-src={i.big}
                            data-download-url={i.full}
                        >
                            <img 
                                className="border rounded-md object-cover" 
                                src={i.thumb} 
                                alt="Photo thumbnail"
                                
                                sizes="(max-width: 768px) 96px, 192px"
                            />
                        </a>
                    ))}
                </LightGallery>
            </div>
        </div>
    );
};

export default Photos;
