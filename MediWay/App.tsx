import React from 'react';
import Main from './Main';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './contexts/UserContext';
import { AuthProvider } from './contexts/AuthContext';
import ThemeProvider, { useTheme } from './contexts/ThemeContext';
import { getNavigationTheme } from './utils/navigationTheme';

/**
 * Main App component with theme-aware navigation
 */
const App = () => {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
};

/**
 * App content with access to theme context
 * This is needed because the theme context is only available inside ThemeProvider
 */
const AppContent = () => {
    // Get current theme to determine navigation theme
    const { isDarkMode } = useTheme();
    const navigationTheme = getNavigationTheme(isDarkMode);

    return (
        <AuthProvider>
            <UserProvider>
                <NavigationContainer theme={navigationTheme}>
                    <Main />
                </NavigationContainer>
            </UserProvider>
        </AuthProvider>
    );
};

export default App;
