import { router } from "expo-router";
import { Pressable, StyleSheet, View, useColorScheme } from "react-native";
import { useTranslation } from "react-i18next";
import { Screen } from "../../src/components/primitives/Screen";
import { Text } from "../../src/components/primitives/Text";
import { AppHeader } from "../../src/components/AppHeader";
import { useAuthStore } from "../../src/state/useAuthStore";
import { mockPurchases } from "../../src/data/mockSpending";
import { getThemeColors } from "../../src/theme/theme";
import { formatCurrency } from "../../src/utils/formatCurrency";

export default function OverviewScreen() {
	const colors = getThemeColors(useColorScheme());
	const { t, i18n } = useTranslation();
	const language = i18n.resolvedLanguage ?? "en";
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const visiblePurchases = isAuthenticated ? mockPurchases : [];
	const totalSpentMinor = visiblePurchases.reduce((total, purchase) => total + purchase.amountMinor, 0);

	return (
		<Screen padding="none">
			<AppHeader authenticated={isAuthenticated} />
			<View style={styles.page}>
				<View style={styles.intro}>
					<Text size="xl" weight="bold">
						{t("overview.title")}
					</Text>
					<Text color={colors.mutedText}>{t("overview.subtitle")}</Text>
				</View>

				<View style={[styles.summaryCard, { backgroundColor: colors.accentSoft, borderColor: colors.accent }]}>
					<Text color={colors.accentText} weight="bold">
						{t("overview.lastThirtyDays")}
					</Text>
					<Text size="xl" weight="bold">
						{formatCurrency(totalSpentMinor, "EUR", language)}
					</Text>
					<View style={styles.summaryStats}>
						<View style={styles.stat}>
							<Text color={colors.mutedText} size="sm">
								{t("overview.purchases")}
							</Text>
							<Text size="lg" weight="bold">
								{visiblePurchases.length}
							</Text>
						</View>
						<View style={styles.stat}>
							<Text color={colors.mutedText} size="sm">
								{t("overview.topGame")}
							</Text>
							<Text size="lg" weight="bold">
								{isAuthenticated ? "Overwatch 2" : "—"}
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.section}>
					<Text size="lg" weight="bold">
						{t("overview.recentPurchases")}
					</Text>

					<View style={styles.purchaseList}>
						{visiblePurchases.map((purchase) => (
							<Pressable
								accessibilityRole="button"
								key={purchase.id}
								onPress={() => router.push({ pathname: "/details/[id]", params: { id: purchase.id } })}
								style={({ pressed }) => [
									styles.purchaseCard,
									{ backgroundColor: colors.surface, borderColor: colors.border },
									pressed && styles.pressed,
								]}
							>
								<View style={[styles.gameInitial, { backgroundColor: colors.accentSoft }]}>
									<Text color={colors.accentText} weight="bold">
										{purchase.gameName.charAt(0)}
									</Text>
								</View>

								<View style={styles.purchaseInfo}>
									<Text weight="bold">{purchase.productName}</Text>
									<Text color={colors.mutedText} size="sm">
										{purchase.gameName} · {t(`categories.${purchase.category}`)}
									</Text>
									<Text color={colors.mutedText} size="sm">
										{t("time.daysAgo", { count: purchase.daysAgo })}
									</Text>
								</View>

								<Text weight="bold">
									{formatCurrency(purchase.amountMinor, purchase.currency, language)}
								</Text>
							</Pressable>
						))}

						{!isAuthenticated && (
							<View
								style={[
									styles.loginPrompt,
									{ backgroundColor: colors.surface, borderColor: colors.border },
								]}
							>
								<View style={[styles.loginPromptIcon, { backgroundColor: colors.accentSoft }]}>
									<Text color={colors.accentText} size="xl" weight="bold">
										LG
									</Text>
								</View>
								<Text size="lg" weight="bold" align="center">
									{t("overview.loginPromptTitle")}
								</Text>
								<Text color={colors.mutedText} align="center">
									{t("overview.loginPromptDescription")}
								</Text>
								<Pressable
									accessibilityRole="button"
									onPress={() => router.push("/login")}
									style={({ pressed }) => [
										styles.loginButton,
										{ backgroundColor: pressed ? colors.accentPressed : colors.accent },
										pressed && styles.pressed,
									]}
								>
									<Text color={colors.buttonText} weight="bold">
										{t("landing.loginCta")}
									</Text>
								</Pressable>
							</View>
						)}
					</View>
				</View>
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	page: {
		width: "100%",
		maxWidth: 960,
		alignSelf: "center",
		gap: 24,
		paddingHorizontal: 24,
		paddingTop: 32,
		paddingBottom: 32,
	},
	intro: {
		gap: 6,
	},
	summaryCard: {
		gap: 12,
		padding: 22,
		borderWidth: 1,
		borderRadius: 20,
	},
	summaryStats: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 24,
		paddingTop: 6,
	},
	stat: {
		minWidth: 120,
		gap: 2,
	},
	section: {
		gap: 12,
	},
	purchaseList: {
		gap: 10,
	},
	purchaseCard: {
		minHeight: 78,
		padding: 14,
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		borderWidth: 1,
		borderRadius: 16,
	},
	gameInitial: {
		width: 44,
		height: 44,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 14,
	},
	purchaseInfo: {
		flex: 1,
		gap: 2,
	},
	pressed: {
		opacity: 0.72,
	},
	loginPrompt: {
		minHeight: 260,
		padding: 28,
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
		borderWidth: 1,
		borderRadius: 18,
	},
	loginPromptIcon: {
		width: 58,
		height: 58,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 4,
		borderRadius: 18,
	},
	loginButton: {
		minHeight: 48,
		paddingHorizontal: 22,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 6,
		borderRadius: 14,
	},
});
