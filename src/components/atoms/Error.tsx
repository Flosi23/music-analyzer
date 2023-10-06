import TextBody from "@components/text/TextBody";
import TextTitle from "@components/text/TextTitle";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

interface Props {
	message?: string;
	className?: string;
}

export default function Error({ message, className }: Props) {
	return (
		<div
			className={`rounded-3xl p-10 text-center bg-error-container text-on-error-container ${className}`}>
			<ExclamationTriangleIcon className="w-20 m-auto" />
			<TextTitle size="medium" className="mb-1">
				An error occured!
			</TextTitle>
			<TextBody size="large">{message}</TextBody>
		</div>
	);
}
