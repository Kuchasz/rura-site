import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../env/server.mjs";

export default async (_: NextApiRequest, res: NextApiResponse) => {

    const result = await fetch(`${env.REGISTRATION_API_URL}${env.REGISTRATION_API_NAME}/teams`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apiKey: env.REGISTRATION_API_KEY
        })
    });

    if(result.status !== 200){
        res.status(500).send('Error occured');
    }

    const data = await result.json();

    res.json(data);
}