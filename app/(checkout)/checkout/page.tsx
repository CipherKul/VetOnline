import { Payment } from "@/components/payment/payment-components";

export default async function Page({ }) {
	return (
		<div
			className="flex flex-col items-center pb-[100px] min-h-screen"
		>
			<Payment formRequired={false} />
		</div>
	);
};
