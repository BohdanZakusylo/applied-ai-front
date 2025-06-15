import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './styles';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../assets/constants';
import Button from '../../components/Button/Button';
import { ENDPOINTS } from '../../assets/api';
import { AuthContext } from '../../contexts/AuthContext';
import { secureStorage } from '../../services/storage/storage';

const Feedback = () => {
  const navigation = useNavigation();

  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'General Feedback', value: 'general' },
    { label: 'Bug Report', value: 'bug' },
    { label: 'Feature Suggestion', value: 'feature' },
    { label: 'Something Didn’t Work as Expected', value: 'issue' },
  ]);

  type FeedbackType = 'general' | 'bug' | 'feature' | 'issue';
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('general');

  const jwt = useRef<string>("");
  const { dispatch } = useContext(AuthContext);

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
    }, [])

  const handleSend = async () => {
    if (!feedback.trim()) {
      Alert.alert("Please enter your feedback before sending.");
      return;
    }

    const categoryMap: Record<FeedbackType, string> = {
      general: "General Feedback",
      bug: "Bug Report",
      feature: "Feature Suggestion",
      issue: "Something didn’t work as expected",
    };

    try {
      const response = await fetch(ENDPOINTS.userFeedback, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt.current}`
        },
        body: JSON.stringify({
          category: categoryMap[feedbackType],
          message: feedback,
          email: email || null,
        }),
      });

      if (response.ok) {
        Alert.alert("Thanks for your feedback!");
        setFeedback('');
        setEmail('');
        setFeedbackType('general');
      } else {
        const data = await response.json();
        Alert.alert(`Error: ${data.detail || 'Something went wrong.'}`);
      }
    } catch (error) {
      console.error("Feedback error:", error);
      Alert.alert("Couldn't send feedback. Please try again later.");
    }
  };


  const handleGoBack = () => {
    (navigation as any).navigate('Home');
  };

  return (
    <View style={styles.screen}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Give Feedback</Text>
      <Text style={styles.description}>
        We would love to hear what you think! Help us improve MediWay by sharing your thoughts or reporting any issues.
      </Text>

      <DropDownPicker
        open={dropdownOpen}
        value={feedbackType}
        items={items}
        setOpen={setDropdownOpen}
        setValue={setFeedbackType}
        setItems={setItems}
        style={styles.dropdown}
        dropDownContainerStyle={{ borderColor: '#ccc' }}
        textStyle={{ fontSize: 14 }}
      />

      <TextInput
        style={styles.inputLarge}
        placeholder="Write your feedback here…"
        multiline
        numberOfLines={6}
        value={feedback}
        onChangeText={setFeedback}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address (Optional)"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Button
        label="Send"
        buttonProps={{ onPress: handleSend }}
        color={COLORS.PRIMARY}
      />

      <Pressable onPress={handleGoBack}>
        <Text style={styles.link}>Go back to the home page</Text>
      </Pressable>
    </View>
  );
};

export default Feedback;
