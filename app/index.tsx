import { Redirect, router } from "expo-router";
import { Pressable, StyleSheet, View, useColorScheme } from "react-native";
import { Screen } from "../src/components/primitives/Screen";
import { Text } from "../src/components/primitives/Text";
import { useAuthStore } from "../src/state/useAuthStore";
import { getThemeColors } from "../src/theme/theme";
import { useTranslation } from "react-i18next";

const featureKeys = ["track", "compare", "understand"] as const;

export default function LandingScreen() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const isInitialized = useAuthStore((state) => state.isInitialized);
	const colors = getThemeColors(useColorScheme());
	const { t } = useTranslation();

	if (isInitialized && isAuthenticated) {
		return <Redirect href="/dashboard" />;
	}

	return (
		<Screen padding="none">
			<View style={[styles.headerBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
				<View style={styles.headerContent}>
					<View style={styles.brand}>
						<View style={[styles.brandMark, { backgroundColor: colors.accent }]}>
							<Text color={colors.buttonText} weight="bold">
								LG
							</Text>
						</View>
						<Text size="lg" weight="bold">
							Lavish Gamers
						</Text>
					</View>

					<Pressable
						accessibilityRole="button"
						onPress={() => router.push("/login")}
						style={({ pressed }) => [
							styles.loginLink,
							{ backgroundColor: colors.accentSoft },
							pressed && styles.pressed,
						]}
					>
						<Text color={colors.accentText} weight="bold">
							{t("common.login")}
						</Text>
					</Pressable>
				</View>
			</View>

			<View style={styles.page}>
				<View style={styles.hero}>
					{/* <View style={[styles.heroLabel, { backgroundColor: colors.accentSoft }]}>
            <Text size="sm" color={colors.accentText} weight="bold">
              {t('landing.eyebrow')}
            </Text>
          </View> */}

					<Text size="xl" weight="bold" align="center">
						{t("landing.title")}
					</Text>

					<Text size="lg" color={colors.mutedText} align="center">
						{t("landing.description")}
					</Text>

					<Pressable
						accessibilityRole="button"
						onPress={() => router.push("/login")}
						style={({ pressed }) => [
							styles.primaryButton,
							{ backgroundColor: pressed ? colors.accentPressed : colors.accent },
							pressed && styles.pressed,
						]}
					>
						<Text color={colors.buttonText} weight="bold">
							{t("landing.loginCta")}
						</Text>
					</Pressable>
				</View>

				<View style={styles.features}>
					{featureKeys.map((featureKey) => (
						<View
							key={featureKey}
							style={[
								styles.featureCard,
								{ backgroundColor: colors.surface, borderColor: colors.border },
							]}
						>
							<Text size="sm" color={colors.accentText} weight="bold">
								{t(`landing.features.${featureKey}.eyebrow`)}
							</Text>
							<Text size="lg" weight="bold">
								{t(`landing.features.${featureKey}.title`)}
							</Text>
							<Text color={colors.mutedText}>{t(`landing.features.${featureKey}.description`)}</Text>
						</View>
					))}
				</View>

				<View style={styles.footer}>
					<Text size="sm" color={colors.mutedText} align="center">
						{t("landing.footer")}
					</Text>
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
		paddingHorizontal: 24,
		paddingBottom: 32,
	},
	headerBar: {
		width: "100%",
		borderBottomWidth: 1,
	},
	headerContent: {
		width: "100%",
		maxWidth: 960,
		alignSelf: "center",
		minHeight: 72,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 24,
	},
	brand: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	brandMark: {
		width: 36,
		height: 36,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	loginLink: {
		minHeight: 44,
		paddingHorizontal: 16,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 12,
	},
	hero: {
		alignItems: "center",
		gap: 20,
		paddingTop: 72,
		paddingBottom: 64,
	},
	heroLabel: {
		paddingHorizontal: 14,
		paddingVertical: 7,
		borderRadius: 999,
	},
	primaryButton: {
		minHeight: 50,
		paddingHorizontal: 24,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 14,
	},
	pressed: {
		opacity: 0.75,
	},
	features: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 16,
	},
	featureCard: {
		flexGrow: 1,
		flexBasis: 240,
		gap: 10,
		padding: 22,
		borderWidth: 1,
		borderRadius: 18,
	},
	footer: {
		paddingTop: 48,
	},
});
