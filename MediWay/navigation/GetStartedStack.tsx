//used only for displaying and navigatiion for get started screens
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from '../screens/GetStarted/GetStarted';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import MoreInfo from '../screens/MoreInfo/MoreInfo';

const Stack = createStackNavigator();

interface GetStartedStackProps {
    onLoginPress?: () => void;
    onRegisterPress?: () => void;
}

function GetStartedStack({ onLoginPress, onRegisterPress }: GetStartedStackProps) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false // This removes the header completely
            }}
        >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="GetStarted">
                {(props) => (
                    <GetStarted 
                        {...props} 
                        onLoginPress={onLoginPress}
                        onRegisterPress={onRegisterPress}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="MoreInfo">
                {(props) => (
                    <MoreInfo 
                        {...props} 
                        onLoginPress={onLoginPress}
                        onRegisterPress={onRegisterPress}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default GetStartedStack;