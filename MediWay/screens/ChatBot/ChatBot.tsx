import { useEffect, useRef, useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Image,
    FlatList,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import SHA256 from 'crypto-js/sha256';
import { ActivityIndicator } from 'react-native';
import ChatMessage, { ChatMessageProp, ChatResponse } from '../../components/ChatMessage/ChatMessage';
import styles from './styles';
import { BASE_HIT_SLOP, COLORS } from '../../assets/constants';
import { ENDPOINTS } from '../../assets/api';
import { secureStorage } from '../../services/storage/storage';
import { AuthContext } from '../../contexts/AuthContext';

const MAX_MESSAGE_LENGTH = 1000;
// Minimum milliseconds between sending requests.
const RATE_LIMIT = 1000;

const ChatBot = () => {
    const [messages, setMessages] = useState<ChatMessageProp[]>([{ id: '1', text: 'Hi, how can I help you?', isIncoming: true }]);
    const [inputText, setInputText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSending, setIsSending] = useState<boolean>(false);

    const jwt = useRef<string>("");
    const flatListRef = useRef<FlatList>(null);

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

    const addMessage = (message: ChatMessageProp) => {
        setMessages(prevMessages => {
            const updated = [...prevMessages, message];

            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);

            return updated;
        });
        setInputText('');
    };

    const renderItem = ({ item }: { item: ChatMessageProp }) => (
        <ChatMessage id={item.id} isIncoming={item.isIncoming} text={item.text} />
    );

    const checkMessageLength = (): boolean => {
        if (!inputText.trim()) {
            Alert.alert("Error", "Cannot send an empty message.");
            return false;
        }

        if (inputText.length > MAX_MESSAGE_LENGTH) {
            Alert.alert("Error", `Message too long (${inputText.length} / ${MAX_MESSAGE_LENGTH}).`);
            return false;
        }

        return true;
    }

    const askMessage = async () => {
        if (isSending) {
            return;
        }

        if (!checkMessageLength()) {
            return;
        }

        setInputText("");
        addMessage({ id: SHA256(Date.now().toString()).toString(), text: inputText, isIncoming: false })

        setIsLoading(true);
        const data: ChatResponse | null = await fetchAIAnswer();

        if (data) {
            addMessage({ id: SHA256(data.timestamp).toString(), text: data.response, isIncoming: true })
        }
        else {
            addMessage({ id: SHA256(Date.now().toString()).toString(), text: "An error occured", isIncoming: true })
        }
    }

    const fetchAIAnswer = async () => {
        setIsSending(true);
        try {
            const response = await fetch(ENDPOINTS.chatMessage, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt.current}`
                },
                body: JSON.stringify({ message: inputText })
            });

            const data = await response.json();

            return data ?? null;
        } catch (error) {
            console.error("Fetch failed", error);
            Alert.alert("Error", "Something went wrong, please try again.")
            return null;
        } finally {
            setIsLoading(false);
            setTimeout(() => setIsSending(false), RATE_LIMIT);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
                <View style={styles.header}>
                    <TouchableOpacity hitSlop={BASE_HIT_SLOP}>
                        <Image source={require('../../assets/images/chat-bot/chat-menu.png')} style={styles.headerIcon} />
                    </TouchableOpacity>
                    <View style={styles.profileIcon}>
                        <Image source={require('../../assets/images/chat-bot/profile.png')} style={styles.headerIcon} />
                    </View>
                </View>

                {messages.length === 0 ? <Text style={[styles.messagesContainer]}>Empty</Text> :
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.messagesContainer}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />}

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Empty"
                        placeholderTextColor={COLORS.LIGHT_GRAY}
                        onChangeText={setInputText}
                        value={inputText}
                        maxLength={MAX_MESSAGE_LENGTH}
                    />
                    {isLoading ? (
                        <ActivityIndicator size="small" color={COLORS.GRAY} style={{ padding: 8 }} />
                    ) : (
                        <TouchableOpacity
                            onPress={async () => {
                                await askMessage();
                            }}
                            style={styles.sendButton}
                            hitSlop={BASE_HIT_SLOP}
                            disabled={isSending}
                        >
                            <Image
                                source={require("../../assets/images/chat-bot/send.png")}
                                style={{
                                    width: 26,
                                    height: 26,
                                    resizeMode: 'contain',
                                    tintColor: isSending ? COLORS.LIGHT_GRAY : COLORS.BLACK,
                                }}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatBot;
