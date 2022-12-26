import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../env/server.mjs";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const {
        name,
        lastName,
        birthDate,
        gender,
        team,
        city,
        country,
        email,
        phoneNumber,
        icePhoneNumber } = req.body;

    const result = await fetch(`${env.REGISTRATION_API_URL}${env.REGISTRATION_API_NAME}/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apiKey: env.REGISTRATION_API_KEY,
            name,
            lastName,
            birthDate,
            gender,
            team,
            city,
            country,
            email,
            phoneNumber,
            icePhoneNumber
        })
    }).then(r => r.json());

    res.json(result);
}