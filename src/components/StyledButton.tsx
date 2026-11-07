import { Pressable, StyleSheet, useColorScheme } from 'react-native';
import { Spinner } from './primitives/Spinner';
import { Text } from './primitives/Text';
import { getThemeColors } from '../theme/theme';

interface StyledButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  testID?: string;
}

export function StyledButton({
  label,
  onPress,
  variant = 'primary',
  isLoading = false,
  testID,
}: StyledButtonProps) {
  const colors = getThemeColors(useColorScheme());

  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary'
          ? { backgroundColor: pressed ? colors.accentPressed : colors.accent }
          : { backgroundColor: colors.surface, borderColor: colors.border },
        (isLoading || pressed) && styles.disabled,
      ]}
      testID={testID}
    >
      {isLoading ? (
        <Spinner size="small" />
      ) : (
        <Text color={variant === 'primary' ? colors.buttonText : colors.text} weight="bold">
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 12,
  },
  disabled: {
    opacity: 0.72,
  },
});
