import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    headerButtons: {
        flexDirection: 'row',
        gap: 4,
    },
    headerIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    sendIcon: {
        width: 26,
        height: 26,
        resizeMode: 'contain',
    },
    profileIcon: {
        backgroundColor: COLORS.LIGHT_GRAY,
        padding: 8,
        borderRadius: 999,
    },
    messagesContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        padding: 16,
    },
    outgoingText: {
        color: COLORS.BLACK,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderColor: COLORS.BLACK,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        padding: 10,
        borderRadius: 8,
        marginRight: 10,
        color: COLORS.BLACK,
    },
    sendButton: {
        padding: 8,
    },
    empty: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 12,
    },
});
