import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./custom/data.json"
    ],
    theme: {
        colors: {
            "transparent": "transparent",
            "current": "currentColor",
            
            "bg-dark": "#0F1314",
            "bg-mid": "#171B1C",
            
            "main": "#EFF8FA",
            "sub": "#B3BDC1",
        },
        fontFamily: {
            "inter": ["var(--font-inter)"],
            "mono": ["var(--font-mono)"]
        }
    },
    plugins: [],
} satisfies Config;
