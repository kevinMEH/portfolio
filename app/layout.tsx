import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { getWebsiteTitle } from "./data";
import "./globals.css";

export const metadata: Metadata = {
    title: await getWebsiteTitle(),
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
            <body className="bg-bg-dark text-main font-inter">
                {children}
            </body>
        </html>
    );
}
