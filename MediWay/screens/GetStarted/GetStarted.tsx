import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/AuthContext';

const GetStarted = () => {
    const navigation = useNavigation();
    const { dispatch } = useContext(AuthContext);

    const handleGetStarted = () => {
        dispatch({ type: 'SET_INITIAL_ROUTE', payload: 'Register' });
        dispatch({ type: 'SET_READY', payload: true });
    };

    const handleLogin = () => {
        dispatch({ type: 'SET_INITIAL_ROUTE', payload: 'Login' });
        dispatch({ type: 'SET_READY', payload: true });
    };

    const handleWhyAccount = () => {
        // Navigate to MoreInfo screen
        (navigation as any).navigate('MoreInfo');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Image
                    source={require('../../assets/images/getStartedImage.png')}
                    style={styles.illustration}
                    resizeMode="contain"
                />

                <Text style={styles.tagline}>
                    A clear path through the{'\n'}
                    medical system
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.getStartedButton}
                        onPress={handleGetStarted}
                    >
                        <Text style={styles.getStartedButtonText}>Get started</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.helpTextContainer}
                    onPress={handleWhyAccount}
                >
                    <Text style={styles.helpText}>Why do I need an account?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    logo: {
        width: 200,
        height: 60,
        marginBottom: 20,
    },
    illustration: {
        width: '100%',
        height: 400,
        marginVertical: 20,
    },
    tagline: {
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 40,
        color: '#333333',
        lineHeight: 24,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 20,
    },
    getStartedButton: {
        backgroundColor: '#29B0FF',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    getStartedButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#29B0FF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    helpTextContainer: {
        marginTop: 20,
        marginBottom: 40,
    },
    helpText: {
        color: '#666666',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});

export default GetStarted;
