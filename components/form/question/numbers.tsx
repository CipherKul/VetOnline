"use client"

import { BMIComponentProps } from "@/interfaces/form/FormInterfaces";
import React, { useState, useEffect } from "react";
import { FormButtonComponent } from "./buttons";
export const BMIComponent: React.FC<BMIComponentProps> = ({
	selectedFormPage,
	saveAnswer,
	page,
	setError,
	openError
}) => {
	const [height, setHeight] = useState<number>(0);
	const [weight, setWeight] = useState<number>(0);
	const [bmi, setBMI] = useState<number | null>(null);
	const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
	const [nextPage, setNextPage] = useState<number | null>(null);

	useEffect(() => {
		if (height > 0 && weight > 0) {
			const calculatedBMI = weight / ((height / 100) ** 2);
			const roundedBMI = parseFloat(calculatedBMI.toFixed(2));
			setBMI(roundedBMI);
			checkBMICondition(roundedBMI);
		} else {
			setIsButtonEnabled(false);
			setNextPage(null);
		}
	}, [height, weight]);

	const evaluateCondition = (condition: string, bmi: number): boolean => {
		const normalizedCondition = condition.replace(/x/g, bmi.toString());
		const parts = normalizedCondition.split(/(<=|>=|<|>)/);

		if (parts.length === 3) {
			const [left, operator, right] = parts;
			switch (operator) {
				case '<': return parseFloat(left) < parseFloat(right);
				case '<=': return parseFloat(left) <= parseFloat(right);
				case '>': return parseFloat(left) > parseFloat(right);
				case '>=': return parseFloat(left) >= parseFloat(right);
				default: return false;
			}
		} else if (parts.length === 5) {
			const [left, op1, middle, op2, right] = parts;
			const condition1 = evaluateCondition(`${left}${op1}${middle}`, bmi);
			const condition2 = evaluateCondition(`${middle}${op2}${right}`, bmi);
			return condition1 && condition2;
		}

		return false;
	};

	const checkBMICondition = (currentBMI: number) => {
		for (const [condition, nextPageValue] of Object.entries(selectedFormPage.options)) {
			if (evaluateCondition(condition, currentBMI)) {
				setIsButtonEnabled(true);
				setNextPage(Number(nextPageValue));
				return;
			}
		}

		setIsButtonEnabled(false);
		setNextPage(null);
	};

	const handleSubmit = () => {
		if (bmi !== null && nextPage !== null && isButtonEnabled) {
			saveAnswer(page, nextPage, bmi.toString(), height, weight);
		} else {
			openError();
			setError(true);
		}
	};

	return (
		<div className="space-y-4">
			<span className="text-rogreen-600 font-semibold text-center block">
				{selectedFormPage.question}
			</span>
			<div className="space-y-2">
				<input
					type="number"
					placeholder="Längd (cm)"
					className="w-full p-2 border rounded"
					onChange={(e) => setHeight(Number(e.target.value))}
				/>
				<input
					type="number"
					placeholder="Vikt (kg)"
					className="w-full p-2 border rounded"
					onChange={(e) => setWeight(Number(e.target.value))}
				/>
			</div>
			{bmi !== null && (
				<div className="text-center font-semibold text-rogreen-600">
					Ditt BMI: {bmi}
				</div>
			)}
			<FormButtonComponent onClick={handleSubmit}>
				Fortsätt
			</FormButtonComponent>
		</div>
	);
};


export const PositiveIntegerComponent: React.FC<{
	selectedFormPage: {
		question: string;
		nextPage?: string;
		unit?: string;
	};
	form: any;
	page: any;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	setForm: React.Dispatch<React.SetStateAction<any>>;
}> = ({ selectedFormPage, form, setForm, page, setPage }) => {
	const [number, setNumber] = React.useState("");
	const nextPage = selectedFormPage.nextPage ? parseInt(selectedFormPage.nextPage) : page + 1;
	const unit = selectedFormPage.unit ? selectedFormPage.unit : "Enhet";

	const nextCallback = (e: any) => {
		e.preventDefault();
		const newForm = [...form];
		newForm[page][0].value = `${number}`;
		setForm([...newForm]);
		setPage(nextPage);
	};

	return (
		<div className="mt-5 flex flex-col">
			<label className="text-primary-green">{selectedFormPage.question && selectedFormPage.question}</label>
			<div className="relative mt-2 rounded-md shadow-sm max-w-[240px]">
				<input
					className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cool-green sm:text-sm sm:leading-6"
					type="number"
					min="0"
					value={number}
					onChange={(e) => setNumber(e.target.value)}
					placeholder={unit}
					required
				/>
			</div>
			{number !== "" && (
				<FormButtonComponent onClick={(e: any) => nextCallback(e)}>
					Fortsätt
				</FormButtonComponent>
			)}
		</div>
	);
};
