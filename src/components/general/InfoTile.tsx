"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface InfoTileProps {
	children?: React.ReactNode;
	title: string;
	text: string;
	right?: boolean;
}

const infoTileVariants = {
	visible: {
		opacity: 1,
		transform: "translateX(0)",
		transition: { duration: 0.5 },
	},
	hidden: { opacity: 0, transform: "translateX(-75px)" },
};

function getInfoTileVariants(right: boolean | undefined) {
	return {
		visible: {
			opacity: 1,
			transform: "translateX(0)",
			transition: { duration: 0.75 },
		},
		hidden: {
			opacity: 0,
			transform: !!right ? "translateX(75px)" : "translateX(-75px)",
		},
	};
}

export function InfoTile({ children, title, right, text }: InfoTileProps) {
	const controls = useAnimation();
	const [ref, inView] = useInView();
	useEffect(() => {
		if (inView) {
			controls.start("visible").then((r) => r);
		}
	}, [controls, inView]);

	return (
		<motion.div
			ref={ref}
			animate={controls}
			initial={"hidden"}
			variants={getInfoTileVariants(right)}
			className={`mb-10 lg:w-[55rem] xl:w-70p ${
				right ? "xl:self-end" : "xl:self-start"
			}`}>
			<div
				className={
					"shadow-box-bg-accent-box shadow-box-color-accent-white shadow-box"
				}>
				<h3 className={"text-5xl md:text-6xl font-bold mb-4"}>
					{title}
				</h3>
				<div className={"w-full flex flex-col sm:flex-row"}>
					<div className={"sm:mr-5 flex items-center"}>
						{children}
					</div>
					<p
						className={
							"font-roboto-mono text-justify sm:text-left text-lg md:text-2xl leading-7 "
						}>
						{text}
					</p>
				</div>
			</div>
		</motion.div>
	);
}
