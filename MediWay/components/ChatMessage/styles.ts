import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/constants';

export default StyleSheet.create({
    incomingMessage: {
        backgroundColor: COLORS.WHITE,
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    outgoingMessage: {
        backgroundColor: COLORS.BACKGROUND,
        borderColor: COLORS.SECONDARY_DARK,
        borderWidth: 1.5,
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-end',
    },
});
