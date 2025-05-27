import { getRegistrationStatus } from "../../set-api";
import { RegistrationClientComponent } from "./registration-client";

async function getRegistrationSystemStatus() {
    const status = await getRegistrationStatus();
    return status.status;
}

export default async function RegistrationPage() {
    const registrationSystemStatus = await getRegistrationSystemStatus();
    
    return <RegistrationClientComponent registrationSystemStatus={registrationSystemStatus} />;
}

export const metadata = {
    title: "Rejestracja",
}; 