import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
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
        <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning={true}>
            <head><Meta/></head>
            <body className="bg-bg-dark text-main font-inter">
                {children}
            </body>
        </html>
    );
}
