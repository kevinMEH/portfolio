import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code, Barlow } from "next/font/google";
import { getWebsiteDescription, getWebsiteTitle } from "./data";
import "./globals.css";
import Meta from "./Meta";

export const metadata: Metadata = {
    title: await getWebsiteTitle(),
    description: await getWebsiteDescription()
};

export const viewport: Viewport = {
    themeColor: "#0C1118"
}

const title = Barlow({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    display: "block",
    variable: "--font-title"
})

const inter = Inter({
    subsets: ["latin"],
    display: "block",
    variable: "--font-inter"
});

const mono = Fira_Code({
    subsets: ["latin"],
    display: "block",
    variable: "--font-mono"
});

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`h-full ${inter.variable} ${mono.variable} ${title.variable}`} suppressHydrationWarning={true}>
            <head>
                <Meta/>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body className="bg-bg-dark text-main font-inter min-h-full h-full">
                {children}
            </body>
        </html>
    );
}
