"use client";
import { useState } from "react";
import SelectPage from "@app/dashboard/spotify/organize/process/SelectPage";
import ComputePage from "@app/dashboard/spotify/organize/process/ComputePage";

export interface Selection {
	includeLikedSongs: boolean;
	playlistIds: string[];
}

export default function Page() {
	const [selection, setSelection] = useState<Selection | undefined>(
		undefined,
	);

	if (!selection) {
		return <SelectPage setSelection={setSelection} />;
	}

	return <ComputePage selection={selection} />;
}
