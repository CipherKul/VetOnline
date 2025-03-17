
import React from "react";
import styles from "@/styles/Main.module.css";

const ReviewBanner: React.FC = () => {
	return (
		<div className={`bg-rogreen-400 py-2 px-4 font-[Inter-Medium] text-rogreen-600 ${styles.ReviewBanner}`}>
			<div className="container mx-auto grid grid-cols-1 md:grid-cols-2">
				<div className="flex flex-col justify-center items-center py-6 border-b-2 md:border-b-0 md:border-r-2 border-[#CCCCCC]">
					<h4 className="text-[30px] md:text-3xl font-[Inter-Medium] tracking-tight">4,9 av 5</h4>
					<p className="text-base font-[Inter-Regular] text-center">i betyg av djurägare</p>
				</div>
				<div className="flex flex-col justify-center items-center py-6">
					<h4 className="text-[30px] md:text-3xl font-[Inter-Medium] tracking-tight">+10 000</h4>
					<p className="text-base font-[Inter-Regular] text-center mb-1">djur har fått vård</p>
				</div>
			</div>
		</div>
	);
};

export default ReviewBanner;
