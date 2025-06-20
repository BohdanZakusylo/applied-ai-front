import { Image, ImageSourcePropType } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import Faq from '../screens/FaQ/Faq';
import ChatBot from '../screens/ChatBot/ChatBot';
import Profile from '../screens/Profile/Profile';
import { useTheme } from '../contexts/ThemeContext';
import Deadlines from '../screens/Deadlines/Deadlines';

const Tab = createBottomTabNavigator();

const ICONS: Record<string, ImageSourcePropType> = {
    Home: require('../assets/images/bottom-tabs/bottom-home.png'),
    FaQ: require('../assets/images/bottom-tabs/bottom-faq.png'),
    Chat: require('../assets/images/bottom-tabs/bottom-chat.png'),
    Profile: require('../assets/images/bottom-tabs/bottom-profile.png'),
    Deadlines: require('../assets/images/bottom-tabs/bottom-deadline.png'),
    Default: require('../assets/images/bottom-tabs/bottom-profile.png'),
};

const TabsStack = () => {
    // Get theme colors
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                const icon = route.name in ICONS ? ICONS[route.name] : ICONS.Default;

                return {
                    tabBarIcon: ({ focused, size }: { focused: boolean; color: string; size: number }) => {
                        return (
                            <Image
                                source={icon}
                                style={{
                                    width: size,
                                    height: size,
                                    tintColor: focused ? colors.PRIMARY_DARK : colors.GRAY,
                                }}
                                resizeMode="contain"
                            />
                        );
                    },
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarActiveTintColor: String(colors.PRIMARY_DARK),
                    tabBarInactiveTintColor: String(colors.GRAY),
                    headerShown: false,
                };
            }}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="FaQ" component={Faq} />
            <Tab.Screen name="Chat" component={ChatBot} />
            <Tab.Screen name="Deadlines" component={Deadlines} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

export default TabsStack;
