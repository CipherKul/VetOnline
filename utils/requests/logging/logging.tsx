export async function logLocation(inputText: string) {
	const utmSource = localStorage.getItem("utm_source");
	const utmMedium = localStorage.getItem("utm_medium");
	const utmCampaign = localStorage.getItem("utm_campaign");

	// Build the URL with UTM parameters
	const urlPath = process.env.NEXT_PUBLIC_API_BASE_URL! + process.env.NEXT_PUBLIC_API_LOG_LOCATION_PATH! + inputText;
	const url = new URL(`${urlPath}${inputText}`);
	if (utmSource) url.searchParams.append("utm_source", utmSource);
	if (utmMedium) url.searchParams.append("utm_medium", utmMedium);
	if (utmCampaign)
		url.searchParams.append("utm_campaign", utmCampaign);

	try {
		const response = await fetch(url, {
			method: "GET",
			credentials: "include"
		})
		if (!response.ok) {
			throw new Error("Could not log");
		}
	} catch (error) {
		console.log(error);
	}
};
