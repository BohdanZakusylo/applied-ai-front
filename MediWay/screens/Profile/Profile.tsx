import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const AVATAR = require('../../assets/images/avatar-placeholder.png');

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={AVATAR} style={styles.avatar} resizeMode="contain" />
      <Text style={styles.name}>JOHN DOE</Text>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
        </View>
        <Text style={styles.itemText}>Email: john.doe@email.com</Text>
        <Text style={styles.itemText}>Password: •••••••</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Other</Text>
        </View>
        <Text style={styles.itemText}>Insurance Provider: None</Text>
        <Text style={styles.itemText}>General Practitioner: None</Text>
        <Text style={styles.itemText}>Medical Information: None</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 20, paddingTop: 40 },
  avatar: { width: 100, height: 100, alignSelf: 'center', marginBottom: 12 },
  name: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  section: { backgroundColor: '#fceffb', padding: 15, borderRadius: 10, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontWeight: 'bold', fontSize: 18 },
  itemText: { fontSize: 16, marginBottom: 6 },
});