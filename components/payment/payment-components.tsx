"use client";

import {
	Elements,
	LinkAuthenticationElement,
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import {
	loadStripe,
	StripePaymentElementOptions,
} from "@stripe/stripe-js";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Bankid.module.css";
import { useSearchParams } from "next/navigation";
import { FormPrimaryButton, FormSecondaryButton } from "../form/question/buttons";
import { CheckIcon } from "lucide-react";

interface PaymentProps {
	router?: any;
	formRequired?: boolean;
}

/**
 * Sends the form after a set interval.
 * @param {NodeJS.Timer} timer: the timer
 */
const exitInterval = (timer: NodeJS.Timer) => {
	clearInterval(timer);
};

const refreshSwish = (
	router: any,
	setError: any,
	setErrorMsg: any,
	setSubmitting: any,
	setIntervalid: any,
	diagnos?: string | string[]
) => {
	const refresh = setInterval(() => {
		const confirmationUrl = process.env.NEXT_PUBLIC_API_SWISH_CONFIRMATION_PATH!;
		axios
			.get(confirmationUrl, {
				withCredentials: true,
			})
			.then((res) => {
				const url = process.env.NEXT_PUBLIC_LOCAL_CONFIRMATION_PATH!;
				if (res.status === 202) {
					router.push();
				} else if (res.status === 201) {
					exitInterval(refresh);
					router.push(url + "/" + res.data.orderid + `?d=${diagnos}`);
				}
			})
			.catch((reason) => {
				if (reason.response.status === 400) {
					console.log(reason);
					exitInterval(refresh);
				} else if (reason.response.status === 406) {
					console.log(reason);
					setError(false);
					setSubmitting(false);
					setErrorMsg("");
					exitInterval(refresh);
				} else {
					console.log(reason);
					setErrorMsg(
						"Det gick inte att kommunicera med Swish. Var god försök igen"
					);
					setError(true);
					exitInterval(refresh);
				}
			});
	}, 3000);
	setIntervalid(refresh);
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_STRIPE_PROMISE_KEY!);

export const Payment: React.FC<PaymentProps> = ({
	formRequired = true,
}) => {
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [intervalid, setIntervalid] = useState<any | null>(null);
	const [otherpay, setOtherpay] = useState<boolean>(false);
	const [clientSecret, setClientSecret] = useState("");
	const [oid, setOid] = useState("");
	const [price, setPrice] = useState("");
	const searchParams = useSearchParams();
	const d = searchParams!.get("d");
	const router = useRouter();

	useEffect(() => {
		// Get price as soon as the page loads
		const swishGetPriceUrl = process.env.NEXT_PUBLIC_API_BASE_URL! + process.env.NEXT_PUBLIC_API_PAYMENT_GET_PRICE_PATH!;
		axios
			.get(swishGetPriceUrl, {
				withCredentials: true,
			})
			.then((res) => setPrice(res.data.price));
	});
	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		const stripeCreateIntentUrl = process.env.NEXT_PUBLIC_API_BASE_URL! + process.env.NEXT_PUBLIC_API_STRIPE_PAYMENT_INTENT_CREATE_PATH!;
		axios
			.post(stripeCreateIntentUrl,
				{
					items: [{ id: "hform" }],
				},
				{ withCredentials: true }
			)
			.then((res) => res.data)
			.then((data) => {
				setClientSecret(data.clientSecret);
				setOid(data.orderID);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const options = {
		clientSecret,
	};

	const launchMobileSwish = () => {
		/* This function is called when the user launches swish in the same device
		 * It sends a request to the server to start the swish payment
		 * If the request is successful, the user is redirected to the swish app
		 * If the request is not successful, the user is alerted
		 * @returns {void}
		 * @throws {Error} if the request is not sent to the server
		 *
		 */


		const url = formRequired
			? process.env.NEXT_PUBLIC_API_BASE_URL! + process.env.NEXT_PUBLIC_API_SWISH_LAUNCH_PATH!
			: process.env.NEXT_PUBLIC_API_BASE_URL! + process.env.NEXT_PUBLIC_API_SWISH_START_CHECKOUT_MOBILE_NO_FORM_PATH!;

		setSubmitting(true);
		axios
			.get(url, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status == 202) {
				} else if (res.status == 201) {
					const confirmationCallbackUrl = process.env.NEXT_PUBLIC_LOCAL_PAYMENT_CONFIRMATION_REDIRECT_URL!;
					router.push(
						`swish://paymentrequest?token=${res.data}&callbackurl=${confirmationCallbackUrl}/respid/confirmation/${res.data}?d=${d}`
					);
				} else if (res.status == 203) {
					router.push("/checkout/confirmation/" + res.data.orderid + `?d=${d}`);
				}
			})
			.catch((reason) => {
				if (reason.response.status == 405) {
					setErrorMsg(
						"Vi ber om ursäkt för besväret. Det gick inte att betala, då din cookie har gått ut och dina svar inte registrerades i journalen. Vänligen fyll i formuläret igen."
					);
					setError(true);
				} else {
					alert("Din cookie har gått ut. Vänligen autentisera igen.");
					console.log(reason);
					setError(true);
				}
			});

		if (!error) {
			refreshSwish(
				router,
				setError,
				setErrorMsg,
				setSubmitting,
				setIntervalid,
				d ?? ""
			);
		} else {
			return "Error in swishConfirmationCallback";
		}
		return "Success in swishConfirmationCallback";
	};

	const swishLaunchDifferentDevice = () => {
		const url = formRequired
			? process.env.NEXT_PUBLIC_API_BASE_URL! + process.env.NEXT_PUBLIC_API_SWISH_LAUNCH_PATH!
			: process.env.NEXT_PUBLIC_API_BASE_URL! + process.env.NEXT_PUBLIC_API_SWISH_START_CHECKOUT_DIFFERENT_DEVICE_NO_FORM!;
		setSubmitting(true);
		axios
			.get(url, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.status === 202) {
				} else if (res.status === 201) {
				}
			})
			.catch((reason) => {
				if (reason.response.status == 405) {
					setErrorMsg(
						"Vi ber om ursäkt för besväret. Det gick inte att betala, då din cookie har gått ut och dina svar inte registrerades i journalen. Vänligen fyll i formuläret igen."
					);
					setError(true);
				} else {
					alert(
						"Din cookie har gått ut. Vänligen autentisera ladda om sidan och autentisera igen."
					);
					console.log(reason);
					setError(true);
				}
			});

		if (!error) {
			refreshSwish(
				router,
				setError,
				setErrorMsg,
				setSubmitting,
				setIntervalid,
				d ?? ""
			);
		} else {
			return "Error in swishConfirmationCallback";
		}
		return "Success in swishConfirmationCallback";
	};

	const cancelSwish = () => {
		const cancelSwishUrl = process.env.NEXT_PUBLIC_API_BASE_URL! + process.env.NEXT_PUBLIC_API_SWISH_CANCEL_CHECKOUT_PATH!
		axios
			.get(cancelSwishUrl, {
				withCredentials: true,
			})
			.catch((reason) => {
				console.log(reason);
			});
	};

	return (
		<div className={styles.SwishContainer}>
			<div className="flex flex-col items-center w-full">
				payment icon
			</div>
			{!submitting ? (
				<div>
					<p
						className={`${styles.Payment_title} text-center font-[Inter-SemiBold] pb-0 pt-2`}
					>
						Betalning
					</p>
					<p
						className={`${styles.Payment_p} text-center font-[Inter-SemiBold] text-primary-green`}
					>
						Slutför betalningen för att få recept av våra läkare.
					</p>
					<div className="relative p-1">
						<div
							className="text-rogreen-600 flex flex-row font-[Inter-Regular]"
						>
							{price ? (
								<p
									className="font-[Inter-Regular] text-xl m-auto"
								>
									{price} sek
								</p>
							) : (
								<div className="m-auto">
									<div className="inline-flex items-center px-2 py-2 font-semibold leading-6 text-sm rounded-md text-[primary-green] transition ease-in-out duration-150 cursor-not-allowed">
										<svg
											className="animate-spin -ml-1 mr-1 h-8 w-8 text-primary-green"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>

										<p className="ml-2">{" sek"}</p>
									</div>
								</div>
							)}
						</div>
					</div>
					<span className="text-primary-green text-center text-sm font-[Inter-SemiBold] mt-6">
						Välj betalsätt
					</span>
					<div>
						{otherpay ? (
							<div>
								{clientSecret && (
									<Elements key={"apprelatedPaymentStandard"} options={options} stripe={stripePromise}>
										<StripeCheckoutForm
											setOtherpay={setOtherpay}
											oid={oid}
										/>
									</Elements>
								)}
								<button
									className={styles.SwishBtn}
									type="button"
									onClick={() => setOtherpay(false)}
									style={{
										background: "transparent",
										color: "#336662a0",
										border: "none",
										textDecoration: "underline",
										fontSize: "1.1rem",
									}}
								>
									Avbryt
								</button>
							</div>
						) : (
							<div>
								<button
									name="launchMobileSwish"
									className={`${styles.SwishBtn} bg-primary-green`}
									onClick={() => {
										launchMobileSwish();
									}}
								>
									<Image
										src="/images/swish_secondary_logo_dark_bg.svg"
										alt="Betala med swish"
										style={{ margin: "auto" }}
										width={100}
										height={30}
									/>
								</button>
								<div className="mt-2">
									<FormSecondaryButton
										name="annanEnhet"
										onClick={() => {
											swishLaunchDifferentDevice();
										}}
									>
										Swish på annan enhet
									</FormSecondaryButton>
								</div>
								<button
									className={`bg-transparent m-auto pt-3 text-[#336662] text-[18px] flex flex-row items-center justify-center`}
									onClick={() => setOtherpay(!otherpay)}
								>
									<span className="mr-1 mt-1 font-[Inter-SemiBold]">
										Betalkort /
									</span>
									<span>appleicon</span>
								</button>
							</div>
						)}
					</div>
				</div>
			) : error !== true ? (
				<div>
					<h2 className={styles.Payment_h1}>Öppna swish appen</h2>
					<h2
						className={styles.Payment_h2}
						style={{ marginTop: "10px", marginBottom: "20px" }}
					>
						Pågående identifiering, vänligen vänta.
					</h2>
					<div className={styles.SwishSubmittingContainer}>
						spinner
					</div>
					<button
						name="avbryt"
						className={styles.SwishBtn}
						style={{ background: "transparent", color: "#336662" }}
						onClick={() => {
							cancelSwish();
							exitInterval(intervalid);
							setSubmitting(false);
						}}
					>
						Avbryt
					</button>
				</div>
			) : errorMsg === "" ? (
				<div>
					<h2 className={styles.Payment_h1}>Något gick fel</h2>
					<h2 className={styles.Payment_h2}>
						Det gick inte att betala för att din cookie gått ut, och
						dina svar inte gick att registrera i journalsystemet.
						Vänligen gå till startsidan och fyll i formuläret igen.
					</h2>
					<h2
						className={styles.Payment_h2}
						style={{ marginTop: "10px" }}
					>
						Vi ber om ursäkt för besväret
					</h2>
					<button
						name="tillStartsida"
						className={styles.SwishBtn}
						onClick={() => {
							router.push("/");
						}}
					>
						Till startsidan
					</button>
				</div>
			) : (
				<div>
					<h2 className={styles.Payment_h1}>Något gick fel</h2>
					<h2 className={styles.Payment_h2}>{errorMsg}</h2>
					<div className="mt-4"></div>
					<FormPrimaryButton
						name="tillStartsida"
						onClick={() => {
							router.push("/");
						}}
					>
						Till startsidan
					</FormPrimaryButton>
				</div>
			)}

			<div className="mt-10">
				<span>progressbar</span>
			</div>
		</div>
	);
};

interface PaidComponentProps {
	diagnos?: string;
}

export const PaidComponent: React.FC<PaidComponentProps> = ({ }) => {
	const router = useRouter();
	return (
		<div
			className="w-full bg-rogreen-600 flex flex-col items-center min-h-screen"
		>
			<div className={styles.PaymentConfirmationPage}>
				<div className="flex flex-col items-center">
					<CheckIcon />
					<span className="text-lg">
						Betalningsbekräftelse
					</span>
					<span
						className="text-sm font-[Inter-Regular]"
					>
						Nu är allt klart!
					</span>
				</div>
				<p className="text-md font-[Inter-Regular]">
					Du kommer att få bekräftelse via sms och mejl när receptet
					är skrivet. Hämta sedan ut ditt läkemedel på valfritt apotek
					eller via nätapotek för hemleverans.
				</p>
				<button
					className="font-[Inter-Medium] text-lg border border-1 border-rogreen-600"
					onClick={() => router.push("/")}
				>
					Tillbaka till startsidan
				</button>
			</div>
		</div>
	);
};

export const NotPaidComponent: React.FC<
	PaidComponentProps
> = ({ }) => {
	const router = useRouter();
	return (
		<div
			className="w-full flex flex-col items-center min-h-[900px]"
		>
			<div className={styles.PaymentConfirmationPage}>
				<span className={styles.Payment_title}>
					Betalning har inte genomförts
				</span>
				<p className={styles.Payment_p}>
					Vi har inte mottagit en betalning från dig med din nuvarande
					session. För att få bedömning och behandling behöver du
					betala avgiften på 199kr.
				</p>
				<p className={styles.Payment_p}>
					Om du har frågor kan du nå oss via chatten nedan.
				</p>
				<button onClick={() => router.push("/payment/checkout/")}>
					Tillbaka till betalsidan
				</button>
			</div>
		</div>
	);
};

interface CheckoutFormInterface {
	setOtherpay: any;
	oid: string;
}

export const StripeCheckoutForm: React.FC<CheckoutFormInterface> = ({
	oid,
}) => {
	const stripe = useStripe();
	const elements = useElements();

	const [, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(
			window.location.search
		).get("payment_intent_client_secret");

		if (!clientSecret) {
			return;
		}

		stripe
			.retrievePaymentIntent(clientSecret)
			.then(({ paymentIntent }) => {
				switch (paymentIntent?.status) {
					case "succeeded":
						setMessage("Payment succeeded!");
						break;
					case "processing":
						setMessage("Your payment is processing.");
						break;
					case "requires_payment_method":
						setMessage(
							"Your payment was not successful, please try again."
						);
						break;
					default:
						setMessage("Something went wrong.");
						break;
				}
			});
	}, [stripe]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const stripeConfirmationRedirect = process.env.NEXT_PUBLIC_LOCAL_BASE_URL! + process.env.NEXT_PUBLIC_LOCAL_CONFIRMATION_PATH!;
		debugger;
		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				// This needs to include the orderid returned from the backend
				return_url: stripeConfirmationRedirect + "?oid=" + oid,
			},
		});

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (
			error.type === "card_error" ||
			error.type === "validation_error"
		) {
			setMessage(error.message || "undefined");
		} else {
			setMessage("An unexpected error occurred.");
		}

		setIsLoading(false);
	};

	const paymentElementOptions: StripePaymentElementOptions = {
		layout: { type: "tabs" },
	};

	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			<LinkAuthenticationElement
				id="link-authentication-element"
				onChange={(e: any) => setEmail(e.target.value)}
			/>
			<PaymentElement
				id="payment-element"
				options={paymentElementOptions}
			/>
			<div className="mt-2">
				<FormPrimaryButton
					type="submit"
					name="stripe_payment_btn"
					disabled={isLoading || !stripe || !elements}
					onClick={() => { }}
				>
					<span id="button-text font-[Inter-Regular]">
						{isLoading ? (
							<div className="spinner" id="spinner"></div>
						) : (
							"Betala"
						)}
					</span>
				</FormPrimaryButton>
			</div>
			{/* Show any error or success messages */}
			{message && <div id="payment-message">{message}</div>}
		</form>
	);
};
