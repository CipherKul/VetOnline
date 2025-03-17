import React from "react";
import { FormButtonComponent } from "./buttons";

export const TimeSelectionComponent: React.FC<{
	form: any;
	setForm: any;
	page: any;
	setPage: any;
}> = ({ form, setForm, page, setPage }) => {
	const [number, setNumber] = React.useState("");
	const [unit, setUnit] = React.useState("dagar");

	const nextCallback = (e: any) => {
		e.preventDefault();
		const newForm = [...form];
		newForm[page][0].value = `${number} ${unit}`;
		setForm([...newForm]);
		setPage(page + 1);
	};

	return (
		<div className="mt-5 flex flex-col">
			<label className="text-primary-green">
				Skriv in tid och välj tidsenhet
			</label>
			<div className="relative mt-2 rounded-md shadow-sm max-w-[240px]">
				<input
					className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cool-green sm:text-sm sm:leading-6"
					type="number"
					value={number}
					onChange={(e) => setNumber(e.target.value)}
					placeholder="Tid"
					min="0"
					required
				/>
				<div className="absolute inset-y-0 right-0 flex items-center">
					<select
						className="h-full rounded-r-md border-0 bg-primary-green py-0 pl-2 text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
						value={unit}
						onChange={(e) => setUnit(e.target.value)}
					>
						<option value="dagar">dagar</option>
						<option value="veckor">veckor</option>
						<option value="manader">månader</option>
						<option value="ar">år</option>
					</select>
				</div>
			</div>
			{number !== "" && (
				<FormButtonComponent onClick={(e: any) => nextCallback(e)}>
					Fortsätt
				</FormButtonComponent>
			)}
		</div>
	);
};
