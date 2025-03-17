"use client"

import { ImageUploadFormProps } from "@/interfaces/form/FormInterfaces";
import React, { useState, useEffect } from "react";
import { json } from "stream/consumers";

export const ImageUploadForm: React.FC<ImageUploadFormProps> = ({
	buttonClick,
	selectedFormPage,
}) => {
	const [imageInput, setImageInput] = useState([0]); // You can generate or fetch this value based on your needs
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [sessionInitialized, setSessionInitialized] = useState(false);

	useEffect(() => {
		const getSessionid = async () => {
			try {
				const targetUrl = process.env.NEXT_PUBLIC_API_BASE_URL! + process.env.NEXT_PUBLIC_API_CREDENTIALS_PATH!
				const response = await fetch(targetUrl, {
					"method": "GET",
					"credentials": "include"
				})
				if (!response.ok) {
					console.log("Could not set the sessionid");
				}
				setSessionInitialized(true);
			} catch (error) {
				console.log(error);
				setSessionInitialized(false);
				throw new Error("Could not set the session");
			}
		}
		getSessionid();
	}, []);

	const addImageInput = () => {
		if (imageInput.length < 10) {
			setImageInput([...imageInput, imageInput.length]);
		}
	};

	const handleImageChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {

		if (!sessionInitialized) {
			console.error('Session not initialized. Cannot upload image.');
			return;
		}
		const file = e.target.files![0];
		const formData = new FormData();
		formData.append("image", file);
		setBtnDisabled(false);

		try {
			const url = process.env.NEXT_PUBLIC_API_BASE_URL! + process.env.NEXT_PUBLIC_API_IMAGE_SUBMISSION_PATH!;
			// TODO: this needs to be corrected, we are submitting an image 
			// form as a content-type application/json
			const response = await fetch(url, { method: "POST", credentials: "include", body: JSON.stringify(formData) })

			if (!response.ok) {
				throw new Error("Could not upload image");
			}
		} catch (error) {
			console.error("Error uploading image:", error);
		}
	};

	useEffect(() => {
		return () => { };
	}, [imageInput]);

	if (!sessionInitialized) {
		return <div>Initierar session...</div>;
	}

	return (
		<>
			<h2 className="!text-[18px]">{selectedFormPage.question}</h2>
			{imageInput.map((_, index) => {
				return (
					<div key={index} className="font-[Inter-Regular] mt-2">
						<input
							className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
							id={`image${index}`}
							type="file"
							onChange={handleImageChange}
							accept="image/*"
						/>
					</div>
				);
			})}
			<div className="flex flex-col mt-2 text-sm">
				<button
					className="mr-2 text-primary-green border border-primary-green p-1 rounded-lg font-[Inter-Medium]"
					type="button"
					onClick={addImageInput}
				>
					Ladda upp en till bild
				</button>
				<button
					className="mt-2"
					type="button"
					onClick={() => {
						setBtnDisabled(true);
						setImageInput([0]);
					}}
				>
					Återställ
				</button>
			</div>
			<div
				className={styles.Form_QuestionOptBtnsContainer}
				id="continueButton"
			>
				<Button
					className={styles.Form_QuestionOptBtnsContainer}
					isDisabled={btnDisabled}
					onClick={() => {
						buttonClick?.(null);
					}}
				>
					Fortsätt
				</Button>
			</div>
		</>
	);
};
