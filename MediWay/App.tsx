import React from 'react';
import Main from './Main';
import { NavigationContainer } from '@react-navigation/native';
import { UserProvider } from './contexts/UserContext';
import { AuthProvider } from './contexts/AuthContext';
import ThemeProvider from './contexts/ThemeContext';

const App = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <UserProvider>
                    <NavigationContainer>
                        <Main />
                    </NavigationContainer>
                </UserProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
