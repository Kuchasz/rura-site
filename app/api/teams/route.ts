import { NextRequest, NextResponse } from "next/server";
import { env } from "../../../env/server.mjs";

export async function POST(_: NextRequest) {
    try {
        const result = await fetch(`${env.REGISTRATION_API_URL}${env.REGISTRATION_API_NAME}/teams`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                apiKey: env.REGISTRATION_API_KEY
            })
        });

        if (result.status !== 200) {
            return NextResponse.json({ error: 'Error occurred' }, { status: 500 });
        }

        const data = await result.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 