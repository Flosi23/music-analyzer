import ColorSchemeCard from "@components/_develop/ColorSchemeCard";

export default function ColorScheme() {
	return (
		<div className="grid grid-cols-6 gap-4">
			<ColorSchemeCard
				bgColor="bg-primary"
				textColor="text-on-primary"
				name="Primary"
			/>
			<ColorSchemeCard
				bgColor="bg-on-primary"
				textColor="text-primary"
				name="On Primary"
			/>
			<ColorSchemeCard
				bgColor="bg-primary-container"
				textColor="text-on-primary-container"
				name="Primary Container"
			/>
			<ColorSchemeCard
				bgColor="bg-primary-container-high"
				textColor="text-on-primary-container"
				name="Primary Container High"
			/>
			<ColorSchemeCard
				bgColor="bg-on-primary-container"
				textColor="text-primary-container"
				name="On Primary Container"
			/>
			<ColorSchemeCard
				bgColor="bg-primary-surface"
				textColor="text-on-surface"
				name="Primary Surface"
			/>
			<ColorSchemeCard
				bgColor="bg-secondary"
				textColor="text-on-secondary"
				name="Secondary"
			/>
			<ColorSchemeCard
				bgColor="bg-on-secondary"
				textColor="text-secondary"
				name="On Secondary"
			/>
			<ColorSchemeCard
				bgColor="bg-secondary-container"
				textColor="text-on-secondary-container"
				name="Secondary Container"
			/>
			<ColorSchemeCard
				bgColor="bg-on-secondary-container"
				textColor="text-secondary-container"
				name="On Secondary Container"
			/>
			<div></div>
			<div></div>
			<ColorSchemeCard
				bgColor="bg-surface-dim"
				textColor="text-on-surface"
				name="Surface Dim"
			/>
			<ColorSchemeCard
				bgColor="bg-surface"
				textColor="text-on-surface"
				name="Surface"
			/>
			<ColorSchemeCard
				bgColor="bg-surface-container"
				textColor="text-on-surface"
				name="Surface Container"
			/>
			<ColorSchemeCard
				bgColor="bg-on-surface"
				textColor="text-surface"
				name="On Surface"
			/>
		</div>
	);
}
