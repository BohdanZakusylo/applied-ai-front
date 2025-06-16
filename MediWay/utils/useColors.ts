import { useTheme } from '../contexts/ThemeContext';
import type { AppColors } from '../assets/constants';

// Import directly without creating circular dependencies
// We need these colors directly because the constants may import from this file
const LIGHT_COLORS: Record<string, string> = {
  PRIMARY_LIGHT: '#29FF78',
  PRIMARY_DARK: '#00F55A',
  SECONDARY_EXTRA_LIGHT: '#E0EAF0',
  SECONDARY_LIGHT: '#29B0FF',
  SECONDARY_DARK: '#0077B6',
  TERTIARY: '#00B9C1',
  BACKGROUND: '#F6EEF3',
  WHITE: '#FFFFFF',
  LIGHT_GRAY: '#D3D3D3',
  GRAY: '#444444',
  BLACK: '#000000',
  HOME_BUTTON_PRIMARY: '#DEF7E7',
  HOME_BUTTON_SECONDARY: '#E0EAF0',
  SUCCESS: '#4CAF50',
  WARNING: '#FF9800',
  ERROR: '#F44336',
  INFO: '#2196F3',
};

const DARK_COLORS: Record<string, string> = {
  PRIMARY_LIGHT: '#20CC60',
  PRIMARY_DARK: '#00CC4B',
  SECONDARY_EXTRA_LIGHT: '#2D3B45',
  SECONDARY_LIGHT: '#1A8AD1',
  SECONDARY_DARK: '#0066A0',
  TERTIARY: '#00A0A8',
  BACKGROUND: '#121212',
  WHITE: '#1E1E1E',
  LIGHT_GRAY: '#3A3A3A',
  GRAY: '#BBBBBB',
  BLACK: '#FFFFFF',
  HOME_BUTTON_PRIMARY: '#1C4E31',
  HOME_BUTTON_SECONDARY: '#253540',
  SUCCESS: '#66BB6A',
  WARNING: '#FFA726',
  ERROR: '#EF5350',
  INFO: '#42A5F5',
};

// Keep track of current theme for non-hook contexts
let currentTheme: 'light' | 'dark' = 'light';

/**
 * Updates the global current theme - called by ThemeContext when theme changes
 * This allows non-hook code to access the current theme state
 */
export const setGlobalTheme = (theme: 'light' | 'dark'): void => {
  currentTheme = theme;
};

/**
 * Get a specific color from the theme palette without hooks 
 * (for use in non-functional components)
 * @param colorKey The color key from AppColors
 * @returns The color value for the current theme
 */
export const getThemeColor = (colorKey: keyof AppColors | string): string => {
  return currentTheme === 'dark' 
    ? DARK_COLORS[colorKey]
    : LIGHT_COLORS[colorKey];
};

/**
 * Custom hook for accessing theme-aware colors in functional components
 * Use this instead of directly importing COLORS from constants
 * @returns The current theme's color palette
 */
export const useColors = (): AppColors => {
  const { colors } = useTheme();
  return colors;
};

/**
 * Type for dynamic color values that can adapt to theme
 */
export type DynamicColor = {
  light: string;
  dark: string;
};

/**
 * Utility function to create dynamic colors
 * This allows defining light/dark specific colors inline
 * @param light Light theme color value
 * @param dark Dark theme color value
 * @returns Object with light and dark color values
 */
export const createDynamicColor = (light: string, dark: string): DynamicColor => ({
  light,
  dark,
});

/**
 * Get correct color value from DynamicColor object based on current theme
 * For use in non-functional components where hooks can't be used
 * @param dynamicColor Object with light/dark color values
 * @returns The appropriate color for the current theme
 */
export const getDynamicColor = (dynamicColor: DynamicColor): string => {
  return currentTheme === 'dark' ? dynamicColor.dark : dynamicColor.light;
};

/**
 * Hook version of getDynamicColor for use in functional components
 * @param dynamicColor Object with light/dark color values
 * @returns The appropriate color for the current theme
 */
export const useDynamicColor = (dynamicColor: DynamicColor): string => {
  const { isDarkMode } = useTheme();
  return isDarkMode ? dynamicColor.dark : dynamicColor.light;
};
