//used only for displaying and navigatiion for Home Screens
import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Test2 from '../screens/Test2';
import Test3 from '../screens/Test3';
import Test4 from '../screens/test4';
import Test5 from '../screens/Test5';

const Tab = createBottomTabNavigator();

const HomeStack = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size }) => {
                    let icon;
                    if (route.name === 'Home') {
                        icon = require('../images/bottom-tabs/bottom-home.png');
                    } else if (route.name === 'Test3') {
                        icon = require('../images/bottom-tabs/bottom-faq.png');
                    } else if (route.name === 'Test4') {
                        icon = require('../images/bottom-tabs/bottom-chat.png');
                    } else if (route.name === 'Test5') {
                        icon = require('../images/bottom-tabs/bottom-profile.png');
                    }

                    return (
                        <Image
                            source={icon}
                            style={{
                                width: size,
                                height: size,
                                tintColor: focused ? '#00FFAA' : '#444',
                            }}
                            resizeMode="contain"
                        />
                    );
                },
                tabBarLabelStyle: { fontSize: 12 },
                tabBarActiveTintColor: '#00FFAA',
                tabBarInactiveTintColor: '#444',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={Test2} />
            <Tab.Screen name="Test3" component={Test3} />
            <Tab.Screen name="Test4" component={Test4} />
            <Tab.Screen name="Test5" component={Test5} />
        </Tab.Navigator>
    );
};

export default HomeStack;