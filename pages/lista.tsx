import { Table } from "components/table";
import Head from "next/head";
import React from "react";
import { RegistrationStates, getRegisteredPlayers, getRegistrationStatus } from "set-api";

const getName = (name: string, lastName: string) => `${name} ${lastName}`;
const getCompactName = (name: string, lastName: string) => `${name.slice(0, 1)}. ${lastName}`;

const headers = [<div>Lp.</div>, <div>Zawodnik</div>, <div className="hidden md:block">Miejscowość</div>, <div>Klub</div>];

const Lista = ({
    registrationSystemStatus,
    registeredPlayers,
}: {
    registrationSystemStatus: RegistrationStates;
    registeredPlayers: { name: string; lastName: string; team?: string; city?: string }[];
}) => {
    const result = registeredPlayers.map((r, i) => ({ ...r, i: i + 1 }));
    type ItemsType = (typeof result)[0];

    return (
        <>
            <Head>
                <title>Lista zawodników</title>
            </Head>
            <div className="flex h-full py-16 flex-1 items-center justify-center">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Lista zawodników</h1>
                    <h2>Ostateczna lista zawodników zawierająca numery startowe i godziny startu pojawi się 11.05.</h2>
                    {registrationSystemStatus !== "down" ? (
                        <Table headers={headers} getKey={p => p.name + p.lastName} rows={result}>
                            <Table.Item render={(r: ItemsType) => <div>{r.i}</div>}></Table.Item>
                            <Table.Item
                                render={(r: ItemsType) => (
                                    <>
                                        <div className="hidden font-semibold sm:block">{getName(r.name, r.lastName)}</div>
                                        <div className="block font-semibold sm:hidden">{getCompactName(r.name, r.lastName)}</div>
                                    </>
                                )}
                            ></Table.Item>
                            <Table.Item render={(r: ItemsType) => <div className="hidden md:block">{r.city}</div>}></Table.Item>
                            <Table.Item render={(r: ItemsType) => <div>{r.team}</div>}></Table.Item>
                        </Table>
                    ) : (
                        <div>
                            <h2 className="mb-8">System rejestracji zawodników aktualnie jest niedostępny</h2>
                            <span>Spróbuj ponownie za jakiś czas. Prosimy o informację jeśli problem będzie się powtarzał.</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps() {
    const status = await getRegistrationStatus();

    const registeredPlayersPromise = status.status !== "down" ? getRegisteredPlayers() : null;

    const registeredPlayersResult = await registeredPlayersPromise;

    return {
        props: {
            registrationSystemStatus: status.status,
            registeredPlayers: registeredPlayersResult?.status === "success" ? registeredPlayersResult.data : [],
        },
    };
}

export default Lista;
