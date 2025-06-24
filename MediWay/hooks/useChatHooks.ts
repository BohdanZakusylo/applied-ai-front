import { useState, useRef } from "react";
import { Alert } from "react-native";
import { ENDPOINTS } from "../assets/api";
import SHA256 from 'crypto-js/sha256';
import { ChatMessageProp } from "../components/ChatMessage/ChatMessage";
import { useTheme } from "@react-navigation/native";
import { FlatList } from "react-native";

const useChatHook = () => {
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


    const [mainChatName, setMainChatName] = useState<string>("");

    const RATE_LIMIT = 1000;

    const fetchQuestionsRemaining = async () => {
        try {
            const response = await fetch(ENDPOINTS.questionsRemaining, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${jwt.current}` },
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
                headers: { 'Authorization': `Bearer ${jwt.current}` },
            });

            if (response.ok) {
                const data = await response.json();
                setMainChatName(data.chat_name);
                setPreviousChat(data.chat_name);
                setMessages([]);
                addMessage({ id: '0', text: 'Hi, how can I help you?', isIncoming: true });
                Alert.alert('Success!', 'New chat has been created!');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to create a new chat!');
            console.error('Failed to create new chat', error);
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

    const fetchAIAnswer = async () => {
        setIsSending(true);
        try {
            const response = await fetch(ENDPOINTS.chatMessage, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt.current}`,
                },
                body: JSON.stringify({ message: inputText, chat_name: mainChatName }),
            });

            if (response.status === 429) {
                Alert.alert('Question Limit Exceeded', `You have reached your monthly limit of ${monthlyLimit} questions.`);
                return null;
            }

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
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
                headers: { 'Authorization': `Bearer ${jwt.current}` },
            });

            if (response.ok) {
                const data = await response.json();
                if (data && Array.isArray(data.chat_names)) {
                    setAllChats(data.chat_names);
                    return data.chat_names;
                }
            }
        } catch (error) {
            console.error('Failed to fetch chat history', error);
        }
        return [];
    };

    const fetchChatMessages = async (chatName: string) => {
        try {
            const response = await fetch(`${ENDPOINTS.getHistory}?chat_name=${chatName}`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${jwt.current}` },
            });

            if (response.ok) {
                const data = await response.json();
                const msgs = [{ id: '0', text: 'Hi, how can I help you?', isIncoming: true }];

                if (Array.isArray(data.conversations)) {
                    data.conversations.forEach((m: any) => {
                        msgs.push({ id: m.id, text: m.message, isIncoming: m.isIncoming });
                    });
                }

                setMessages(msgs);
            }
        } catch (error) {
            console.error('Failed to fetch chat messages', error);
        }
    };

    const selectChat = (chatName: string) => {
        setPreviousChat(chatName);
        fetchChatMessages(chatName);
    };

    const deleteChat = async (chatName: string) => {
        try {
            const response = await fetch(`${ENDPOINTS.deleteChats}?chat_name=${chatName}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${jwt.current}`,
                },
            });

            if (response.status === 204) {
                console.log("helll")
            } else {
                const data = await response.json();
                console.warn("Unexpected response:", data);
            }
        } catch (error) {
            console.error("Failed to delete chat:", error);
        }
    };

    return {
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
        deleteChat,
    };
};

export default useChatHook;