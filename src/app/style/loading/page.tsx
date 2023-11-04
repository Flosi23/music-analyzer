import LoadingProgressBar from "@components/molecules/LoadingProgressBar";

export default function Page() {
	return (
		<div className="flex p-20 h-screen justify-center items-center">
			<LoadingProgressBar durationMS={5000} />
		</div>
	);
}
