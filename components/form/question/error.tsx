import React from "react";
import { FormAlertProps } from "@/interfaces/form/FormInterfaces";


export const FormAlertError: React.FC<FormAlertProps> = ({
	selectedFormPage,
	error,
}) => {
	if (error)
		return (
			<div className="text-red-600">
				{selectedFormPage.incorrect}
			</div>
		);
	return <></>
};

