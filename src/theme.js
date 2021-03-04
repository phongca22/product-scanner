import { DarkTheme, DefaultTheme } from 'react-native-paper';
import { DarkTheme as Dark, DefaultTheme as Light } from '@react-navigation/native';
export const themes = {
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      accent: '#d50000'
    },
    isDark: true,
    navigation: Dark
  },
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#673ab7',
      accent: '#ffc107'
    },
    navigation: Light
  }
};
