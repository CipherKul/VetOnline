'use client'

import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Main.module.css";
import { useRouter } from "next/navigation";
import { logLocation } from "@/utils/requests/logging/logging";
import { ButtonClick, ContinueButtonClickProps, FormContentCheckmarkClickProps } from "@/interfaces/form/FormInterfaces";
import { CheckmarkMultipleSelection, CheckMarkQuestion, CheckmarkSingleSelection, GradedScaleFive, MultipleSingleSelection } from "./question/checkmark";
import { FormAlertError } from "./question/error";
import { FormTextBox, QuestionBox, SingleTextboxSingleContinueButton, TextBoxQuestion } from "./question/textbox";
import { ImageUploadForm } from "./question/image";
import { TimeSelectionComponent } from "./question/time";
import { BMIComponent, PositiveIntegerComponent } from "./question/numbers";
import { BankidLoginPoll, BankidQRstatusPoll, BankidStatusPoll } from "../bankid/bankid-form";
import { handleBankIDAuth } from "./functions/bankid";
import { FormLoader, MyLoader } from "./question/loader";
import { FormBtnOrImgOpt } from "./question/basic";


// TODO: remove debugMode from the component and wherever it is called

interface FormContentProps {
	diagnos: string;
	formToOverrideWith?: any;
	overrideForm?: boolean;
}

export const FormContentPoll: React.FC<FormContentProps> = ({
	diagnos,
}) => {
	const [form, setForm] = useState<any[]>([[{ id: "notloaded" }]]);
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);
	const [page, setPage] = useState(0);
	const [pnr, setPnr] = useState("");
	const [mail, setMail] = useState("");
	const [nr, setNr] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [paying, setPaying] = useState(false);
	const [launchingBankID, setLaunchingBankID] = useState(false);
	const [qrcode, setQrcode] = useState("");
	const [bankidErrorStatus, setBankidErrorStatus] = useState(false);
	const [bankidstarttoken, setBankidstarttoken] = useState("");
	const [animating, setAnimating] = useState(false);
	const isOpen = true;
	const onClose = false;

	const router = useRouter();

	// const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef<HTMLButtonElement>(null);

	const saveAnswer = (
		currentFormIndex: number,
		nextformIndex: number,
		clientChosenValue: string
	) => {
		form[currentFormIndex][0].value = clientChosenValue;
		setError(false);
		setForm([...form]);
		setAnimating(true);
		setTimeout(() => {
			setPage(nextformIndex);
			setAnimating(false);
		}, 500);
		return;
	};

	const buttonClick: ButtonClick = (
		formIndex,
		_b,
		clientChosenValue,
		nextPageOptions
	) => {
		logLocation(`${diagnos}_${formIndex}`);
		if (form) {
			if (nextPageOptions) {
				if (nextPageOptions[clientChosenValue] !== undefined) {
					saveAnswer(
						formIndex,
						parseInt(nextPageOptions[clientChosenValue]),
						clientChosenValue
					);
					return;
				} else {
					onOpen();
					setError(true);
				}
			} else if (
				form[formIndex][0].correct.includes(clientChosenValue)
			) {
				saveAnswer(formIndex, formIndex + 1, clientChosenValue);
			} else {
				onOpen();
				setError(true);
			}
		}
	};

	const multipleSingleSelectionButtonCallback: MultipleSingleSelectionFunctionType =
		(formIndex, optionIndex) => {
			logLocation(`${diagnos}_${optionIndex}`);
			if (form) {
				form[formIndex][0].options = form[formIndex][0].options.map(
					(option: any) => {
						return { ...option, selected: "false" };
					}
				);

				form[formIndex][0].options[optionIndex].selected = "true";
				if (
					form[formIndex][0].options[optionIndex].nextPage === "null"
				) {
					onOpen();
					setError(true);
				} else {
					setError(false);
					setForm([...form]);
					setPage(
						parseInt(form[formIndex][0].options[optionIndex].nextPage)
					);
				}
			} else {
				try {
					logLocation(`${diagnos}_${formIndex}_cbx_noform`);
				} catch (error) {
					console.log(error);
				}
			}
		};

	const checkmarkClick: FormContentCheckmarkClickProps = (
		formIndex,
		i
	) => {
		logLocation(`${diagnos}_${formIndex}_cbx_${i}`);
		if (form) {
			if (
				form[formIndex][0].options[i].value ===
				"Inget av ovanstående" ||
				form[formIndex][0].options[i].value.includes("Nej")
			) {
				for (
					let idx = 0;
					idx < form[formIndex][0].options.length;
					idx++
				) {
					if (idx !== i) {
						form[formIndex][0].options[idx].selected = "false";
					}
				}
			} else {
				for (
					let idx = 0;
					idx < form[formIndex][0].options.length;
					idx++
				) {
					if (
						form[formIndex][0].options[idx].value ===
						"Inget av ovanstående" ||
						form[formIndex][0].options[idx].value.includes("Nej")
					) {
						form[formIndex][0].options[idx].selected = "false";
					}
				}
			}
			form[formIndex][0].options[i].selected =
				form[formIndex][0].options[i].selected === "false"
					? "true"
					: "false";
			setError(false);
			setForm([...form]);
		} else {
			try {
				logLocation(`${diagnos}_${formIndex}_cbx_noform`);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const checkmarkSingleSelectionCheckCallback: FormContentCheckmarkClickProps =
		(formIndex, i) => {
			logLocation(`${diagnos}_${formIndex}_cbx_${i}`);
			if (form) {
				for (
					let idx = 0;
					idx < form[formIndex][0].options.length;
					idx++
				) {
					if (idx !== i) {
						form[formIndex][0].options[idx].selected = "false";
					}
				}

				form[formIndex][0].options[i].selected =
					form[formIndex][0].options[i].selected === "false"
						? "true"
						: "false";
				setError(false);
				setForm([...form]);
			} else {
				try {
					logLocation(`${diagnos}_${formIndex}_cbx_noform`);
				} catch (error) {
					console.log(error);
				}
			}
		};

	const checkmarkMultipleSelectionCallback: FormContentCheckmarkClickProps =
		(formIndex, i) => {
			logLocation(`${diagnos}_${formIndex}_cbx_${i}`);
			if (form) {
				form[formIndex][0].options[i].selected =
					form[formIndex][0].options[i].selected === "false"
						? "true"
						: "false";
				setError(false);
				setForm([...form]);
			} else {
				try {
					logLocation(`${diagnos}_${formIndex}_cbx_noform`);
				} catch (error) { }
			}
		};

	const continueButtonCallback: ContinueButtonClickProps = () => {
		setAnimating(true);
		setTimeout(() => {
			setPage(page + 1);
			setAnimating(false);
		}, 500);
	};

	const continueButtonToGivenPageCallback: ContinueButtonClickProps =
		(destinationPage) => {
			setAnimating(true);
			setTimeout(() => {
				setPage(destinationPage!);
				setAnimating(false);
			}, 500);
		};

	const handleTextboxChange = (e: any, formIndex: any) => {
		form[formIndex][0].inputtext = e;
		setForm([...form]);
	};

	const conditionalComponent = () => {
		if (page < form.length) {
			const selectedFormPage = form[page][0];
			return (
				<div
					className={`p-[20px] m-auto max-w-[400px] w-full ${animating ? "slide-out-up" : "slide-in-up"
						}`}
					key={page}
				>
					{selectedFormPage.type === "checkmark" ? (
						<CheckMarkQuestion
							selectedFormPage={selectedFormPage}
							checkmarkClick={checkmarkClick}
							buttonClick={continueButtonCallback}
							page={page}
						/>
					) : selectedFormPage.type === "checkmarkSingleSelection" ? (
						<>
							<CheckmarkSingleSelection
								selectedFormPage={selectedFormPage}
								checkmarkClick={checkmarkSingleSelectionCheckCallback}
								buttonClick={continueButtonToGivenPageCallback}
								page={page}
								form={form}
								setError={setError}
								openError={onOpen}
							/>
							<FormAlertError
								selectedFormPage={selectedFormPage}
								error={error}
								isOpen={isOpen}
								cancelRef={cancelRef}
								onClose={onClose}
							/>
						</>
					) : selectedFormPage.type === "checkmarkMultipleSelection" ? (
						<>
							<CheckmarkMultipleSelection
								selectedFormPage={selectedFormPage}
								checkmarkClick={checkmarkMultipleSelectionCallback}
								buttonClick={continueButtonToGivenPageCallback}
								page={page}
								form={form}
								setError={setError}
								openError={onOpen}
							/>
							<FormAlertError
								selectedFormPage={selectedFormPage}
								error={error}
								isOpen={isOpen}
								cancelRef={cancelRef}
								onClose={onClose}
							/>
						</>
					) : selectedFormPage.type ===
						"gradedScaleFiveSingleSelection" ? (
						<GradedScaleFive
							selectedFormPage={selectedFormPage}
							checkmarkClick={checkmarkSingleSelectionCheckCallback}
							buttonClick={continueButtonToGivenPageCallback}
							page={page}
							form={form}
						/>
					) : selectedFormPage.type === "textbox" ? (
						<>
							<TextBoxQuestion
								selectedFormPage={selectedFormPage}
								handleTextboxChange={handleTextboxChange}
								buttonClick={continueButtonCallback}
								page={page}
							/>
						</>
					) : selectedFormPage.type ===
						"singleTextboxSingleContinueButton" ? (
						<>
							<SingleTextboxSingleContinueButton
								selectedFormPage={selectedFormPage}
								handleTextboxChange={handleTextboxChange}
								buttonClick={continueButtonToGivenPageCallback}
								page={page}
							/>
						</>
					) : selectedFormPage.type === "imageupload" ? (
						<>
							<ImageUploadForm
								buttonClick={continueButtonCallback}
								selectedFormPage={selectedFormPage}
							/>
						</>
					) : selectedFormPage.type === "timeSelection" ? (
						<div>
							<h2>{selectedFormPage.question}</h2>
							<TimeSelectionComponent
								form={form}
								setForm={setForm}
								page={page}
								setPage={setPage}
							/>
						</div>
					) : selectedFormPage.type === "positiveIntegerField" ? (
						<div>
							<PositiveIntegerComponent
								selectedFormPage={selectedFormPage}
								form={form}
								page={page}
								setPage={setPage}
								setForm={setForm}
							/>
						</div>
					) : selectedFormPage.type === "bmi" ? (
						<div>
							<BMIComponent
								selectedFormPage={selectedFormPage}
								saveAnswer={saveAnswer}
								page={page}
								form={form}
								setError={setError}
								openError={onOpen}
							/>
							<FormAlertError
								selectedFormPage={selectedFormPage}
								error={error}
								isOpen={isOpen}
								cancelRef={cancelRef}
								onClose={onClose}
							/>
						</div>
					) : selectedFormPage.type === "multipleSingleSelection" ? (
						<div>
							<h2>{selectedFormPage.question}</h2>
							<MultipleSingleSelection
								selectedFormPage={selectedFormPage}
								buttonClick={multipleSingleSelectionButtonCallback}
								page={page}
							/>
							<FormAlertError
								selectedFormPage={selectedFormPage}
								error={error}
								isOpen={isOpen}
								cancelRef={cancelRef}
								onClose={onClose}
							/>
						</div>
					) : (
						<>
							<h2>{selectedFormPage.question}</h2>
							<QuestionBox selectedFormPage={selectedFormPage} />
							<FormTextBox selectedFormPage={selectedFormPage} />
							<FormBtnOrImgOpt
								selectedFormPage={selectedFormPage}
								buttonClick={buttonClick}
								page={page}
							/>
							<FormAlertError
								selectedFormPage={selectedFormPage}
								error={error}
								isOpen={isOpen}
								cancelRef={cancelRef}
								onClose={onClose}
							/>
						</>
					)}
				</div>
			);
		} else if (page == form.length && !submitting && !paying) {
			return (
				<BankidLoginPoll
					pnr={pnr}
					setPnr={setPnr}
					mail={mail}
					setMail={setMail}
					nr={nr}
					setNr={setNr}
					setLaunchingBankid={setLaunchingBankID}
					subtitle={diagnos.includes("vikt") ? "Fyll i dina uppgifter och identifiera dig med Mobilt BankID" : "Fyll i dina uppgifter och identifiera dig med Mobilt BankID för att få ditt recept."}
				/>
			);
		} else if (submitting) {
			return (
				<>
					{launchingBankID === true ? (
						<BankidStatusPoll
							setSubmitting={setSubmitting}
							bankidErrorStatus={bankidErrorStatus}
							setBankidErrorStatus={setBankidErrorStatus}
							bankidstarttoken={bankidstarttoken}
						/>
					) : qrcode === "" ? (
						<BankidQRstatusPoll
							qrcode={qrcode}
							setSubmitting={setSubmitting}
							loading={true}
							bankidErrorStatus={bankidErrorStatus}
							setBankidErrorStatus={setBankidErrorStatus}
						/>
					) : (
						<BankidQRstatusPoll
							qrcode={qrcode}
							setSubmitting={setSubmitting}
							loading={false}
							bankidErrorStatus={bankidErrorStatus}
							setBankidErrorStatus={setBankidErrorStatus}
						/>
					)}
				</>
			);
		} else if (paying) {
			return <FormLoader diagnos={diagnos} />
		} else if (page == form.length + 1 && !submitting) {
			return <h2>stopped submitting</h2>;
		} else {
			return <h2>Error</h2>;
		}
	};

	const handlesubmit = (e: React.FormEvent) => {
		e.preventDefault();

		handleBankIDAuth({
			formData: {
				pnr,
				mail,
				nr
			},
			hform: form,
			diagnos,
			launchingBankid: launchingBankID,
			router,
			onSubmitting: setSubmitting,
			onPaying: setPaying,
			onQRCode: setQrcode,
			onBankIDError: setBankidErrorStatus,
			onBankIDToken: setBankidstarttoken
		});
		return null;
	}

	useEffect(() => {
		try {
			const url = process.env.NEXT_PUBLIC_API_BASE_URL! + process.env.NEXT_PUBLIC_API_QUESTIONS_PATH! + diagnos
			axios
				.get(
					url,
					{ withCredentials: true, }
				)
				.then((res) => setForm(res.data));
		} catch (error) {
			console.log(error);
		}
		return () => { };
	}, []);

	useEffect(() => {
		setLoaded(true);
		return () => { };
	}, [form]);

	if (!loaded) {
		return <MyLoader title="Laddar..." />
	} else {
		return (
			<form
				className="flex flex-col items-center h-full"
				onSubmit={(e) => {
					handlesubmit(e);
				}}
			>
				<FormLogo page={page} formLength={form.length} />
				<div className={styles.Form_QuestionContainerSimple}>
					{conditionalComponent()}
					<FormProgressBar page={page} formLength={form.length} />
				</div>
			</form>
		);
	}
};

const FormLogo: React.FC<{ page: any, formLength: number }> = ({ page, formLength }) => {
	if (page < formLength) {
		return (
			<div
				className="flex w-full p-[0.6rem] justify-center"
			>
				logo
			</div>
		);
	} else {
		return <></>;
	}
}

const FormProgressBar: React.FC<{ page: any, formLength: number }> = ({ page, formLength }) => {
	if (page < formLength) {
		return (
			<div className="flex flex-col items-center">
				<div className="max-w-[400px] w-full mobile:pr-0 pr-[80px]">
					progressBar
				</div>
			</div>
		);
	} else {
		return <></>;
	}
}
