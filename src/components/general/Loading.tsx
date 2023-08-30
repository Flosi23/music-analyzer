import React from "react";

function Loading() {
	return (
		<div className="flex w-screen h-screen flex-auto justify-center items-center">
			<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500 lg:h-56 lg:w-56"></div>
		</div>
	);
}

export default Loading;
