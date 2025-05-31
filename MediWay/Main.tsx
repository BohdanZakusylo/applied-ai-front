import React, { useState } from 'react';
import AuthStack from './navigation/AuthStack';
import HomeStack from './navigation/HomeStack';
import GetStartedStack from './navigation/GetStartedStack';

const Main = () => {
    const [isReady, setIsReady] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to false to see auth screens

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <>
            {isReady ? (
                isLoggedIn ? (
                    <HomeStack />
                ) : (
                    <AuthStack 
                        onLoginSuccess={handleLoginSuccess}
                        initialRoute="Login"
                    />
                )
            ) : (
                <GetStartedStack />
            )}
        </>
    );
};

export default Main;
