import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import WorkInProgress from '../screens/WorkInProgress/WorkInProgress';

const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="WorkInProgress" component={WorkInProgress} />
    </Stack.Navigator>
);

export default HomeStack;
