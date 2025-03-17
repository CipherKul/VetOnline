import { PaymentConfirmation } from "@/components/payment/confirmation";

export default async function Home({ searchParams, }: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const oid = (await searchParams).oid as string;

	return (
		<div
			className="flex flex-col items-center pb-[100px] min-h-screen"
		>
			{oid}
			<PaymentConfirmation oid={oid} />
		</div>
	);
};
