import React from "react";

interface BigTileContainerProps {
	children: React.ReactNode;
}

const BigTileContainer = ({ children }: BigTileContainerProps) => {
	return (
		<div className="accent-box row-span-2 col-span-1 flex items-center overflow-auto">
			{children}
		</div>
	);
};

export default BigTileContainer;
