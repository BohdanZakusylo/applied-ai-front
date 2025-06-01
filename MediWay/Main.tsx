import React, { useState } from 'react';
import AuthStack from './navigation/AuthStack';
import HomeStack from './navigation/HomeStack';
import GetStartedStack from './navigation/GetStartedStack';

const Main = () => {
    const [isReady, setIsReady] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to false to see auth screens
    const [initialAuthRoute, setInitialAuthRoute] = useState('Login');

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handleGoToLogin = () => {
        setInitialAuthRoute('Login');
        setIsReady(true); 
    };

    const handleGoToRegister = () => {
        setInitialAuthRoute('Register');
        setIsReady(true); 
    };

    return (
        <>
            {isReady ? (
                isLoggedIn ? (
                    <HomeStack />
                ) : (
                    <AuthStack 
                        onLoginSuccess={handleLoginSuccess}
                        initialRoute={initialAuthRoute}
                    />
                )
            ) : (
                <GetStartedStack 
                    onLoginPress={handleGoToLogin}
                    onRegisterPress={handleGoToRegister}
                />
            )}
        </>
    );
};

export default Main;
