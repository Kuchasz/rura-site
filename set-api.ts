import { env } from "env/server.mjs";

export const getHealthCheck = async () => {

    try {
        const result = await fetch(`${env.REGISTRATION_API_URL}${env.REGISTRATION_API_NAME}/health-check`, {
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

        return { status: 'success', data } as const;
    } catch (e) {
        return { status: 'failure', message: 'Error occured' } as const;
    }
}