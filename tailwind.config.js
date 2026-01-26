/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#009999",
                "background-light": "#f7f7f7",
                "background-dark": "#1a1a1a",
                "charcoal": "#4F5B69",
                "premium-bronze": "#B8860B"
            },
            fontFamily: {
                "display": ["Manrope", "sans-serif"]
            }
        },
    },
    plugins: [],
}
