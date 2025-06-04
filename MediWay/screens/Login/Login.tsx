import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image,
} from 'react-native';
import Button from '../../components/Button/Button';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles';
import { BASE_HIT_SLOP, COLORS } from '../../assets/constants';

interface LoginProps {
    onBack?: () => void;
    onRegisterPress?: () => void;
    onForgotPasswordPress?: () => void;
}

const LoginScreen: React.FC<LoginProps> = ({
    onRegisterPress,
    onForgotPasswordPress,
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { dispatch } = useContext(AuthContext);

    const onLoginSuccess = () => {
        dispatch({ type: 'SET_LOGGED_IN', payload: true });
    };

    const handleLogin = async () => {
        onLoginSuccess();
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Login successful', [
                    { text: 'OK', onPress: onLoginSuccess },
                ]);
            } else {
                Alert.alert('Login Failed', data.detail || 'Invalid credentials');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Image
                            source={require('../../assets/images/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>Login here</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Enter your email"
                                placeholderTextColor={COLORS.LIGHT_GRAY}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Enter your password"
                                placeholderTextColor={COLORS.LIGHT_GRAY}
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                spellCheck={false}
                                textContentType="password"
                                passwordRules=""
                                autoComplete="current-password"
                            />
                        </View>

                        <TouchableOpacity hitSlop={BASE_HIT_SLOP} onPress={onForgotPasswordPress} style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <Button
                            label={loading ? 'Logging in...' : 'Login'}
                            buttonProps={{
                                onPress: handleLogin,
                                disabled: loading,
                                style: loading && styles.disabledButton,
                            }}
                        />

                        <View style={styles.registerContainer}>
                            <Text style={styles.registerText}>If you don't have an account yet,{' '}</Text>
                            <TouchableOpacity hitSlop={BASE_HIT_SLOP} onPress={onRegisterPress}>
                                <Text style={styles.registerLink}>Register here</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginScreen;
