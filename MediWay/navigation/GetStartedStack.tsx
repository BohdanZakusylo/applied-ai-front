//used only for displaying and navigatiion for get started screens
import { createStackNavigator } from '@react-navigation/stack';
import Test1 from '../screens/Test1';

const Stack = createStackNavigator();

function GetStartedStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Test1" component={Test1} />
        </Stack.Navigator>
    );
};

export default GetStartedStack;