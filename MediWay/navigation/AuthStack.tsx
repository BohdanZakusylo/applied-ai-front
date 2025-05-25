//used only for displaying and navigatiion for Login/SignUp
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';

const Stack = createStackNavigator();

interface AuthStackProps {
    onBack?: () => void;
    onLoginSuccess?: () => void;
    initialRoute?: string;
}

function AuthStack({ onBack, onLoginSuccess, initialRoute = 'Login' }: AuthStackProps) {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
            <Stack.Screen name="Login">
                {(props) => (
                    <Login 
                        {...props} 
                        onBack={onBack} 
                        onLoginSuccess={onLoginSuccess}
                        onRegisterPress={() => props.navigation.navigate('Register')}
                        onForgotPasswordPress={() => props.navigation.navigate('ForgotPassword')}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="Register">
                {(props) => (
                    <Register 
                        {...props} 
                        onBack={() => {
                            if (props.navigation.canGoBack()) {
                                props.navigation.goBack();
                            } else if (onBack) {
                                onBack();
                            }
                        }}
                        onRegisterSuccess={onLoginSuccess}
                        onLoginPress={() => props.navigation.navigate('Login')}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="ForgotPassword">
                {(props) => (
                    <ForgotPassword 
                        {...props} 
                        onBack={() => {
                            if (props.navigation.canGoBack()) {
                                props.navigation.goBack();
                            } else if (onBack) {
                                onBack();
                            }
                        }}
                        onLoginPress={() => props.navigation.navigate('Login')}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default AuthStack;