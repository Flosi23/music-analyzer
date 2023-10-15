import "./index.css";

interface Props {
	animated?: boolean;
	className?: string;
}

export default function OrganizeIllustration({
	animated = false,
	className,
}: Props) {
	const neutralStrokeColor = `stroke-on-surface ${
		animated ? "animated-path" : ""
	}`;
	const neutralFillColor = "fill-on-surface";
	const accentStrokeColor = "stroke-primary";
	const accentFillColor = "fill-primary";
	const onAccentFillColor = "stroke-on-primary";

	return (
		<div className={className}>
			<svg
				className="w-full h-full"
				viewBox="0 0 769.03302 452.65854"
				fill="none"
				version="1.1"
				id="svg21"
				xmlns="http://www.w3.org/2000/svg">
				<path
					clipRule="evenodd"
					d="m 505.69323,311.78348 h 42.52735 c 11.73757,0 21.26418,9.56908 21.26418,21.36023 v 42.72146 c 0,11.79115 -9.52661,21.36024 -21.26418,21.36024 h -42.52735 c -11.73757,0 -21.26318,-9.56909 -21.26318,-21.36024 v -42.72146 c 0,-11.79115 9.52561,-21.36023 21.26318,-21.36023 z M 208.00274,12.734217 h 42.52735 c 11.73757,0 21.26318,9.569088 21.26318,21.360236 v 42.72146 c 0,11.79115 -9.52561,21.36023 -21.26318,21.36023 h -42.52735 c -11.73757,0 -21.26318,-9.56908 -21.26318,-21.36023 v -42.72146 c 0,-11.791148 9.52561,-21.360236 21.26318,-21.360236 z"
					strokeWidth="8"
					strokeLinecap="round"
					strokeLinejoin="round"
					id="path2"
					className={neutralStrokeColor}
				/>
				<path
					clipRule="evenodd"
					d="m 356.84798,162.25884 h 42.52736 c 11.73757,0 21.26418,9.56909 21.26418,21.36024 v 42.72146 c 0,11.79115 -9.52661,21.36124 -21.26418,21.36124 h -42.52736 c -11.73757,0 -21.26318,-9.57009 -21.26318,-21.36124 v -42.72146 c 0,-11.79115 9.52561,-21.36024 21.26318,-21.36024 z"
					strokeWidth="12"
					strokeLinecap="round"
					strokeLinejoin="round"
					id="path3"
					className={neutralStrokeColor}
				/>
				<path
					d="m 356.84798,55.454683 h 170.10943 c 23.4961,0 42.52735,19.11812 42.52735,42.72146 v 64.082697 c 0,23.60335 -19.03125,42.72047 -42.52735,42.72047 H 484.43005 M 399.37534,354.50494 H 229.26691 c -23.4971,0 -42.52735,-19.11812 -42.52735,-42.72146 v -64.08271 c 0,-23.60334 19.03025,-42.72046 42.52735,-42.72046 h 42.52636"
					strokeWidth="8"
					strokeLinecap="round"
					strokeLinejoin="round"
					id="path4"
					className={neutralStrokeColor}
				/>
				<ellipse
					cx="385.11737"
					cy="205.05754"
					strokeWidth="11.812"
					strokeLinecap="round"
					strokeLinejoin="round"
					id="circle4"
					rx="78.589516"
					ry="78.948227"
					className={`${accentStrokeColor} ${accentFillColor}`}
				/>
				<path
					d="m 393.43419,175.81881 -16.63264,58.48043 m -18.72182,-20.88895 -16.62564,-16.70153 16.62564,-16.71156 m 54.0603,50.12365 16.63463,-16.71056 -16.63463,-16.70153"
					strokeWidth="9.45"
					strokeLinecap="round"
					strokeLinejoin="round"
					id="path5"
					className={onAccentFillColor}
				/>
				<rect
					x="610.18347"
					y="55.358418"
					width="158.17821"
					height="7.3700919"
					rx="3.6683025"
					id="rect5"
					style={{ strokeWidth: 1.00045 }}
					className={neutralFillColor}
				/>
				<rect
					x="587.09167"
					y="223.53792"
					width="158.17821"
					height="7.3700919"
					rx="3.6683025"
					id="rect6"
					style={{ strokeWidth: 1.00045 }}
					className={neutralFillColor}
				/>
				<rect
					x="15.572078"
					y="130.74893"
					width="158.17821"
					height="7.3700919"
					rx="3.6683025"
					id="rect7"
					style={{ strokeWidth: 1.00045 }}
					className={neutralFillColor}
				/>
				<rect
					x="7.4898329"
					y="369.67932"
					width="158.17821"
					height="7.3700919"
					rx="3.6683025"
					id="rect8"
					style={{ strokeWidth: 1.00045 }}
					className={neutralFillColor}
				/>
				<rect
					x="610.18347"
					y="93.633766"
					width="158.17821"
					height="7.3700919"
					rx="3.6683025"
					id="rect9"
					className={neutralFillColor}
					style={{ strokeWidth: 1.00045 }}
				/>
				<rect
					x="587.09167"
					y="261.81226"
					width="158.17821"
					height="7.3700919"
					rx="3.6683025"
					id="rect10"
					className={neutralFillColor}
					style={{ strokeWidth: 1.00045 }}
				/>
				<rect
					x="15.572078"
					y="169.02428"
					width="158.17821"
					height="7.3700919"
					rx="3.6683025"
					id="rect11"
					className={neutralFillColor}
					style={{ strokeWidth: 1.00045 }}
				/>
				<rect
					x="7.4898329"
					y="407.95468"
					width="158.17821"
					height="7.3700919"
					rx="3.6683025"
					id="rect12"
					className={neutralFillColor}
					style={{ strokeWidth: 1.00045 }}
				/>
				<path
					d="m 682.15605,155.8614 c 15.71032,-3.73919 32.32698,9.6453 32.32698,9.6453 0,0 -8.86781,19.43899 -24.58312,23.16615 -15.71031,3.7392 -32.32198,-9.63326 -32.32198,-9.63326 0,0 8.86781,-19.43899 24.57812,-23.17819 z"
					id="path12"
					className={neutralFillColor}
					style={{
						strokeWidth: 1.00045,
					}}
				/>
				<ellipse
					cx="126.07233"
					cy="245.52284"
					id="circle12"
					rx="15.825108"
					ry="15.897339"
					className={neutralFillColor}
					style={{ strokeWidth: 1.00045 }}
				/>
				<ellipse
					transform="scale(1,-1)"
					id="circle13"
					cx="757.15118"
					cy="-160.3727"
					rx="11.881308"
					ry="11.935538"
					className={accentFillColor}
					style={{ strokeWidth: 1.00045 }}
				/>
				<ellipse
					transform="scale(1,-1)"
					id="circle14"
					cx="501.98804"
					cy="-110.49975"
					rx="11.881308"
					ry="11.935538"
					className={accentFillColor}
					style={{ strokeWidth: 1.00045 }}
				/>
				<ellipse
					transform="scale(1,-1)"
					id="circle15"
					cx="244.92635"
					cy="-429.87143"
					rx="22.683586"
					ry="22.787123"
					className={accentFillColor}
					style={{ strokeWidth: 1.00045 }}
				/>
				<ellipse
					transform="scale(1,-1)"
					id="circle16"
					cx="527.01233"
					cy="-354.84991"
					rx="12.659885"
					ry="12.71767"
					className={neutralFillColor}
					style={{ strokeWidth: 1.00045 }}
				/>
				<ellipse
					transform="scale(1,-1)"
					id="circle17"
					cx="357.73935"
					cy="-419.09506"
					rx="10.80128"
					ry="10.850581"
					className={neutralFillColor}
					style={{ strokeWidth: 1.00045 }}
				/>
				<ellipse
					transform="scale(1,-1)"
					id="circle17-7"
					cx="10.80128"
					cy="-227.5858"
					rx="10.80128"
					ry="10.850581"
					className={neutralFillColor}
					style={{ strokeWidth: 1.00045 }}
				/>
				<ellipse
					transform="matrix(-0.25772134,-0.96621929,-0.96562995,0.25992075,0,0)"
					id="circle18"
					cx="-492.37817"
					cy="-553.33392"
					rx="10.600687"
					ry="10.558962"
					className={neutralFillColor}
					style={{ strokeWidth: 1.00045 }}
				/>
				<ellipse
					transform="scale(1,-1)"
					id="circle19"
					cx="647.17194"
					cy="-31.612682"
					rx="14.042362"
					ry="14.106457"
					className={neutralFillColor}
					style={{ strokeWidth: 1.00045 }}
				/>
				<ellipse
					transform="matrix(-0.25772134,-0.96621929,-0.96562995,0.25992075,0,0)"
					id="circle20"
					cx="-48.591045"
					cy="-120.66028"
					rx="15.58276"
					ry="15.521425"
					className={neutralFillColor}
					style={{ strokeWidth: 1.00045 }}
				/>
				<path
					d="m 47.860125,296.7886 h -0.28249 c -1.67394,-23.81693 -19.30575,-24.18293 -19.30575,-24.18293 0,0 19.4435,-0.38104 19.4435,-27.90106 0,27.52002 19.4425,27.90106 19.4425,27.90106 0,0 -17.62482,0.366 -19.29776,24.18293 z M 62.119085,65.151113 h -0.20462 c -1.21478,-17.74437 -14.01442,-18.01712 -14.01442,-18.01712 0,0 14.11424,-0.28477 14.11424,-20.78666 0,20.50189 14.11323,20.78666 14.11323,20.78666 0,0 -12.79364,0.27275 -14.00843,18.01712 z"
					id="path20"
					className={neutralFillColor}
					style={{ strokeWidth: 1.00045 }}
				/>
			</svg>
		</div>
	);
}
