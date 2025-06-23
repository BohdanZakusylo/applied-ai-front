import React, { useContext } from 'react';
import AuthStack from './navigation/AuthStack';
import TabsStack from './navigation/TabsStack';
import GetStartedStack from './navigation/GetStartedStack';
import { AuthContext } from './contexts/AuthContext';
import { StatusBar } from 'react-native';
import { useTheme } from './contexts/ThemeContext';

const Main = () => {
    const { state: { loggedIn, ready } } = useContext(AuthContext);
    const { isDarkMode } = useTheme();

    return (
        <>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            {ready ? (
                loggedIn ? (
                    <TabsStack />
                ) : (
                    <AuthStack />
                )
            ) : (
                <GetStartedStack />
            )}
        </>
    );
};

export default Main;
