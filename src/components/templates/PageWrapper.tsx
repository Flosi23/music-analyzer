import { PropsWithChildren } from "react";
import Error from "@components/atoms/Error";
import Loading from "@components/atoms/Loading";

interface Props {
	error?: boolean;
	errorMessage?: string;
	loading?: boolean;
}

export default function PageWrapper({
	error,
	errorMessage,
	loading,
	children,
}: PropsWithChildren<Props>) {
	if (error) {
		return <Error message={errorMessage} />;
	}

	if (loading) {
		return (
			<div className="w-full flex justify-center items-center">
				<Loading size={10} />
			</div>
		);
	}

	return <>{children}</>;
}
