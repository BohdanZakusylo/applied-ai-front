import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

const WelcomeScreen = ({ onGetStarted, onLogin }: WelcomeScreenProps) => {
  return (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.content}>
        {/* App icon */}
        <View style={styles.iconContainer}>
          <View style={styles.icon} />
        </View>
        
        {/* Tagline */}
        <Text style={styles.tagline}>tagline</Text>
      </View>

      {/* Bottom buttons */}
      <View style={styles.buttonContainer}>
        {/* Get started button */}
        <TouchableOpacity style={styles.getStartedButton} onPress={onGetStarted}>
          <Text style={styles.getStartedText}>Get started</Text>
        </TouchableOpacity>
        
        {/* Login button */}
        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 60,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 120,
  },
  icon: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#D1D5DB',
  },
  tagline: {
    fontSize: 18,
    fontWeight: '400',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
  },
  getStartedButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1,
  },
  loginText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default WelcomeScreen; 