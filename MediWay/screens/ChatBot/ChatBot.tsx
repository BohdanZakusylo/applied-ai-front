import { useEffect, useRef, useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Image,
    FlatList,
} from 'react-native';
import SHA256 from 'crypto-js/sha256';
import { ActivityIndicator } from 'react-native';
import ChatMessage, { ChatMessageProp, ChatResponse } from '../../components/ChatMessage/ChatMessage';
import styles from './styles';
import { BASE_HIT_SLOP, COLORS } from '../../assets/constants';
import { ENDPOINTS } from '../../assets/api';
import { secureStorage } from '../../services/storage/storage';
import { AuthContext } from '../../contexts/AuthContext';
import DownloadSummaryButton from '../../components/DownloadSummaryButton/DownloadSummaryButton';

const ChatBot = () => {
    const [messages, setMessages] = useState<ChatMessageProp[]>([{ id: '1', text: 'Hi, how can I help you?', isIncoming: true }]);
    const [inputText, setInputText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)

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

    const askMessage = async () => {
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
        return {
            response: "Test message",
            message_id: SHA256(Date.now().toString()).toString(),
            timestamp: new Date().toDateString(),
        }
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
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
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
                    />
                    <DownloadSummaryButton chatHistory={messages} />
                    {isLoading ? (
                        <ActivityIndicator size="small" color={COLORS.GRAY} style={{ padding: 8 }} />
                    ) : (
                        <TouchableOpacity
                            onPress={async () => {
                                if (inputText.trim()) {
                                    await askMessage();
                                }
                            }}
                            style={styles.sendButton}
                            hitSlop={BASE_HIT_SLOP}
                        >
                            <Image
                                source={require("../../assets/images/chat-bot/send.png")}
                                style={{
                                    width: 26,
                                    height: 26,
                                    resizeMode: 'contain',
                                }}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ChatBot;
