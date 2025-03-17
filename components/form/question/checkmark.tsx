
import React, { useState, useEffect } from "react";
import styles from "@/styles/Main.module.css";
import { CheckMarkInformationProps, CheckMarkQuestionProps, FormInputProps, MultipleSingleSelectionProps } from "@/interfaces/form/FormInterfaces";



export const CheckMarkQuestion: React.FC<CheckMarkQuestionProps> = ({
	selectedFormPage,
	checkmarkClick,
	buttonClick,
	page,
}) => {
	return (
		<>
			<h2>{selectedFormPage.question}</h2>
			{selectedFormPage.options.map(
				(option: any, optionIndex: any) => (
					<label
						key={optionIndex}
						className="flex mt-2 color-primary-green text-primary-green font-[Inter-Medium]"
					>
						<input
							type="checkbox"
							name={`question_${optionIndex}`}
							value={option.value}
							checked={option.selected === "true" ? true : false}
							onChange={() => {
								checkmarkClick(page, optionIndex);
							}}
							className={styles.Form_QuestionCheckbox_hiddencheckbox}
						/>
						<span
							className={styles.Form_QuestionCheckbox_customlabel}
						></span>
						<span className="text-sm">{option.value}</span>
					</label>
				)
			)}
			<div className={styles.Form_QuestionOptBtnsContainer}>
				<button
					type="button"
					className={styles.Form_QuestionOptBtn}
					onClick={() => buttonClick(page + 1)}
				>
					Fortsätt
				</button>
			</div>
		</>
	);
};


export const CheckmarkMultipleSelection: React.FC<
	CheckMarkQuestionProps
> = ({
	selectedFormPage,
	checkmarkClick,
	buttonClick,
	page,
	form,
	setError,
	openError
}) => {
		const [nextPage, setNextPage] = useState<number | null>(null);
		const [continueDisabled, setContinueDisabled] = useState<boolean>(true);

		useEffect(() => {
			const selectedOptions = selectedFormPage.options.filter(
				(option: { selected: string, nextPage?: string }) => option.selected === "true"
			);
			if (selectedOptions.length > 0) {
				const nullNextPageSelected = selectedOptions.some(
					(option: { selected: string, nextPage?: string }) => option.nextPage === "null"
				);

				if (nullNextPageSelected) {
					setError?.(true);
					setContinueDisabled(false);
					setNextPage(null);
				} else {
					setError?.(false);
					setContinueDisabled(false);
					const validNextPages = selectedOptions
						.map((option: { selected: string, nextPage?: string }) => parseInt(option.nextPage!))
						.filter((page: number) => !isNaN(page));
					setNextPage(validNextPages.length > 0 ? Math.min(...validNextPages) : null);
				}
			} else {
				setContinueDisabled(true);
				setNextPage(null);
				setError?.(false); // Ensure error is false when no options are selected
			}
		}, [form, selectedFormPage.options, setError]);

		const handleCheckboxChange = (optionIndex: any) => {
			checkmarkClick(page, optionIndex);
		};

		const promptError = () => {
			openError!();
			setError!(true);
		}
		const continueCallback = () => {
			nextPage ? buttonClick(nextPage) : promptError()
		}
		return (
			<>
				<h2>{selectedFormPage.question}</h2>
				<div>
					{selectedFormPage.options.map(
						(option: any, optionIndex: any) => (
							<label
								key={optionIndex}
								className="flex mt-2 color-primary-green text-primary-green font-[Inter-Medium]"
							>
								<input
									type="checkbox"
									name={`question_${optionIndex}`}
									value={option.value}
									checked={option.selected === "true" ? true : false}
									onChange={() => {
										handleCheckboxChange(optionIndex);
									}}
									className={
										styles.Form_QuestionCheckbox_hiddencheckbox
									}
								/>
								<span
									className={styles.Form_QuestionCheckbox_customlabel}
								></span>
								<span className="text-sm">{option.value}</span>
							</label>
						)
					)}
				</div>
				<div
					className={styles.Form_QuestionOptBtnsContainer}
					id="continueButton"
				>
					<button
						type="button"
						className={styles.Form_QuestionOptBtn}
						onClick={() => continueCallback()} // Use nextPage for navigation
						disabled={continueDisabled} // Disable button if no option is selected
					>
						Fortsätt
					</button>
				</div>
			</>
		);
	};


export const CheckmarkSingleSelection: React.FC<
	CheckMarkQuestionProps
> = ({
	selectedFormPage,
	checkmarkClick,
	buttonClick,
	page,
	form,
	setError,
	openError
}) => {
		const [nextPage, setNextPage] = useState<number | null>(null);
		const [continueDisabled, setContinueDisabled] = useState<boolean>(true);
		const meta = selectedFormPage.meta ? selectedFormPage.meta : null;

		useEffect(() => {
			const selectedOption = selectedFormPage.options.find(
				(option: any) => option.selected === "true"
			);
			if (selectedOption) {
				setContinueDisabled(false);
				setNextPage(parseInt(selectedOption.nextPage));
			} else {
				setNextPage(null);
				setContinueDisabled(true);
			}
		}, [form]);

		const handleCheckboxChange = (optionIndex: any) => {
			checkmarkClick(page, optionIndex);
		};

		const promptError = () => {
			openError!();
			setError!(true);
		}
		if (meta && meta.type == "medicine") {
			return (
				<>
					<h2>{selectedFormPage.question}</h2>
					<div>
						{selectedFormPage.options.map(
							(option: any, optionIndex: any) => (
								<CheckmarkInformationItem key={optionIndex} option={option} optionIndex={optionIndex} handleCheckboxChange={handleCheckboxChange} />
							)
						)}
					</div>
					<div
						className={styles.Form_QuestionOptBtnsContainer}
						id="continueButton"
					>
						<Button
							className={styles.Form_QuestionOptBtn}
							onClick={() => nextPage ? buttonClick(nextPage) : promptError()}
							isDisabled={continueDisabled}
						>
							Fortsätt
						</Button>
					</div>
				</>
			);
		}
		return (
			<>
				<h2>{selectedFormPage.question}</h2>
				<div>
					{selectedFormPage.options.map(
						(option: any, optionIndex: any) => (
							<label
								key={optionIndex}
								className="flex mt-2 color-primary-green text-primary-green font-[Inter-Medium]"
							>
								<input
									type="checkbox"
									name={`question_${optionIndex}`}
									value={option.value}
									checked={option.selected === "true" ? true : false}
									onChange={() => {
										handleCheckboxChange(optionIndex);
									}}
									className={
										styles.Form_QuestionCheckbox_hiddencheckbox
									}
								/>
								<span
									className={styles.Form_QuestionCheckbox_customlabel}
								></span>
								<span className="text-sm">{option.value}</span>
							</label>
						)
					)}
				</div>
				<div
					className={styles.Form_QuestionOptBtnsContainer}
					id="continueButton"
				>
					<button
						type="button"
						className={styles.Form_QuestionOptBtn}
						onClick={() => nextPage ? buttonClick(nextPage) : promptError()}
						disabled={continueDisabled}
					>
						Fortsätt
					</button>
				</div>
			</>
		);
	};


const CheckmarkInformationItem: React.FC<CheckMarkInformationProps> = ({ handleCheckboxChange, optionIndex, option }) => {
	const [open, setOpen] = useState(false);
	const formatContent = (content: string) => {
		if (!content) {
			return;
		}
		const splitContent = content.split(/(\*\*\*.*?\*\*\*)/).filter(el => el.trim());
		return splitContent.map((c, i) => {
			if (c.startsWith("***") && c.endsWith("***")) {
				return <h6 key={i} className="text-sm">{c.slice(3, -3)}</h6>
			}

			return <p key={i} className="text-xs my-1 font-[Inter-Medium]">{c}</p>
		})
	};
	return (
		<div
			className={`flex mt-2 color-primary-green text-primary-green font-[Inter-Medium] border border-2 border-rogreen-600 rounded-lg p-2 flex flex-col ${option.selected === "true" ? "bg-roneon-300" : ""}`}
		>
			<div className="flex flex-row justify-between">
				<label className="flex flex-row space-between items-center">
					<input
						type="checkbox"
						name={`question_${optionIndex}`}
						value={option.value}
						checked={option.selected === "true" ? true : false}
						onChange={() => {
							handleCheckboxChange(optionIndex);
						}}
						className={
							styles.Form_QuestionCheckbox_hiddencheckbox
						}
					/>
					<span
						className={styles.Form_QuestionCheckbox_customlabel}
					></span>
					<div className="flex flex-col">
						<span className="text-md">{option.value}</span>
						<span className="text-xs">{option.subtitle}</span>
						{option.price && <span className="text-xs">ca. {option.price} kr</span>}
					</div>
				</label>
				<div className="flex items-center ml-auto mr-4">{option.icon === "syringe" ? <Syringe /> : <Tablets />}</div>
				<span className="text-sm inline-flex items-center cursor-pointer" onClick={() => setOpen(!open)}>Läs mer {open ? <ChevronUp /> : <ChevronDown />}</span>
			</div>
			{open ? <div className="flex flex-col font-[Inter-SemiBold] text-rogray-700 mt-4">
				{formatContent(option.information)}
			</div> : <></>}
		</div>
	)
}



export const GradedScaleFive: React.FC<CheckMarkQuestionProps> = ({
	selectedFormPage,
	checkmarkClick,
	buttonClick,
	page,
	form,
}) => {
	const [nextPage, setNextPage] = useState<number | null>(null);

	useEffect(() => {
		// Update isAnyOptionSelected based on the latest selectedFormPage.options
		const selectedOption = selectedFormPage.options.find(
			(option: any) => option.selected === "true"
		);
		if (selectedOption) {
			setNextPage(parseInt(selectedOption.nextPage));
		} else {
			setNextPage(null);
		}
	}, [form]); // Depend on options, updating whenever they change

	const handleCheckboxChange = (optionIndex: any) => {
		// Invoke the external checkmarkClick which is assumed to update the option's selected state
		checkmarkClick(page, optionIndex);
	};

	return (
		<>
			<h2 className={"!text-[16px]"}>{selectedFormPage.question}</h2>
			<div className={"flex flex-row mt-4"}>
				{selectedFormPage.options.map(
					(option: any, optionIndex: any) => (
						<label
							key={optionIndex}
							className="flex mt-2 color-primary-green text-primary-green font-[Inter-Medium] mx-auto flex flex-col relative"
						>
							<input
								id={`question_${optionIndex}`}
								type="checkbox"
								name={`question_${optionIndex}`}
								value={option.value}
								checked={option.selected}
								onClick={() => handleCheckboxChange(optionIndex)}
								className="opacity-0 absolute"
							/>
							<label
								htmlFor={`question_${optionIndex}`}
								className={`${option.selected === "true"
									? "bg-primary-green text-white"
									: "bg-transparent text-primary-green"
									} border-2 border-primary-green cursor-pointer flex items-center justify-center font-medium w-8 h-8 rounded-lg transition-all duration-300`}
							>
								{option.value}
							</label>
						</label>
					)
				)}
			</div>
			{selectedFormPage.params &&
				selectedFormPage.params.gradeOptions ? (
				<div className="grid grid-cols-5 mx-auto row-span-1 mt-2">
					{selectedFormPage.params.gradeOptions.map(
						(gradeOption: string, key: number) => (
							<span key={key} className={`text-xs mx-auto text-center`}>
								{gradeOption}
							</span>
						)
					)}
				</div>
			) : (
				<></>
			)}
			<div
				className={styles.Form_QuestionOptBtnsContainer}
				id="continueButton"
			>
				<button
					className={styles.Form_QuestionOptBtn}
					onClick={() => nextPage && buttonClick(nextPage)} // Use nextPage for navigation
					disabled={!nextPage} // Disable button if no option is selected
				>
					Fortsätt
				</button>
			</div>
		</>
	);
};



export const MultipleSingleSelection: React.FC<
	MultipleSingleSelectionProps
> = ({ selectedFormPage, buttonClick, page }) => {
	return (
		<div className={styles.Form_QuestionOptBtnsContainer}>
			{selectedFormPage.options?.map(
				(option: any, optionIndex: any) => {
					return (
						<FormButton
							key={optionIndex}
							onClick={() => {
								buttonClick(page, parseInt(optionIndex));
							}}
						>
							{option.value}
						</FormButton>
					);
				}
			)}
		</div>
	);
};
