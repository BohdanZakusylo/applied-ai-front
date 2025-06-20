import { View, Text } from 'react-native';
import styles from './styles';
import { useTheme } from '../../contexts/ThemeContext';

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
    const { colors } = useTheme();

    return (
        <View style={[
            isIncoming ? styles.incomingMessage : styles.outgoingMessage,
            isIncoming
                ? { backgroundColor: colors.WHITE }
                : { backgroundColor: colors.BACKGROUND, borderColor: colors.SECONDARY_DARK },
        ]}>
            <Text style={{ color: colors.BLACK }}>{text}</Text>
        </View>
    );
};

export default ChatMessage;
