import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
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
        color: COLORS.BLACK,
        marginBottom: 8,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.BLACK,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.GRAY,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        backgroundColor: COLORS.WHITE,
    },
    forgotPassword: {
        alignSelf: 'flex-start',
        marginBottom: 30,
    },
    forgotPasswordText: {
        color: COLORS.BLACK,
        fontSize: 14,
        fontWeight: '500',
    },
    disabledButton: {
        opacity: 0.6,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    registerText: {
        fontSize: 14,
        color: COLORS.GRAY,
    },
    registerLink: {
        fontSize: 14,
        color: COLORS.TERTIARY,
        fontWeight: '500',
    },
});
