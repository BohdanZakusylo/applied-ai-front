import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './Login/styles';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Button from '../../components/Button/Button';

const Register = () => {
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const handleRegister = () => {
        // TODO: Add actual registration logic
        console.log('Registering:', { firstName, lastName, email, password, repeatPassword });
    };

    const handleNavigateToLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Register here</Text>

            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />

            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />

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

            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Repeat Password"
                    secureTextEntry={!showRepeatPassword}
                    value={repeatPassword}
                    onChangeText={setRepeatPassword}
                />
                <TouchableOpacity onPress={() => setShowRepeatPassword(!showRepeatPassword)}>
                    <Text style={styles.eyeIcon}>{showRepeatPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
            </View>

            <Button label="Register" buttonProps={{ onPress: handleRegister }} />

            <TouchableOpacity onPress={handleNavigateToLogin}>
                <Text style={styles.linkBottom}>If you already have an account, Login here</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Register;
