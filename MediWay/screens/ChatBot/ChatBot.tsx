import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Image,
    FlatList,
} from 'react-native';
import ChatMessage, { ChatMessageProp } from '../../components/ChatMessage/ChatMessage';
import styles from './styles';
import { BASE_HIT_SLOP } from '../../assets/constants';

const ChatBot = () => {
    const [messages, setMessages] = useState<ChatMessageProp[]>([{ id: '1', text: 'Hi, how can I help you?', isIncoming: true }]);
    const [inputText, setInputText] = useState<string>('');

    const addMessage = (message: ChatMessageProp) => {
        setMessages(prevMessages => [...prevMessages, message]);
        setInputText('');
    };

    const renderItem = ({ item }: { item: ChatMessageProp }) => (
        <ChatMessage id={item.id} isIncoming={item.isIncoming} text={item.text} />
    );

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
                        placeholderTextColor="#ccc"
                        onChangeText={setInputText}
                    />
                    <TouchableOpacity onPress={() => {
                        if (inputText) {
                            addMessage({ id: String(messages.length + 1), text: inputText, isIncoming: false });
                        }
                    }} hitSlop={BASE_HIT_SLOP} style={styles.sendButton}>
                        <Image source={require('../../assets/images/chat-bot/send.png')} style={styles.sendIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ChatBot;
