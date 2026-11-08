import { useState } from "react";
import { Pressable, StyleSheet, View, useColorScheme } from "react-native";
import { Redirect, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../src/state/useAuthStore";
import { InputField } from "../src/components/primitives/InputField";
import { StyledButton } from "../src/components/StyledButton";
import { Stack } from "../src/components/primitives/Stack";
import { Text } from "../src/components/primitives/Text";
import { getThemeColors } from "../src/theme/theme";
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { login, isAuthenticated, isInitialized, isLoading } = useAuthStore();
	const colors = getThemeColors(useColorScheme());
	const { t } = useTranslation();

	if (isInitialized && isAuthenticated) {
		return <Redirect href="/overview" />;
	}

	const handleLogin = async () => {
		setError("");
		try {
			await login(email, password);
			router.replace("/overview");
		} catch (loginError) {
			setError(loginError instanceof Error ? loginError.message : t("login.errorFallback"));
		}
	};

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
			<View style={styles.closeRow}>
				<Pressable
					accessibilityLabel={t("login.close")}
					accessibilityRole="button"
					hitSlop={8}
					onPress={() => router.replace("/")}
					style={({ pressed }) => [
						styles.closeButton,
						{ backgroundColor: colors.surface, borderColor: colors.border },
						pressed && styles.pressed,
					]}
				>
					<Ionicons color={colors.text} name="close" size={28} />
				</Pressable>
			</View>
			<Stack gap="lg" padding="lg">
				<Text size="xl" weight="bold" align="center">
					{t("login.title")}
				</Text>
				<InputField
					label={t("login.emailLabel")}
					value={email}
					onChangeText={setEmail}
					placeholder={t("login.emailPlaceholder")}
					testID="email-input"
				/>
				<InputField
					label={t("login.passwordLabel")}
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					testID="password-input"
					error={error !== "" ? error : undefined}
				/>
				<StyledButton
					label={t("common.login")}
					onPress={handleLogin}
					isLoading={isLoading}
					testID="login-button"
				/>
			</Stack>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	closeRow: {
		minHeight: 56,
		alignItems: "flex-end",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	closeButton: {
		width: 44,
		height: 44,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderRadius: 12,
	},
	pressed: {
		opacity: 0.72,
	},
});
