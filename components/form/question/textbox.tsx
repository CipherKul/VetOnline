import { FormQuestionProps, TextBoxQuestionProps } from "@/interfaces/form/FormInterfaces";
import styles from "@/styles/Main.module.css";
import React from "react";


export const FormTextBox: React.FC<FormQuestionProps> = ({
	selectedFormPage,
}) => {
	return (
		<div>
			{Object.keys(selectedFormPage).includes("textBox") ? (
				<textarea
					rows={5}
					style={{
						width: "100%",
						border: "3px solid #5e5e5e",
						borderRadius: "30px",
						padding: "10px",
						background: "transparent",
					}}
				></textarea>
			) : (
				<></>
			)}
		</div>
	);
};


export const QuestionBox: React.FC<FormQuestionProps> = ({
	selectedFormPage,
}) => {
	return (
		<div className="mt-2 text-primary-green">
			{selectedFormPage.questionBox && selectedFormPage.questionBox[0] !== "empty" ? (
				<div className={styles.Form_QuestionBox}>
					{selectedFormPage.questionBox?.map((qtext: any, k: any) => {
						return (
							<p className="mb-[5px] mobile:text-sm text-xs" key={k}>
								{qtext}
							</p>
						);
					})}
				</div>
			) : (
				<div
					className={styles.Form_QuestionBoxPlaceholder}
					style={{ display: "none" }}
				></div>
			)}
		</div>
	);
};



export const SingleTextboxSingleContinueButton: React.FC<
	TextBoxQuestionProps
> = ({
	selectedFormPage,
	buttonClick,
	handleTextboxChange,
	page,
}) => {
		/* TextBoxQuestion: input textarea for textbox questions with
										* rich text input from user requirement
										*/
		return (
			<>
				<h2>{selectedFormPage.question}</h2>
				<textarea
					className={styles.Form_QuestionTextbox_textbox}
					name={`question_${page}`}
					maxLength={100}
					onChange={(e) => handleTextboxChange(e.target.value, page)}
				></textarea>
				<div className={styles.Form_QuestionOptBtnsContainer}>
					<Button
						className={styles.Form_QuestionOptBtn}
						onClick={() =>
							buttonClick(parseInt(selectedFormPage.nextPage))
						}
					>
						Fortsätt
					</Button>
				</div>
			</>
		);
	};



export const TextBoxQuestion: React.FC<TextBoxQuestionProps> = ({
	selectedFormPage,
	buttonClick,
	handleTextboxChange,
	page,
}) => {
	return (
		<>
			<h2>{selectedFormPage.question}</h2>
			<textarea
				className={styles.Form_QuestionTextbox_textbox}
				name={`question_${page}`}
				maxLength={100}
				onChange={(e) => handleTextboxChange(e.target.value, page)}
			></textarea>
			<div className={styles.Form_QuestionOptBtnsContainer}>
				<button
					className={styles.Form_QuestionOptBtn}
					onClick={() => buttonClick(page)}
				>
					Fortsätt
				</button>
			</div>
		</>
	);
};
