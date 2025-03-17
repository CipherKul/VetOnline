module.exports = {
	content: [
		"./components/**/*.tsx",
		"./pages/**/*.tsx",
		"./public/**/*.html",
		"./app/**/*.tsx",
		"./utils/**/*.tsx",
		"./utils/*.tsx",
	], //add this line
	theme: {
		extend: {
			boxShadow: {
				"custom-inset": "inset 0 10px 10px 0px rgba(0, 0, 0, 0.1)"
			},
			colors: {
				"primary-green": "#004E49",
				"primary-greenhover": "#012A28",
				"cool-green": "#F3FFF6",
				"light-gray": "#404040",
				lightgray: "#D9D9D9",
				black: "#000000",
				darkgray: "#787878",
				rogray: {
					200: "#F5F5F5",
					300: "#EAEAEA",
					400: "#787878",
					500: "#414042",
					600: "#f0f2f5",
					700: "#252525"
				},
				rogreen: {
					300: "#DFF1E9",
					400: "#F3FFF6",
					500: "#61A570",
					600: "#004E49",
					700: "#57AD97",
					800: "#6AA896"
				},
				roneon: {
					300: "#F0FCEE",
					400: "#CFEFD6",
					500: "#B2FFE4",
					600: "#27AE60"
				},
				rosecondgreen: {
					200: "#EBFEEB",
					300: "#57AD97",
					400: "#4F8581"
				},
				salmon: { 300: "#FDE7E6", 500: "#BB7271" }
			},
			screens: {
				mdd: "800px",
				mobile: "490px",
				xs: "375px",
				xxs: "320px"
			},
			maxWidth: {
				mdd: "800px",
			},
			keyframes: {
				wiggle: {
					"0%, 100%": { transform: "rotate(-3deg)" },
					"50%": { transform: "rotate(3deg)" },
				},
			},
			fontSize: {
				'xxs': ['10px', { lineHeight: '14px' }],  // You can adjust the line height as needed
			}
		},
	},
	plugins: [],
};
