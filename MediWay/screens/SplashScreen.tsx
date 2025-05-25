import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onLoadingComplete?: () => void;
}

const SplashScreen = ({ onLoadingComplete }: SplashScreenProps) => {
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animate the progress bar
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000, // 3 seconds loading time
      useNativeDriver: false,
    }).start(() => {
      // Call the completion callback after animation finishes
      setTimeout(() => {
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, 500);
    });
  }, [onLoadingComplete]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.content}>
        {/* App icon placeholder */}
        <View style={styles.iconContainer}>
          <View style={styles.icon} />
        </View>
        
        {/* App name */}
        <Text style={styles.appName}>MediWay</Text>

        {/* Progress bar below app name */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <Animated.View 
              style={[
                styles.progressBar,
                { width: progressWidth }
              ]} 
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  icon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#D1D5DB',
  },
  appName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    letterSpacing: 1,
    marginBottom: 32,
  },
  progressContainer: {
    width: 200,
  },
  progressBackground: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
});

export default SplashScreen; 