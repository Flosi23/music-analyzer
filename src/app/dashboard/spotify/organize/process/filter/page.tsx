import FilterPage from "@app/dashboard/spotify/organize/process/FilterPage";
import { FilterableSong } from "@lib/organize/types";
import SONGS from "./songs.json";

export default function Page() {
	return <FilterPage songs={SONGS as FilterableSong[]} />;
}
