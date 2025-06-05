import React, { useContext } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Button from '../../components/Button/Button';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles';

const LOGO = require('../../assets/images/logo.png');

export default function MoreInfo() {
    const { dispatch } = useContext(AuthContext);

    const handleRegister = () => {
        dispatch({ type: 'SET_INITIAL_ROUTE', payload: 'Register' });
        dispatch({ type: 'SET_READY', payload: true });
    };

    const handleLogin = () => {
        dispatch({ type: 'SET_INITIAL_ROUTE', payload: 'Login' });
        dispatch({ type: 'SET_READY', payload: true });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />

            <View style={styles.contentWrapper}>
                <Text style={styles.title}>Why do I need an account?</Text>

                <Text style={styles.paragraph}>
                    This app helps international students in the Netherlands understand their health insurance and avoid unexpected costs.
                </Text>

                <Text style={styles.paragraph}>Creating an account lets us:</Text>

                <View style={styles.bullets}>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bulletSymbol}>•</Text>
                        <Text style={styles.bulletText}>Save your insurance details securely</Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bulletSymbol}>•</Text>
                        <Text style={styles.bulletText}>Keep track of your questions and chatbot history</Text>
                    </View>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bulletSymbol}>•</Text>
                        <Text style={styles.bulletText}>Give you personalized advice when you need it</Text>
                    </View>
                </View>

                <Text style={styles.paragraph}>
                    Your information stays private and is only used to help you navigate the Dutch healthcare system more easily.
                </Text>

                <View style={styles.buttonContainer}>
                    <Button
                        label="Get started"
                        buttonProps={{
                            onPress: handleRegister,
                            style: styles.primaryButton,
                        }}
                        textProps={{ style: styles.primaryButtonText }}
                    />
                    <Button
                        label="Login"
                        buttonProps={{
                            onPress: handleLogin,
                            style: styles.secondaryButton,
                        }}
                        textProps={{ style: styles.secondaryButtonText }}
                    />
                </View>
            </View>
        </ScrollView>
    );
}
