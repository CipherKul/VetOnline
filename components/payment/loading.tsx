"use client"

import { PaidComponentProps } from "@/interfaces/payment/payment-interfaces";
import React from "react";
import styles from "@/styles/Bankid.module.css";
import { useRouter } from "next/navigation";


export const LoadingPaidComponent: React.FC<
	PaidComponentProps
> = ({ }) => {
	const router = useRouter();
	return (
		<div
			className="my-auto w-full bg-white flex flex-col items-center min-h-[600px] md:min-h-[600px] lg:min-h-[900px]"
		>
			<div className={`mt-auto mb-auto p-4 mx-auto max-w-[350px] items-center flex flex-col`} >
				<div className="mb-4">
					<svg className="animate-spin" width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M35 64.1666C51.1083 64.1666 64.1667 51.1082 64.1667 34.9999C64.1667 18.8916 51.1083 5.83325 35 5.83325C18.8917 5.83325 5.83337 18.8916 5.83337 34.9999C5.83337 51.1082 18.8917 64.1666 35 64.1666Z" fill="#FEF9DE" stroke="#F5BF14" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M56.28 33.68C55.92 26.36 51.48 19.52 44.88 16.4C37.68 13.16 28.92 14.48 22.92 19.52C17.16 24.32 14.52 32.12 16.2 39.44C17.76 46.64 23.4 52.52 30.48 54.44C39 56.84 46.8 52.76 51.6 45.8C47.28 51.56 40.68 55.4 33.36 54.08C26.04 52.76 20.04 47.24 18.36 40.04C16.56 32.36 20.16 24.32 27 20.36C34.08 16.28 44.04 17.84 48.72 24.8C49.92 26.48 50.76 28.52 51.12 30.56C51.48 32.24 51.36 34.04 51.6 35.72C51.84 37.28 53.16 39.32 54.96 38.24C56.52 37.28 56.4 35.24 56.28 33.68C56.4 34.52 56.28 33.2 56.28 33.68Z" fill="#F5BF14" />
					</svg>
				</div>
				<span className={`text-[#252525] text-center font-[Inter-Bold] text-xl`} >
					Betalstatus
				</span>
				<div className="my-4 mx-auto">
					<p className={`${styles.Payment_p} text-[#272727] text-center font-[Inter-Medium]`}>
						Vi hämtar din betalstatus. Om det har gått för lång tid kan du trycka på <b>Tillbaka till betalsidan</b>-knappen.
					</p>
				</div>
				<button className="font-[Inter-Semibold] bg-primary-green text-white m-2 p-2 rounded-lg w-full" onClick={() => router.push("/payment/checkout/")}>
					Tillbaka till betalsidan
				</button>
				<p className={`${styles.Payment_p} text-light-gray text-center text-[14px] font-[Inter-Medium] mt-8`}>
					Om problemet kvarstår, kontakta kundtjänsten på info@receptonline.se.
				</p>
			</div>
		</div>
	);
};
