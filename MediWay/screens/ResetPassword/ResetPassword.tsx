import React, { useState } from 'react';
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
import { ENDPOINTS } from '../../assets/api';
import styles from './styles';
import { BASE_HIT_SLOP, COLORS } from '../../assets/constants';

interface ResetPasswordProps {
    email: string;
    onBack?: () => void;
    onPasswordResetSuccess?: () => void;
    onResendCode?: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
    email,
    onPasswordResetSuccess,
    onResendCode,
}) => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        if (!code.trim()) {
            Alert.alert('Error', 'Please enter the 6-digit code');
            return false;
        }

        if (code.trim().length !== 6) {
            Alert.alert('Error', 'Code must be 6 digits');
            return false;
        }

        if (!newPassword) {
            Alert.alert('Error', 'Please enter a new password');
            return false;
        }

        if (newPassword.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters long');
            return false;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return false;
        }

        return true;
    };

    const handleResetPassword = async () => {
        if (!validateForm()) { return; }

        setLoading(true);
        try {
            const response = await fetch(ENDPOINTS.resetPassword, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    code: code.trim(),
                    new_password: newPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert(
                    'Success',
                    'Your password has been reset successfully!',
                    [
                        {
                            text: 'OK',
                            onPress: onPasswordResetSuccess,
                        },
                    ]
                );
            } else {
                // Handle specific error cases
                if (response.status === 400) {
                    const errorMessage = data.detail || 'Invalid or expired code';
                    if (errorMessage.includes('expired')) {
                        Alert.alert(
                            'Code Expired',
                            'Your reset code has expired. Please request a new one.',
                            [
                                { text: 'Cancel', style: 'cancel' },
                                { text: 'Resend Code', onPress: onResendCode },
                            ]
                        );
                    } else {
                        Alert.alert('Invalid Code', 'The code you entered is incorrect. Please try again.');
                    }
                } else {
                    Alert.alert('Error', data.detail || 'Failed to reset password');
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
                        <Text style={styles.title}>Reset Password</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>6-Digit Code</Text>
                            <TextInput
                                style={styles.input}
                                value={code}
                                onChangeText={setCode}
                                placeholder="Enter 6-digit code"
                                placeholderTextColor={COLORS.LIGHT_GRAY}
                                keyboardType="numeric"
                                maxLength={6}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>New Password</Text>
                            <TextInput
                                style={styles.input}
                                value={newPassword}
                                onChangeText={setNewPassword}
                                placeholder="Enter new password (8+ characters)"
                                placeholderTextColor={COLORS.LIGHT_GRAY}
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                spellCheck={false}
                                textContentType="newPassword"
                                passwordRules=""
                                autoComplete="new-password"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Confirm New Password</Text>
                            <TextInput
                                style={styles.input}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Confirm new password"
                                placeholderTextColor={COLORS.LIGHT_GRAY}
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                                spellCheck={false}
                                textContentType="newPassword"
                                passwordRules=""
                                autoComplete="new-password"
                            />
                        </View>

                        <Button
                            label={loading ? 'Resetting Password...' : 'Reset Password'}
                            buttonProps={{
                                onPress: handleResetPassword,
                                disabled: loading,
                                style: loading && styles.disabledButton,
                            }}
                        />

                        <View style={styles.resendContainer}>
                            <Text style={styles.resendText}>Didn't receive the code? </Text>
                            <TouchableOpacity hitSlop={BASE_HIT_SLOP} onPress={onResendCode}>
                                <Text style={styles.resendLink}>Resend Code</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ResetPassword;
