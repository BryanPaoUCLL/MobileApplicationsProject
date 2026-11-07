import { useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Redirect, router } from "expo-router";
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
		return <Redirect href="/dashboard" />;
	}

	const handleLogin = async () => {
		setError("");
		try {
			await login(email, password);
			router.replace("/dashboard");
		} catch (loginError) {
			setError(loginError instanceof Error ? loginError.message : t("login.errorFallback"));
		}
	};

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
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
});
