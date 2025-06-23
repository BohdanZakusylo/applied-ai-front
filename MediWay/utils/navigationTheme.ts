import { Theme, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { LIGHT_COLORS, DARK_COLORS } from '../assets/constants';

/**
 * Create a custom light theme based on React Navigation's DefaultTheme
 * but using our app's color palette
 */
export const lightNavigationTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: String(LIGHT_COLORS.PRIMARY_DARK),
        background: String(LIGHT_COLORS.BACKGROUND),
        card: String(LIGHT_COLORS.WHITE),
        text: String(LIGHT_COLORS.BLACK),
        border: String(LIGHT_COLORS.LIGHT_GRAY),
        notification: String(LIGHT_COLORS.TERTIARY),
    },
};

/**
 * Create a custom dark theme based on React Navigation's DarkTheme
 * but using our app's dark color palette
 */
export const darkNavigationTheme: Theme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: String(DARK_COLORS.PRIMARY_DARK),
        background: String(DARK_COLORS.BACKGROUND),
        card: String(DARK_COLORS.WHITE),  // In our case, this is the dark card color
        text: String(DARK_COLORS.BLACK),  // In our case, this is white for dark mode
        border: String(DARK_COLORS.LIGHT_GRAY),
        notification: String(DARK_COLORS.TERTIARY),
    },
};

/**
 * Get the appropriate navigation theme based on the current app theme
 * @param isDarkMode Whether the app is currently in dark mode
 * @returns The appropriate navigation theme
 */
export const getNavigationTheme = (isDarkMode: boolean): Theme => {
    return isDarkMode ? darkNavigationTheme : lightNavigationTheme;
};
