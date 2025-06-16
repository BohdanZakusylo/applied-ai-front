import { AppColors, getThemeAwareColors } from '../assets/constants';
import { getThemeColor } from './useColors';

/**
 * A theme-aware proxy for COLORS constant
 * This allows code that uses COLORS directly to automatically receive themed colors
 */
export const getColor = (key: keyof AppColors): string => {
  return getThemeColor(key);
};

/**
 * Get the theme-aware colors object that adapts to the current theme state
 * This is the primary way to access themed colors outside of React components
 */
export const themedColors = getThemeAwareColors();

// Export a default object for drop-in replacement of COLORS imports
export default themedColors;
