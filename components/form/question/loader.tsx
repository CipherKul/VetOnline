import React from 'react';
import Link from 'next/link';

interface FormLoad {
	title?: string;
	diagnos?: string | undefined;
}

const LinkForwarding: { [key: string]: string } = {
	"default": "/payment/checkout",
	"viktnedgang": "/checkout/provtagningsplats",
	"viktkampanj": "/checkout/provtagningsplats",
	"viktprovkampanj": "/checkout/provtagningsplats",
	"viktbyte": "/checkout/viktnedgang/byte"
};

export const FormLoader: React.FC<FormLoad> = ({ diagnos }) => (
	<div className="flex flex-col mx-auto max-w-sm p-4 h-full items-center justify-center">
		<div className="space-y-4 w-full animate-pulse">
			<div className="flex justify-center">
				<div className="h-2.5 bg-gray-200 rounded-full w-2/3"></div>
			</div>
			<div className="flex justify-center">
				<div className="h-3 bg-gray-200 rounded-full w-2/3"></div>
			</div>
			<div className="flex justify-center">
				<div className="h-60 w-60 bg-gray-200 rounded-sm"></div>
			</div>

		</div>
		{
			diagnos && LinkForwarding[diagnos]
				? <Link href={LinkForwarding[diagnos]} className="mt-8 border border-2 border-rogreen-600 rounded-lg text-rogreen-600 p-2 px-4 w-full text-center">
					Gå vidare
				</Link>
				: <Link href="/payment/checkout" className="mt-8 border border-2 border-rogreen-600 rounded-lg text-rogreen-600 p-2 px-4 w-full text-center">
					Gå vidare
				</Link>
		}
	</div>
);


export const MyLoader: React.FC<{ title: string }> = ({ title }) => (
	<div
		className="MyLoaderRootContainer"
		style={{
			display: "flex",
			margin: "auto auto",
			flexDirection: "column",
		}}
	>
		<h1 style={{ textAlign: "center", fontFamily: "IBM" }}>
			{title}
		</h1>
		<div
		>
			<rect x="47" y="18" rx="2" ry="2" width="169" height="10" />
			<rect x="18" y="62" rx="2" ry="2" width="234" height="234" />
			<rect x="47" y="37" rx="2" ry="2" width="168" height="11" />
			<rect x="26" y="314" rx="0" ry="0" width="89" height="28" />
			<rect x="154" y="314" rx="0" ry="0" width="89" height="28" />
		</div>
	</div>
);
