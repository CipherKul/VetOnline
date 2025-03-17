import React from "react";
import { FormButton } from "./buttons";
import styles from "@/styles/Main.module.css";

interface FormImageLinksProps {
	selectedFormPage: any;
	buttonClick: any;
	page: any;
}

export const FormBtnOrImgOpt: React.FC<FormImageLinksProps> = ({
	selectedFormPage,
	buttonClick,
	page,
}) => {
	return (
		<div>
			{Object.keys(selectedFormPage).includes("imageLinks") ? (
				selectedFormPage.imageLinks?.map((imageLink: any, k: any) => {
					return (
						<button
							style={{
								width: "100%",
								border: "3px solid #5e5e5e",
								borderRadius: "30px",
								display: "flex",
							}}
							key={k}
							type="button"
							onClick={() => {
								if (selectedFormPage.nextPageOptions) {
									buttonClick(
										page,
										selectedFormPage.txtalt[k],
										selectedFormPage.opt[k],
										selectedFormPage.nextPageOptions
									);
								} else {
									buttonClick(
										page,
										selectedFormPage.txtalt[k],
										selectedFormPage.opt[k]
									);
								}
							}}
						>
							<img
								src={imageLink}
								alt=""
								key={k}
								style={{ width: "100px" }}
							/>
							<h3 style={{ margin: "auto", paddingRight: "10px" }}>
								{selectedFormPage.txtalt[k]}
							</h3>
						</button>
					);
				})
			) : (
				<div className={styles.Form_QuestionOptBtnsContainer}>
					{selectedFormPage.txtalt?.map((buttontext: any, k: any) => {
						return (
							<FormButton
								key={k}
								onClick={() => {
									if (selectedFormPage.nextPageOptions) {
										buttonClick(
											page,
											selectedFormPage.txtalt[k],
											selectedFormPage.opt[k],
											selectedFormPage.nextPageOptions
										);
									} else {
										buttonClick(
											page,
											selectedFormPage.txtalt[k],
											selectedFormPage.opt[k]
										);
									}
								}}
							>
								{buttontext}
							</FormButton>
						);
					})}
				</div>
			)}
		</div>
	);
};
