import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
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
        color: COLORS.GRAY,
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
        backgroundColor: COLORS.TERTIARY,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    getStartedButtonText: {
        color: COLORS.WHITE,
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: COLORS.WHITE,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        color: COLORS.TERTIARY,
        fontWeight: 'bold',
        fontSize: 16,
    },
    helpTextContainer: {
        marginTop: 20,
        marginBottom: 40,
    },
    helpText: {
        color: COLORS.GRAY,
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});
