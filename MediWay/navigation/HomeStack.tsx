import WorkInProgress from '../screens/WorkInProgress/WorkInProgress';
import TabsStack from './TabsStack';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Tabs" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Tabs" component={TabsStack} />
            <Stack.Screen name="WorkInProgress" component={WorkInProgress} />
        </Stack.Navigator>
    );
}

export default HomeStack;
