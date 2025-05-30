//used only for displaying and navigatiion for get started screens
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from '../screens/GetStarted/GetStarted';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
const Stack = createStackNavigator();

function GetStartedStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false // This removes the header completely
            }}
        >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="GetStarted" component={GetStarted} />
        </Stack.Navigator>
    );
};

export default GetStartedStack;