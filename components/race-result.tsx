"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

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
        RRRSlangItems?: unknown;
    }
}

const raceResultEventId = 403640;
const raceResultBaseUrl = "https://my.raceresult.com";
const raceResultLang = "pl";
const raceResultPublishScripts = [
    "/RRPublish/RRPublish.js",
    "/event/RRLib.js",
    "/event/participantview/ParticipantView.js",
    "/event/viewelements/CertificatesElement.js",
    "/event/viewelements/CommentsElement.js",
    "/event/viewelements/LegsElement.js",
    "/event/viewelements/LinksElement.js",
    "/event/viewelements/ListElement.js",
    "/event/viewelements/PhotosElement.js",
    "/event/viewelements/SplitsElement.js",
    "/event/viewelements/BoxElement.js",
    "/event/viewelements/HTMLElement.js",
    "/event/viewelements/TextElement.js",
    "/event/viewelements/FieldElement.js",
    "/event/viewelements/ColumnsElement.js",
    "/event/viewelements/FlexBoxElement.js",
    "/event/viewelements/InlineBlockElement.js",
    "/event/viewelements/FavoriteElement.js",
    "/event/viewelements/PictureElement.js",
];
const requiredRaceResultPublishScripts = [
    "lang",
    "/RRPublish/RRPublish.js",
    "/event/RRLib.js",
];

export function RegistrationEmbed() {
    const containerRef = useRef<HTMLDivElement>(null);
    const initializedRef = useRef(false);
    const scriptReadyRef = useRef({
        main: false,
        lang: false,
    });
    const [scriptReady, setScriptReady] = useState(false);

    const initializeRegistration = useCallback(() => {
        if (
            !containerRef.current ||
            !window.RRRegStart2 ||
            !window.RRRSlangItems ||
            !scriptReadyRef.current.main ||
            !scriptReadyRef.current.lang ||
            initializedRef.current
        ) {
            return;
        }

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
        setScriptReady(true);
    }, []);

    const markScriptReady = useCallback((script: "main" | "lang") => {
        scriptReadyRef.current[script] = true;
        initializeRegistration();
    }, [initializeRegistration]);

    return (
        <>
            <link rel="stylesheet" href={`${raceResultBaseUrl}/RRRegStart/style.css`} />
            <Script
                src={`${raceResultBaseUrl}/RRRegStart/lang.js?lang=${raceResultLang}`}
                strategy="afterInteractive"
                onLoad={() => markScriptReady("lang")}
                onReady={() => markScriptReady("lang")}
            />
            <Script
                src={`${raceResultBaseUrl}/RRRegStart/RRRegStart.js`}
                strategy="afterInteractive"
                onLoad={() => markScriptReady("main")}
                onReady={() => markScriptReady("main")}
            />
            <div className="min-h-[360px]">
                {!scriptReady ? (
                    <div className="flex min-h-[220px] items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-50 px-6 text-center text-sm font-semibold uppercase tracking-wider text-gray-500">
                        Ładowanie formularza zapisów
                    </div>
                ) : null}
                <div ref={containerRef} id="divRRRegStart" className="RRRegStart" />
            </div>
        </>
    );
}

export function ParticipantsEmbed() {
    const containerRef = useRef<HTMLDivElement>(null);
    const initializedRef = useRef(false);
    const participantsRef = useRef<InstanceType<NonNullable<typeof window.RRPublish2>> | null>(null);
    const loadedScriptsRef = useRef(new Set<string>());
    const [scriptsLoaded, setScriptsLoaded] = useState(false);

    useEffect(() => {
        if (
            !scriptsLoaded ||
            !containerRef.current ||
            !window.RRPublish2 ||
            initializedRef.current
        ) {
            return;
        }

        const timeout = window.setTimeout(() => {
            if (!containerRef.current || !window.RRPublish2 || initializedRef.current) {
                return;
            }

            participantsRef.current = new window.RRPublish2(
                containerRef.current,
                raceResultEventId,
                raceResultBaseUrl,
                raceResultLang,
                "participants"
            );
            participantsRef.current.ShowTimerLogo = true;
            participantsRef.current.ShowInfoText = false;
            initializedRef.current = true;
        }, 100);

        return () => window.clearTimeout(timeout);
    }, [scriptsLoaded]);

    const markScriptReady = useCallback((script: string) => {
        loadedScriptsRef.current.add(script);
        if (requiredRaceResultPublishScripts.every(required => loadedScriptsRef.current.has(required))) {
            setScriptsLoaded(true);
        }
    }, []);

    return (
        <>
            <link rel="stylesheet" href={`${raceResultBaseUrl}/RRPublish/style.css`} />
            <link rel="stylesheet" href={`${raceResultBaseUrl}/event/participantview/style.css`} />
            <link rel="stylesheet" href={`${raceResultBaseUrl}/event/viewelements/style.css`} />
            <Script
                src={`${raceResultBaseUrl}/RRPublish/lang.js?lang=${raceResultLang}`}
                strategy="afterInteractive"
                onLoad={() => markScriptReady("lang")}
                onReady={() => markScriptReady("lang")}
            />
            {raceResultPublishScripts.map(script => (
                <Script
                    key={script}
                    src={`${raceResultBaseUrl}${script}`}
                    strategy="afterInteractive"
                    onLoad={() => markScriptReady(script)}
                    onReady={() => markScriptReady(script)}
                />
            ))}
            <div className="min-h-[280px]">
                {!scriptsLoaded ? (
                    <div key="participants-loader" className="flex min-h-[180px] items-center justify-center rounded-lg border border-dashed border-stone-300 bg-stone-50 px-6 text-center text-sm font-semibold uppercase tracking-wider text-gray-500">
                        Ładowanie listy zapisanych
                    </div>
                ) : null}
                <div key="participants-embed" ref={containerRef} id="divRRPublish" className="RRPublish" />
            </div>
        </>
    );
}
