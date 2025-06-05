import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const USER = require('../../assets/images/User.png');
const EDIT = require('../../assets/images/EditButton.png');

const Profile = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [insuranceProvider, setInsuranceProvider] = useState();
  const [generalPractitioner, setGeneralPractitioner] = useState();
  const [medicalInformation, setMedicalInformation] = useState();

  useEffect(() => {
  const fetchUser = async () => {
    console.log("fetch start");

    try {
      const response = await fetch("http://172.27.112.1:8000/api/v1/users/profile", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer <token>"
        }
      });

      console.log("response", response);

      const data = await response.json();
      console.log("data", data);

      setName(data.name);
      setEmail(data.email);
      setInsuranceProvider(data.insurance_provider);
      setGeneralPractitioner(data.general_practitioner);
      setMedicalInformation(data.medical_information);

    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  fetchUser();
}, []);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={USER} style={styles.user} resizeMode="contain" />
      <Text style={styles.name}>{name}</Text>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <TouchableOpacity>
            <Image source={EDIT} style={styles.editIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{email}</Text>
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
          <Text style={styles.value}>{insuranceProvider}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>General Practitioner</Text>
          <Text style={styles.value}>{generalPractitioner}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Medical Information</Text>
          <Text style={styles.value}>{medicalInformation}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default Profile;

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
