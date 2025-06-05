import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Dimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Splash = () => {
    const navigation = useNavigation();
    const loadingAnimation = useRef(new Animated.Value(0)).current;
    const { width } = Dimensions.get('window');

    // Loading bar width (80% of screen width)
    const loadingBarWidth = width * 0.6;

    useEffect(() => {
        // Animate the loading bar
        Animated.timing(loadingAnimation, {
            toValue: 1,
            duration: 2000, // 2 seconds to complete
            useNativeDriver: false,
        }).start(() => {
            // Navigate to GetStarted screen after animation completes
            (navigation as any).navigate('GetStarted');
        });
    }, [loadingAnimation, navigation]);

    // Calculate the width of the filled part of the loading bar
    const fillWidth = loadingAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, loadingBarWidth],
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <View style={[styles.loadingBar, { width: loadingBarWidth }]}>
                    <Animated.View
                        style={[
                            styles.loadingFill,
                            { width: fillWidth },
                        ]}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Splash;
