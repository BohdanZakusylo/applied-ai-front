import React, { useContext } from 'react';
import AuthStack from './navigation/AuthStack';
import HomeStack from './navigation/HomeStack';
import GetStartedStack from './navigation/GetStartedStack';
import { AuthContext } from './contexts/AuthContext';

const Main = () => {
    const { state: { loggedIn, ready } } = useContext(AuthContext);

    return (
        <>
            {ready ? (
                loggedIn ? (
                    <HomeStack />
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
