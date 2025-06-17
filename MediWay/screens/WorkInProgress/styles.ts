import { StyleSheet } from 'react-native';
import { getThemeColor } from '../../utils/useColors';

export default StyleSheet.create({
    screen: {
        backgroundColor: getThemeColor('BACKGROUND'),
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
        color: getThemeColor('BLACK'),
        textAlign: 'center',
        fontWeight: 500,
        fontSize: 18,
    },
    link: {
        color: getThemeColor('BLACK'),
        textAlign: 'center',
        fontWeight: 500,
        fontSize: 12,
        textDecorationLine: 'underline',
    },
});
