import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home';
import Test2 from '../screens/Test2';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

function TabsStack() {
    const HOME_ICON = require('../assets/images/navigation_home.png');

    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={Home} options={{tabBarIcon: () => <Image source={HOME_ICON} style={{width: 20}} resizeMode='contain' />}} />
            <Tab.Screen name="Test2" component={Test2} />
        </Tab.Navigator>
    );
}

export default TabsStack;
