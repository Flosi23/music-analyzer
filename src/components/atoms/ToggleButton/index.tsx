import "./index.css";
import { useState } from "react";
import TextBody from "@components/text/TextBody";

interface Props {
	label?: string;
	defaultValue?: boolean;
	onChange?: (value: boolean) => void;
	className?: string;
}

export default function ToggleButton({
	label,
	defaultValue = false,
	onChange,
	className,
}: Props) {
	const [state, setState] = useState(defaultValue);

	const onClick = () => {
		setState(!state);
		if (onChange) {
			onChange(!state);
		}
	};

	return (
		<div
			className={`flex justify-between items-center gap-2 cursor-pointer ${className}`}
			onClick={onClick}>
			{label && <TextBody size="medium">{label}</TextBody>}
			<div
				className={`toggle-button relative rounded-full w-14 ${
					state ? "toggle-button-active" : "toggle-button-inactive"
				}`}>
				<div className="knob absolute rounded-full aspect-square" />
			</div>
		</div>
	);
}
