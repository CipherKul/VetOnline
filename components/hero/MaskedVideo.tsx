'use client'
import React, { useEffect, createRef } from "react";
import { FormattedSubtitle } from "../text/formatted";
import styles from "@/styles/Main.module.css";
import Link from "next/link";


const isSafari = () => {
	const ua = navigator.userAgent.toLowerCase();
	return ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0;
};

interface MaskedHeroContainerProps {
	title: string;
	subtitle?: string;
	btnStyle: string;
	preselDia: string;
	fillcolor: string;
	btncolor: string;
	btntext?: string;
	highlighting?: string;
	vidsrc: string;
	poster: string;
	textcolor: string;
	titleSize?: { base: string, md: string };
	lineheight?: string;
	kampanj?: boolean;
	pointers?: string[];
}

const Pointers: string[] = [
	"Upp till 22% viktminskning",
	"Skräddarsydd behandling, från 495kr",
	"Tillgängliga dygnet runt"
]

export const MaskedHeroContainer: React.FC<
	MaskedHeroContainerProps
> = ({
	title,
	subtitle,
	fillcolor,
	textcolor,
	highlighting = "black",
	vidsrc,
	poster,
	kampanj = false,
	pointers = Pointers,
}) => {
		const videoParentRef = createRef<HTMLVideoElement>();
		async function playVid() {
			try {
				await videoParentRef.current?.play();
			} catch (err) {
				console.log(err);
			}
		}

		const formatText = (text: string) => {
			const parts = text.split(/(\*\*.*?\*\*)|(__.*?__)/g);

			return parts.map((part, index) => {
				if (part?.startsWith('**') && part?.endsWith('**')) {
					// Remove the ** markers and apply styling
					const content = part.slice(2, -2);
					return (
						<span
							key={index}
							className="font-bold text-red-600"
							style={{ color: highlighting }}
						>
							{content}
						</span>
					);
				} else if (part?.startsWith('__') && part?.endsWith('__')) {
					const content = part.slice(2, -2);
					return (
						<span
							key={index}
							className="font-bold text-gray-500"
						>
							{content}
						</span>
					)
				}
				return part;
			});
		};
		useEffect(() => {
			if (isSafari()) {
				playVid();
			}
			return () => { };
		});

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
				} catch (error) {
					console.log(error);
					throw new Error("Could not set the session");
				}
			}
			getSessionid();
			return () => { };
		}, []);
		return (
			<div className="items-center content-center font-[Inter-Regular]}
			flex flex-col-reverse md:flex-row w-full h-auto mb-2 lg:mb-0" style={{ background: fillcolor, color: textcolor }}>
				<div
					className="w-full lg:w-1/2 my-4"
				>
					<div className="basis-full lg:basis-[45%] px-2 lg:px-0 lg:ml-24 z-20">
						<div
							className="text-lg md:text-xl font-[Inter-ExtraBold] mb-0.5 md:leading-4 leading-3"
						>
							{title}
						</div>
						{subtitle && (
							<FormattedSubtitle
								subtitle={subtitle}
								highlighting={highlighting}
							/>
						)}
						<div className="space-y-3 pb-2 md:py-5">
							{pointers.map((pointer, key) => (
								<p key={key} className="flex items-center">
									<span className="w-[30px] h-[30px] bg-[#B2FFE4] flex items-center justify-center rounded-full">
										<svg width="15" height="15" viewBox="0 0 52 54" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
											<path d="M0.225025 34.8436C-0.313286 36.8557 0.476625 39.0203 2.1667 40.183C8.069 44.1979 21.3702 53.0772 24.3523 53.7074C28.2102 54.5192 30.2493 50.1977 31.3404 47.8734C32.4314 45.5491 50.9685 11.085 51.486 6.2374C51.9981 1.39085 47.7171 -0.425986 45.4906 1.59598C41.0331 5.64674 25.9226 40.148 24.7914 41.6736C23.6437 43.2022 22.0454 42.7806 18.6069 40.5981C16.5938 39.3083 11.1414 35.3731 7.00506 32.3505C4.45066 30.4866 1.02448 31.7669 0.225025 34.8436Z" fill="#004E49">
											</path>
										</svg>
									</span>
									<span className="text-rogreen-600 font-[Inter-Medium] text-base lg:text-[22px] ml-2">
										{formatText(pointer)}
									</span>
								</p>
							))}
							<Link href="/formular?q=fasting&redirectPath=/checkout/payment/" prefetch={true} className="bg-rogreen-600 px-4 py-2 text-white rounded-xl">Få recept</Link>
						</div>
					</div>
				</div>
				<div className="w-full lg:w-auto h-[300px] md:h-[600px] lg:h-auto lg:mt-auto relative" style={{ height: "clamp(250px, 75vw, 500px)" }}>
					<video
						className={styles.MaskedHeroContainer}
						preload="metadata"
						width="100%"
						height="auto"
						autoPlay
						playsInline
						muted
						loop
						webkit-playsinline="true"
						ref={videoParentRef}
						poster={poster}
					>
						<source src={vidsrc} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
					{kampanj ?
						<div
							className="absolute -rotate-[0.3rad] w-32 h-32 rounded-full bg-rogreen-400 bottom-0 right-0 lg:left-24 lg:top-24 text-center items-center justify-center flex flex-col shadow-lg"
						>
							<span className="font-[Inter-SemiBold]">Just nu!</span>
							<span className="text-2xl text-red-600 font-[Inter-SemiBold]">395kr</span>
							<span className="text-xs font-[Inter-SemiBold] text-rogray-400">Ord. 695kr</span>
						</div>
						: <></>
					}
				</div>
			</div>
		);
	};
