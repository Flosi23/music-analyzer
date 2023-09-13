import { Outfit, Roboto_Mono } from "next/font/google";
import React, { PropsWithChildren } from "react";

export const outfit = Outfit({
	subsets: ["latin"],
	display: "swap",
});

export const roboto_mono = Roboto_Mono({
	subsets: ["latin"],
	display: "swap",
});

export default function FontProvider({ children }: PropsWithChildren) {
	return (
		<>
			<style jsx global>
				{`
					:root {
						--roboto-mono-font: ${roboto_mono.style.fontFamily};
						--outfit-font: ${outfit.style.fontFamily};
					}
				`}
			</style>
			{children}
		</>
	);
}
