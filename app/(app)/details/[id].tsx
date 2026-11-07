import { useLocalSearchParams } from 'expo-router';
import { Screen } from '../../../src/components/primitives/Screen';
import { Stack } from '../../../src/components/primitives/Stack';
import { Text } from '../../../src/components/primitives/Text';
import { useTranslation } from 'react-i18next';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();

  console.log('Detail screen opened for item:', id);

  return (
    <Screen padding="lg">
      <Stack gap="md">
        <Text size="xl" weight="bold">{t('details.title')}</Text>
        <Text size="sm">{t('details.id', { id })}</Text>
        <Text>{t('details.placeholder')}</Text>
      </Stack>
    </Screen>
  );
}

