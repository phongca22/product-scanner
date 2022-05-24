import { DarkTheme, DefaultTheme } from 'react-native-paper';

export const themes = {
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#9c27b0',
      accent: '#4caf50'
    },
    isDark: true
  },
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#2196f3',
      accent: '#e91e63'
    }
  }
};
