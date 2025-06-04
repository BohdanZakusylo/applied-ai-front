import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
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
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#00000080',
        textAlign: 'center',
        lineHeight: 24,
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
        borderColor: '#00000030',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        backgroundColor: COLORS.WHITE,
    },
    disabledButton: {
        opacity: 0.6,
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    resendText: {
        fontSize: 14,
        color: '#00000080',
    },
    resendLink: {
        fontSize: 14,
        color: COLORS.TERTIARY,
        fontWeight: '500',
    },
});
