import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles';
import { BASE_HIT_SLOP } from '../../assets/constants';
import { UserContext } from '../../contexts/UserContext';
import { secureStorage } from '../../services/storage/storage';
import { User } from '../../assets/interfaces';

const GetStarted = () => {
    const [persistentLoginReady, setPersistentLoginReady] = useState<boolean>(false);

    const navigation = useNavigation();
    const { dispatch } = useContext(AuthContext);
    const { dispatch: userDispatch, fetchUser } = useContext(UserContext);

    useEffect(() => {
        const checkLogin = (token?: string) => {
            if (token) {
                fetchUser(token).then((user: User | null) => {
                    if (!user) {
                        checkLogin();
                        return;
                    }
                    userDispatch({ type: 'SET_USER', payload: user });
                    dispatch({ type: 'SET_LOGGED_IN', payload: true });
                    dispatch({ type: 'SET_READY', payload: true });
                    setPersistentLoginReady(true);
                });
            }
            else {
                dispatch({ type: 'SET_LOGGED_IN', payload: false });
                dispatch({ type: 'SET_READY', payload: false });
                setPersistentLoginReady(true);
            }
        };

        const dbJWT = secureStorage.getString('jwt');

        setPersistentLoginReady(false);
        checkLogin(dbJWT);
    }, [dispatch, fetchUser, userDispatch]);

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

    if (!persistentLoginReady) {
        return <></>;
    }

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
