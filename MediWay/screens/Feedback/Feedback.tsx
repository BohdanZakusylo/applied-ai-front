import React, { useState } from 'react';
import styles from './styles';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../assets/constants';
import Button from '../../components/Button/Button';

const Feedback = () => {
  const navigation = useNavigation();

  const [feedbackType, setFeedbackType] = useState('general');
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'General Feedback', value: 'general' },
    { label: 'Bug Report', value: 'bug' },
    { label: 'Feature Suggestion', value: 'feature' },
    { label: 'Something Didn’t Work as Expected', value: 'issue' },
  ]);

  const handleSend = () => {
    // TODO: Add send functionality
    console.log({ feedbackType, feedback, email });
    // maybe show a toast or navigate
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
