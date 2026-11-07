import type { ColorSchemeName } from 'react-native';

const sharedColors = {
  accent: '#F6C445',
  accentPressed: '#DDAA24',
  buttonText: '#17120A',
  danger: '#DC2626',
} as const;

const lightColors = {
  background: '#FFFFFF',
  surface: '#F8F8F5',
  text: '#171717',
  mutedText: '#5F6368',
  border: '#E5E5DF',
  accentSoft: '#FFF4C2',
  accentText: '#7A5100',
  inputBackground: '#FFFFFF',
} as const;

const darkColors = {
  background: '#0B0B0B',
  surface: '#181816',
  text: '#FAFAF9',
  mutedText: '#B9B9B3',
  border: '#353530',
  accentSoft: '#3A300E',
  accentText: '#F6C445',
  inputBackground: '#181816',
} as const;

export function getThemeColors(colorScheme: ColorSchemeName) {
  return {
    ...sharedColors,
    ...(colorScheme === 'dark' ? darkColors : lightColors),
  };
}
