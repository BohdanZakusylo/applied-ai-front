import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Dimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
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
    }, []);
    
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
                            { width: fillWidth }
                        ]} 
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F0FF', // Light purple background from screenshot
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 200,
        height: 60,
        marginBottom: 20,
    },
    loadingBar: {
        height: 4,
        backgroundColor: '#E0E0E0', // Light gray background for loading bar
        borderRadius: 2,
        overflow: 'hidden',
    },
    loadingFill: {
        height: '100%',
        backgroundColor: '#29B0FF', // Green color for the loading fill (matching the design)
        borderRadius: 2,
    }
});

export default SplashScreen;