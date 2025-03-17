import { logLocation } from '@/utils/requests/logging/logging';
import axios from 'axios';

// Types for better type safety
type BankIDResponse = {
	autostarttoken?: string;
};

interface FormData {
	pnr: string;
	mail: string;
	nr: string;
}

type DiagnosType = 'viktnedgang' | string;

interface AuthHandlerProps {
	formData: FormData;
	hform: any;
	diagnos: DiagnosType;
	launchingBankid: boolean;
	router: any;
	onSubmitting: (value: boolean) => void;
	onPaying: (value: boolean) => void;
	onQRCode: (value: string) => void;
	onBankIDError: (value: boolean) => void;
	onBankIDToken: (value: string) => void;
}

const POLL_INTERVAL = 1000; // 1 second
const MAX_RETRIES = 180; // 3 minutes maximum polling time

let activeController: AbortController | null = null;

class BankIDError extends Error {
	constructor(message: string, public status?: number) {
		super(message);
		this.name = 'BankIDError';
	}
}

export const handleBankIDAuth = async ({
	formData,
	hform,
	diagnos,
	launchingBankid,
	router,
	onSubmitting,
	onPaying,
	onQRCode,
	onBankIDError,
	onBankIDToken
}: AuthHandlerProps): Promise<void> => {
	try {
		cancelPolling();

		activeController = new AbortController();
		onSubmitting(true);

		const url = process.env.NEXT_PUBLIC_API_BASE_URL! + process.env.NEXT_PUBLIC_API_BANKID_PATH!;
		// Initial BankID request
		const response = await axios.post<BankIDResponse>(
			url,
			{ data: [formData.pnr, formData.mail, formData.nr] },
			{
				withCredentials: true,
				signal: activeController.signal
			}
		);

		if (response.status !== 201) {
			throw new BankIDError('Failed to initialize BankID', response.status);
		}

		if (launchingBankid) {
			// Handle app-based BankID
			const { autostarttoken } = response.data;
			if (!autostarttoken) {
				throw new BankIDError('No autostart token received');
			}

			onBankIDToken(autostarttoken);
			openBankID(autostarttoken, router);
			await pollBankIDStatus({
				hform,
				diagnos,
				onSubmitting,
				onPaying,
				onBankIDError,
				router,
				signal: activeController.signal
			});
		} else {
			// Handle QR-based BankID
			await pollQRStatus({
				hform,
				diagnos,
				onSubmitting,
				onPaying,
				onQRCode,
				router,
				signal: activeController.signal
			});
		}
	} catch (error) {
		if (error instanceof Error && error.name === "AbortError") {
			return;
		}
		handleError(error, onSubmitting, onBankIDError);
	}
};

// Function to manually open BankID
export const openBankID = async (token: string, router: any): Promise<void> => {
	try {
		await router.push(`bankid:///?autostarttoken=${token}&redirect=null`);
		logLocation("HF_pushed_token");
	} catch (error) {
		console.error('Failed to open BankID:', error);
	}
};


export const cancelPolling = (): void => {
	if (activeController) {
		activeController.abort();
		activeController = null;
		logLocation("avbrytbankid");
	}
}


const pollBankIDStatus = async ({
	hform,
	diagnos,
	onSubmitting,
	onPaying,
	onBankIDError,
	router,
	signal
}: Omit<AuthHandlerProps, 'formData' | 'launchingBankid' | 'onQRCode' | 'onBankIDToken'> & {
	signal: AbortSignal
}): Promise<void> => {
	let retries = 0;

	const poll = async (): Promise<void> => {
		if (signal.aborted) return;

		if (retries >= MAX_RETRIES) {
			throw new BankIDError('BankID authentication timed out');
		}

		try {
			const url = process.env.NEXT_PUBLIC_API_BASE_URL! + process.env.NEXT_PUBLIC_API_BANKID_PATH!;
			const response = await axios.get(`${url}status/`, {
				withCredentials: true,
				signal
			});

			switch (response.status) {
				case 201:
					await sendForm(hform, onSubmitting, onPaying, diagnos);
					await handleNavigation(diagnos, router);
					break;
				case 202:
					retries++;
					await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
					if (!signal.aborted) {
						return poll();
					}
					break;
				case 205:
					onBankIDError(true);
					throw new BankIDError('BankID error occurred', 205);
				default:
					throw new BankIDError(`Unexpected status: ${response.status}`);
			}
		} catch (error) {
			if (error instanceof Error && error.name === 'AbortError') {
				return;
			}
			handleError(error, onSubmitting, onBankIDError);
			throw error;
		}
	};

	return poll();
};


type QRResponse = string;

const pollQRStatus = async ({
	hform,
	diagnos,
	onSubmitting,
	onPaying,
	onQRCode,
	router,
	signal
}: Omit<AuthHandlerProps, 'formData' | 'launchingBankid' | 'onBankIDError' | 'onBankIDToken'> & {
	signal: AbortSignal
}): Promise<void> => {
	let retries = 0;

	const poll = async (): Promise<void> => {
		if (signal.aborted) return;

		if (retries >= MAX_RETRIES) {
			throw new BankIDError('QR code authentication timed out');
		}

		try {
			const url = process.env.NEXT_PUBLIC_API_BASE_URL! + process.env.NEXT_PUBLIC_API_BANKID_PATH!;
			const response = await axios.get<QRResponse>(`${url}qrstatus/`, {
				withCredentials: true,
				signal
			});

			switch (response.status) {
				case 201:
					await sendForm(hform, onSubmitting, onPaying, diagnos);
					await handleNavigation(diagnos, router);
					break;
				case 202:
					onQRCode(response.data);
					retries++;
					await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
					if (!signal.aborted) {
						return poll();
					}
					break;
				default:
					throw new BankIDError(`Unexpected status: ${response.status}`);
			}
		} catch (error) {
			if (error instanceof Error && error.name === 'AbortError') {
				return;
			}
			handleError(error, onSubmitting);
			throw error;
		}
	};

	return poll();
};

const handleNavigation = async (diagnos: DiagnosType, router: any): Promise<void> => {
	if (diagnos === 'viktnedgang') {
		await router.push('/checkout/provtagningsplats');
	} else if (diagnos === 'viktprovkampanj') {
		await router.push('/checkout/provtagningsplats');
	} else if (diagnos === 'viktkampanj') {
		await router.push('/checkout/provtagningsplats');
	} else if (diagnos === 'viktbyte') {
		await router.push('/checkout/viktnedgang/byte');
	} else {
		await router.push(`/checkout?d=${diagnos}`);
	}
};

const handleError = (error: unknown, onSubmitting: (value: boolean) => void, onBankIDError?: (value: boolean) => void) => {
	console.error('BankID authentication error:', error);
	onSubmitting(false);
	if (onBankIDError) {
		onBankIDError(true);
	}
	if (axios.isAxiosError(error)) {
		logLocation('axios_error');
	} else {
		logLocation('bankid_error');
	}
};

// Original sendForm function (assumed to exist)
const sendForm = async (
	hform: any,
	setSubmitting: (value: boolean) => void,
	setPaying: (value: boolean) => void,
	diagnos: string
): Promise<boolean> => {
	const url = process.env.NEXT_PUBLIC_API_BASE_URL! + process.env.NEXT_PUBLIC_API_FORM_SUBMISSION_PATH!;
	debugger;
	const response = await axios
		.post(
			`${url}${diagnos}/`,
			JSON.stringify(hform),
			{
				withCredentials: true,
			}
		)
		.then((res) => {
			if (res.status == 201) {
				setPaying(true);
				setSubmitting(false);
				return true;
			} else {
				return false;
			}
		})
		.catch(() => {
			return false;
		});
	return response;
};
