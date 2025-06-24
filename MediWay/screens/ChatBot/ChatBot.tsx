import { useState, useContext, useEffect } from 'react';
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
import { ActivityIndicator } from 'react-native';
import ChatMessage from '../../components/ChatMessage/ChatMessage';
import styles from './styles';
import { BASE_HIT_SLOP } from '../../assets/constants';
import { useTheme } from '../../contexts/ThemeContext';
import { secureStorage } from '../../services/storage/storage';
import { AuthContext } from '../../contexts/AuthContext';
import DownloadSummaryButton from '../../components/DownloadSummaryButton/DownloadSummaryButton';
import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import useChatHook from '../../hooks/useChatHooks';
import { ChatMessageProp } from '../../components/ChatMessage/ChatMessage';

const MAX_MESSAGE_LENGTH = 1000;

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
    const navigation = useNavigation();
    const { signOut } = useContext(AuthContext);

    const {
        messages,
        inputText,
        setInputText,
        isLoading,
        isSending,
        questionsRemaining,
        monthlyLimit,
        allChats,
        mainChatName,
        previousChat,
        jwt,
        flatListRef,
        fetchQuestionsRemaining,
        createNewChat,
        addMessage,
        fetchAIAnswer,
        fetchUserHistory,
        fetchChatMessages,
        selectChat,
        setPreviousChat,
        setMainChatName,
    } = useChatHook();

    const [isMenuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        const init = async () => {
            const dbJWT = secureStorage.getString('jwt');
            if (dbJWT) {
                jwt.current = dbJWT;
                await fetchQuestionsRemaining();
                const chats = await fetchUserHistory();

                if (chats.length === 0) {
                    await createNewChat();
                } else {
                    const firstChat = chats[0];
                    setMainChatName(firstChat);
                    setPreviousChat(firstChat);
                    await fetchChatMessages(firstChat);
                }
            } else {
                signOut();
            }
        };

        init();
    }, [signOut]);

    const navigateProfile = () => {
        navigation.navigate('Profile' as never);
    };

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
        return message.replace(/[\u0000-\u001F\u007F]/g, '').replace(/[\u202E]/g, '').trim();
    };

    const askMessage = async () => {
        if (isSending) return;
        if (!checkMessageLength()) return;

        setInputText('');
        addMessage({ id: Date.now().toString(), text: sanitizeMessage(inputText), isIncoming: false });

        const data = await fetchAIAnswer();

        if (data) {
            addMessage({ id: data.timestamp, text: sanitizeMessage(data.response), isIncoming: true });
        } else {
            addMessage({ id: Date.now().toString(), text: 'An error occurred', isIncoming: true });
        }
    };

    const renderItem = ({ item }: { item: ChatMessageProp }) => (
        <ChatMessage id={item.id} isIncoming={item.isIncoming} text={item.text} />
    );

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
                <View style={{ width: '75%', height: '100%', backgroundColor: colors.BACKGROUND, paddingTop: 60, paddingHorizontal: 20, borderTopRightRadius: 20, borderBottomRightRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 10, justifyContent: 'space-between' }}>
                    <View style={{ flexGrow: 1 }}>
                        <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 16, color: colors.BLACK }}>
                            🗂 Your Chats
                        </Text>

                        {allChats.length === 0 ? (
                            <Text style={{ color: colors.GRAY }}>No chats yet</Text>
                        ) : (
                            <View style={{ maxHeight: 12 * 52 }}>
                                <FlatList
                                    data={allChats.slice(0, 12)}
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                selectChat(item);
                                                setMenuVisible(false);
                                            }}
                                            style={{ paddingVertical: 14, borderBottomColor: colors.LIGHT_GRAY, borderBottomWidth: 1 }}
                                        >
                                            <Text style={{ color: colors.BLACK, fontSize: 16 }}>{formatChatName(item)}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        )}
                    </View>

                    <TouchableOpacity
                        onPress={async () => {
                            await createNewChat();
                            setMenuVisible(false);
                        }}
                        style={{ marginBottom: 60, paddingVertical: 14, backgroundColor: colors.LIGHT_GRAY, borderRadius: 8, alignItems: 'center' }}
                    >
                        <Text style={{ color: colors.BLACK, fontWeight: '600', fontSize: 16 }}>➕ Add Chat</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.BACKGROUND }]}>
                <KeyboardAvoidingView style={[styles.container, { backgroundColor: colors.BACKGROUND }]} behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
                    <View style={styles.header}>
                        <TouchableOpacity hitSlop={BASE_HIT_SLOP} onPress={async () => {
                            await fetchUserHistory();
                            setMenuVisible(true);
                        }}>
                            <Image source={require('../../assets/images/chat-bot/chat-menu.png')} style={[styles.headerIcon, { tintColor: colors.BLACK }]} />
                        </TouchableOpacity>
                        <Text style={[styles.questionsRemaining, { color: colors.BLACK }]}>Questions: {questionsRemaining}/{monthlyLimit}</Text>
                        <View style={styles.headerButtons}>
                            <TouchableOpacity style={[styles.profileIcon, { backgroundColor: colors.LIGHT_GRAY }]} hitSlop={BASE_HIT_SLOP} onPress={navigateProfile}>
                                <Image source={require('../../assets/images/chat-bot/profile.png')} style={styles.headerIcon} />
                            </TouchableOpacity>
                            <DownloadSummaryButton chatHistory={messages} style={[styles.profileIcon, { backgroundColor: colors.LIGHT_GRAY }]}>
                                <Image source={require('../../assets/images/chat-bot/download.png')} style={[styles.headerIcon, { tintColor: colors.BLACK }]} />
                            </DownloadSummaryButton>
                        </View>
                    </View>

                    {messages.length === 0 ? (
                        <Text style={[styles.messagesContainer, { color: colors.BLACK }]}>Empty</Text>
                    ) : (
                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.messagesContainer}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    )}

                    {mainChatName == previousChat ? (
                        <View style={[styles.inputContainer, { borderColor: colors.LIGHT_GRAY }]}>
                            <TextInput
                                style={[styles.input, { backgroundColor: colors.BACKGROUND, color: colors.BLACK }]}
                                placeholder="Send a message..."
                                placeholderTextColor={colors.LIGHT_GRAY}
                                onChangeText={setInputText}
                                value={inputText}
                                maxLength={MAX_MESSAGE_LENGTH}
                            />
                            {isLoading || isSending ? (
                                <ActivityIndicator size="small" color={colors.GRAY} style={styles.sendButton} />
                            ) : (
                                <TouchableOpacity
                                    onPress={async () => {
                                        if (inputText.trim()) await askMessage();
                                    }}
                                    style={styles.sendButton}
                                    hitSlop={BASE_HIT_SLOP}
                                    disabled={isSending}
                                >
                                    <Image
                                        source={require('../../assets/images/chat-bot/send.png')}
                                        style={[styles.sendIcon, { tintColor: isSending ? colors.LIGHT_GRAY : colors.BLACK }]}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    ) : null}
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
};

export default ChatBot;
