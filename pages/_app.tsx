import Layout from "../components/layout";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import "../globals.scss";
import type { NextPage } from "next";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout; // ?? ((page) => page);

    return getLayout ? (
        getLayout(<Component {...pageProps} />)
    ) : (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
