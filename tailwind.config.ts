import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            container: {
                center: true,
            },
            colors: {
                primary: '#14b8a6',
                secondary: '#64748b',
                success: '#10b981',
                danger: '#ef4444',
                warning: '#f97316',
                info: '#0ea5e9',
                light: '#ffffff',
                dark: '#030712',
                muted: '#71717a'
            }
        },
    },
    plugins: [],
};
export default config;
