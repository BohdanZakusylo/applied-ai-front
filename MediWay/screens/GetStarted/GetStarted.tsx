import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles';
import { BASE_HIT_SLOP } from '../../assets/constants';

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
                        hitSlop={BASE_HIT_SLOP}
                        style={styles.getStartedButton}
                        onPress={handleGetStarted}
                    >
                        <Text style={styles.getStartedButtonText}>Get started</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        hitSlop={BASE_HIT_SLOP}
                        style={styles.loginButton}
                        onPress={handleLogin}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    hitSlop={BASE_HIT_SLOP}
                    style={styles.helpTextContainer}
                    onPress={handleWhyAccount}
                >
                    <Text style={styles.helpText}>Why do I need an account?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default GetStarted;
