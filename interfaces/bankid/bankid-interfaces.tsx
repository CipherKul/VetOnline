export interface BankidLoginInterface {
	pnr: string;
	setPnr: any;
	mail: string;
	setMail: any;
	nr: string;
	setNr: any;
	setLaunchingBankid: any;
	subtitle?: string;
}

export interface BankidQRInterface {
	setSubmitting: any;
	qrcode: string;
	loading: boolean;
	bankidErrorStatus: boolean;
	setBankidErrorStatus: any;
}
