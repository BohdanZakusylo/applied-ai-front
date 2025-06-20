import { StyleSheet } from 'react-native';
import { getThemeColor } from '../../utils/useColors';
import { COLORS } from '../../assets/constants';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: getThemeColor('BACKGROUND'),
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: 32,
    },
    headerButtons: {
        flexDirection: 'row',
        gap: 4,
    },
    questionsRemaining: {
        fontSize: 14,
        color: COLORS.BLACK,
        fontWeight: '500',
    },
    headerIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    profileIcon: {
        backgroundColor: getThemeColor('LIGHT_GRAY'),
        padding: 8,
        borderRadius: 999,
    },
    messagesContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        padding: 16,
    },
    outgoingText: {
        color: getThemeColor('BLACK'),
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderColor: getThemeColor('BLACK'),
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: getThemeColor('BACKGROUND'),
        padding: 10,
        borderRadius: 8,
        marginRight: 10,
        color: getThemeColor('BLACK'),
    },
    sendButton: {
        padding: 8,
    },
    sendIcon: {
        width: 26,
        height: 26,
        resizeMode: 'contain',
    },
    empty: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 12,
    },
});
