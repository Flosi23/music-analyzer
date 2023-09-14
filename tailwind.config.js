import daisyui from "daisyui";
import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				"roboto-mono": ["var(--roboto-mono-font)", ...fontFamily.sans],
				outfit: ["var(--outfit-font)", ...fontFamily.sans],
			},
			fontSize: {
				"10xl": "10rem",
			},
			plugins: [daisyui],
			colors: {
				white: "rgb(var(--white) / <alpha-value>)",
				black: "rgb(var(--black) / <alpha-value>)",
				primary: "rgb(var(--primary) / <alpha-value>)",
				"on-primary": "rgb(var(--on-primary) / <alpha-value>)",
				"primary-container":
					"rgb(var(--primary-container) / <alpha-value>)",
				"primary-container-low":
					"rgb(var(--primary-container-low) / <alpha-value>)",
				"on-primary-container":
					"rgb(var(--on-primary-container) / <alpha-value>)",
				secondary: "rgb(var(--secondary) / <alpha-value>)",
				"on-secondary": "rgb(var(--on-secondary) / <alpha-value>)",
				"secondary-container":
					"rgb(var(--secondary-container) / <alpha-value>)",
				"on-secondary-container":
					"rgb(var(--on-secondary-container) / <alpha-value>)",
				"surface-dim": "rgb(var(--surface-dim) / <alpha-value>)",
				surface: "rgb(var(--surface) / <alpha-value>)",
				"surface-container":
					"rgb(var(--surface-container) / <alpha-value>)",
				"on-surface": "rgb(var(--on-surface) / <alpha-value>)",
			},
		},
	},
};
