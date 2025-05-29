import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8eef5',
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
    incomingMessage: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    outgoingMessage: {
        backgroundColor: 'white',
        borderColor: '#1991EB',
        borderWidth: 1.5,
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-end',
    },
    outgoingText: {
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderColor: '#e0e0e0',
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
});
