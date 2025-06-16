import { ColorValue } from 'react-native';

/**
 * Light theme colors
 */
export const LIGHT_COLORS: Record<string, ColorValue> = {
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
    
    // Status colors
    SUCCESS: '#4CAF50',
    WARNING: '#FF9800',
    ERROR: '#F44336',
    INFO: '#2196F3',
};

/**
 * Dark theme colors
 */
export const DARK_COLORS: Record<string, ColorValue> = {
    // Primary colors (green range) - vibrant but suitable for dark backgrounds
    PRIMARY_LIGHT: '#20CC60',  // Darker version of light green
    PRIMARY_DARK: '#00CC4B',   // Adjusted to be visible on dark backgrounds
    
    // Secondary colors (blue range) - adjusted for dark background
    SECONDARY_EXTRA_LIGHT: '#2D3B45', // Dark blue-gray
    SECONDARY_LIGHT: '#1A8AD1',       // Darker but still vibrant blue
    SECONDARY_DARK: '#0066A0',        // Adjusted dark blue for contrast
    
    // Tertiary color - slightly adjusted teal
    TERTIARY: '#00A0A8',
    
    // Background - dark with slight blue undertone
    BACKGROUND: '#121212',
    
    // Neutral colors - inverted from light theme
    WHITE: '#1E1E1E',       // Almost black (for areas that were white)
    LIGHT_GRAY: '#3A3A3A',  // Darker gray
    GRAY: '#BBBBBB',        // Lighter gray for better contrast on dark
    BLACK: '#FFFFFF',       // White (for text that was black)
    
    // Button colors - darker versions with enough contrast
    HOME_BUTTON_PRIMARY: '#1C4E31',   // Dark green
    HOME_BUTTON_SECONDARY: '#253540', // Dark blue-gray
    
    // Status colors - adjusted for dark theme
    SUCCESS: '#66BB6A', // Lighter green for dark background
    WARNING: '#FFA726', // Lighter orange for dark background
    ERROR: '#EF5350',   // Lighter red for dark background
    INFO: '#42A5F5',    // Lighter blue for dark background
};

// Export COLORS interface for typing
export type AppColors = typeof LIGHT_COLORS;

/**
 * COLORS export - defaults to light theme
 * Components should ideally use useTheme() hook for theme-aware colors
 */
export const COLORS = LIGHT_COLORS;

/**
 * Get theme-aware colors from anywhere in the app
 * This function will be used behind the scenes by our color utilities
 */
export function getThemeAwareColors(): Record<keyof AppColors, ColorValue> {
  try {
    // In a browser/Node environment, we may not have access to the adapter
    if (typeof require === 'function') {
      // This dynamic require ensures we don't get circular dependencies
      const { getThemeColor } = require('../utils/useColors');
      
      // Create a proxy that will get the correct color based on current theme
      return new Proxy(LIGHT_COLORS, {
        get: (_target, prop: string) => {
          try {
            return getThemeColor(prop as keyof AppColors);
          } catch (e) {
            // Fall back to light theme if there's an error
            return LIGHT_COLORS[prop as keyof AppColors];
          }
        }
      });
    }
  } catch (e) {
    // Fallback if any errors occur
  }
  
  // Default fallback to light theme
  return LIGHT_COLORS;
}

export const BASE_HIT_SLOP: number = 16;
