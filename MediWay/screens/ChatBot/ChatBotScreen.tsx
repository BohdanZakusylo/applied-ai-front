import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Image,
    FlatList
} from 'react-native';
import { COLORS } from '../../assets/constants';
import { MessageProp } from '../../assets/interfaces';
import Message from './Message';
import SHA256 from 'crypto-js/sha256';
import { ChatResponse } from '../../assets/interfaces';
import { ActivityIndicator } from 'react-native';

const ChatBotScreen = () => {
    const [messages, setMessages] = useState<MessageProp[]>([{ id: "1", text: "Hi, how can I help you?", isIncoming: true }]);
    const [inputText, setInputText] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const flatListRef = useRef<FlatList>(null); // FlatList ref

    const addMessage = (message: MessageProp) => {
        setMessages(prevMessages => {
            const updated = [...prevMessages, message];

            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);

            return updated;
        });
        setInputText("");
    };
    const renderItem = ({ item }: { item: MessageProp }) => (
        <Message id={item.id} isIncoming={item.isIncoming} text={item.text} />
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
        try {
            const response = await fetch("http://localhost:8000/api/v1/chat/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer <ur token>"
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
                    <TouchableOpacity>
                        <Image source={require("../../assets/images/chat-bot/chat-menu.png")} style={{
                            width: 24,
                            height: 24,
                            resizeMode: 'contain',
                        }} />
                    </TouchableOpacity>
                    <View style={styles.profileIcon}>
                        <Image source={require("../../assets/images/chat-bot/profile.png")} style={{
                            width: 24,
                            height: 24,
                            resizeMode: 'contain',
                        }} />
                    </View>
                </View>

                {messages.length == 0 ? <Text style={[styles.messagesContainer]}>Empty</Text> :
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.messagesContainer}
                        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                    />}

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Empty"
                        placeholderTextColor="#ccc"
                        onChangeText={setInputText}
                        value={inputText}
                    />
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#333" style={{ padding: 8 }} />
                    ) : (
                        <TouchableOpacity
                            onPress={async () => {
                                if (inputText.trim()) {
                                    await askMessage();
                                }
                            }}
                            style={styles.sendButton}
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

export default ChatBotScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    profileIcon: {
        backgroundColor: '#d3d3d3',
        padding: 8,
        borderRadius: 999,
    },
    messagesContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        padding: 16,
    },
    outgoingText: {
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 10,
        borderRadius: 8,
        marginRight: 10,
        color: '#000',
    },
    sendButton: {
        padding: 8,
    },
    empty: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
