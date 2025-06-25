import { StyleSheet } from 'react-native';
import { getThemeColor } from '../../utils/useColors';

export default StyleSheet.create({
    incomingMessage: {
        backgroundColor: getThemeColor('WHITE'),
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    outgoingMessage: {
        backgroundColor: getThemeColor('BACKGROUND'),
        borderColor: getThemeColor('SECONDARY_DARK'),
        borderWidth: 1.5,
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-end',
    },
});
