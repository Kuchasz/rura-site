import { Table } from "components/table";
import Head from "next/head";
import React from "react";
import { RegistrationStates, getRegistrationStatus, getStartList } from "set-api";
import { formatTimeWithSec, sort } from "utils";

const getName = (name: string, lastName: string) => `${name} ${lastName}`;
const getCompactName = (name: string, lastName: string) => `${name.slice(0, 1)}. ${lastName}`;

const headers = [
    <div>Bib</div>,
    <div>Zawodnik</div>,
    <div className="hidden md:block">Miejscowość</div>,
    <div>Klub</div>,
    <div>Start</div>,
];

const ListaStartowa = ({
    registrationSystemStatus,
    registeredPlayers,
}: {
    registrationSystemStatus: RegistrationStates;
    registeredPlayers: { bibNumber: string; name: string; lastName: string; team?: string; city?: string; startTime: number }[];
}) => {
    const res = registeredPlayers.map((r, i) => ({ ...r, bibNumber: Number(r.bibNumber), i: i + 1 }));

    const result = sort(res, r => r.bibNumber);

    type ItemsType = (typeof result)[0];

    return (
        <>
            <Head>
                <title>Lista startowa</title>
            </Head>
            <div className="flex h-full py-16 flex-1 items-center justify-center">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Lista startowa zawodników</h1>
                    <h2>Lista startowa z numerami startowymi i wyznaczonymi godzinami startu.</h2>
                    {registrationSystemStatus !== "down" ? (
                        <Table headers={headers} getKey={p => p.bibNumber.toString()} rows={result}>
                            <Table.Item render={(r: ItemsType) => <div className="text-center">{r.bibNumber}</div>}></Table.Item>
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
                            <Table.Item
                                render={(r: ItemsType) => <div className="text-xs font-semibold">{formatTimeWithSec(r.startTime)}</div>}
                            ></Table.Item>
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

    const registeredPlayersPromise = status.status !== "down" ? getStartList() : null;

    const registeredPlayersResult = await registeredPlayersPromise;

    return {
        props: {
            registrationSystemStatus: status.status,
            registeredPlayers: registeredPlayersResult?.status === "success" ? registeredPlayersResult.data : [],
        },
    };
}

export default ListaStartowa;
