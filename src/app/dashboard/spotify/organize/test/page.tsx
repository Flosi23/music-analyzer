"use client";
import FilterOptionsBuilder, {
	ExtendedFilterOptions,
} from "@app/dashboard/spotify/organize/process/FilterOptionsBuilder";

export default function Page() {
	const onGenerate = (o: ExtendedFilterOptions) => console.log(o);

	return <FilterOptionsBuilder onGenerate={onGenerate} />;
}
