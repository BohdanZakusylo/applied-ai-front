import { View, Text } from 'react-native';
import styles from './styles';

export interface ChatResponse {
    response: string;
    message_id: string;
    timestamp: string;
}

export interface ChatMessageProp {
    id: string;
    isIncoming: boolean;
    text: string;
}

const ChatMessage = ({ isIncoming, text }: ChatMessageProp) => {
    return (
        <View style={isIncoming ? styles.incomingMessage : styles.outgoingMessage}>
            <Text>{text}</Text>
        </View>
    );
};

export default ChatMessage;
