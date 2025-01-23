import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
    title: "Portfolio | Kevin Liao",
};

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
        <html lang="en" className={`${inter.variable} ${mono.variable}`}>
            <body className="bg-bg-dark text-main font-inter">
                {children}
            </body>
        </html>
    );
}
