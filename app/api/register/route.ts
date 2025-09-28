import { NextRequest, NextResponse } from "next/server";
import { env } from "../../../env/server.mjs";

export async function POST(req: NextRequest) {
    try {
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
            icePhoneNumber
        } = await req.json();

        const result = await fetch(`${env.STOPRACE_API_URL}/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apiKey: env.STOPRACE_API_KEY,
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
        });

        if (result.status !== 200) {
            const text = await result.text();
            return NextResponse.json({ error: text }, { status: 500 });
        }

        return NextResponse.json({ message: 'ok' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 