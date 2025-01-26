import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { getWebsiteTitle } from "./data";
import "./globals.css";

export const metadata: Metadata = {
    title: await getWebsiteTitle(),
};

export const viewport: Viewport = {
    themeColor: [{
        media: "(prefers-color-scheme: light)",
        color: "#0C1118" // TODO: FIX
    }, {
        media: "(prefers-color-scheme: dark)",
        color: "#0C1118"
    }]
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
            <head>
                <script dangerouslySetInnerHTML={{ __html:
                    `(function() {
                        function setTheme(theme) {
                            if(theme === "dark") document.documentElement.classList.add("dark");
                            else document.documentElement.classList.remove("dark");
                        }
                        
                        function systemQueryHandler(event) {
                            if(localStorage.getItem("theme") === null)
                                setTheme(event.matches ? "dark" : "light");
                        }
                        
                        let preferredTheme = localStorage.getItem("theme");
                        if(preferredTheme === null) {
                            let systemDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");
                            systemQueryHandler(systemDarkQuery);
                            systemDarkQuery.addEventListener("change", systemQueryHandler);
                        } else {
                            setTheme(preferredTheme);
                        }
                    })();`
                }} />
            </head>
            <body className="bg-bg-dark text-main font-inter">
                {children}
            </body>
        </html>
    );
}
