import { StyleSheet } from 'react-native';
import { getThemeColor } from '../../utils/useColors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: getThemeColor('BACKGROUND'),
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: -30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: getThemeColor('BLACK'),
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        color: getThemeColor('GRAY'),
        textAlign: 'center',
        lineHeight: 24,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: getThemeColor('BLACK'),
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: getThemeColor('GRAY'),
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        backgroundColor: getThemeColor('WHITE'),
    },
    disabledButton: {
        opacity: 0.6,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginText: {
        fontSize: 14,
        color: getThemeColor('GRAY'),
    },
    loginLink: {
        fontSize: 14,
        color: getThemeColor('TERTIARY'),
        fontWeight: '500',
    },
});
