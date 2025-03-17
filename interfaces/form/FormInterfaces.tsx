export interface FormContentCheckmarkClickProps {
	(formIndex: number, i: number): void;
}

export interface ContinueButtonClickProps {
	(page: number | null): void;
}

export interface CheckMarkQuestionProps {
	selectedFormPage: any;
	checkmarkClick: FormContentCheckmarkClickProps;
	buttonClick: ContinueButtonClickProps;
	page: any;
	destinationPage?: number;
	form?: any;
	style?: string;
	gradeOptions?: string[];
	setError?: (state: boolean) => void;
	openError?: () => void;
}


export interface CheckMarkInformationProps {
	handleCheckboxChange: any;
	optionIndex: any;
	option: any;
}


export interface FormAlertProps {
	selectedFormPage: any;
	error: any;
	isOpen: any;
	cancelRef: any;
	onClose: any;
}


export interface FormAnswerCorrectionProps {
	selectedFormPage: any;
	form: any;
	buttonClick: any;
	page: any;
	error: any;
	isOpen: any;
	cancelRef: any;
	onClose: any;
}


export interface FormQuestionProps {
	selectedFormPage: any;
}


export interface MultipleSingleSelectionProps {
	selectedFormPage: any;
	buttonClick: MultipleSingleSelectionFunctionType;
	page: any;
}


export interface FormInputProps {
	onClick: any;
	children: ReactNode;
	disabled?: boolean;
}


export interface TextBoxQuestionProps {
	selectedFormPage: any;
	buttonClick: any;
	handleTextboxChange: any;
	page: any;
}


export interface ImageUploadFormProps {
	buttonClick?: ContinueButtonClickProps;
	selectedFormPage?: any;
}


export interface BMIComponentProps {
	selectedFormPage: {
		question: string;
		options: {
			[key: string]: string;
		};
	};
	saveAnswer: (currentPage: number, nextPage: number, answer: string, height: number, weight: number) => void;
	form: any; // Replace 'any' with the actual type of your form
	page: number;
	setError: (state: boolean) => void;
	openError: () => void;
}


export interface ButtonClick {
	/*
	 * formIndex: technically is the page number
	 * i: is the value that will be stored.
	 * clientChosenValue: is the value that will be stored.
	 * nextPageOptions: if the selected form page has an
	 * nextPageOptions dict, these will be directing the form
	 * in a specific direction based on the user ansewers.
	 */
	(
		formIndex: number,
		b: string,
		clientChosenValue: string,
		nextPageOptions?: PageOptions
	): void;
}
