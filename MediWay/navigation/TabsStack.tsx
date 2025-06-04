//used only for displaying and navigatiion for Home Screens
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import Faq from '../screens/FaQ/Faq';
import ChatBot from '../screens/ChatBot/ChatBot';

const Tab = createBottomTabNavigator();

const TabsStack = () => {
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
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="FaQ" component={Faq} />
            <Tab.Screen name="Chat" component={ChatBot} />
            {/* <Tab.Screen name="Profile" component={Profile} /> */}
        </Tab.Navigator>
    );
};

export default TabsStack;
