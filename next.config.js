/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["i.scdn.co"],
	},
	env: {
		API_URL: process.env.API_URL,
		APP_URL: process.env.APP_URL,
	},
};

module.exports = nextConfig;
