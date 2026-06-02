import { ButtonRoute, Kicker, Shell } from "./design";

const videoUrl = "https://www.facebook.com/reel/1451767669241008/";
const videoWidth = 900;
const videoHeight = 506;

export function EditionVideo2025() {
    const src = `https://www.facebook.com/plugins/video.php?height=${videoHeight}&href=${encodeURIComponent(videoUrl)}&show_text=false&width=${videoWidth}&t=0`;

    return (
        <section className="rura-video-band relative isolate mb-[clamp(26px,5vw,56px)] mt-[clamp(52px,10vw,112px)] overflow-hidden bg-gray-950 py-[clamp(86px,11vw,148px)] text-white">
            <div className="rura-video-band-pattern absolute inset-0 -z-10 opacity-80" />
            <Shell className="grid justify-items-center text-center">
                <Kicker className="brightness-125">Edycja 2025</Kicker>
                <h2 className="text-white">Video</h2>
                <div className="mt-8 w-full max-w-4xl overflow-hidden rounded-lg border border-white/10 bg-black shadow-[0_22px_60px_rgb(0_0_0_/_0.48)]">
                    <div className="relative aspect-video">
                        <iframe
                            src={src}
                            title="Video podsumowanie Rury na Kocierz 2025"
                            className="absolute inset-0 h-full w-full"
                            style={{ border: "none", overflow: "hidden" }}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        />
                    </div>
                </div>
                <ButtonRoute className="mt-8 px-7" primary href="/artykul/podsumowanie-rura-2025">
                    Zobacz
                </ButtonRoute>
            </Shell>
        </section>
    );
}
