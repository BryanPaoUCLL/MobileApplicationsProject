import { useState } from "react";
import { Redirect, router } from "expo-router";
import { Modal, Pressable, StyleSheet, View, useColorScheme, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
	const { width } = useWindowDimensions();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const isMobile = width < 700;

	const navigateFromMenu = (route: "/" | "/login" | "/overview") => {
		setIsMenuOpen(false);
		router.push(route);
	};

	if (isInitialized && isAuthenticated) {
		return <Redirect href="/overview" />;
	}

	return (
		<Screen padding="none">
			<View style={[styles.headerBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
				<View style={styles.headerContent}>
					<View style={styles.headerLeading}>
						{isMobile && (
							<Pressable
								accessibilityLabel={t("navigation.openMenu")}
								accessibilityRole="button"
								hitSlop={8}
								onPress={() => setIsMenuOpen(true)}
								style={({ pressed }) => [
									styles.menuButton,
									{ backgroundColor: colors.accentSoft },
									pressed && styles.pressed,
								]}
							>
								<View style={[styles.menuLine, { backgroundColor: colors.accentText }]} />
								<View style={[styles.menuLine, { backgroundColor: colors.accentText }]} />
								<View style={[styles.menuLine, { backgroundColor: colors.accentText }]} />
							</Pressable>
						)}

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
					</View>

					{!isMobile && (
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
					)}
				</View>
			</View>

			<Modal animationType="fade" onRequestClose={() => setIsMenuOpen(false)} transparent visible={isMenuOpen}>
				<View style={styles.menuOverlay}>
					<SafeAreaView style={[styles.menuPanel, { backgroundColor: colors.background }]}>
						<View style={[styles.menuHeader, { borderColor: colors.border }]}>
							<Text size="lg" weight="bold">
								{t("navigation.menu")}
							</Text>
							<Pressable
								accessibilityLabel={t("navigation.closeMenu")}
								accessibilityRole="button"
								hitSlop={8}
								onPress={() => setIsMenuOpen(false)}
								style={({ pressed }) => [styles.closeButton, pressed && styles.pressed]}
							>
								<Text size="xl" weight="bold">
									×
								</Text>
							</Pressable>
						</View>

						<View style={styles.menuItems}>
							<Pressable
								accessibilityRole="button"
								onPress={() => navigateFromMenu("/")}
								style={({ pressed }) => [
									styles.menuItem,
									{ borderColor: colors.border },
									pressed && { backgroundColor: colors.surface },
								]}
							>
								<Text size="lg" weight="bold">
									{t("navigation.home")}
								</Text>
							</Pressable>

							<Pressable
								accessibilityRole="button"
								onPress={() => navigateFromMenu("/login")}
								style={({ pressed }) => [
									styles.menuItem,
									{ borderColor: colors.border },
									pressed && { backgroundColor: colors.surface },
								]}
							>
								<Text size="lg" weight="bold">
									{t("common.login")}
								</Text>
							</Pressable>

							<Pressable
								accessibilityRole="button"
								onPress={() => navigateFromMenu("/(app)/overview")}
								style={({ pressed }) => [
									styles.menuItem,
									{ borderColor: colors.border },
									pressed && { backgroundColor: colors.surface },
								]}
							>
								<Text size="lg" weight="bold">
									{t("navigation.overview")}
								</Text>
							</Pressable>
						</View>
					</SafeAreaView>

					<Pressable
						accessibilityLabel={t("navigation.closeMenu")}
						accessibilityRole="button"
						onPress={() => setIsMenuOpen(false)}
						style={styles.menuBackdrop}
					/>
				</View>
			</Modal>

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
	headerLeading: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		flexShrink: 1,
	},
	menuButton: {
		width: 44,
		height: 44,
		alignItems: "center",
		justifyContent: "center",
		gap: 4,
		borderRadius: 12,
	},
	menuLine: {
		width: 20,
		height: 2,
		borderRadius: 999,
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
	menuOverlay: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "rgba(0, 0, 0, 0.48)",
	},
	menuPanel: {
		width: "82%",
		maxWidth: 320,
	},
	menuHeader: {
		minHeight: 72,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottomWidth: 1,
	},
	closeButton: {
		width: 44,
		height: 44,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 12,
	},
	menuItems: {
		padding: 16,
		gap: 8,
	},
	menuItem: {
		minHeight: 52,
		paddingHorizontal: 16,
		justifyContent: "center",
		borderBottomWidth: 1,
		borderRadius: 10,
	},
	menuBackdrop: {
		flex: 1,
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
