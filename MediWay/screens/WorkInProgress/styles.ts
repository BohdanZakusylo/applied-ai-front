import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';

export default StyleSheet.create({
    screen: {
        backgroundColor: COLORS.BACKGROUND,
        width: '100%',
        height: '100%',
        padding: 16,
        gap: 32,
        justifyContent: 'center',
    },
    logo: {
        width: '100%',
        height: 96,
        marginBottom: 32,
    },
    work_in_progress: {
        width: '100%',
        height: 240,
    },
    error: {
        color: COLORS.BLACK,
        textAlign: 'center',
        fontWeight: 500,
        fontSize: 18,
    },
    link: {
        color: COLORS.BLACK,
        textAlign: 'center',
        fontWeight: 500,
        fontSize: 12,
        textDecorationLine: 'underline',
    },
});
