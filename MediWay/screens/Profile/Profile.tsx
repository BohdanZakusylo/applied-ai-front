import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const USER = require('../../assets/images/User.png');
const EDIT = require('../../assets/images/EditButton.png');

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={USER} style={styles.user} resizeMode="contain" />
      <Text style={styles.name}>JOHN DOE</Text>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <TouchableOpacity>
            <Image source={EDIT} style={styles.editIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>johndoe@email.com</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Password</Text>
          <Text style={styles.value}>••••••</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Other</Text>
          <TouchableOpacity>
            <Image source={EDIT} style={styles.editIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Insurance Provider</Text>
          <Text style={styles.value}>None</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>General Practitioner</Text>
          <Text style={styles.value}>None</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Medical Information</Text>
          <Text style={styles.value}>None</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fdf3f8',
    padding: 20,
    paddingTop: 40,
  },
  user: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  editIcon: {
  width: 20,
  height: 20
},
});
