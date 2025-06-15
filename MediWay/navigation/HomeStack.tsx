import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import WorkInProgress from '../screens/WorkInProgress/WorkInProgress';
import NearbyGP from '../screens/NearbyGP/NearbyGP';

const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='HomeScreen'>
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="NearbyGP" component={NearbyGP} />
        <Stack.Screen name="WorkInProgress" component={WorkInProgress} />
    </Stack.Navigator>
);

export default HomeStack;
