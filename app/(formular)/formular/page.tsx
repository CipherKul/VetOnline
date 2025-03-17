import { FormContentPoll } from "@/components/form/FormContentPoll";
import React from "react";

export default async function Home({ searchParams, }: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const question = (await searchParams).q as string;
	const redirectPath = (await searchParams).redirectPath as string;

	return (
		<div className="h-[2000px]">
			<div>
				{question}
			</div>

			<div>
				{redirectPath}
			</div>
			<FormContentPoll diagnos={question} />
		</div>
	);
}
