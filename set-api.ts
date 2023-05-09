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
        const result = await fetch(`${env.REGISTRATION_API_URL}${env.REGISTRATION_API_NAME}/registration-status`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apiKey: env.REGISTRATION_API_KEY
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
        const result = await fetch(`${env.REGISTRATION_API_URL}${env.REGISTRATION_API_NAME}/list`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apiKey: env.REGISTRATION_API_KEY
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