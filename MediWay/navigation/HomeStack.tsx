import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import WorkInProgress from '../screens/WorkInProgress/WorkInProgress';
import NearbyGP from '../screens/NearbyGP/NearbyGP';
import Feedback from '../screens/Feedback/Feedback';
import ChatBot from '../screens/ChatBot/ChatBot';

const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='HomeScreen'>
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="NearbyGP" component={NearbyGP} />
        <Stack.Screen name="WorkInProgress" component={WorkInProgress} />
        <Stack.Screen name="ChatScreen" component={ChatBot} />
        <Stack.Screen name="FeedbackScreen" component={Feedback} />
    </Stack.Navigator>
);

export default HomeStack;
