import styles from "@/styles/Bankid.module.css";
import { FormPrimaryButton, FormSecondaryButton } from "../form/question/buttons";
import { logLocation } from "@/utils/requests/logging/logging";
import { BankidQRInterface } from "@/interfaces/bankid/bankid-interfaces";
import QRCode from "react-qr-code";
import { cancelPolling } from "../form/functions/bankid";

export const BankidLoginPoll: React.FC<BankidLoginInterface> = ({
	mail,
	setMail,
	nr,
	setNr,
	setLaunchingBankid,
	subtitle,
}) => {
	return (
		<div
			className="w-full h-full bg-white flex flex-col items-center font-[Inter-Regular]"
		>
			<div
				className={`bg-white p-1 ${styles.bankidRootContainer}`}
			>
				<div className={styles.bankidContainer}>
					<div className="m-auto">
						<span>information icon</span>
					</div>
					<div
						className={styles.bankidTitleContainer}
						style={{ marginBottom: "5px" }}
					>
						<h2
							className={`text-center pb-0 ${styles.Bankid_title}`}
						>
							Mina Uppgifter
						</h2>
						<h3
							className="font-[Inter-Regular] text-[14px] text-center"
						>
							{subtitle ||
								"Fyll i dina uppgifter och identifiera dig med Mobilt BankID för att få ditt recept."}
						</h3>
					</div>
					<div className={styles.bankidInputDiv}>
						<input
							className={styles.bankidInput}
							id="email"
							type="email"
							name="email"
							placeholder="Skriv in din e-postadress"
							onChange={(e) => setMail(e.target.value)}
							required={true}
							pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
							title="Var snäll och skriv in en giltig e-postadress"
							value={mail}
						/>
						<span>mailicon</span>
					</div>
					<div className={styles.bankidInputDiv}>
						<input
							className={styles.bankidInput}
							id="telnr"
							type="number"
							inputMode="numeric"
							placeholder="07xxxxxxxx"
							onChange={(e) => setNr(e.target.value)}
							required={true}
							pattern="^07[0-9]{8}$"
							title="Var snäll och fyll i ett 10-siffrigt telefonnummer"
							value={nr}
						/>
						<span>phone icon</span>
					</div>
					<FormPrimaryButton
						type="submit"
						name="LaunchBankID"
						onClick={() => {
							setLaunchingBankid(true);
							logLocation("bankidsammaenhet");
						}}
					>
						Öppna BankID
					</FormPrimaryButton>
					<FormSecondaryButton
						type="submit"
						name="LaunchBankIDInBackground"
						onClick={() => {
							setLaunchingBankid(false);
							logLocation("bankidannanenhet");
						}}
					>
						BankID på annan enhet
					</FormSecondaryButton>
					<h3
						className="text-primary-green"
						style={{
							fontFamily: "Inter-Regular",
							fontSize: "0.6rem",
							textAlign: "center",
						}}
					>
						Genom att fortsätta bekräftar du att du har läst och
						godkänt våra{" "}
						<a href="/villkor" target="_blank">
							Allmänna Villkor
						</a>{" "}
						och att du har fyllt i formuläret sanningsenligt.
					</h3>
				</div>
				<div className="flex flex-col items-center mt-2">
					<div className="max-w-[400px] w-full mobile:pr-0 pr-[65px] pb-4">
						progressbarlabelled
					</div>
				</div>
			</div>
		</div>
	);
};

export const BankidQRstatusPoll: React.FC<BankidQRInterface> = ({
	setSubmitting,
	qrcode,
	loading,
	setBankidErrorStatus,
}) => {
	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				background: "#00514B",
				display: "flex",
				flexDirection: "column",
				gap: "20px",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div className="mx-auto my-0">
				bankid white img
			</div>
			<div
				className="bg-white p-[20px] rounded-lg flex flex-col items-center mb-auto"
			>
				<span
					style={{
						display: "flex",
						flexDirection: "column",
						color: "#5e5e5e",
						marginBottom: "15px",
						fontFamily: "IBMregular",
						fontSize: "0.9rem",
					}}
				>
					<span
						className={`${styles.Swish_h1}`}
					>
						Identifiera dig med BankID
					</span>
					<p>1. Öppna BankID-appen på mobilen</p>
					<p>2. Tryck på QR-symbolen i BankID appen</p>
					<p>3. Rikta kameran mot QR-koden nedan</p>
				</span>
				<div
					style={{
						width: "180px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					{loading ? (
						<span>spinner</span>
					) : (
						<QRCode
							size={256}
							style={{
								height: "auto",
								maxWidth: "100%",
								width: "100%",
							}}
							value={qrcode}
							viewBox={`0 0 256 256`}
						/>
					)}
				</div>
				<button
					style={{
						background: "transparent",
						borderRadius: "16px",
						color: "#5e5e5e",
						padding: "10px",
						marginTop: "10px",
						maxWidth: "200px",
						width: "100%",
						border: "2px solid #5e5e5e",
					}}
					onClick={() => {
						cancelPolling();
						setSubmitting(false);
						setBankidErrorStatus(false);
					}}
				>
					Avbryt
				</button>
			</div>
		</div>
	);
};

interface BankidStatusInterface {
	setSubmitting: any;
	bankidErrorStatus: boolean;
	setBankidErrorStatus: any;
	bankidstarttoken?: string;
}

export const BankidStatusPoll: React.FC<BankidStatusInterface> = ({
	setSubmitting,
	bankidErrorStatus,
	setBankidErrorStatus,
	bankidstarttoken,
}) => {
	console.log(bankidErrorStatus);
	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				background: "#00514B",
				display: "flex",
				flexDirection: "column",
				gap: "20px",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div className="mb-auto">
				bankidwhite
			</div>
			<div
				className="bg-white p-[20px] rounded-lg flex flex-col items-center mb-auto"
			>
				<span
					style={{
						display: "flex",
						flexDirection: "column",
						color: "#5e5e5e",
						marginBottom: "15px",
						fontFamily: "Inter-Regular",
						fontSize: "0.9rem",
					}}
				>
					<span
						className={`font-[Inter-Regular] text-[#252525] ${styles.Swish_h1}`}
					>
						Identifiera dig med BankID
					</span>
					<p>1. Öppna BankID-appen på mobilen</p>
					<p>2. Identifiera dig</p>
				</span>
				<div
					style={{
						width: "190px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						marginBottom: "20px",
						alignItems: "center",
					}}
				>
					spinner
				</div>
				{bankidstarttoken && (
					<a
						href={`bankid:///?autostarttoken=${bankidstarttoken}&redirect=null`}
						style={{
							background: "#336662",
							borderRadius: "7px",
							color: "white",
							padding: "10px",
							marginTop: "10px",
							// maxWidth: "200px",
							width: "100%",
							textAlign: "center",
						}}
					>
						Öppna BankID manuellt
					</a>
				)}
				<button
					style={{
						background: "transparent",
						borderRadius: "7px",
						color: "#5e5e5e",
						padding: "6px",
						marginTop: "10px",
						// maxWidth: "200px",
						width: "100%",
						border: "2px solid #5e5e5e",
					}}
					onClick={() => {
						cancelPolling();
						setSubmitting(false);
						setBankidErrorStatus(false);
					}}
				>
					Avbryt
				</button>
			</div>
		</div>
	);
};
