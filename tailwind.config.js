import daisyui from "daisyui";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontSize: {
				title: "10rem",
			},
			spacing: {
				"box-normal": "80rem",
				sm: "0.7rem",
				md: "1.1rem",
				lg: "1.5rem",
				xl: "10rem",
			},
			height: {
				"10v": "10vh",
				"13v": "13vh",
				"15v": "15vh",
				"20v": "20vh",
				"30v": "30vh",
				"40v": "40vh",
				"50v": "50vh",
				"60v": "60vh",
				"70v": "70vh",
				"80v": "80vh",
				"90v": "90vh",
				"100v": "100vh",
			},
			width: {
				"65p": "65%",
				"70p": "70%",
			},
			fontFamily: {
				"roboto-mono": ["var(--roboto-mono-font)", ...fontFamily.sans],
				outfit: ["var(--outfit-font)", ...fontFamily.sans],
			},
			colors: {
				"accent-dark": "#000026",
				"accent-shadow": "var(--accent-shadow)",
				"accent-shadow-hover": "#5010D1",
				"accent-white": "var(--accent-white)",
				"accent-box": "#8075FF",
				"accent-shadow-ring": "#7B40F1",
				accent: {
					50: "#f3f2ff",
					100: "#eae7ff",
					200: "#d7d1ff",
					300: "#baadff",
					400: "#997eff",
					500: "#784bff",
					600: "#6926ff",
					700: "#6320ee",
					800: "#4b10c7",
					900: "#3f0fa3",
					950: "#24066f",
				},
			},
		},
	},
	plugins: [
		plugin(function ({ matchUtilities, addUtilities, theme }) {
			matchUtilities(
				{
					"shadow-box-color": (value) => ({
						"--shadow-box-color": value,
					}),
				},
				{
					values: { ...theme("colors"), ...theme("colors.accent") },
				},
			);

			matchUtilities(
				{
					"shadow-box-bg": (value) => ({
						"--shadow-box-bg": value,
					}),
				},
				{
					values: { ...theme("colors"), ...theme("colors.accent") },
				},
			);

			matchUtilities(
				{
					"shadow-box": (value) => ({
						"--shadow-box-offset": value,
						"box-shadow":
							"var(--shadow-box-offset) var(--shadow-box-offset) 0 0 var(--shadow-box-color);",
						padding: "var(--shadow-box-offset);",
						"margin-right": "var(--shadow-box-offset);",
						"margin-bottom": "var(--shadow-box-offset);",
						"background-color": "var(--shadow-box-bg);",
						"@apply rounded-xl": {},
					}),
				},
				{
					values: theme("space"),
				},
			);
			addUtilities({
				".shadow-box": {
					"--shadow-box-offset": "1.5rem",
					"box-shadow":
						"var(--shadow-box-offset) var(--shadow-box-offset) 0 0 var(--shadow-box-color);",
					padding: "var(--shadow-box-offset);",
					"margin-right": "var(--shadow-box-offset);",
					"margin-bottom": "var(--shadow-box-offset);",
					"background-color": "var(--shadow-box-bg);",
					"@apply rounded-xl": {},
				},
			});

			addUtilities({
				".shadow-box-color": {
					"--shadow-box-color": "var(--accent-shadow)",
				},
			});

			addUtilities({
				".shadow-box-bg": {
					"--shadow-box-bg": theme("colors.accent-white"),
				},
			});
		}),
		daisyui,
	],
	daisyui: {
		themes: [
			"dark",
			{
				songpreview: {
					accent: "#F8F0FB",
				},
			},
		],
	},
};
