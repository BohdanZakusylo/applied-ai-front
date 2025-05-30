import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const LOGO = require('../../assets/images/logo.png');

export default function WelcomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={LOGO} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Why do I need an account?</Text>

      <Text style={styles.text}>
        This app helps international students in the Netherlands understand their health insurance and avoid unexpected costs.
      </Text>

      <Text style={styles.text}>Creating an account lets us:</Text>
      <Text style={styles.bullet}>• Save your insurance details securely</Text>
      <Text style={styles.bullet}>• Keep track of your questions and chatbot history</Text>
      <Text style={styles.bullet}>• Give you personalized advice when you need it</Text>

      <Text style={styles.text}>
        Your information stays private and is only used to help you navigate the Dutch healthcare system more easily.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.primaryButtonText}>Get started</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.secondaryButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  logo: { width: '100%', height: 96, marginTop: 32, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  text: { fontSize: 16, marginBottom: 12, lineHeight: 22 },
  bullet: { fontSize: 16, marginLeft: 12, marginBottom: 8 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 24 },
  primaryButton: { backgroundColor: '#00C9A7', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10 },
  primaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  secondaryButton: { backgroundColor: '#f0f0ff', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10 },
  secondaryButtonText: { color: '#333', fontWeight: 'bold', fontSize: 16 },
});