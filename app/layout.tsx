import { Footer } from "../components/footer";
import { Header } from "../components/header";
import "../globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Aktualności",
  description: "Rura.cc - etapowy wyścig kolarski",
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon.ico", rel: "shortcut icon" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
    ],
    other: [
      { rel: "mask-icon", url: "/favicon/safari-pinned-tab.svg", color: "#000000" },
      { rel: "manifest", url: "/favicon/site.webmanifest" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  themeColor: "#000",
  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/favicon/browserconfig.xml",
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html className="w-full h-full" lang="pl">
      <body className="w-full h-full flex flex-col text-zinc-900">
        <Header />
        <main className="grow text-zinc-900">{children}</main>
        <Footer />
      </body>
    </html>
  );
} 