import { StyleSheet } from 'react-native';
import { getThemeColor } from '../../utils/useColors';

// Create a theme-aware StyleSheet that will update with the theme
export default StyleSheet.create({
    screen: {
        backgroundColor: getThemeColor('BACKGROUND'),
        width: '100%',
        height: '100%',
        padding: 16,
        gap: 8,
    },
    logo: {
        width: '100%',
        height: 96,
        marginTop: 32,
    },
    intro: {
        color: getThemeColor('BLACK'),
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 20,
        paddingBottom: 32,
    },
    tiles: {
        marginBottom: 24,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});
