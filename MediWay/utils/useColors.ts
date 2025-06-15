import { useTheme } from '../contexts/ThemeContext';
import { AppColors } from '../assets/constants';

/**
 * Custom hook for accessing theme-aware colors
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
 * Get the correct color based on current theme
 * Used with createDynamicColor for inline theme-specific colors
 * @param dynamicColor Dynamic color object
 * @returns The appropriate color for current theme
 */
export const getThemeColor = (dynamicColor: DynamicColor): string => {
  const { isDarkMode } = useTheme();
  return isDarkMode ? dynamicColor.dark : dynamicColor.light;
};
