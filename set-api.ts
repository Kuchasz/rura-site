"use server";

import { env } from "env/server.mjs";

export type RegistrationStates = 'down' | 'disabled' | 'enabled' | 'limit-reached';

type RegistrationStatus = {
    limit?: number,
    registered: number,
    raceName: string,
    raceDate: string,
    status: RegistrationStates
};

export const getRegistrationStatus = async () => {

    try {
        const result = await fetch(`${env.STOPRACE_API_URL}/registration-status`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apiKey: env.STOPRACE_API_KEY
            })
        });

        if (result.status !== 200) {
            return { status: 'down' as RegistrationStates } as const;
        }

        const data = await result.json() as RegistrationStatus;

        return { status: data.status } as const;
    } catch (e) {
        return { status: 'down' as RegistrationStates } as const;
    }
}

export const getRegisteredPlayers = async () => {

    try {
        const result = await fetch(`${env.STOPRACE_API_URL}/list`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apiKey: env.STOPRACE_API_KEY
            })
        });

        if (result.status !== 200) {
            return { status: 'failure', message: 'Error occured' } as const;
        }

        const data = await result.json();

        return { status: 'success', data: data as { name: string; lastName: string; team?: string; city?: string }[] } as const;

    } catch (e) {
        return { status: 'failure', message: 'Error occured' };
    }
}

export const getStartList = async () => {

    try {
        const result = await fetch(`${env.STOPRACE_API_URL}/start-list`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apiKey: env.STOPRACE_API_KEY
            })
        });

        if (result.status !== 200) {
            return { status: 'failure', message: 'Error occured' } as const;
        }

        const data = await result.json();

        return { status: 'success', data: data as { bibNumber: string; name: string; lastName: string; team?: string; city?: string; startTime: number; }[] } as const;

    } catch (e) {
        return { status: 'failure', message: 'Error occured' };
    }
}

export const getTerms = async () => {

    try {
        const result = await fetch(`${env.STOPRACE_API_URL}/terms`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apiKey: env.STOPRACE_API_KEY
            })
        });

        if (result.status !== 200) {
            return { status: 'failure', message: 'Error occured' } as const;
        }

        const data = await result.json();

        return { status: 'success', data: data as { termsUrl: string } } as const;

    } catch (e) {
        return { status: 'failure', message: 'Error occured' };
    }
}