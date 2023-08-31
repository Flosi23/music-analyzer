"use client";

import { useSession } from "next-auth/react";

export default function Page() {
	const { data: session, status } = useSession();

	return (
		<pre>
			{JSON.stringify(session, null, 2)}, status: {status}
		</pre>
	);
}
