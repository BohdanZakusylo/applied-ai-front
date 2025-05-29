//used only for displaying and navigatiion for Home Screens
import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreenStack from './HomeScreenStack';
import ChatBotScreen from '../screens/ChatBot/ChatBotScreen';

const Tab = createBottomTabNavigator();

const HomeStack = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size }) => {
                    let icon;
                    if (route.name === 'Home') {
                        icon = require('../assets/images/bottom-tabs/bottom-home.png');
                    } else if (route.name === 'Test3') {
                        icon = require('../assets/images/bottom-tabs/bottom-faq.png');
                    } else if (route.name === 'Chat') {
                        icon = require('../assets/images/bottom-tabs/bottom-chat.png');
                    } else if (route.name === 'Test5') {
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
            {/* <Tab.Screen name="FAQ" component={Faq} /> */}
            <Tab.Screen name="Chat" component={ChatBotScreen} />
            {/* <Tab.Screen name="Profile" component={Profile} /> */}
        </Tab.Navigator>
    );
};

export default HomeStack;