import React, { useState } from 'react';
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

const ChatBotScreen = () => {
    const [messages, setMessages] = useState<MessageProp[]>([{ id: "1", text: "Hi, how can I help you?", isIncoming: true }]);
    const [inputText, setInputText] = useState<string>("");

    const addMessage = (message: MessageProp) => {
        setMessages(prevMessages => [...prevMessages, message]);
    };

    const renderItem = ({ item }: { item: MessageProp }) => (
        <Message id={item.id} isIncoming={item.isIncoming} text={item.text} />
    );

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
                    />
                    <TouchableOpacity onPress={() => {
                        if (inputText) {
                            addMessage({ id: String(messages.length + 1), text: inputText, isIncoming: false })
                        }
                    }} style={styles.sendButton}>
                        <Image source={require("../../assets/images/chat-bot/send.png")} style={{
                            width: 26,
                            height: 26,
                            resizeMode: 'contain',
                        }} />
                    </TouchableOpacity>
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
