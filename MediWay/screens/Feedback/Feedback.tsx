import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './styles';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Alert,
    Modal,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_HIT_SLOP } from '../../assets/constants';
import Button from '../../components/Button/Button';
import { ENDPOINTS } from '../../assets/api';
import { AuthContext } from '../../contexts/AuthContext';
import { secureStorage } from '../../services/storage/storage';
import { useTheme } from '../../contexts/ThemeContext';

const Feedback = () => {
    const navigation = useNavigation();

    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const items = [
        { label: 'General Feedback', value: 'general' },
        { label: 'Bug Report', value: 'bug' },
        { label: 'Feature Suggestion', value: 'feature' },
        { label: 'Something Didn’t Work as Expected', value: 'issue' },
    ];

    type FeedbackType = 'general' | 'bug' | 'feature' | 'issue';
    const [feedbackType, setFeedbackType] = useState<FeedbackType>('general');

    const jwt = useRef<string>('');
    const { signOut } = useContext(AuthContext);
    const { colors } = useTheme();

    useEffect(() => {
        const dbJWT = secureStorage.getString('jwt');

        console.log(secureStorage.getAllKeys());
        console.log(dbJWT);
        if (dbJWT) {
            jwt.current = dbJWT;
        }
        else {
            signOut();
        }
    }, [signOut]);

    const handleSend = async () => {
        if (!feedback.trim()) {
            Alert.alert('Please enter your feedback before sending.');
            return;
        }

        const categoryMap: Record<FeedbackType, string> = {
            general: 'General Feedback',
            bug: 'Bug Report',
            feature: 'Feature Suggestion',
            issue: 'Something didn’t work as expected',
        };

        try {
            const response = await fetch(ENDPOINTS.userFeedback, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt.current}`,
                },
                body: JSON.stringify({
                    category: categoryMap[feedbackType],
                    message: feedback,
                    email: email || null,
                }),
            });

            if (response.ok) {
                Alert.alert('Sent!', 'Thanks for your feedback!');
                setFeedback('');
                setEmail('');
                setFeedbackType('general');
            } else {
                const data = await response.json();
                Alert.alert('Error', `${data.detail[0].msg || 'Something went wrong.'}`);
            }
        } catch (error) {
            console.error('Feedback error:', error);
            Alert.alert("Couldn't send feedback. Please try again later.");
        }
    };


    const handleGoBack = () => {
        (navigation as any).navigate('HomeScreen');
    };

    return (
        <View style={[styles.screen, { backgroundColor: colors.BACKGROUND }]}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={[styles.title, { color: colors.BLACK }]}>Give Feedback</Text>
            <Text style={[styles.description, { color: colors.BLACK }]}>
                We would love to hear what you think! Help us improve MediWay by sharing your thoughts or reporting any issues.
            </Text>

            <TouchableOpacity
                style={[styles.dropdown, { backgroundColor: colors.WHITE, borderColor: colors.LIGHT_GRAY }]}
                onPress={() => setDropdownOpen(true)}
            >
                <Text style={{ color: colors.GRAY }}>
                    {items.find(item => item.value === feedbackType)?.label || 'Select feedback type'}
                </Text>
            </TouchableOpacity>

            {/* Custom Dropdown Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={dropdownOpen}
                onRequestClose={() => setDropdownOpen(false)}
            >
                <TouchableOpacity
                    style={[styles.modalOverlay, { backgroundColor: colors.WHITE, borderColor: colors.LIGHT_GRAY }]}
                    activeOpacity={1}
                    onPress={() => setDropdownOpen(false)}
                >
                    <View style={[styles.modalContent, { backgroundColor: colors.WHITE }]}>
                        <Text style={[styles.modalTitle, { color: colors.BLACK }]}>Select Feedback Type</Text>
                        <ScrollView>
                            {items.map((item) => (
                                <TouchableOpacity
                                    key={item.value}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setFeedbackType(item.value as FeedbackType);
                                        setDropdownOpen(false);
                                    }}
                                >
                                    <Text style={{
                                        color: colors.BLACK,
                                        fontWeight: feedbackType === item.value ? '600' : 'normal',
                                    }}>
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>

            <TextInput
                style={[styles.inputLarge, { backgroundColor: colors.WHITE, borderColor: colors.LIGHT_GRAY, color: colors.BLACK }]}
                placeholder="Write your feedback here…"
                placeholderTextColor={colors.LIGHT_GRAY}
                multiline
                numberOfLines={6}
                value={feedback}
                onChangeText={setFeedback}
            />

            <TextInput
                style={[styles.input, { backgroundColor: colors.WHITE, borderColor: colors.LIGHT_GRAY, color: colors.BLACK }]}
                placeholder="Email Address (Optional)"
                placeholderTextColor={colors.LIGHT_GRAY}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <Button
                label="Send"
                onPress={handleSend}
                textProps={{ style: { color: colors.WHITE } }}
            />

            <TouchableOpacity hitSlop={BASE_HIT_SLOP} onPress={handleGoBack}>
                <Text style={[styles.link, { color: colors.BLACK }]}>Go back to the home page</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Feedback;
