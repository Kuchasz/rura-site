import { getTerms } from "@/set-api";

export const dynamic = "force-static";

export default async function Regulamin() {
    const { status, data } = await getTerms();

    if (status === 'success') {
        return (
            <div className="flex h-full p-16 flex-1 items-center justify-center">
                <a
                    className="bg-zinc-200 hover:bg-zinc-300"
                    target="_blank"
                    href={data!.termsUrl}
                >
                    <h2 className="text-3xl p-12">Kliknij aby pobrać regulamin</h2>
                </a>
            </div>
        );
    }
    
    return (
        <div className="flex h-full p-16 flex-1 items-center justify-center">
            <h2 className="text-3xl p-12">Nie udało się pobrać regulaminu</h2>
        </div>
    );
}
