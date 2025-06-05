//used only for displaying and navigatiion for get started screens
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from '../screens/GetStarted/GetStarted';
import Splash from '../screens/Splash/Splash';
import MoreInfo from '../screens/MoreInfo/MoreInfo';

const Stack = createStackNavigator();

function GetStartedStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // This removes the header completely
            }}
        >
            <Stack.Screen name="SplashScreen" component={Splash} />
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="MoreInfo" component={MoreInfo} />
        </Stack.Navigator>
    );
}

export default GetStartedStack;
