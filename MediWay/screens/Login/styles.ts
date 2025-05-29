import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BACKGROUND,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: 96,
        marginBottom: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.BLACK,
        marginBottom: 24,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        paddingRight: 12,
        marginBottom: 8,
        width: '100%',
    },
    passwordInput: {
        flex: 1,
        padding: 12,
    },
    eyeIcon: {
        fontSize: 18,
    },
    link: {
        alignSelf: 'flex-start',
        color: COLORS.PRIMARY,
        marginBottom: 24,
    },
    linkBottom: {
        marginTop: 16,
        fontSize: 12,
        color: COLORS.BLACK,
    },
});
