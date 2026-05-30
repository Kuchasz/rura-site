import { Table } from "../../components/table";
import React from "react";
import { Kicker, Panel, Section } from "../../components/design";
import { RegistrationStates, getRegisteredPlayers, getRegistrationStatus } from "../../set-api";

const getName = (name: string, lastName: string) => `${name} ${lastName}`;
const getCompactName = (name: string, lastName: string) => `${name.slice(0, 1)}. ${lastName}`;

const headers = [
    <div key="lp">Lp.</div>,
    <div key="zawodnik">Zawodnik</div>,
    <div key="miejscowosc" className="hidden md:block">
        Miejscowość
    </div>,
    <div key="klub">Klub</div>,
    <div key="oplacony">Opłacony</div>,
];

interface Props {
    registrationSystemStatus: RegistrationStates;
    registeredPlayers: { name: string; lastName: string; team?: string; city?: string; hasPaid: boolean }[];
}

const Lista = ({ registrationSystemStatus, registeredPlayers }: Props) => {
    const result = registeredPlayers.map((r, i) => ({ ...r, i: i + 1 }));
    type ItemsType = (typeof result)[0];

    return (
        <Section>
            <Panel>
                <Kicker>Lista</Kicker>
                <h1>Lista zapisanych zawodników</h1>
                <div className="mt-8 overflow-x-auto">
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
                            <Table.Item render={(r: ItemsType) => <div className="text-xs">{r.hasPaid ? <strong>Opłacony</strong> : "Niepłacony"}</div>}></Table.Item>
                        </Table>
                    ) : (
                        <div>
                            <h2 className="mb-8">System rejestracji zawodników aktualnie jest niedostępny</h2>
                            <span>Spróbuj ponownie za jakiś czas. Prosimy o informację jeśli problem będzie się powtarzał.</span>
                        </div>
                    )}
                </div>
            </Panel>
        </Section>
    );
};

async function getListaData() {
    const status = await getRegistrationStatus();
    const registeredPlayersPromise = status.status !== "down" ? getRegisteredPlayers() : null;
    const registeredPlayersResult = await registeredPlayersPromise;

    const playersWithPaymentStatus =
        registeredPlayersResult?.status === "success" && registeredPlayersResult.data
            ? registeredPlayersResult.data.map(player => ({ ...player, hasPaid: false }))
            : ([] as { name: string; lastName: string; team?: string; city?: string; hasPaid: boolean }[]);

    return {
        registrationSystemStatus: status.status,
        registeredPlayers: playersWithPaymentStatus,
    };
}

export default async function ListaPage() {
    const data = await getListaData();
    return <Lista {...data} />;
}

export const metadata = {
    title: "Lista zapisanych zawodników",
};
