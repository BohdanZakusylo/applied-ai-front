//used only for displaying and navigation for Login/SignUp/ForgotPassword
import React, { useContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import ResetPassword from '../screens/ResetPassword/ResetPassword';
import { AuthContext } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Stack = createStackNavigator();

interface AuthStackProps {
    onBack?: () => void;
}

function AuthStack({ onBack }: AuthStackProps) {
    const [resetEmail, setResetEmail] = useState<string>('');
    const { state: { initialRoute } } = useContext(AuthContext);
    const { colors, isDarkMode } = useTheme();

    return (
        <Stack.Navigator 
            screenOptions={{ 
                headerShown: false,
                // Apply theme-aware styling to any headers that might be shown
                headerStyle: {
                    backgroundColor: String(colors.PRIMARY_DARK),
                },
                headerTintColor: String(colors.WHITE),
                // Apply theme-aware styling to cards
                cardStyle: {
                    backgroundColor: String(colors.BACKGROUND)
                }
            }} 
            initialRouteName={initialRoute}>
            <Stack.Screen name="Login">
                {(props) => (
                    <Login
                        {...props}
                        onBack={onBack}
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
}

export default AuthStack;
