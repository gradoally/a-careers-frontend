import type {Config} from "tailwindcss";

const config: Config = {
    darkMode: 'class',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        screens: {
            "sm": "640px",
            "md": "768px",
            "lg": "1024px",
            "xl": "1280px",
            "sml": {"max": "640px"},
            "mdl": {"max": "768px"},
            "lgl": {"max": "1024px"},
            "xll": {"max": "1280px"},
            "tablet": {"max": "768px"},
            "laptop": {"max": "1024px"},
            "desktop": {"max": "1280px"},
        },

        extend: {
            fontFamily: {
                sans: ['var(--font-inter)'],
            },
        },
    },
    plugins: [],
};
export default config;
