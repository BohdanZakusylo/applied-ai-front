import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { secureStorage } from '../../services/storage/storage';
import EditModal from '../../components/Modal/EditModal';
import { ENDPOINTS } from '../../assets/api';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './styles';

const USER = require('../../assets/images/User.png');
const EDIT = require('../../assets/images/EditButton.png');

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [generalPractitioner, setGeneralPractitioner] = useState("");
  const [medicalInformation, setMedicalInformation] = useState("");

  const [isPersonalModalVisible, setIsPersonalModalVisible] = useState(false);
  const [isOtherModalVisible, setIsOtherModalVisible] = useState(false);

  const jwt = useRef<string>("");
  const { dispatch } = useContext(AuthContext);
  const { colors } = useTheme();

  useEffect(() => {
      const dbJWT = secureStorage.getString("jwt");

      console.log(secureStorage.getAllKeys());
      console.log(dbJWT);
      if (dbJWT) {
          jwt.current = dbJWT;
      }
      else {
          dispatch({ type: 'SET_LOGGED_IN', payload: false });
      }

      fetchUser();
  }, [])

  const fetchUser = async () => {
    try {
      const response = await fetch(ENDPOINTS.userProfile, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${jwt.current}`
        }
      });

      console.log("response", response);

      const data = await response.json();
      console.log("data", data);

      setName(data.user.name);
      setEmail(data.user.email);
      setInsuranceProvider(data.user.insurance_provider);
      setGeneralPractitioner(data.user.general_practitioner);
      setMedicalInformation(data.user.medical_information);

    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const updateUserProfile = async (updatedFields: Record<string, string>) => {
  try {
    const response = await fetch(ENDPOINTS.userProfile, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt.current}`
      },
      body: JSON.stringify(updatedFields)
    });

    const data = await response.json();
    console.log("Update response:", data);
    fetchUser();
  } catch (err) {
    console.error("Update failed:", err);
  }
};


  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={USER} style={styles.user} resizeMode="contain" />
        <Text style={styles.name}>{name}</Text>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Information</Text>
            <TouchableOpacity onPress={() => setIsPersonalModalVisible(true)}>
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
            <TouchableOpacity onPress={() => setIsOtherModalVisible(true)}>
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

        {/* App Preferences Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>App Preferences</Text>
          </View>
          
          {/* Theme Toggle */}
          <ThemeToggle label="Dark Mode" />
        </View>
      </ScrollView>

      <EditModal
        visible={isPersonalModalVisible}
        onClose={() => setIsPersonalModalVisible(false)}
        onSave={(updatedFields) => {
          updateUserProfile(updatedFields);
        }}
        fields={[
          { name: 'email', label: 'Email', value: email },
          { name: 'password', label: 'New Password', value: '', secure: true },
        ]}
      />

      <EditModal
        visible={isOtherModalVisible}
        onClose={() => setIsOtherModalVisible(false)}
        onSave={(updatedFields) => {
          updateUserProfile(updatedFields);
        }}
        fields={[
          { name: 'insurance_provider', label: 'Insurance Provider', value: insuranceProvider },
          { name: 'general_practitioner', label: 'General Practitioner', value: generalPractitioner },
          { name: 'medical_information', label: 'Medical Information', value: medicalInformation },
        ]}
      />
    </View>
  );
}

export default Profile;
