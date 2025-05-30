import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';

export default StyleSheet.create({
    button: {
        backgroundColor: COLORS.TERTIARY,
        padding: 8,
        borderRadius: 16,
        height: 64,
        width: 240,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: COLORS.WHITE,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 500,
        fontSize: 16,
    },
});
