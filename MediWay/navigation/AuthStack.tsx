//used only for displaying and navigatiion for Login/SignUp
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import MoreInfo from '../screens/MoreInfo/MoreInfo'

const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="MoreInfo" component={MoreInfo} options={{headerShown: false}} />
        </Stack.Navigator>
    );
};

export default AuthStack;