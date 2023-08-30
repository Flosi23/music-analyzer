import React from "react";

interface SmallTileContainerProps {
	children: React.ReactNode;
}

const SmallTileContainer = ({ children }: SmallTileContainerProps) => {
	return (
		<div className="accent-box row-span-1 col-span-1 flex items-center overflow-auto">
			{children}
		</div>
	);
};

export default SmallTileContainer;
