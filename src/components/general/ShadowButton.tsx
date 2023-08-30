"use client";
import { signIn } from "next-auth/react";

interface ShadowButtonProps {
	text: string;
}

export function ShadowButton({ text }: ShadowButtonProps) {
	return (
		<>
			<div className={"md:my-14 my-8 w-fit"}>
				<div
					className={
						"rounded text-white cursor-pointer font-bold text-3xl md:text-5xl transition-transform active:scale-95 hover:scale-125 shadow-box-bg-accent-shadow shadow-box-color-accent-white shadow-box "
					}
					onClick={() => {
						signIn("spotify", {
							redirect: true,
							callbackUrl: `${process.env.APP_URL}/dashboard`,
						});
					}}>
					{text}
				</div>
			</div>
		</>
	);
}
