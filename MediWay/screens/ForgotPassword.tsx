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
import Button from '../components/Button/Button';
import { COLORS } from '../assets/constants';
import { StyleSheet } from 'react-native';

interface ForgotPasswordProps {
  onBack?: () => void;
  onLoginPress?: () => void;
  onCodeSent?: (email: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onBack,
  onLoginPress,
  onCodeSent,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          'Code Sent',
          'A 6-digit reset code has been sent to your email. Check your inbox and enter the code.',
          [
            {
              text: 'OK',
              onPress: () => onCodeSent?.(email.trim()),
            },
          ]
        );
      } else {
        Alert.alert('Error', data.detail || 'Failed to send reset code');
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
              source={require('../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Reset your Password</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#00000060"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <Button
              label={loading ? 'Sending Code...' : 'Send Reset Code'}
              buttonProps={{
                onPress: handleSendCode,
                disabled: loading,
                style: loading && styles.disabledButton,
              }}
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Remembered your password? </Text>
              <TouchableOpacity onPress={onLoginPress}>
                <Text style={styles.loginLink}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: -30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#00000080',
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.BLACK,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#00000030',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: COLORS.WHITE,
  },
  disabledButton: {
    opacity: 0.6,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: '#00000080',
  },
  loginLink: {
    fontSize: 14,
    color: COLORS.TERTIARY,
    fontWeight: '500',
  },
});

export default ForgotPassword; 