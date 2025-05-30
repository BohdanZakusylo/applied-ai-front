//used only for displaying and navigatiion for get started screens
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from '../screens/GetStarted/GetStarted';

const Stack = createStackNavigator();

function GetStartedStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="GetStarted" component={GetStarted} />
        </Stack.Navigator>
    );
};

export default GetStartedStack;