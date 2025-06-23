import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { secureStorage } from '../../services/storage/storage';
import EditModal from '../../components/Modal/EditModal';
import { ENDPOINTS } from '../../assets/api';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './styles';
import { UserContext } from '../../contexts/UserContext';
import { User } from '../../assets/interfaces';
import Button from '../../components/Button/Button';

const USER = require('../../assets/images/User.png');
const EDIT = require('../../assets/images/EditButton.png');

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [insuranceProvider, setInsuranceProvider] = useState('');
    const [generalPractitioner, setGeneralPractitioner] = useState('');
    const [medicalInformation, setMedicalInformation] = useState('');

    const [isPersonalModalVisible, setIsPersonalModalVisible] = useState(false);
    const [isOtherModalVisible, setIsOtherModalVisible] = useState(false);

    const jwt = useRef<string>('');
    const { signOut } = useContext(AuthContext);
    const { fetchUser } = useContext(UserContext);
    const { colors, isDarkMode } = useTheme();

    const refreshUserData = useCallback(() => {
        fetchUser(jwt.current).then((userResponse: User | null) => {
            if (!userResponse) {
                return;
            }
            setName(userResponse.name);
            setEmail(userResponse.email);
            setInsuranceProvider(userResponse.insurance_provider);
            setGeneralPractitioner(userResponse.general_practitioner);
            setMedicalInformation(userResponse.medical_information);
        });
    }, [fetchUser]);

    useEffect(() => {
        const dbJWT = secureStorage.getString('jwt');

        if (dbJWT) {
            jwt.current = dbJWT;
            refreshUserData();
        }
        else {
            signOut();
        }
    }, [fetchUser, refreshUserData, signOut]);

    const updateUserProfile = async (updatedFields: Record<string, string>) => {
        try {
            const response = await fetch(ENDPOINTS.userProfile, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt.current}`,
                },
                body: JSON.stringify(updatedFields),
            });

            const data = await response.json();
            console.log('Update response:', data);
            refreshUserData();
        } catch (err) {
            console.error('Update failed:', err);
        }
    };


    return (
        <View style={[styles.wrapper, { backgroundColor: colors.BACKGROUND }]}>
            <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.BACKGROUND }]}>
                <Image source={USER} style={styles.user} resizeMode="contain" />
                <Text style={[styles.name, { color: colors.BLACK }]}>{name}</Text>

                <View style={[styles.section, { backgroundColor: isDarkMode ? colors.GRAY_DARK : colors.WHITE }]}>
                    <View style={[styles.sectionHeader, { borderBottomColor: colors.LIGHT_GRAY }]}>
                        <Text style={[styles.sectionTitle, { color: colors.BLACK }]}>Personal Information</Text>
                        <TouchableOpacity onPress={() => setIsPersonalModalVisible(true)}>
                            <Image source={EDIT} style={styles.editIcon} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.row, { borderBottomColor: colors.LIGHT_GRAY }]}>
                        <Text style={[styles.label, { color: colors.BLACK }]}>Email</Text>
                        <Text style={[styles.value, { color: colors.GRAY }]}>{email}</Text>
                    </View>
                    <View style={[styles.row, { borderBottomColor: colors.LIGHT_GRAY }]}>
                        <Text style={[styles.label, { color: colors.BLACK }]}>Password</Text>
                        <Text style={[styles.value, { color: colors.GRAY }]}>••••••</Text>
                    </View>
                </View>

                <View style={[styles.section, { backgroundColor: isDarkMode ? colors.GRAY_DARK : colors.WHITE }]}>
                    <View style={[styles.sectionHeader, { borderBottomColor: colors.LIGHT_GRAY }]}>
                        <Text style={[styles.sectionTitle, { color: colors.BLACK }]}>Other</Text>
                        <TouchableOpacity onPress={() => setIsOtherModalVisible(true)}>
                            <Image source={EDIT} style={styles.editIcon} resizeMode="contain" />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.row, { borderBottomColor: colors.LIGHT_GRAY }]}>
                        <Text style={[styles.label, { color: colors.BLACK }]}>Insurance Provider</Text>
                        <Text style={[styles.value, { color: colors.GRAY }]}>{insuranceProvider}</Text>
                    </View>
                    <View style={[styles.row, { borderBottomColor: colors.LIGHT_GRAY }]}>
                        <Text style={[styles.label, { color: colors.BLACK }]}>General Practitioner</Text>
                        <Text style={[styles.value, { color: colors.GRAY }]}>{generalPractitioner}</Text>
                    </View>
                    <View style={[styles.row, { borderBottomColor: colors.LIGHT_GRAY }]}>
                        <Text style={[styles.label, { color: colors.BLACK }]}>Medical Information</Text>
                        <Text style={[styles.value, { color: colors.GRAY }]}>{medicalInformation}</Text>
                    </View>
                </View>

                {/* App Preferences Section */}
                <View style={[styles.section, { backgroundColor: isDarkMode ? colors.GRAY_DARK : colors.WHITE }]}>
                    <View style={[styles.sectionHeader, { borderBottomColor: colors.LIGHT_GRAY }]}>
                        <Text style={[styles.sectionTitle, { color: colors.BLACK }]}>App Preferences</Text>
                    </View>

                    {/* Theme Toggle */}
                    <ThemeToggle label="Dark Mode" />
                </View>

                <View style={[styles.section, { backgroundColor: isDarkMode ? colors.GRAY_DARK : colors.WHITE }]}>
                    <View style={[styles.sectionHeader, { borderBottomColor: colors.LIGHT_GRAY }]}>
                        <Text style={[styles.sectionTitle, { color: colors.BLACK }]}>Logout</Text>
                    </View>
                    <Button label={'Logout'} onPress={() => signOut(true)} />
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
};

export default Profile;
