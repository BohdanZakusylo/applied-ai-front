import { ColorValue } from 'react-native';

/**
 * Light theme colors (original colors)
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
};

/**
 * Dark theme colors
 */
export const DARK_COLORS: Record<string, ColorValue> = {
    // Primary colors (green range) - slightly darker/muted but still vibrant
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
};

// Current app theme - exported as COLORS to maintain compatibility with existing code
// Default to light theme
export const COLORS = LIGHT_COLORS;

export const BASE_HIT_SLOP: number = 16;
