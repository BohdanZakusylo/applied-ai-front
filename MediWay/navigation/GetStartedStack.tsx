//used only for displaying and navigation for get started screens
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from '../screens/GetStarted/GetStarted';
import Splash from '../screens/Splash/Splash';
import MoreInfo from '../screens/MoreInfo/MoreInfo';
import { useTheme } from '../contexts/ThemeContext';

const Stack = createStackNavigator();

function GetStartedStack() {
    // Get theme colors
    const { colors } = useTheme();
    
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // This removes the header completely
                // Even though headers are hidden, we still set theme-aware styles
                // in case any screen overrides the headerShown option
                headerStyle: {
                    backgroundColor: String(colors.PRIMARY_DARK),
                },
                headerTintColor: String(colors.WHITE),
                // Theme-aware card styles
                cardStyle: {
                    backgroundColor: String(colors.BACKGROUND)
                }
            }}
        >
            <Stack.Screen name="SplashScreen" component={Splash} />
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="MoreInfo" component={MoreInfo} />
        </Stack.Navigator>
    );
}

export default GetStartedStack;
