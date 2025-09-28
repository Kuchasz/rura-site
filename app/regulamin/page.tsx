import { getTerms } from "@/set-api";

export const dynamic = "force-static";

export default async function Regulamin() {
    const { status, data } = await getTerms();

    if (status === 'success') {
        return (
            <div className="flex h-full p-16 flex-1 items-center justify-center">
                <a
                    className="bg-orange-700 hover:bg-orange-800 text-white px-8 py-4 rounded-lg shadow-lg transition-colors duration-200 font-medium"
                    target="_blank"
                    href={data!.termsUrl}
                >
                    Pobierz regulamin
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
