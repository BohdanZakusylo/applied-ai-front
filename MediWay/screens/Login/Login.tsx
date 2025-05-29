import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button/Button';
import { useState } from 'react';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        // TODO: Add actual login logic
        console.log('Logging in with', email, password);
    };

    const handleNavigateToRegister = () => {
        navigation.navigate('Register');
    };

    const handleNavigateToReset = () => {
        navigation.navigate('PasswordReset');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Login here</Text>

            <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleNavigateToReset}>
                <Text style={styles.link}>Forgot password?</Text>
            </TouchableOpacity>

            <Button label="Login" buttonProps={{ onPress: handleLogin }} />

            <TouchableOpacity onPress={handleNavigateToRegister}>
                <Text style={styles.linkBottom}>If you do not have an account, Register here</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
