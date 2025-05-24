//used only for displaying and navigatiion for Home Screens
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Test2 from '../screens/Test2';

const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Test2" component={Test2} />
        </Tab.Navigator>
    );
};

export default HomeStack;