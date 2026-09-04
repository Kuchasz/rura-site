"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "./design";

declare global {
    interface Window {
        RRRegStart2?: new (element: HTMLElement, eventId: number, baseUrl: string, lang: string, mode: string) => {
            ShowTimerLogo: boolean;
            ShowInfoText: boolean;
        };
        RRPublish2?: new (
            element: HTMLElement,
            eventId: number,
            baseUrl: string,
            lang: string,
            mode: string,
            listName?: string,
            viewName?: string,
            showError?: boolean
        ) => {
            ShowTimerLogo: boolean;
            ShowInfoText: boolean;
        };
    }
}

const raceResultEventId = 403640;
const raceResultBaseUrl = "https://my.raceresult.com";
const raceResultLang = "pl";
const raceResultLoadTimeout = 15_000;
const raceResultUrls = {
    registration: `${raceResultBaseUrl}/${raceResultEventId}/registration?lang=${raceResultLang}`,
    participants: `${raceResultBaseUrl}/${raceResultEventId}/participants?lang=${raceResultLang}`,
};
const raceResultAssets = {
    registrationScript: `${raceResultBaseUrl}/RRRegStart/RRRegStart.js?lang=${raceResultLang}`,
    registrationStyle: `${raceResultBaseUrl}/RRRegStart/style.css`,
    publishScript: `${raceResultBaseUrl}/RRPublish/RRPublish.js?lang=${raceResultLang}`,
    publishStyle: `${raceResultBaseUrl}/RRPublish/style.css`,
    componentsScript: `${raceResultBaseUrl}/RRComponents/RRLib.js?lang=${raceResultLang}`,
    componentsStyle: `${raceResultBaseUrl}/RRComponents/style.css`,
};

type EmbedStatus = "loading" | "ready" | "error";

function hasRaceResultError(container: HTMLElement) {
    return /loading config failed|failed to fetch|load failed|networkerror|timeout|error:/i.test(
        container.textContent ?? ""
    );
}

function isRaceResultLoading(container: HTMLElement) {
    const registrationLoader = container.querySelector<HTMLElement>("#divLoading");

    return (
        container.classList.contains("Loading") ||
        (registrationLoader !== null && registrationLoader.style.display !== "none")
    );
}

function useEmbedHealth(containerRef: React.RefObject<HTMLDivElement | null>) {
    const [status, setStatus] = useState<EmbedStatus>("loading");

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const checkEmbed = () => {
            if (hasRaceResultError(container)) {
                setStatus("error");
            } else if (container.childElementCount > 0 && !isRaceResultLoading(container)) {
                setStatus("ready");
            }
        };
        const observer = new MutationObserver(checkEmbed);
        observer.observe(container, {
            attributes: true,
            attributeFilter: ["class", "style"],
            childList: true,
            subtree: true,
        });

        const timeout = window.setTimeout(() => {
            setStatus(current => current === "ready" ? current : "error");
        }, raceResultLoadTimeout);

        checkEmbed();

        return () => {
            observer.disconnect();
            window.clearTimeout(timeout);
        };
    }, [containerRef]);

    return { status, setStatus };
}

function EmbedPlaceholder({
    status,
    label,
    fallbackUrl,
    fallbackLabel,
}: {
    status: EmbedStatus;
    label: string;
    fallbackUrl: string;
    fallbackLabel: string;
}) {
    if (status === "ready") {
        return null;
    }

    if (status === "error") {
        return (
            <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-orange-300 bg-orange-50 px-6 py-8 text-center">
                <div>
                    <p className="font-semibold text-gray-900">Nie udało się załadować treści z Race Result.</p>
                    <p className="mt-1 text-sm text-gray-600">Otwórz ją bezpośrednio w serwisie Race Result.</p>
                </div>
                <ButtonLink primary href={fallbackUrl} target="_blank" rel="noopener noreferrer">
                    {fallbackLabel}
                </ButtonLink>
            </div>
        );
    }

    return (
        <div className="flex min-h-[220px] items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-50 px-6 text-center text-sm font-semibold uppercase tracking-wider text-gray-500">
            {label}
        </div>
    );
}

export function RegistrationEmbed() {
    const containerRef = useRef<HTMLDivElement>(null);
    const initializedRef = useRef(false);
    const { status, setStatus } = useEmbedHealth(containerRef);

    const initializeRegistration = useCallback(() => {
        if (
            !containerRef.current ||
            !window.RRRegStart2 ||
            initializedRef.current
        ) {
            return;
        }

        try {
            const registration = new window.RRRegStart2(
                containerRef.current,
                raceResultEventId,
                raceResultBaseUrl,
                raceResultLang,
                "registration"
            );
            registration.ShowTimerLogo = true;
            registration.ShowInfoText = false;
            initializedRef.current = true;
        } catch {
            setStatus("error");
        }
    }, [setStatus]);

    return (
        <>
            <link rel="stylesheet" href={raceResultAssets.registrationStyle} onError={() => setStatus("error")} />
            <Script
                src={raceResultAssets.registrationScript}
                strategy="afterInteractive"
                onLoad={initializeRegistration}
                onReady={initializeRegistration}
                onError={() => setStatus("error")}
            />
            <div className="min-h-[360px]">
                <EmbedPlaceholder
                    status={status}
                    label="Ładowanie formularza zapisów"
                    fallbackUrl={raceResultUrls.registration}
                    fallbackLabel="Przejdź do rejestracji"
                />
                <div className={status === "error" ? "hidden" : undefined}>
                    <div ref={containerRef} id="divRRRegStart" className="RRRegStart" />
                </div>
            </div>
        </>
    );
}

export function ParticipantsEmbed() {
    const containerRef = useRef<HTMLDivElement>(null);
    const initializedRef = useRef(false);
    const loadedScriptsRef = useRef(new Set<string>());
    const { status, setStatus } = useEmbedHealth(containerRef);

    const initializeParticipants = useCallback(() => {
        if (
            !containerRef.current ||
            !window.RRPublish2 ||
            loadedScriptsRef.current.size < 2 ||
            initializedRef.current
        ) {
            return;
        }

        try {
            const participants = new window.RRPublish2(
                containerRef.current,
                raceResultEventId,
                raceResultBaseUrl,
                raceResultLang,
                "participants",
                undefined,
                undefined,
                true
            );
            participants.ShowTimerLogo = true;
            participants.ShowInfoText = false;
            initializedRef.current = true;
        } catch {
            setStatus("error");
        }
    }, [setStatus]);

    const markScriptReady = useCallback((script: string) => {
        loadedScriptsRef.current.add(script);
        initializeParticipants();
    }, [initializeParticipants]);

    return (
        <>
            <link rel="stylesheet" href={raceResultAssets.componentsStyle} onError={() => setStatus("error")} />
            <link rel="stylesheet" href={raceResultAssets.publishStyle} onError={() => setStatus("error")} />
            <Script
                src={raceResultAssets.componentsScript}
                strategy="afterInteractive"
                onLoad={() => markScriptReady("components")}
                onReady={() => markScriptReady("components")}
                onError={() => setStatus("error")}
            />
            <Script
                src={raceResultAssets.publishScript}
                strategy="afterInteractive"
                onLoad={() => markScriptReady("publish")}
                onReady={() => markScriptReady("publish")}
                onError={() => setStatus("error")}
            />
            <div className="min-h-[280px]">
                <EmbedPlaceholder
                    status={status}
                    label="Ładowanie listy zapisanych"
                    fallbackUrl={raceResultUrls.participants}
                    fallbackLabel="Zobacz listę w Race Result"
                />
                <div className={status === "error" ? "hidden" : undefined}>
                    <div key="participants-embed" ref={containerRef} id="divRRPublish" className="RRPublish" />
                </div>
            </div>
        </>
    );
}
