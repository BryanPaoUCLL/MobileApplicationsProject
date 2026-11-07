export const en = {
	common: {
		login: "Log in",
		logout: "Log out",
	},
	navigation: {
		dashboard: "Dashboard",
		details: "Purchase details",
	},
	landing: {
		eyebrow: "A CLEARER VIEW OF GAMING SPEND",
		title: "Track every game purchase. Compare every region.",
		description:
			"Lavish Gamers helps you record games, microtransactions, and subscriptions, compare prices across currencies, and understand what you spend.",
		loginCta: "Start tracking ✧",
		footer: "Built for players who want to make more informed spending decisions.",
		features: {
			track: {
				eyebrow: "TRACK",
				title: "See where your money goes",
				description:
					"Keep games, microtransactions, downloadable content, and subscriptions together in one clear overview.",
			},
			compare: {
				eyebrow: "COMPARE",
				title: "Compare regional prices",
				description:
					"Convert prices into one currency to discover whether the same purchase costs less in another region.",
			},
			understand: {
				eyebrow: "UNDERSTAND",
				title: "Turn purchases into insights",
				description:
					"Use spending totals and category breakdowns to understand your spending habits over time.",
			},
		},
	},
	login: {
		title: "Welcome back",
		emailLabel: "Email",
		emailPlaceholder: "you@example.com",
		passwordLabel: "Password",
		errorFallback: "Login failed. Check your credentials.",
	},
	dashboard: {
		welcome: "Welcome, {{name}}",
		welcomeFallback: "Welcome",
		description: "Your spending overview will appear here.",
		emptyTitle: "No purchases yet",
		emptyDescription: "Add your first game purchase to start building your spending overview.",
	},
	details: {
		title: "Purchase details",
		id: "ID: {{id}}",
		placeholder: "Purchase information will appear here.",
	},
} as const;
