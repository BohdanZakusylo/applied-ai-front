import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './Login/styles';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Button from '../../components/Button/Button';

const ResetPassword = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const handleSend = () => {
        // TODO: Trigger reset logic here
        console.log('Reset password for:', email);
    };

    const goToLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>Reset your password</Text>

            <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Button label="Send" buttonProps={{ onPress: handleSend }} />

            <TouchableOpacity onPress={goToLogin}>
                <Text style={styles.linkBottom}>To go back to the Login, click here</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ResetPassword;
