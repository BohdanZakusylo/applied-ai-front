import { StyleSheet } from 'react-native';
import { getThemeColor } from '../../utils/useColors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: getThemeColor('BACKGROUND'),
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    logo: {
        width: 200,
        height: 60,
        marginBottom: 20,
    },
    illustration: {
        width: '100%',
        height: 400,
        marginVertical: 20,
    },
    tagline: {
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 40,
        color: getThemeColor('GRAY'),
        lineHeight: 24,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 20,
    },
    getStartedButton: {
        backgroundColor: getThemeColor('TERTIARY'),
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    getStartedButtonText: {
        color: getThemeColor('WHITE'),
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: getThemeColor('WHITE'),
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: getThemeColor('TERTIARY'),
        fontWeight: 'bold',
        fontSize: 16,
    },
    helpTextContainer: {
        marginTop: 20,
        marginBottom: 40,
    },
    helpText: {
        color: getThemeColor('GRAY'),
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});
