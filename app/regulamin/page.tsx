export const dynamic = "force-static";

export default function Regulamin() {
    return (
        <div className="flex h-full p-16 flex-1 items-center justify-center">
            <a
                className="bg-zinc-200 hover:bg-zinc-300"
                target="_blank"
                href="https://dostartu.pl/statute_files/6591_pl.pdf"
            >
                <h2 className="text-3xl p-12">Kliknij aby pobrać regulamin</h2>
            </a>
        </div>
    );
}
