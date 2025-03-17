'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { logLocation } from "@/utils/requests/logging/logging";
import { LoadingPaidComponent } from "./loading";
import { NotPaidComponent, PaidComponent } from "./payment-components";



interface PaymentData {
	w?: string;
	p?: string;
	a?: string;
}

interface ErrorResponse {
	status: string;
}


export const fetchPaymentData = async (oid: string | string[]): Promise<PaymentData | ErrorResponse> => {
	try {
		if (typeof oid === "string") {
			const response = await axios.get<PaymentData>(
				process.env.NEXT_PUBLIC_API_BASE_URL + process.env.NEXT_PUBLIC_API_PAYMENT_CONFIRMATION_STATUS_URL! + oid,
				{ withCredentials: true }
			);
			return response.data;
		} else {
			throw new Error("oid type is incorrect");
		}
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return error.response.data;
		}
		return { status: 'NOT FOUND' };
	}
};



export const PaymentConfirmation = ({ oid, respid }: { oid?: string, respid?: string }) => {
	const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
	const [errorResponse, setErrorResponse] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const pollPaymentData = (oid: string, interval: number, timeout: number) => {
		let timeElapsed = 0;
		const intervalId = setInterval(async () => {
			try {
				const data = await fetchPaymentData(oid);
				if ('status' in data) {
					setErrorResponse(data.status);
					clearInterval(intervalId);
					setLoading(false);
				} else {
					setPaymentData(data);
					const isPaid = data.w === 'PAID' || data.p === 'PAID' || data.a === 'PAID';
					if (isPaid) {
						clearInterval(intervalId);
						setLoading(false);
					}
				}
			} catch (err) {
				setErrorResponse('Failed to fetch payment data');
				console.log(err);
			}
			timeElapsed += interval;
			if (timeElapsed >= timeout) {
				clearInterval(intervalId);
				setLoading(false);
			}
		}, interval);
	};

	useEffect(() => {
		logLocation("confirmation")

		if (oid) {
			setLoading(true);
			pollPaymentData(oid as string, 5000, 10000); // Poll every 2 seconds, timeout after 30 seconds
		}
	}, [oid]);

	if (loading) return <LoadingPaidComponent />;
	if (errorResponse) return <LoadingPaidComponent />;

	const isPaid = paymentData && (
		paymentData.w === 'PAID' || paymentData.p === 'PAID' || paymentData.a === 'PAID'
	);
	return (
		<>
			{isPaid ? <PaidComponent /> : <NotPaidComponent />}
		</>
	);
};
