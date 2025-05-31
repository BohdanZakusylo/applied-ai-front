//used only for displaying and navigation for Login/SignUp/ForgotPassword
import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import MoreInfo from '../screens/MoreInfo/MoreInfo'
import Register from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';

const Stack = createStackNavigator();

interface AuthStackProps {
    onBack?: () => void;
    onLoginSuccess?: () => void;
    initialRoute?: string;
}

function AuthStack({ onBack, onLoginSuccess, initialRoute = 'Login' }: AuthStackProps) {
    const [resetEmail, setResetEmail] = useState<string>('');

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
                        onCodeSent={(email) => {
                            setResetEmail(email);
                            props.navigation.navigate('ResetPassword');
                        }}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="ResetPassword">
                {(props) => (
                    <ResetPassword 
                        {...props} 
                        email={resetEmail}
                        onBack={() => {
                            if (props.navigation.canGoBack()) {
                                props.navigation.goBack();
                            } else if (onBack) {
                                onBack();
                            }
                        }}
                        onPasswordResetSuccess={() => {
                            // Navigate back to login after successful password reset
                            props.navigation.navigate('Login');
                        }}
                        onResendCode={() => {
                            // Navigate back to ForgotPassword to resend code
                            props.navigation.navigate('ForgotPassword');
                        }}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default AuthStack;