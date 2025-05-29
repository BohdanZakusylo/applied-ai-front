import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';

export default StyleSheet.create({
    screen: {
        backgroundColor: COLORS.BACKGROUND,
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
        color: COLORS.BLACK,
        textAlign: 'center',
        fontWeight: 500,
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
