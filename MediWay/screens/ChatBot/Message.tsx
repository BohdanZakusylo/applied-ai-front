import { View, Text, StyleSheet } from "react-native";
import { MessageProp } from "../../assets/interfaces";

const Message = ({ id, isIncoming, text }: MessageProp) => {
    return (
        <View style={isIncoming ? styles.incomingMessage : styles.outgoingMessage}>
            <Text>{text}</Text>
        </View>
    );
};

export default Message;

const styles = StyleSheet.create({
    incomingMessage: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    outgoingMessage: {
        backgroundColor: 'EFEFF0',
        borderColor: '#1991EB',
        borderWidth: 1.5,
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-end',
    },
})