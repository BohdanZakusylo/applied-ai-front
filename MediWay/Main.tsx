import React, { useContext } from 'react';
import AuthStack from './navigation/AuthStack';
import TabsStack from './navigation/TabsStack';
import GetStartedStack from './navigation/GetStartedStack';
import { AuthContext } from './contexts/AuthContext';
import { StatusBar } from 'react-native';

const Main = () => {
    const { state: { loggedIn, ready } } = useContext(AuthContext);

    return (
        <>
            <StatusBar
                barStyle="dark-content"
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
