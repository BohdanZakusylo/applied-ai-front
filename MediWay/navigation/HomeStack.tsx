//used only for displaying and navigatiion for Home Screens
import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreenStack from './HomeScreenStack';
import ChatBotScreen from '../screens/ChatBot/ChatBotScreen';
import FaqScreen from '../screens/FaQ/FaqScreen';
import Profile from '../screens/Profile/Profile'

const Tab = createBottomTabNavigator();

const HomeStack = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size }) => {
                    let icon;
                    if (route.name === 'Home') {
                        icon = require('../assets/images/bottom-tabs/bottom-home.png');
                    } else if (route.name === 'FaQ') {
                        icon = require('../assets/images/bottom-tabs/bottom-faq.png');
                    } else if (route.name === 'Chat') {
                        icon = require('../assets/images/bottom-tabs/bottom-chat.png');
                    } else if (route.name === 'Profile') {
                        icon = require('../assets/images/bottom-tabs/bottom-profile.png');
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
            <Tab.Screen name="Home" component={HomeScreenStack} />
            <Tab.Screen name="FaQ" component={FaqScreen} />
            <Tab.Screen name="Chat" component={ChatBotScreen} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

export default HomeStack;