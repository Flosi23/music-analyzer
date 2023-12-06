import { PropsWithChildren } from "react";
import Container from "@components/atoms/Container";
import NavBar from "@components/organisms/NavBar";

export default function Layout({ children }: PropsWithChildren<{}>) {
	return (
		<div>
			<Container>
				<NavBar />
			</Container>
			<div className="daisy-divider mt-0 mb-5 bg-primary h-1"></div>
			<Container className="flex flex-col grow">{children}</Container>
		</div>
	);
}
