import React, { use, useContext, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { ENDPOINTS } from '../../assets/api';

interface RegisterProps {
    onBack?: () => void;
    onLoginPress?: () => void;
}

const RegisterScreen: React.FC<RegisterProps> = ({
    onLoginPress,
}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        insuranceProvider: '',
        generalPractitioner: '',
        medicalInformation: '',
    });
    const [loading, setLoading] = useState(false);

    const { dispatch } = useContext(AuthContext);

    const navigation = useNavigation();

    const onRegisterSuccess = () => {
        (navigation as any).navigate("Login");
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        if (!formData.email.trim() || !formData.password || !formData.name.trim()) {
            Alert.alert('Error', 'Please fill in all required fields');
            return false;
        }

        if (formData.password.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters long');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return false;
        }

        return true;
    };

    const handleRegister = async () => {
        if (!validateForm()) { return; }

        setLoading(true);
        try {
            const response = await fetch(ENDPOINTS.register, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email.trim(),
                    password: formData.password,
                    name: formData.name.trim(),
                    insurance_provider: formData.insuranceProvider.trim() || null,
                    general_practitioner: formData.generalPractitioner.trim() || null,
                    medical_information: formData.medicalInformation.trim() || null,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Account created successfully!', [
                    { text: 'OK', onPress: onRegisterSuccess },
                ]);
            } else {
                // Handle specific error cases
                if (response.status === 409) {
                    Alert.alert(
                        'Email Already Registered',
                        'An account with this email address already exists. Please use a different email or try logging in instead.',
                        [
                            { text: 'OK', style: 'default' },
                            { text: 'Go to Login', onPress: onLoginPress, style: 'default' },
                        ]
                    );
                } else if (response.status === 422) {
                    Alert.alert('Validation Error', data.detail || 'Please check your input and try again');
                } else if (response.status === 400) {
                    Alert.alert('Error', data.detail || 'Please fill in all required fields');
                } else {
                    Alert.alert('Registration Failed', data.detail || 'Registration failed. Please try again.');
                }
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
                        <Text style={styles.title}>Register here</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Name *</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.name}
                                onChangeText={(value) => handleInputChange('name', value)}
                                placeholder="Enter your full name"
                                placeholderTextColor={COLORS.LIGHT_GRAY}
                                autoCapitalize="words"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email *</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.email}
                                onChangeText={(value) => handleInputChange('email', value)}
                                placeholder="Enter your email"
                                placeholderTextColor={COLORS.LIGHT_GRAY}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password *</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.password}
                                onChangeText={(value) => handleInputChange('password', value)}
                                placeholder="Enter your password (8+ characters)"
                                placeholderTextColor={COLORS.LIGHT_GRAY}
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                spellCheck={false}
                                textContentType="password"
                                passwordRules=""
                                autoComplete="new-password"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Confirm Password *</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.confirmPassword}
                                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                                placeholder="Confirm your password"
                                placeholderTextColor={COLORS.LIGHT_GRAY}
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                spellCheck={false}
                                textContentType="password"
                                passwordRules=""
                                autoComplete="new-password"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Insurance Provider</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.insuranceProvider}
                                onChangeText={(value) => handleInputChange('insuranceProvider', value)}
                                placeholder="e.g., Zilveren Kruis, VGZ (optional)"
                                placeholderTextColor={COLORS.LIGHT_GRAY}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>General Practitioner</Text>
                            <TextInput
                                style={styles.input}
                                value={formData.generalPractitioner}
                                onChangeText={(value) => handleInputChange('generalPractitioner', value)}
                                placeholder="Your GP name (optional)"
                                placeholderTextColor={COLORS.LIGHT_GRAY}
                            />
                        </View>

                        <Button
                            label={loading ? 'Creating Account...' : 'Create Account'}
                            buttonProps={{
                                onPress: handleRegister,
                                disabled: loading,
                                style: loading && styles.disabledButton,
                            }}
                        />

                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>If you already have an account </Text>
                            <TouchableOpacity hitSlop={BASE_HIT_SLOP} onPress={onLoginPress}>
                                <Text style={styles.loginLink}>Login here</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RegisterScreen;
