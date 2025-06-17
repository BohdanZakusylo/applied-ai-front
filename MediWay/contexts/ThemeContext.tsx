import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LIGHT_COLORS, DARK_COLORS } from '../assets/constants';
import { MMKV } from 'react-native-mmkv';
import { setGlobalTheme } from '../utils/useColors';

// Storage to persist theme preference
const storage = new MMKV();
const THEME_STORAGE_KEY = 'user_theme_preference';

// Theme type definition
export type ThemeType = 'light' | 'dark';

// Context state type
interface ThemeState {
    theme: ThemeType;
    colors: typeof LIGHT_COLORS;
    isDarkMode: boolean;
}

// Context actions/methods
interface ThemeContextType extends ThemeState {
    toggleTheme: () => void;
    setTheme: (theme: ThemeType) => void;
}

// Initial theme state - default to light
const initialThemeState: ThemeState = {
    theme: 'light',
    colors: LIGHT_COLORS,
    isDarkMode: false,
};

// Create context with initial state and empty methods
export const ThemeContext = createContext<ThemeContextType>({
    ...initialThemeState,
    toggleTheme: () => {},
    setTheme: () => {},
});

// Custom hook for easier context use
export const useTheme = () => useContext(ThemeContext);

// Props for ThemeProvider component
interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // Get stored theme or default to light
    const savedTheme = storage.getString(THEME_STORAGE_KEY) as ThemeType | undefined;
    
    // Initialize state with saved theme or default
    const [themeState, setThemeState] = useState<ThemeState>({
        theme: savedTheme || 'light',
        colors: savedTheme === 'dark' ? DARK_COLORS : LIGHT_COLORS,
        isDarkMode: savedTheme === 'dark',
    });
    
    // Set the global theme on initial load
    useEffect(() => {
        setGlobalTheme(themeState.theme);
    }, []);

    /**
     * Toggle between light and dark themes
     */
    const toggleTheme = () => {
        const newTheme: ThemeType = themeState.theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    /**
     * Set a specific theme
     * @param theme The theme to set ('light' or 'dark')
     */
    const setTheme = (theme: ThemeType) => {
        // Update theme in storage
        storage.set(THEME_STORAGE_KEY, theme);
        
        // Update global theme state for non-hook contexts
        setGlobalTheme(theme);
        
        // Update state with new theme and corresponding colors
        setThemeState({
            theme,
            colors: theme === 'dark' ? DARK_COLORS : LIGHT_COLORS,
            isDarkMode: theme === 'dark',
        });
    };

    // Provide theme state and methods to children
    return (
        <ThemeContext.Provider
            value={{
                ...themeState,
                toggleTheme,
                setTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
