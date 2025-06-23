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
import Modal from 'react-native-modal';
import SHA256 from 'crypto-js/sha256';
import { ActivityIndicator } from 'react-native';
import ChatMessage, { ChatMessageProp, ChatResponse } from '../../components/ChatMessage/ChatMessage';
import styles from './styles';
import { BASE_HIT_SLOP } from '../../assets/constants';
import { useTheme } from '../../contexts/ThemeContext';
import { ENDPOINTS } from '../../assets/api';
import { secureStorage } from '../../services/storage/storage';
import { AuthContext } from '../../contexts/AuthContext';
import DownloadSummaryButton from '../../components/DownloadSummaryButton/DownloadSummaryButton';
import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { da } from 'date-fns/locale';

const MAX_MESSAGE_LENGTH = 1000;
// Minimum milliseconds between sending requests.
const RATE_LIMIT = 1000;

const formatChatName = (rawName: string): string => {
    const timestamp = rawName.replace('chat-', '');
    try {
        const date = parseISO(timestamp);
        return format(date, "PPpp");
    } catch {
        return rawName;
    }
};

const ChatBot = () => {
    const { colors } = useTheme();
    const [messages, setMessages] = useState<ChatMessageProp[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSending, setIsSending] = useState<boolean>(false);
    const [questionsRemaining, setQuestionsRemaining] = useState<number>(100);
    const [monthlyLimit, setMonthlyLimit] = useState<number>(100);
    const [isMenuVisible, setMenuVisible] = useState(false);

    const [allChats, setAllChats] = useState<string[]>([""]);
    const [previousChat, setPreviousChat] = useState<string>("");

    const jwt = useRef<string>('');
    const flatListRef = useRef<FlatList>(null);
    const navigation = useNavigation();

    const mainChatName = useRef<string>("");

    const { signOut } = useContext(AuthContext);

    useEffect(() => {

    }, [])

    useEffect(() => {
        const dbJWT = secureStorage.getString('jwt');
        if (dbJWT) {
            jwt.current = dbJWT;
            fetchQuestionsRemaining();
            createNewChat();
            addMessage({ id: '0', text: 'Hi, how can I help you?', isIncoming: true });
        }
        else {
            signOut();
        }
    }, [signOut]);

    const navigateProfile = () => {
        navigation.navigate('Profile' as never);
    };

    const fetchQuestionsRemaining = async () => {
        try {
            const response = await fetch(ENDPOINTS.questionsRemaining, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt.current}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setQuestionsRemaining(data.questions_remaining);
                setMonthlyLimit(data.monthly_limit);
            }
        } catch (error) {
            console.error('Failed to fetch questions remaining', error);
        }
    };

    const createNewChat = async () => {
        try {
            const response = await fetch(ENDPOINTS.newCHat, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${jwt.current}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                mainChatName.current = data.chat_name;
                Alert.alert('Success!', 'New chat has been created!');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to create a new chat!');
            console.error('Failed to fetch questions remaining', error);
        }
    };

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
            Alert.alert('Error', 'Cannot send an empty message.');
            return false;
        }

        if (inputText.length > MAX_MESSAGE_LENGTH) {
            Alert.alert('Error', `Message too long (${inputText.length} / ${MAX_MESSAGE_LENGTH}).`);
            return false;
        }

        return true;
    };

    const sanitizeMessage = (message: string): string => {
        return message
            .replace(/[\u0000-\u001F\u007F]/g, '')
            .replace(/[\u202E]/g, '')
            .trim();
    };

    const askMessage = async () => {
        if (isSending) {
            return;
        }

        if (!checkMessageLength()) {
            return;
        }

        setInputText('');
        addMessage({ id: SHA256(Date.now().toString()).toString(), text: sanitizeMessage(inputText), isIncoming: false });

        setIsLoading(true);
        const data: ChatResponse | null = await fetchAIAnswer();

        if (data) {
            addMessage({ id: SHA256(data.timestamp).toString(), text: sanitizeMessage(data.response), isIncoming: true });
        }
        else {
            addMessage({ id: SHA256(Date.now().toString()).toString(), text: 'An error occured', isIncoming: true });
        }
    };

    const fetchAIAnswer = async () => {
        setIsSending(true);
        console.log(mainChatName.current);
        try {
            const response = await fetch(ENDPOINTS.chatMessage, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt.current}`,
                },
                body: JSON.stringify({ message: inputText, chat_name: mainChatName.current }),
            });

            if (response.status === 429) {
                Alert.alert('Question Limit Exceeded', `You have reached your monthly limit of ${monthlyLimit} questions. Please try again next month.`);
                return null;
            }

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();

            // Update questions remaining after successful question
            fetchQuestionsRemaining();

            return data ?? null;
        } catch (error) {
            console.error('Fetch failed', error);
            Alert.alert('Error', 'Something went wrong, please try again.');
            return null;
        } finally {
            setIsLoading(false);
            setTimeout(() => setIsSending(false), RATE_LIMIT);
        }
    };

    const fetchUserHistory = async () => {
        try {
            const response = await fetch(`${ENDPOINTS.getChats}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt.current}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAllChats(data.chat_names)
            }
        } catch (error) {
            console.error('Failed to fetch questions remaining', error);
        }
    }

    const fetchChatMessages = async () => {
        try {
            const response = await fetch(`${ENDPOINTS.getHistory}?chat_name=${previousChat}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt.current}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                const messages: any[] = [];

                if (Array.isArray(data.conversations)) {
                    data.conversations.forEach((message: any) => {
                        messages.push({
                            id: message.id,
                            text: message.message,
                            isIncoming: message.isIncoming,
                        });
                    });
                }

                setMessages(messages);
            }
        } catch (error) {
            console.error('Failed to fetch questions remaining', error);
        }
    }

    const selectChat = (chatName: string) => {
        setPreviousChat(chatName);
        fetchChatMessages()
    };

    return (
        <>
            <Modal
                isVisible={isMenuVisible}
                animationIn="slideInLeft"
                animationOut="slideOutLeft"
                backdropOpacity={0.3}
                onBackdropPress={() => setMenuVisible(false)}
                style={{ margin: 0, justifyContent: 'flex-start', alignItems: 'flex-start' }}
            >
                <View
                    style={{
                        width: '75%',
                        height: '100%',
                        backgroundColor: colors.BACKGROUND,
                        padding: 20,
                        paddingTop: 60,
                        borderTopRightRadius: 20,
                        borderBottomRightRadius: 20,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 6,
                        elevation: 10,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: '600',
                            marginBottom: 16,
                            color: colors.BLACK,
                        }}
                    >
                        🗂 Your Chats
                    </Text>

                    {allChats.length === 0 ? (
                        <Text style={{ color: colors.GRAY }}>No chats yet</Text>
                    ) : (
                        <FlatList
                            data={allChats}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        selectChat(item);
                                        setMenuVisible(false);
                                    }}
                                    style={{
                                        paddingVertical: 14,
                                        borderBottomColor: colors.LIGHT_GRAY,
                                        borderBottomWidth: 1,
                                    }}
                                >
                                    <Text style={{ color: colors.BLACK, fontSize: 16 }}>
                                        {formatChatName(item)}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>
            </Modal>
            <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.BACKGROUND }]}>
                <KeyboardAvoidingView style={[styles.container, { backgroundColor: colors.BACKGROUND }]} behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
                    <View style={styles.header}>
                        <TouchableOpacity hitSlop={BASE_HIT_SLOP} onPress={async () => {
                            fetchUserHistory()
                            setMenuVisible(true);
                        }}>
                            <Image
                                source={require('../../assets/images/chat-bot/chat-menu.png')}
                                style={[styles.headerIcon, { tintColor: colors.BLACK }]}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.questionsRemaining, { color: colors.BLACK }]}>
                            Questions: {questionsRemaining}/{monthlyLimit}
                        </Text>
                        <View style={styles.headerButtons}>
                            <TouchableOpacity style={[styles.profileIcon, { backgroundColor: colors.LIGHT_GRAY }]} hitSlop={BASE_HIT_SLOP} onPress={navigateProfile}>
                                <Image source={require('../../assets/images/chat-bot/profile.png')} style={styles.headerIcon} />
                            </TouchableOpacity>
                            <DownloadSummaryButton chatHistory={messages} style={[styles.profileIcon, { backgroundColor: colors.LIGHT_GRAY }]}>
                                <Image source={require('../../assets/images/chat-bot/download.png')} style={[styles.headerIcon, { tintColor: colors.BLACK }]} />
                            </DownloadSummaryButton>
                        </View>
                    </View>

                    {messages.length === 0 ? <Text style={[styles.messagesContainer, { color: colors.BLACK }]}>Empty</Text> :
                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.messagesContainer}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />}

                    <View style={[styles.inputContainer, { borderColor: colors.LIGHT_GRAY }]}>
                        <TextInput
                            style={[styles.input, { backgroundColor: colors.BACKGROUND, color: colors.BLACK }]}
                            placeholder="Send a message..."
                            placeholderTextColor={colors.LIGHT_GRAY}
                            onChangeText={setInputText}
                            value={inputText}
                            maxLength={MAX_MESSAGE_LENGTH}
                        />
                        {isLoading ? (
                            <ActivityIndicator size="small" color={colors.GRAY} style={styles.sendButton} />
                        ) : (
                            <TouchableOpacity
                                onPress={async () => {
                                    if (inputText.trim()) {
                                        await askMessage();
                                    }
                                }}
                                style={styles.sendButton}
                                hitSlop={BASE_HIT_SLOP}
                                disabled={isSending}
                            >
                                <Image
                                    source={require('../../assets/images/chat-bot/send.png')}
                                    style={[styles.sendIcon, {
                                        tintColor: isSending ? colors.LIGHT_GRAY : colors.BLACK,
                                    }]}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
};

export default ChatBot;
