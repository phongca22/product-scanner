import { DarkTheme, DefaultTheme } from 'react-native-paper';

export const themes = {
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      accent: '#d50000'
    },
    isDark: true
  },
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#673ab7',
      accent: '#ffc107'
    }
  }
};
