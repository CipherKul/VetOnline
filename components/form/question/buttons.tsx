import React, { ReactNode } from "react";
import { FormInputProps } from "@/interfaces/form/FormInterfaces";
import styles from "@/styles/Main.module.css";

export const FormButton: React.FC<FormInputProps> = ({
	onClick,
	children,
	disabled = false,
}) => {
	return (
		<button
			className={`${styles.FormButton} font-[Inter-SemiBold] rounded-[10px] text-white w-full h-[2.5rem] ${!disabled ? "!bg-rogreen-600" : "!bg-gray-500"} mt-4`}
			onClick={onClick}
			type="button"
			disabled={disabled}
		>
			{children}
		</button>
	);
};


export const FormButtonComponent: React.FC<{
	onClick: any;
	children: ReactNode;
	disabled?: boolean;
}> = ({ onClick, children, disabled = false }) => {
	return (
		<div className={styles.Form_QuestionOptBtnsContainer}>
			<FormButton onClick={onClick} disabled={disabled}>{children}</FormButton>
		</div>
	);
};


export const FormPrimaryButton: React.FC<{
	type?: "button" | "reset" | "submit";
	name: string;
	imgSrc?: string;
	onClick: any;
	children: ReactNode;
	disabled?: boolean;
}> = ({
	type = "button",
	name,
	imgSrc,
	onClick,
	disabled = false,
	children,
}) => {
		return (
			<div className="relative">
				<button
					className="bg-[#336662] relative flex w-full items-center justify-center align-center rounded-md bg-primary-green h-12 px-3 py-1.5 leading-6 text-white font-[Inter-SemiBold] shadow-sm hover:bg-primary-greenhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:primary-greenhover"
					type={type}
					name={name}
					onClick={onClick}
					disabled={disabled}
				>
					{children}
				</button>
				{imgSrc && (
					<img
						className="absolute w-12 h-12 left-0 top-0"
						src={imgSrc}
						alt="bankid-logo"
					/>
				)}
			</div>
		);
	};

export const FormSecondaryButton: React.FC<{
	type?: "button" | "reset" | "submit";
	name: string;
	onClick: any;
	children: ReactNode;
}> = ({ type = "button", name, onClick, children }) => {
	return (
		<div className="relative">
			<button
				className="relative flex w-full items-center justify-center align-center rounded-md bg-transparent border-2 border-primary-green h-12 px-3 font-[Inter-SemiBold] leading-6 text-primary-green hover:text-white shadow-sm hover:bg-primary-greenhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:primary-greenhover"
				type={type}
				name={name}
				onClick={onClick}
			>
				{children}
			</button>
		</div>
	);
};

export const FormProcessingButton: React.FC = () => {
	return (
		<FormPrimaryButton
			name="processingButton"
			onClick={() => { }}
			disabled={true}
		>
			<svg
				className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
			Startar...
		</FormPrimaryButton>
	);
};
