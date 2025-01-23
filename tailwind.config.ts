import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            "transparent": "transparent",
            "current": "currentColor",
            
            "bg-dark": "#0F1314",
            "bg-mid": "#171B1C",
            
            "main": "#EFF8FA",
            "sub": "#808889",
            "highlight": "#3F8071"
        },
        fontFamily: {
            "inter": ["var(--font-inter)"],
            "mono": ["var(--font-mono)"]
        }
    },
    plugins: [],
} satisfies Config;
