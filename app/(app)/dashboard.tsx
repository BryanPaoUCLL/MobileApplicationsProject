import { EmptyState } from "../../src/components/primitives/EmptyState";
import { Screen } from "../../src/components/primitives/Screen";
import { Stack } from "../../src/components/primitives/Stack";
import { Text } from "../../src/components/primitives/Text";
import { StyledButton } from "../../src/components/StyledButton";
import { useAuthStore } from "../../src/state/useAuthStore";
import { useTranslation } from "react-i18next";

export default function DashboardScreen() {
	const user = useAuthStore((state) => state.user);
	const logout = useAuthStore((state) => state.logout);
	const { t } = useTranslation();

	return (
		<Screen padding="lg">
			<Stack gap="lg">
				<Text size="xl" weight="bold">
					{user !== null ? t("dashboa rd.welcome", { name: user.name }) : t("dashboard.welcomeFallback")}
				</Text>
				<Text>{t("dashboard.description")}</Text>
				<EmptyState title={t("dashboard.emptyTitle")} description={t("dashboard.emptyDescription")} />
				<StyledButton label={t("common.logout")} onPress={logout} variant="secondary" />
			</Stack>
		</Screen>
	);
}
