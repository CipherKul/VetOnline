import { FormAnswerCorrectionProps } from "@/interfaces/form/FormInterfaces";

export const FormAnswerCorrection: React.FC<
	FormAnswerCorrectionProps
> = ({
	selectedFormPage,
	form,
	buttonClick,
	page,
	error,
	isOpen,
	cancelRef,
	onClose,
}) => {
		const checkAnswers = (form: any, ORlist: any) => {
			for (const i of ORlist) {
				for (const j of form) {
					if (j[0].type === "binary" && j[0].id === i[0]) {
						if (j[0].value === i[1]) {
							return true;
						}
					}
				}
			}
			return false;
		};

		if (selectedFormPage.type === "answerCorrection") {
			return (
				<div>
					{checkAnswers(
						form,
						selectedFormPage.answerCorrection[0]["OR"]
					) ? (
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
					) : (
						<h2>{selectedFormPage.answersFalse}</h2>
					)}
				</div>
			);
		} else {
			return <></>;
		}
	};
