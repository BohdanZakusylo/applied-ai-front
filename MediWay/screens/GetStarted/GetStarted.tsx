import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
    const navigation = useNavigation();

    const handleGetStarted = () => {
        // Navigate to registration or next onboarding screen
        (navigation as any).navigate('Login');
    };

    const handleLogin = () => {
        // Navigate to login screen
        (navigation as any).navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.headerText}>get started</Text>
                
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
                    A clear path through the{"\n"}
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
                
                <TouchableOpacity style={styles.helpTextContainer}>
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
    headerText: {
        fontSize: 16,
        color: '#333333',
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    logo: {
        width: 200,
        height: 60,
        marginBottom: 20,
    },
    illustration: {
        width: '100%',
        height: 300,
        marginVertical: 20,
    },
    tagline: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 30,
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
        backgroundColor: '#00FFAA',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
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
        color: '#00FFAA',
        fontWeight: 'bold',
        fontSize: 16,
    },
    helpTextContainer: {
        marginTop: 'auto',
        marginBottom: 20,
    },
    helpText: {
        color: '#666666',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});

export default GetStarted;