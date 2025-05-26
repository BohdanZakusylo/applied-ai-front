import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';

const Profile = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Picture */}
        <Image
          source={require('../assets/profile_pic.png')} // update path if needed
          style={styles.profileImage}
        />

        {/* Name */}
        <Text style={styles.nameText}>Your Name</Text>

        {/* Personal Information */}
        <Text style={styles.sectionTitle}>Personal information</Text>
        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>your@email.com</Text>
          </View>
        </View>

        {/* Other Section */}
        <Text style={styles.sectionTitle}>Other</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>

        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={styles.label}>Insurance Provider:</Text>
            <Text style={styles.value}>None</Text>
          </View>
        </View>

        {/* Save Button (not visible by default) */}
        {/* <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF2E6',
  },
  scrollContainer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 50,
  },
  nameText: {
    fontSize: 30,
    fontFamily: 'BalooBhai2-Bold',
    marginTop: 14,
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginTop: 20,
    fontSize: 20,
    color: '#FF9F1C', // assuming orange, update if needed
    fontFamily: 'BalooBhai2-Medium',
  },
  box: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 30,
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '85%',
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 17,
    color: '#2E1F08',
    fontFamily: 'BalooBhai2-Medium',
    flex: 1,
  },
  value: {
    fontSize: 17,
    color: '#2E1F08',
    fontFamily: 'BalooBhai2-Medium',
    flex: 2,
    textAlign: 'right',
  },
  editButton: {
    position: 'absolute',
    top: 410, // adjust based on layout
    right: 30,
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 6,
    elevation: 2,
  },
  editText: {
    fontFamily: 'BalooBhai2-Medium',
    color: '#4F46E5',
  },
  saveButton: {
    marginTop: 15,
    marginRight: 30,
    alignSelf: 'flex-end',
    backgroundColor: '#00F55A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'BalooBhai2-Medium',
  },
});

export default Profile;