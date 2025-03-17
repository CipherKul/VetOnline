'use client'

import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_QUESTIONS_URL } from "@/constants";
import styles from "@/styles/SimpleLanding.module.css";
import MyLoader from "@/components/form-components/MyLoader";
import {
	CheckmarkMultipleSelection,
	CheckmarkSingleSelection,
	FormAlertError,
	FormAsterix,
	FormBtnOrImgOpt,
	FormTextBox,
	GradedScaleFive,
	ImageLinkUnderQuestion,
	MultipleSingleSelection,
	QuestionBox,
	SingleTextboxSingleContinueButton,
} from "@/components/form-components/FormComponents";
import { logLocation } from "@/components/errtracking/ErrorTracking";
import { ImageUploadAuthenticatedComponent, ImageUploadForm } from "@/components/form-components/FormUploadComponents";
import { BMIComponent, PositiveIntegerComponent, TimeSelectionComponent } from "@/components/form-components/FormStyledElements";
import {
	ButtonClick,
	ContinueButtonClickProps,
	FormContentCheckmarkClickProps,
} from "@/components/interfaces/FunctionInterfaces";
import { MultipleSingleSelectionFunctionType } from "@/components/interfaces/FormComponentInterfaces";
import Link from "next/link";

interface FormContentProps {
	diagnos: string;
	formToOverrideWith?: any;
	overrideForm?: boolean;
	submissionUrl?: string;
	redirectPath?: string;
}


/* FormContentAuthenticated
 * is a component that will post to an API route that exists in the frontend project
 *
 * @component
 * @param ...
 * @param {string}	[props.submissionUrl="/api/form/"] - API endpoint on the frontend 
 *					side to then post forth the data to the backend
 * */

export const FormContentAuthenticated: React.FC<FormContentProps> = ({
	diagnos,
	formToOverrideWith,
	overrideForm = false,
	submissionUrl = "/api/form/",
	redirectPath = null
}) => {
	const [form, setForm] = useState<any[]>([[{ id: "notloaded" }]]);
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);
	const [page, setPage] = useState(0);
	const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
	const [submissionError, setSubmissionError] = useState<string>("");
	const [posted, setPosted] = useState<boolean>(false);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef<HTMLButtonElement>(null);

	const saveAnswer = (
		currentFormIndex: number,
		nextformIndex: number,
		clientChosenValue: string
	) => {
		form[currentFormIndex][0].value = clientChosenValue;
		setError(false);
		setForm([...form]);
		setPage(nextformIndex);
		return;
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		try {
			setPosted(true);
			const response = await fetch(`${submissionUrl}${diagnos}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form)
			});

			if (!response.ok) {
				throw new Error('Form submission failed');
			}

			const data = await response.json();
			setPosted(false);
			setHasSubmitted(true);
			return data;
		} catch (error) {
			console.error('Error submitting form:', error);
			setSubmissionError("")
			return { status: 'error' };
		}
	}

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
				} catch (error) { }
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
					} else {
						const selected = form[formIndex][0].options[idx].selected;
						form[formIndex][0].options[idx].selected = String(selected).toLowerCase();
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
				} catch (error) { }
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
		setPage(page + 1);
	};

	const continueButtonToGivenPageCallback: ContinueButtonClickProps =
		(destinationPage) => {
			setPage(destinationPage!);
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
					className="p-[20px] m-auto max-w-[400px] w-full"
					key={page}
				>
					{
						selectedFormPage.type === "checkmarkSingleSelection" ? (
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
						) : selectedFormPage.type ===
							"singleTextboxSingleContinueButton" ? (
							<SingleTextboxSingleContinueButton
								selectedFormPage={selectedFormPage}
								handleTextboxChange={handleTextboxChange}
								buttonClick={continueButtonToGivenPageCallback}
								page={page}
							/>
						) : selectedFormPage.type === "imageupload" ? (
							<ImageUploadForm
								buttonClick={continueButtonCallback}
								selectedFormPage={selectedFormPage}
							/>
						) : selectedFormPage.type === "imageuploadauthenticated" ? (
							<ImageUploadAuthenticatedComponent
								buttonClick={continueButtonCallback}
								selectedFormPage={selectedFormPage}
							/>
						) : selectedFormPage.type === "timeSelection" ? (
							<>
								<h2>{selectedFormPage.question}</h2>
								<TimeSelectionComponent
									form={form}
									setForm={setForm}
									page={page}
									setPage={setPage}
								/>
							</>
						) : selectedFormPage.type === "positiveIntegerField" ? (
							<PositiveIntegerComponent
								selectedFormPage={selectedFormPage}
								form={form}
								page={page}
								setPage={setPage}
								setForm={setForm}
							/>
						) : selectedFormPage.type === "bmi" ? (
							<>
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
							</>
						) : selectedFormPage.type === "multipleSingleSelection" ? (
							<>
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
							</>
						) : (
							<>
								<h2>{selectedFormPage.question}</h2>
								<QuestionBox selectedFormPage={selectedFormPage} />
								<ImageLinkUnderQuestion
									selectedFormPage={selectedFormPage}
								/>
								<FormTextBox selectedFormPage={selectedFormPage} />
								<FormBtnOrImgOpt
									selectedFormPage={selectedFormPage}
									buttonClick={buttonClick}
									page={page}
								/>
								<FormAsterix selectedFormPage={selectedFormPage} />
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
		} else if (page >= form.length) {
			return (
				<div className="m-auto flex flex-col items-center justify-center">
					<h6 className="font-[Inter-Medium] text-lg mb-4 text-rogreen-600">Super! Du har besvarat alla frågor</h6>
					<button type="submit" className="m-auto p-2 px-4 rounded-lg bg-rogreen-600 text-white font-[Inter-Medium]">Skicka formulär</button>
				</div>
			)
		} else if (hasSubmitted && !submissionError && redirectPath) {
			return <Link className="m-auto" href={redirectPath}>Fortsätt</Link>
		} else if (hasSubmitted && !submissionError) {
			return <div className="m-auto">Skickad</div>
		} else if (hasSubmitted && submissionError) {
			return <div className="m-auto">{submissionError}</div>
		} else {
			return <h2>Error</h2>;
		}
	};

	useEffect(() => {
		try {
			if (overrideForm) {
				setForm(formToOverrideWith);
			} else {
				axios
					.get(`${API_QUESTIONS_URL}${diagnos} `, {
						withCredentials: true,
					})
					.then((res) => setForm(res.data));
			}
		} catch (error) {
			console.log(error);
		}
		return () => { };
	}, []);

	useEffect(() => {
		setLoaded(true);
		return () => { };
	}, [form]);

	return (
		<form
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				height: "100%",
			}}
			onSubmit={(e) => handleSubmit(e)}
		>
			{!loaded || form[0][0].id == "notloaded" ? (
				<MyLoader title="Laddar..." />
			) : posted && !hasSubmitted ? (
				<div className={styles.Form_QuestionContainerSimple}>
					<div
						className="p-[20px] m-auto max-w-[400px] w-full"
					>
						<div className="flex items-center justify-center">
							<span className="relative inline-flex">
								<button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-rogreen-600 bg-rogreen-400 transition ease-in-out duration-150 cursor-not-allowed" disabled={true}>Skickar...</button>
								<span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rogreen-300 opacity-75"></span>
									<span className="relative inline-flex rounded-full h-3 w-3 bg-rogreen-300"></span>
								</span>
							</span>
						</div>
					</div>
				</div>
			) : hasSubmitted && redirectPath ? (
				<div className={styles.Form_QuestionContainerSimple}>
					<div
						className="p-[20px] m-auto max-w-[400px] w-full flex flex-col items-center"
					>
						<span className="font-[Inter-SemiBold] text-lg my-5">Formuläret har registrerats</span>
						<Link className="text-white bg-rogreen-600 p-2 px-10 rounded-lg m-2 mx-10" href={`${redirectPath}?s=finished`}>Fortsätt</Link>
					</div>
				</div>
			) : hasSubmitted ? (
				<div>
					<span>Formuläret har skickats</span>
				</div>
			) : (
				<div className={styles.Form_QuestionContainerSimple}>
					{conditionalComponent()}
				</div>
			)}
		</form>
	);
};
