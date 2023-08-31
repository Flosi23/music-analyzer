"use client";
import { signIn, signOut } from "next-auth/react";

export default function ShadowButton() {
	return (
		<>
			<div className={"md:my-14 my-8 w-fit"}>
				<div
					className={
						"rounded text-white cursor-pointer font-bold text-3xl md:text-5xl transition-transform active:scale-95 hover:scale-125 shadow-box-bg-accent-shadow shadow-box-color-accent-white shadow-box "
					}
					onClick={() => {
						signIn();
					}}>
					Sign in
				</div>
			</div>
			<div className={"md:my-14 my-8 w-fit"}>
				<div
					className={
						"rounded text-white cursor-pointer font-bold text-3xl md:text-5xl transition-transform active:scale-95 hover:scale-125 shadow-box-bg-accent-shadow shadow-box-color-accent-white shadow-box "
					}
					onClick={() => {
						signOut();
					}}>
					Log out
				</div>
			</div>
		</>
	);
}
