export const FormattedSubtitle = ({ subtitle, highlighting = "black" }: { subtitle: string, highlighting: string }) => {
	// Function to parse and format the text
	const formatText = (text: string) => {
		const parts = text.split(/(\*\*.*?\*\*)/g);

		return parts.map((part, index) => {
			if (part.startsWith('**') && part.endsWith('**')) {
				// Remove the ** markers and apply styling
				const content = part.slice(2, -2);
				return (
					<span className="bg-[url('/assets/images/hero-path.png')] bg-center bg-contain bg-no-repeat px-0"
						key={index}
						style={{ color: highlighting, overflow: "visible" }}
					>
						{content}
					</span>
				);
			}
			return part;
		});
	};

	return (
		<h2 className="text-[30px] md:text-4xl leading-8 md:leading-10 font-[Inter-ExtraBold] mb-4 tracking-tight">
			{subtitle && formatText(subtitle)}
		</h2>
	);
};
